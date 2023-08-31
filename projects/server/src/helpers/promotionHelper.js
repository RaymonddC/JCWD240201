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

const promotionExpired = (data) => {
  return db.sequelize.query(
    `CREATE EVENT promotion_expired${data.id} ON SCHEDULE AT "${data.date_end} 17:00:00"
    DO BEGIN
    UPDATE promotions SET deletedAt = LOCALTIMESTAMP WHERE id = :id;
    
    END;`,
    {
      replacements: { id: data.id },
      type: db.sequelize.QueryTypes.CREATE,
    },
  );
};

module.exports = {
  getPromotionByProductId,
  getAllPromotion,
  promotionExpired,
};
