const {
  promotionExpired,
  promotionValidation,
} = require('../helpers/promotionHelper');
const db = require('../models');
const promotionDB = db.promotion;
const promotionTypeDB = db.promotion_type;
const productDB = db.product;
const userDB = db.user;
const { sequelize } = require('../models');
const { Op } = require('sequelize');

const createDiscount = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { data } = req.body;
    const productId = Number(data.product_id);
    const promotion_type_id = data.promotion_type_id || 0;
    const discount = data.discount || 0;
    const buy = data.buy || 0;
    const get = data.get || 0;
    const minimum_transaction = data.minimum_transaction || 0;
    const maximum_discount_amount = data.maximum_discount_amount || 0;
    const limit = data.limit || 0;

    if (!data.promotion_type_id)
      throw { message: 'Please input promotion type', code: 400 };

    promotionValidation(data);

    if (productId) {
      const getData = await productDB.findOne({
        where: { id: productId },
      });

      if (getData.require_prescription)
        throw {
          code: 400,
          message: 'Promotion cannot be applied on prescription drug',
        };
    }
    const result = await promotionDB.create(
      {
        product_id: productId,
        promotion_type_id,
        discount,
        buy,
        get,
        minimum_transaction,
        maximum_discount_amount,
        date_start: data.date_start,
        date_end: data.date_end,
        limit,
      },
      { transaction: t },
    );

    if (result) {
      await promotionExpired(result, t);
    }

    await t.commit();

    return res.send({
      success: true,
      status: 200,
      message: 'Create promotion success',
      data: result,
    });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

const getPromotionList = async (req, res, next) => {
  try {
    const { page, limit, sortOrder, promotionTypeId, totalPrice } = req.query;
    const today = new Date();
    const pageLimit = Number(limit);
    const offset = (Number(page) - 1) * pageLimit;
    let options = {};
    if (sortOrder) {
      options.order = [['createdAt', sortOrder]];
    } else {
      options.order = [['createdAt', 'DESC']];
    }

    if (limit) {
      options.offset = offset;
      options.limit = pageLimit;
    }
    if (totalPrice && totalPrice != 0) {
      options.attributes = {
        include: [
          [
            sequelize.literal(
              `CASE
              WHEN maximum_discount_amount IS NULL OR maximum_discount_amount = 0 THEN CAST(${totalPrice} * discount/100 AS INTEGER)
              ELSE
              CAST(LEAST(${totalPrice} * discount/100, maximum_discount_amount) AS INTEGER)
              END`,
            ),
            'totalDiscount',
          ],
        ],
      };
      options.order = [['totalDiscount', 'DESC']];
    }
    const user = await userDB.findByPk(req.user.id);

    let whereQuery = [];
    if (user.role_id !== 1)
      whereQuery.push({ date_start: { [Op.lte]: today } });
    const getPromotion = await promotionDB.findAndCountAll({
      include: productDB,
      where: {
        [Op.and]: [
          ...whereQuery,
          { promotion_type_id: promotionTypeId },
          { limit: { [Op.gt]: 0 } },
        ],
      },
      ...options,
    });

    const totalPage = Math.ceil(getPromotion.count / pageLimit);

    return res.send({
      success: true,
      status: 200,
      message: 'Get promotions success',
      data: getPromotion,
      totalPage: totalPage,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDiscount,
  getPromotionList,
};
