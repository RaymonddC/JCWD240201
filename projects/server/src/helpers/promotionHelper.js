const db = require('../models');
const { Op } = require('sequelize');
const { sequelize } = require('../models');
const PromotionDB = db.promotion;

const getPromotionByProductId = async (whereQuerry) => {
  try {
    return await PromotionDB.findOne({
      where: {
        product_id: whereQuerry.productId,
      },
      order: [['createdAt', 'ASC']],
      limit: 1,
    });
  } catch (error) {
    throw error;
  }
};

const getAllPromotion = async (whereQuerry) => {
  try {
    return await PromotionDB.findAndCountAll({
      where: whereQuerry,
      order: [['createdAt', 'ASC']],
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getPromotionByProductId,
};
