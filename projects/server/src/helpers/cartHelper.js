const db = require('../models');
const Cart = db.cart;
const Product = db.product;
const User = db.user;
const PackagingType = db.packaging_type;
const Promotion = db.promotion;
const ClosedStock = db.closed_stock;
const prescriptionCartDB = db.prescription_cart;
const { Op } = require('sequelize');
const { sequelize } = require('../models');

const getUserCarts = async (includes, whereQuery, order) => {
  try {
    const today = new Date();
    return await Cart.findAndCountAll({
      include: [
        // includes,
        {
          model: Product,
          attributes: {
            exclude: ['description', 'dosing', 'BPOM_id'],
          },
          include: [
            { model: PackagingType, attributes: ['type_name'] },
            {
              model: Promotion,
              where: {
                [Op.and]: [
                  { limit: { [Op.gt]: 0 } },
                  { date_start: { [Op.lte]: today } },
                  { date_end: { [Op.gte]: today } },
                ],
              },
              required: false,
            },
            { model: ClosedStock },
          ],
        },
      ],
      attributes: {
        include: [
          [sequelize.literal('CAST(price*discount/100 AS FLOAT)'), 'disc'],
          // [sequelize.literal('CAST(SUM(price) AS FLOAT)'), 'totalll'],
        ],
        // include: [[sequelize.fn('sum', sequelize.col('qty')), 'cartQty']],
      },
      where: whereQuery,
      order: [['createdAt', 'DESC']],
      // limit: Number(limitPage),
      // offset: (Number(page) - 1) * limitPage,
    });
  } catch (error) {
    throw error;
  }
};

const getCart = async (includes, whereQuery) => {
  try {
    return await Cart.findOne({
      //   include: [{ model: Role }],
      where: {
        ...whereQuery,
      },
      //   attributes: { exclude: [excludes] },
    });
  } catch (error) {
    return error;
  }
};

const getCartByPk = async (primaryKey, excludes) => {
  try {
    return await Cart.findByPk(primaryKey, {
      attributes: { exclude: excludes },
    });
  } catch (error) {
    return error;
  }
};

const updateConfirmation = async (id, confirmation, notes) => {
  try {
    if (confirmation === false) {
      prescriptionCartDB.destroy({ where: { cart_id: id } });
      await Cart.update(
        { confirmation: confirmation, notes: notes },
        { where: { id: id } },
      );
    } else {
      await Cart.update({ confirmation: confirmation }, { where: { id: id } });
    }
  } catch (error) {
    throw { message: error.message, code: 500 };
  }
};

const isPrescriptionCartProductListEmpty = async (cart_id) => {
  try {
    const getAllPrescriptionCartProductList = await prescriptionCartDB.findAll({
      where: { cart_id: cart_id },
    });

    console.log(getAllPrescriptionCartProductList.length);

    if (getAllPrescriptionCartProductList.length) return false;
    return true;
  } catch (error) {
    return error;
  }
};

const getAllPrescriptions = async (
  includes,
  whereQuery,
  order,
  limit,
  page,
) => {
  try {
    let pageLimit = Number(limit);
    return await Cart.findAndCountAll({
      include: [includes],
      where: whereQuery,
      order: order || [['createdAt', 'DESC']],
      limit: pageLimit,
      offset: (Number(page) - 1) * pageLimit,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserCarts,
  getCart,
  getCartByPk,
  updateConfirmation,
  isPrescriptionCartProductListEmpty,
  getAllPrescriptions,
};
