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
    const { page, search, sortType, sortOrder, limit, question_category_id } =
      req.query;
    let where = {};
    let order = [];
    where.title = { [Op.like]: `%${search}%` };
    const pageLimit = Number(limit);
    const offset = (Number(page) - 1) * pageLimit;
    if (sortType && sortOrder) {
      order = [[sortType, sortOrder]];
    } else {
      order = [['updatedAt', 'DESC']];
    }
    if (question_category_id) {
      where.question_category_id = question_category_id;
    }
    let response = await questionDB.findAndCountAll({
      include: answerDB,
      limit: pageLimit,
      offset: offset,
      where: where,
      order: order,
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
  }
};

const getQuestionDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    let response = await questionDB.findOne({
      include: answerDB,
      where: { id: id },
    });
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
    const { page, search, sortType, sortOrder, limit, question_category_id } =
      req.query;
    const pageLimit = Number(limit);
    const offset = (Number(page) - 1) * pageLimit;
    let where = {};
    let order = [];
    if (question_category_id) {
      where.question_category_id = question_category_id;
    }
    if (search) {
      where.title = { [Op.like]: `%${search}%` };
    }
    if (sortType && sortOrder) {
      order = [[sortType, sortOrder]];
    } else {
      order = [['updatedAt', 'DESC']];
    }
    let response = await answerDB.findAndCountAll({
      include: [{ model: questionDB, where: where }],
      limit: pageLimit,
      offset: offset,
      order: order,
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
  }
};

const postAnswer = async (req, res, next) => {
  const { answer, user_id, question_id } = req.body;
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
  try {
    let result = await questionDB.create({
      title,
      question,
      user_id,
      question_category_id,
    });
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
    return res.status(200).send({
      success: true,
      message: 'Get question category success',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const getUserQuestions = async (req, res, next) => {
  try {
    const {
      user_id,
      page,
      limit,
      search,
      sortOrder,
      sortType,
      question_category_id,
    } = req.query;
    const pageLimit = Number(limit);
    const offset = (Number(page) - 1) * pageLimit;
    let where = {};
    let order = [];
    where.user_id = user_id;
    if (search) {
      where.title = { [Op.like]: `%${search}%` };
    }
    if (sortOrder && sortType) {
      order = [[sortType, sortOrder]];
    } else {
      order = [['updatedAt', 'DESC']];
    }
    if (question_category_id) {
      where.question_category_id = question_category_id;
    }
    const response = await questionDB.findAndCountAll({
      include: answerDB,
      limit: pageLimit,
      offset: offset,
      where: where,
      order: order,
    });
    const totalPage = Math.ceil(response.count / pageLimit);
    return res.status(200).send({
      success: true,
      message: 'Get user questions success',
      totalPage: totalPage,
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
  getUserQuestions,
};
