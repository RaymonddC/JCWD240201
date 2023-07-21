const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Handlebars = require('handlebars');
const fs = require('fs');
const db = require('../models');
const productCategoryDB = db.product_category;
const labelDB = db.label;
const transporter = require('../helpers/transporter');
const productDB = db.product;

const getAllProducts = async (req, res, next) => {
  try {
    const { page, search, category, limit } = req.query;
    console.log(req.query);
    const pageLimit = Number(limit);
    const offset = (Number(page) - 1) * pageLimit + 1;
    let where = undefined;
    let order;
    if (search !== 'undefined') {
      where = {};
      where.name = { [Op.like]: `%${search}%` };
    }
    if (category !== 'undefined') {
      where = {};
      where.category_id = category;
    }
    const response = await productDB.findAndCountAll({
      include: labelDB,
      limit: pageLimit,
      offset: offset,
      where: where,
      order: [['name', 'ASC']],
    });
    const totalPage = Math.ceil((response.count - 1) / pageLimit);
    console.log(pageLimit, '<<');
    console.log(response);
    console.log(offset);
    console.log(totalPage);
    return res.status(200).send({
      success: true,
      message: 'get all products success',
      totalPage: totalPage,
      data: response,
    });
  } catch (error) {
    next(error);
    // return res.send({
    //   success: false,
    //   message: error.message,
    // });
  }
};

const createQuestion = async (req, res) => {
  const { question, user_id } = req.body;
  console.log('question');
  try {
    let result = await questionDB.create({ question, user_id });

    return res.status(201).send({
      success: true,
      message: 'Your question was created successfully',
      data: result,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

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

    const { count, rows } = await productDB.findAndCountAll({
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

module.exports = { createQuestion, getAllProducts, getProduct, getAllProduct };
