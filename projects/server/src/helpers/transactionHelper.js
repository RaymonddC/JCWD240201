const db = require('../models');
const TransactionHistory = db.transaction_history;
const Transaction = db.transaction;
const TransactionDetail = db.transaction_detail;
const TransactionStatus = db.transaction_status;
const Product = db.product;
const User = db.user;
const AddressDB = db.address;
const PackagingType = db.packaging_type;
const ProductType = db.product_type;
const ProductImageDB = db.product_image;
const Promotion = db.promotion;
const ClosedStock = db.closed_stock;
const { Op } = require('sequelize');
const { sequelize } = require('../models');

const getUserTransactions = async (whereQuery, orderBy) => {
  try {
    if (whereQuery.dates.startDate) {
      let startDate = new Date(whereQuery.dates.startDate + '');
      let endDate = new Date(whereQuery.dates.endDate + '');

      whereQuery.transaction = {
        ...whereQuery.transaction,
        [Op.and]: [
          sequelize.where(
            sequelize.fn('date', sequelize.col('transaction.createdAt')),
            '>=',
            new Date(startDate.setHours(startDate.getHours() + 7)),
          ),
          sequelize.where(
            sequelize.fn('date', sequelize.col('transaction.createdAt')),
            '<=',
            new Date(endDate.setHours(endDate.getHours() + 24 + 7)),
          ),
        ],
      };
    }

    let includes = [];
    if (!whereQuery.transaction.hasOwnProperty('user_id')) {
      includes = [{ model: User }];
    }

    let order = [['createdAt', 'DESC']];
    if (orderBy.sortType) {
      order = [[orderBy.sortType, orderBy.sortOrder]];
    }

    return await Transaction.findAndCountAll({
      include: [
        ...includes,
        {
          model: TransactionHistory,
          include: [
            {
              model: TransactionStatus,
              attributes: ['status'],
            },
          ],
          where: whereQuery.transactionHistory,
        },
        {
          model: TransactionDetail,
          include: [
            {
              model: Product,
              attributes: ['packaging_type_id', 'product_type_id'],
              include: [
                {
                  model: PackagingType,
                  attributes: ['type_name'],
                },
                {
                  model: ProductType,
                  attributes: ['unit'],
                },
                { model: ProductImageDB, attributes: ['image'] },
              ],
            },
          ],
          where: whereQuery.transactionDetail,
        },
      ],
      where: {
        ...whereQuery.transaction,
      },
      order: order,
      ...whereQuery.pagination,
      distinct: true,
    });
  } catch (error) {
    throw error;
  }
};

const getTransactionById = async (id, admin) => {
  try {
    let includes = [];
    if (admin) {
      includes = [{ model: User }];
    }
    return await Transaction.findByPk(id, {
      include: [
        ...includes,
        {
          model: TransactionHistory,
          include: [
            {
              model: TransactionStatus,
              attributes: ['status'],
            },
          ],
        },
        {
          model: TransactionDetail,
          include: [
            {
              model: Product,
              attributes: ['packaging_type_id', 'product_type_id'],
              include: [
                {
                  model: PackagingType,
                  attributes: ['type_name'],
                },
                {
                  model: ProductType,
                  attributes: ['unit'],
                },
                { model: ProductImageDB, attributes: ['image'] },
              ],
            },
          ],
        },
      ],
    });
  } catch (error) {
    throw error;
  }
};

const updateCloseStock = async (product_id, qty, isAdd) => {
  try {
    const closeStockProduct = await ClosedStock.findOne({
      where: { product_id: product_id },
    });
    const newStock = isAdd
      ? closeStockProduct.total_stock + qty
      : closeStockProduct.total_stock - qty;
    return {
      ...closeStockProduct.dataValues,
      total_stock: newStock,
    };
  } catch (error) {
    throw error;
  }
};

const updatePromoTx = async (promotion_id, qty, price) => {
  try {
    const promoTx = await Promotion.findByPk(promotion_id);
    let totalDiscount;
    if (!promoTx)
      throw {
        message: 'Promotion quota exceed!',
        code: 400,
        data: promotionActive,
      };
    else if (promoTx && promoTx.minimum_transaction < price) {
      const today = new Date();
      const startDate = new Date(promoTx.date_start);
      const endDate = new Date(promoTx.date_end);
      if (today > endDate) {
        throw {
          message: 'Promotion has expired!',
          code: 400,
        };
      } else if (today < startDate) {
        throw {
          message: 'Promotion Not Started!',
          code: 400,
        };
      }
      if (promoTx.limit <= 0) throw { message: 'Promotion quota exceed' };
      let disc = Math.round((price * promoTx.discount) / 100);
      totalDiscount =
        disc > (promoTx.maximum_discount_amount || disc + 1)
          ? promoTx.maximum_discount_amount
          : disc;
    }

    return {
      totalDiscount,
      promoData: {
        ...promoTx.dataValues,
        limit: promoTx.limit - qty,
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserTransactions,
  getTransactionById,
  updateCloseStock,
  updatePromoTx,
};
