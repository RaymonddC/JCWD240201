const db = require('../models');
const promotionTypeDB = db.promotion_type;

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
  getPromotionType,
};
