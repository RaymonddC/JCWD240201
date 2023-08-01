const db = require('../models');
const promotionDB = db.promotion;
const promotionTypeDB = db.promotion_type;

const createDiscount = async (req, res, next) => {
  try {
    const { data } = req.body;
    const result = await promotionDB.create(data);

    return res.send({
      success: true,
      status: 200,
      message: 'create promotion success',
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

module.exports = {
  createDiscount,
  getPromotionType,
};
