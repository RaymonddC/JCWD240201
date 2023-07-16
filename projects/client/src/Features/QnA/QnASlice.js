import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getDataUser } from '../../API/user';
import { createQuestionAPI } from '../../API/QnAAPI';

// import { auth } from './../../firebase';
// import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
// const provider = new GoogleAuthProvider();

const token = localStorage.getItem('token')
  ? localStorage?.getItem('token')
  : '';

const initialState = {
  user: {},
  isSubmitting: false,
};

export const QnASlice = createSlice({
  name: 'QnA',
  initialState,
  reducers: {
    onSaveUser: (initialState, action) => {
      initialState.user = action.payload;
    },
    toggleBtn: (initialState, action) => {
      initialState.isSubmitting = !initialState.isSubmitting;
    },
  },
});

// example get another user data
const submitQuestion = (question) => async (dispatch) => {
  try {
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

export const { onSaveUser, toggleBtn } = QnASlice.actions;
export default QnASlice.reducer;
