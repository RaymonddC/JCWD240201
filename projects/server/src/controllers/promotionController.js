const db = require('../models');
const promotionDB = db.promotion;
const promotionTypeDB = db.promotion_type;

const createDiscount = async (req, res, next) => {
  try {
    console.log('masuk promotion');
  } catch (error) {}
};

module.exports = {
  createDiscount,
};
