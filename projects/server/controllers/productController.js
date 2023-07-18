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
    console.log(response)
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
