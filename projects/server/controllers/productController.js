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

const getAllProducts = async (req, res, next) => {
  try {
    const { page, search, category, limit } = req.query;
    // console.log(req.query);
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
    // console.log(pageLimit, '<<');
    // console.log(response);
    // console.log(offset);
    // console.log(totalPage);
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
const getProductDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await productDB.findOne({
      where: { id },
    });

    return res.status(200).send({
      success: true,
      message: 'get product details success',
      data: response,
    });
  } catch (error) {}
};

const createProduct = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    //get data from client
    const data = JSON.parse(req.body.data);
    const productCategories = JSON.parse(req.body.productCategories); //array of category id

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
    const findImageData = await ProductImages.findAll({
      where: { product_id: productId },
    });

    const oldPath = findImageData.map((value) => {
      return value.image;
    });

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

    oldPath.map((value) => {
      const fileName = value.split('\\');
      const newPath = `public/deleted_product_images/${
        fileName[fileName.length - 1]
      }`;

      fs.rename(value, newPath, function (err) {
        if (err) throw err;
      });
    });

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

const updateProduct = async (req, res) => {
  try {
    //get data from client
    const { productId } = req.params;
    const { data } = req.body;

    //update product data
    const updateProduct = await Product.update(data, {
      where: { id: productId },
    });

    return res.send({
      success: true,
      status: 200,
      message: 'Update Product Success',
      data: updateProduct,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const updateProductImage = async (req, res) => {
  try {
    const { imageId, productId } = req.query;

    //search product image
    const getImage = await ProductImages.findOne({
      where: { product_id: productId },
    });

    if (getImage) {
      //find image old path and new path
      const findImageData = await ProductImages.findOne({
        where: { id: imageId },
      });

      const oldPath = findImageData.image;
      const fileName = oldPath.split('\\');
      const newPath = `public/deleted_product_images/${
        fileName[fileName.length - 1]
      }`;

      //update product image
      const updateProductImage = await ProductImages.update(
        { image: req.files.product_images[0].path },
        { where: { id: imageId } },
      );

      //move old image to deleted folder
      if (updateProductImage) {
        fs.rename(oldPath, newPath, function (err) {
          if (err) throw err;
        });
      }
    } else {
      await ProductImages.create({
        image: req.files.product_images[0].path,
        product_id: productId,
      });
    }

    return res.send({
      success: true,
      status: 200,
      message: 'update product image success',
      data: updateProductImage,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductDetails,
  createProduct,
  deleteProduct,
  updateProduct,
  updateProductImage,
};
