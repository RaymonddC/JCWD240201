const db = require('../models');
const promotionDB = db.promotion;
const promotionTypeDB = db.promotion_type;
const productDB = db.product;

const createDiscount = async (req, res, next) => {
  try {
    const { data } = req.body;
    console.log('data>>>>>',data);
    const result = await promotionDB.create(data);
    return res.send({
      success: true,
      status: 200,
      message: 'create promotion success',
      data: result,
    });
  } catch (error) {
    console.log(error);
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
    const { page, limit, sortOrder, promotionTypeId } = req.query;
    const pageLimit = Number(limit);
    const offset = (Number(page) - 1) * pageLimit;
    let order = [];

    if (sortOrder) {
      order = [['createdAt', sortOrder]];
    } else {
      order = [['createdAt', 'DESC']];
    }

    const getPromotion = await promotionDB.findAndCountAll({
      include: productDB,
      where: { promotion_type_id: promotionTypeId },
      offset: offset,
      limit: pageLimit,
      order: order,
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
