import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  createQuestionAPI,
  getQuestionsAPI,
  getAnswersAPI,
  getQuestionDetailsAPI,
  postAnswerAPI,
  updateAnswerAPI,
  getQuestionsCategoriesAPI,
} from '../../API/QnAAPI';

const initialState = {
  questions: null,
  isSubmitting: false,
};

export const QnASlice = createSlice({
  name: 'QnA',
  initialState,
  reducers: {
    questions: (initialState, action) => {
      initialState.questions = action.payload;
    },
    answers: (initialState, action) => {
      initialState.answers = action.payload;
    },
    questionCategory: (initialState, action) => {
      initialState.categories = action.payload;
    },
  },
});

export const submitQuestion = (data, setOpen) => async (dispatch) => {
  try {
    if (!data.title) return toast.error('Title field id required');
    if (!data.question) return toast.error('Please enter your question');
    if (!data.question_category_id)
      return toast.error('Plesae select a category');

    let response = await createQuestionAPI(data);
    if (response.data.success === true) {
      toast.success(response.data.message);
      setOpen(false)
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
  }
};

export const getQuestions = (data) => async (dispatch) => {
  try {
    let response = await getQuestionsAPI({
      ...data,
    });
    dispatch(questions(response?.data));
  } catch (error) {
  }
};

export const getQuestionDetail = (data) => async (dispatch) => {
  try {
    let response = await getQuestionDetailsAPI({
      id: data.id,
    });
    dispatch(questions(response?.data.data));
  } catch (error) {
  }
};

export const getAnswers = (data) => async (dispatch) => {
  try {
    let response = await getAnswersAPI({ ...data });
    dispatch(answers(response?.data));
  } catch (error) {
  }
};

export const postAnswer = (data) => async (dispatch) => {
  try {
    let response = await postAnswerAPI({
      answer: data.answer,
      userId: data.userId,
      question_id: data.question_id,
    });
    if (response.data.success === true) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
  }
};

export const updateAnswer = (data) => async (dispatch) => {
  try {
    let response = await updateAnswerAPI({
      id: data.id,
      answer: data.answer,
      userId: data.userId,
      question_id: data.question_id,
    });
    if (response.data.success === true) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
  }
};
export const getQuestionCategory = () => async (dispatch) => {
  try {
    const response = await getQuestionsCategoriesAPI();
    dispatch(questionCategory(response.data));
  } catch (error) {}
};

export const { questions, answers, questionCategory } = QnASlice.actions;
export default QnASlice.reducer;
