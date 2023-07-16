import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getDataUser } from '../../API/user';

// import { auth } from './../../firebase';
// import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
// const provider = new GoogleAuthProvider();

// const token = localStorage.getItem('token')
//   ? localStorage?.getItem('token')
//   : '';

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
    setUser: (initialState, action) => {
      initialState.user = action.payload;
    },
  },
});

// example get another user data
export const RequestGetDataUser = (user_id) => async (dispatch) => {
  try {
    let response = await getDataUser();
    console.log(response);
    dispatch(setUser(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const { onSaveUser, toggleBtn, setUser } = UserSlice.actions;
export default UserSlice.reducer;
