const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Handlebars = require('handlebars');
const fs = require('fs');
const db = require('../models');
const productCategoryDB = db.product_category;
const labelDB = db.label;
const { sequelize } = require('../models');
const transporter = require('../helpers/transporter');

const getAllCategories = async (req, res, next) => {
  try {
    const { search_category } = req.query;
    const user = req.user;

    let response;

    if (search_category) {
      response = await productCategoryDB.findAll({
        attributes: { exclude: ['image'] },
        where: {
          category_name: {
            [Op.like]: `%${search_category}%`,
          },
        },
      });
    } else {
      response = await productCategoryDB.findAll({
        attributes: { exclude: ['image'] },
      });
    }

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

    if (!category_name)
      throw { message: 'Please fill your form correctly', code: 400 };

    const response = await productCategoryDB.create({
      category_name,
    });

    return res.status(201).send({
      success: true,
      message: 'Create category success',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category_name } = req.body;

    if (!category_name)
      throw { message: 'Please fill your form correctly', code: 400 };

    const response = await productCategoryDB.update(
      {
        category_name,
      },
      {
        where: {
          id,
        },
      },
    );

    return res.status(200).send({
      success: true,
      message: 'Update category success',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;

    const deleteLabel = await labelDB.destroy(
      {
        where: {
          category_id: id,
        },
      },
      { transaction: t },
    );

    const response = await productCategoryDB.destroy(
      {
        where: {
          id,
        },
      },
      { transaction: t },
    );

    await t.commit();

    return res.status(200).send({
      success: true,
      message: 'Delete category success',
      data: response,
    });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
