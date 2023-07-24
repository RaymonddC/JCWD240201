const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Handlebars = require('handlebars');
const fs = require('fs');
const db = require('../models');
const productCategoryDB = db.product_category;
const labelDB = db.label;
const transporter = require('../helpers/transporter');

const getAllCategories = async (req, res, next) => {
  try {
    const response = await productCategoryDB.findAll();

    return res.status(200).send({
      success: true,
      message: 'get all categories success',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { category_name } = req.body;
    const response = await productCategoryDB.create({
      category_name,
    });

    return res.status(201).send({
      success: true,
      message: 'get all categories success',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const response = await productCategoryDB.findAll();

    return res.status(200).send({
      success: true,
      message: 'get all categories success',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const response = await productCategoryDB.findAll();

    return res.status(200).send({
      success: true,
      message: 'get all categories success',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllCategories };
