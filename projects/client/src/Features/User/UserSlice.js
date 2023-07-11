import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getDataUser } from '../../API/user';

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

export const UserSlice = createSlice({
  name: 'user',
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
const getUser = (user_id) => (dispatch) => {
  try {
    let data = getDataUser(user_id);
  } catch (error) {
    console.log(error);
  }
};

export const { onSaveUser, toggleBtn } = UserSlice.actions;
export default UserSlice.reducer;
