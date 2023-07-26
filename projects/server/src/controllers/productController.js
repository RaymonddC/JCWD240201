const jwt = require('jsonwebtoken');

const { Op, Transaction } = require('sequelize');
const bcrypt = require('bcrypt');
const Handlebars = require('handlebars');
const fs = require('fs');
const db = require('../models');
const productCategoryDB = db.product_category;
const labelDB = db.label;
const transporter = require('../helpers/transporter');
const productDB = db.product;
const productImageDB = db.product_image;
const packagingDB = db.packaging_type;
const productTypeDB = db.product_type;
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

const createProduct = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    //get data from client
    const data = JSON.parse(req.body.data);
    const productCategories = JSON.parse(req.body.productCategories); //array of category id

    //create product data
    let postProduct = await productDB.create({ ...data }, { transaction: t });

    const dataToCreate = req.files.product_images.map((value) => {
      return { product_id: postProduct.id, image: value.path };
    });

    await productImageDB.bulkCreate(dataToCreate, {
      transaction: t,
      ignoreDuplicate: true,
    });

    const categoryData = productCategories.map((value) => {
      return { product_id: postProduct.id, category_id: value };
    });

    await labelDB.bulkCreate(categoryData, {
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
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { productId } = req.params;
    const findImageData = await productImageDB.findAll({
      where: { product_id: productId },
    });

    const oldPath = findImageData.map((value) => {
      return value.image;
    });

    //delete data
    await productDB.destroy({ where: { id: productId } }, { transaction: t });
    await productImageDB.destroy(
      { where: { product_id: productId } },
      { transaction: t },
    );
    await labelDB.destroy(
      { where: { product_id: productId } },
      { transaction: t },
    );

    await t.commit();
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
    await t.rollback();
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    //get data from client
    const { productId } = req.params;
    const data = JSON.parse(req.body.data);
    const categoryId = JSON.parse(req.body.categoryId);

    //search product image
    const getImage = await productImageDB.findOne({
      where: { product_id: productId },
    });

    if (getImage) {
      //find image old path and new path
      const findImageData = await productImageDB.findOne({
        where: { product_id: productId },
      });

      var oldPath = findImageData.image;
      var fileName = oldPath.split('\\');
      var newPath = `public/deleted_product_images/${
        fileName[fileName.length - 1]
      }`;

      //delete old image
      await productImageDB.destroy(
        { where: { product_id: productId } },
        { transaction: t },
      );
    }

    //delete old label
    await labelDB.destroy(
      { where: { product_id: productId } },
      { transaction: t },
    );

    //update product data
    const updateProduct = await productDB.update(
      data,
      {
        where: { id: productId },
      },
      { transaction: t },
    );

    const labelData = categoryId.map((value) => {
      return { product_id: productId, category_id: value };
    });

    await labelDB.bulkCreate(labelData, {
      transaction: t,
      ignoreDuplicate: true,
    });

    const productImage = req.files.product_images.map((value) => {
      return { product_id: productId, image: value.path };
    });

    await productImageDB.bulkCreate(productImage, {
      transaction: t,
      ignoreDuplicate: true,
    });

    await t.commit();
    console.log('oldpath>>>>', oldPath);
    console.log('newpath>>>>', newPath);

    //move old image to deleted folder
    fs.rename(oldPath, newPath, function (err) {
      if (err) throw err;
    });

    return res.send({
      success: true,
      status: 200,
      message: 'Update Product Success',
      data: updateProduct,
    });
  } catch (error) {
    console.log('masuk errooorrrr');
    await t.rollback();
    deleteFiles(req.files.product_images);
    next(error);
  }
};

const updateProductImage = async (req, res, next) => {
  try {
    const { imageId, productId } = req.query;

    //search product image
    const getImage = await productImageDB.findOne({
      where: { product_id: productId },
    });

    if (getImage) {
      //find image old path and new path
      const findImageData = await productImageDB.findOne({
        where: { id: imageId },
      });

      const oldPath = findImageData.image;
      const fileName = oldPath.split('\\');
      const newPath = `public/deleted_product_images/${
        fileName[fileName.length - 1]
      }`;

      //update product image
      const updateProductImage = await productImageDB.update(
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
      await productImageDB.create({
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
    next(error);
  }
};

const getPackaging = async (req, res, next) => {
  try {
    const result = await packagingDB.findAll();

    return res.send({
      success: true,
      status: 200,
      message: 'get data success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getProductType = async (req, res, next) => {
  try {
    const result = await productTypeDB.findAll();

    return res.send({
      success: true,
      status: 200,
      message: 'get data success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductDetails,
  createProduct,
  deleteProduct,
  updateProduct,
  updateProductImage,
  getPackaging,
  getProductType,
};
