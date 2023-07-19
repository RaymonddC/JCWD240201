const db = require('../models');
const Product = db.product;

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // let result = await Product.findOne({
    //   include: [
    //     {
    //       model: LikeTweet,
    //       attributes: ['user_id'],
    //     },
    //     {
    //       model: User,
    //       attributes: ['username', 'official', 'profilePicture', 'fullname'],
    //     },
    //   ],
    //   where: {
    //     id: id,
    //   },
    // });

    // if (!result) throw { message: 'Tweet not found', code: 400 };

    return res.status(200).send({
      success: true,
      message: 'Tweet Found',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProduct = async (req, res, next) => {
  try {
    console.log('backend');
    let {
      searchCategory,
      ordered,
      orderedBy,
      search,
      page = 1,
      limitPage = 3,
    } = req.query;

    let whereQuery = {
      //   caption: { [Op.like]: `%${search || ''}%` },
      //   reply_id: { [Op.eq]: null },
    };

    // if (searchCategory) whereQuery['category_id'] = searchCategory;

    const { count, rows } = await Product.findAndCountAll({
      //   include: [
      //     {
      //       model: LikeTweet,
      //       attributes: ['user_id'],
      //     },
      //     {
      //       model: User,
      //       attributes: ['username', 'official', 'profilePicture', 'fullname'],
      //     },
      //   ],
      where: whereQuery,
      order: [['createdAt', 'DESC']],
      limit: Number(limitPage),
      offset: (Number(page) - 1) * limitPage,
    });
    console.log(count);

    return res.status(200).send({
      success: true,
      message: 'getAll Tweet',
      data: rows,
      pageCount: count,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProduct,
  getAllProduct,
};
