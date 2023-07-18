const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Handlebars = require('handlebars');
const fs = require('fs');
const db = require('../models');
const questionDB = db.question;
const answerDB = db.answer;
const transporter = require('../helpers/transporter');

const getQuestions = async (req, res, next) => {
  try {
    const { page, search, sort, limit } = req.query;
    const pageLimit = Number(limit);
    const offset = (Number(page) - 1) * pageLimit;
    let response = await questionDB.findAndCountAll({
      included: answerDB,
      limit: pageLimit,
      offset: offset,
      order: [['updatedAt', 'DESC']],
    });
    const totalPage = Math.ceil(response.count / pageLimit);
    return res.status(200).send({
      success: true,
      message: 'get questions success',
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

const getAnswer = async (req, res, next) => {
  try {
    const { question_id } = req.body;
    console.log(req.body);
    let response = await questionDB.findAndCountAll({
      included: answerDB,
      limit: pageLimit,
      offset: offset,
      order: [['updatedAt', 'DESC']],
    });
    console.log(response);
    const totalPage = Math.ceil(response.count / pageLimit);
    console.log(totalPage);
    return res.status(200).send({
      success: true,
      message: 'get questions success',
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

module.exports = { createQuestion, getQuestions };
