const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Handlebars = require('handlebars');
const fs = require('fs');
const db = require('../models');
const questionDB = db.question;
const answerDB = db.answer;
const questionCategoryDB = db.question_category;
const transporter = require('../helpers/transporter');

const getQuestions = async (req, res, next) => {
  try {
    const { page, search, sort, limit, question_category_id } = req.query;
    // console.log(">>>",question_category_id);
    let where = {};
    const pageLimit = Number(limit);
    const offset = (Number(page) - 1) * pageLimit;
    if (question_category_id) {
      where.question_category_id = { question_category_id };
    }
    let response = await questionDB.findAndCountAll({
      include: answerDB,
      limit: pageLimit,
      offset: offset,
      where: where,
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
const getQuestionDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    let response = await questionDB.findOne({
      include: answerDB,
      where: { id: id },
    });
    // const totalPage = Math.ceil(response.count / pageLimit);
    return res.status(200).send({
      success: true,
      message: 'get question details success',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const getAnswers = async (req, res, next) => {
  try {
    const { page, search, sort, limit, question_category_id } = req.query;
    const pageLimit = Number(limit);
    const offset = (Number(page) - 1) * pageLimit;
    let where = {};
    console.log('>>> answer', question_category_id);
    if (question_category_id) {
      where.question_category_id = question_category_id;
    }
    console.log(req.body);
    let response = await answerDB.findAndCountAll({
      include: [{ model: questionDB, where: where }],

      limit: pageLimit,
      offset: offset,
      order: [['updatedAt', 'DESC']],
    });
    // console.log(response);
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
  }
};
const postAnswer = async (req, res, next) => {
  const { answer, user_id, question_id } = req.body;
  console.log(req.body);
  // process.exit()
  try {
    let result = await answerDB.create({ answer, user_id, question_id });

    return res.status(201).send({
      success: true,
      message: 'Your answer was created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createQuestion = async (req, res, next) => {
  const { question, user_id, title, question_category_id } = req.body;
  console.log('question');
  try {
    let result = await questionDB.create({ title, question, user_id, question_category_id });

    return res.status(201).send({
      success: true,
      message: 'Your question was created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateAnswer = async (req, res, next) => {
  const { id, answer, user_id, question_id } = req.body;
  console.log(req.body);
  // process.exit()
  try {
    const result = await answerDB.update(
      { answer, user_id, question_id },
      { where: { id } },
    );

    return res.status(201).send({
      success: true,
      message: 'Your answer was updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getQuestionCategory = async (req, res, next) => {
  try {
    const response = await questionCategoryDB.findAll();
    // console.log('q cat ', response);
    return res.status(200).send({
      success: true,
      message: 'Get question category success',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createQuestion,
  getQuestions,
  getAnswers,
  getQuestionDetails,
  postAnswer,
  updateAnswer,
  getQuestionCategory,
};
