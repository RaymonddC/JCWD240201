import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { createQuestionAPI, getQuestionsAPI } from '../../API/QnAAPI';

// import { auth } from './../../firebase';
// import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
// const provider = new GoogleAuthProvider();

const token = localStorage.getItem('token')
  ? localStorage?.getItem('token')
  : '';

const initialState = {
  questions:null,
  isSubmitting: false,
};

export const QnASlice = createSlice({
  name: 'QnA',
  initialState,
  reducers: {
    questions: (initialState, action) => {
      console.log(action.payload)
      initialState.questions = action.payload;
    },
    // onSaveUser: (initialState, action) => {
    //   initialState.user = action.payload;
    // },
    // toggleBtn: (initialState, action) => {
    //   initialState.isSubmitting = !initialState.isSubmitting;
    // },
  },
});

// example get another user data
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
    console.log("getQuestions")
    let response = await getQuestionsAPI({page: data.page, limit: data.limit});
    console.log(response.data.data);
    dispatch(questions(response?.data));
  } catch (error) {
    console.log(error);
  }
};

export const { questions } = QnASlice.actions;
export default QnASlice.reducer;
