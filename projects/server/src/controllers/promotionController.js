const { promotionExpired } = require('../helpers/promotionHelper');
const db = require('../models');
const promotionDB = db.promotion;
const promotionTypeDB = db.promotion_type;
const productDB = db.product;
const userDB = db.user;
const { sequelize } = require('../models');
const { Op } = require('sequelize');

const createDiscount = async (req, res, next) => {
  try {
    const { data } = req.body;
    const result = await promotionDB.create(data);

    if (result) {
      await promotionExpired(result);
    }
    return res.send({
      success: true,
      status: 200,
      message: 'Create promotion success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getPromotionList = async (req, res, next) => {
  try {
    const { page, limit, sortOrder, promotionTypeId, totalPrice } = req.query;
    const today = new Date();
    const pageLimit = Number(limit);
    const offset = (Number(page) - 1) * pageLimit;
    console.log(totalPrice, 'totalPrice');
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
              WHEN maximum_discount_amount IS NULL OR maximum_discount_amount = 0 THEN CAST(${totalPrice} * discount/100 AS INT)
              ELSE
              CAST(LEAST(${totalPrice} * discount/100, maximum_discount_amount) AS INT)
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
    console.log(...whereQuery);
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
