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

const promotionValidation = (data) => {
    if (
      Number(data.promotion_type_id) === 1 &&
      (!data.product_id ||
        !data.discount ||
        !data.limit ||
        !data.date_start ||
        !data.date_end)
    )
      throw { message: 'Complete the form', code: 400 };

    if (
      Number(data.promotion_type_id) === 2 &&
      (!data.discount ||
        !data.limit ||
        !data.minimum_transaction ||
        !data.maximum_discount_amount ||
        !data.date_start ||
        !data.date_end)
    )
      throw { message: 'Complete the form', code: 400 };

    if (
      Number(data.promotion_type_id) === 3 &&
      (!data.product_id ||
        !data.limit ||
        !data.buy ||
        !data.get ||
        !data.date_start ||
        !data.date_end)
    )
      throw { message: 'Complete the form', code: 400 };
};

module.exports = {
  getPromotionByProductId,
  getAllPromotion,
  promotionExpired,
  promotionValidation,
};
