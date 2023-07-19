import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  createQuestionAPI,
  getQuestionsAPI,
  getAnswersAPI,
  getQuestionDetailsAPI,
  postAnswerAPI,
  updateAnswerAPI,
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
      console.log(action.payload);
      initialState.questions = action.payload;
    },
    answers: (initialState, action) => {
      console.log(action.payload);
      initialState.questions = action.payload;
    },
  },
});

export const submitQuestion = (question) => async (dispatch) => {
  try {
    console.log(question);
    let response = await createQuestionAPI(question);
    if (response.data.success === true) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getQuestions = (data) => async (dispatch) => {
  try {
    console.log('getQuestions');
    let response = await getQuestionsAPI({
      page: data.page,
      limit: data.limit,
    });
    console.log(response.data.data);
    dispatch(questions(response?.data));
  } catch (error) {
    console.log(error);
  }
};

export const getQuestionDetail = (data) => async (dispatch) => {
  try {
    console.log('getQuestions');
    let response = await getQuestionDetailsAPI({
      id: data.id,
    });
    // console.log(response.data.data);
    dispatch(questions(response?.data.data));
  } catch (error) {
    console.log(error);
  }
};

export const getAnswers = (data) => async (dispatch) => {
  try {
    console.log('getAnswers');
    let response = await getAnswersAPI({
      page: data.page,
      limit: data.limit,
    });
    console.log(response.data.data);
    dispatch(answers(response?.data));
  } catch (error) {
    console.log(error);
  }
};

export const postAnswer = (data) => async (dispatch) => {
  console.log(data);
  // process.exit()
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
    console.log(error);
  }
};

export const updateAnswer = (data) => async (dispatch) => {
  console.log(data);
  // process.exit()
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
    console.log(error);
  }
};

export const { questions, answers } = QnASlice.actions;
export default QnASlice.reducer;
