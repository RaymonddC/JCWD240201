const db = require('../models');
const Cart = db.cart;
const Product = db.product;
const User = db.user;
const PackagingType = db.packaging_type;
const Promotion = db.promotion;
const ClosedStock = db.closed_stock;
const ProductImageDB = db.product_image;
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
            { model: ProductImageDB, attributes: ['image'] },
          ],
        },
      ],
      attributes: {
        include: [
          [sequelize.literal('CAST(price*discount/100 AS INTEGER)'), 'disc'],
          // [sequelize.literal('CAST(SUM(price) AS FLOAT)'), 'totalll'],
        ],
        // include: [[sequelize.fn('sum', sequelize.col('qty')), 'cartQty']],
      },
      where: whereQuery,
      order: [
        ['createdAt', 'DESC'],
        ['id', 'DESC'],
        [Product, Promotion, 'promotion_type_id'],
      ],
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

const getPricePrescription = (cart_id) => {
  return db.sequelize.query(
    `SELECT SUM(prescription_carts.price) as total_price FROM carts
    JOIN prescription_carts ON carts.id = prescription_carts.cart_id
    WHERE carts.id = :cart_id 
    AND prescription_carts.deletedAt IS NULL
    GROUP BY prescription_carts.cart_id;`,
    {
      replacements: {
        cart_id: cart_id,
      },
      type: db.sequelize.QueryTypes.SELECT,
    },
  );
};

module.exports = {
  getUserCarts,
  getCart,
  getCartByPk,
  updateConfirmation,
  isPrescriptionCartProductListEmpty,
  getAllPrescriptions,
  getPricePrescription,
};
