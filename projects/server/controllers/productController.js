const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Handlebars = require('handlebars');
const fs = require('fs');
const db = require('../models');
const questionDB = db.question;
const transporter = require('../helpers/transporter');

const getProducts = async (req, res, next) => {
  try {
    const { page, search, category, limit } = req.query;
    console.log(req.query);
    const pageLimit = Number(limit);
    console.log(pageLimit, '<<');
    const offset = (Number(page) - 1) * pageLimit;
    console.log(offset);
    let response = await questionDB.findAndCountAll({
      limit: pageLimit,
      offset: offset,
      order: [['updatedAt', 'DESC']],
    });
    console.log(response);
    const totalPage = Math.ceil(response.count / pageLimit);
    console.log(totalPage);
    return res.status(200).send({
      success: true,
      message: 'get Products success',
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

module.exports = { createQuestion, getProducts };
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
