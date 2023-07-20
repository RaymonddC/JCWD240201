const jwt = require('jsonwebtoken');

const { Op, Transaction } = require('sequelize');
const bcrypt = require('bcrypt');
const Handlebars = require('handlebars');
const fs = require('fs');
const db = require('../models');
const questionDB = db.question;
const transporter = require('../helpers/transporter');
const Product = db.product;
const ProductImages = db.product_image;
const Label = db.label;
const { sequelize } = require('../models');
const deleteFiles = require('../helpers/deleteFiles');

const getProducts = async (req, res, next) => {
  try {
    const { page, search, category, limit } = req.query;
    req.query;
    const pageLimit = Number(limit);
    pageLimit, '<<';
    const offset = (Number(page) - 1) * pageLimit;
    offset;
    let response = await questionDB.findAndCountAll({
      limit: pageLimit,
      offset: offset,
      order: [['updatedAt', 'DESC']],
    });
    response;
    const totalPage = Math.ceil(response.count / pageLimit);
    totalPage;
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
  ('question');
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
    ('backend');
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
    count;

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

const createProduct = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    //get data from client
    const data = JSON.parse(req.body.data);
    const productCategories = JSON.parse(req.body.productCategories); //array

    //create product data
    let postProduct = await Product.create({ ...data }, { transaction: t });

    const dataToCreate = req.files.product_images.map((value) => {
      return { product_id: postProduct.id, image: value.path };
    });

    await ProductImages.bulkCreate(dataToCreate, {
      transaction: t,
      ignoreDuplicate: true,
    });

    const categoryData = productCategories.map((value) => {
      return { product_id: postProduct.id, category_id: value };
    });

    await Label.bulkCreate(categoryData, {
      transaction: t,
      ignoreDuplicate: true,
    });

    await t.commit();

    return res.send({
      success: true,
      status: 200,
      message: 'create product success',
      data: postProduct,
    });
  } catch (error) {
    await t.rollback();
    deleteFiles(req.files.product_images);
    return res.send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const deleteProduct = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { productId } = req.params;

    //delete data
    await Product.destroy({ where: { id: productId } }, { transaction: t });
    await ProductImages.destroy(
      { where: { product_id: productId } },
      { transaction: t },
    );
    await Label.destroy(
      { where: { product_id: productId } },
      { transaction: t },
    );

    t.commit();

    return res.send({
      success: true,
      status: 200,
      message: 'delete product success',
      data: null,
    });
  } catch (error) {
    t.rollback();
    return res.send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  createQuestion,
  getProducts,
  getProduct,
  getAllProduct,
  createProduct,
  deleteProduct,
};
