const db = require('../models');
const promotionDB = db.promotion;
const promotionTypeDB = db.promotion_type;
const productDB = db.product;
const { sequelize } = require('../models');

const createDiscount = async (req, res, next) => {
  try {
    const { data } = req.body;
    const result = await promotionDB.create(data);

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

const getPromotionType = async (req, res, next) => {
  try {
    const result = await promotionTypeDB.findAll();

    return res.send({
      success: true,
      status: 200,
      message: 'Get Promotion Type Success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getPromotionList = async (req, res, next) => {
  try {
    const { page, limit, sortOrder, promotionTypeId, totalPrice } = req.query;
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
              WHEN maximum_discount_amount IS NULL OR maximum_discount_amount = 0 THEN CAST(${totalPrice} * discount/100 AS FLOAT)
              ELSE
              CAST(LEAST(${totalPrice} * discount/100, maximum_discount_amount)AS FLOAT)
              END`,
            ),
            'totalDiscount',
          ],
        ],
      };
      options.order = [['totalDiscount', 'DESC']];
    }
    const getPromotion = await promotionDB.findAndCountAll({
      include: productDB,
      where: { promotion_type_id: promotionTypeId },
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
  getPromotionType,
  getPromotionList,
};
