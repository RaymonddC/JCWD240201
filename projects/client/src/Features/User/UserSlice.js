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
  user: null,
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
export const keepLoginAsync = () => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');
    // if (token == null) throw { message: 'No User' };
    if (token) {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/getUser`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );
      if (
        response?.data?.message == 'jwt expired' ||
        !response?.data ||
        response?.message
      )
        localStorage.removeItem('token');
      dispatch(onSaveUser(response.data.data));
    }
  } catch (error) {
    if (error?.response?.data?.message == 'jwt expired')
      localStorage.removeItem('token');
  }
};

export const logoutAsync = () => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
      dispatch(onSaveUser({}));
    }
    toast.success('Logout Success!');
  } catch (error) {}
};

export const checkCredentialAsync =
  (usernameOrEmail, password) => async (dispatch) => {
    try {
      console.log(usernameOrEmail, password);
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          usernameOrEmail: usernameOrEmail,
          password: password,
        },
      );
      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error);
      // throw new Error({
      //   message: error?.response?.data?.message || error?.message,
      // });
    }
  };

export const onLoginAsync = (values) => async (dispatch) => {
  try {
    dispatch(toggleBtn());
    const { usernameOrEmail, password } = values;
    if (!usernameOrEmail || !password) return toast.error(`Fill All Data!`);

    // dispatch(toggleBtn());

    console.log(values);
    let result = await dispatch(
      checkCredentialAsync(usernameOrEmail, password),
    );
    console.log(values);

    // if (result.length === 0) throw { message: 'Account Not Found' };

    localStorage.removeItem('token');

    // console.log(result);
    localStorage.setItem('token', result.token);
    // localStorage.setItem('auth', JSON.stringify({ token: result.token, authorization: result.data.Role.type }));

    // localStorage.setItem('userId', result.data.id);

    console.log(result);

    dispatch(onSaveUser(result.data));

    toast.success('Login Success!');
  } catch (error) {
    console.log('error');
    toast.error(error.message);
  } finally {
    dispatch(toggleBtn());
  }
};

export const onRegister = (values) => async (dispatch) => {
  try {
    dispatch(toggleBtn());
    const { email, usernameOrEmail, password, confirmPassword } = values;
    console.log(values);
    // if (!username) return toast.error(`Fill All Data!`);

    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth/register`,
      {
        username: usernameOrEmail,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      },
    );

    // if (!response.data) throw { response };

    toast.success('Register Success!');
    // dispatch(getCashiersAsync());
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  } finally {
    dispatch(toggleBtn());
  }
};

export const { onSaveUser, toggleBtn } = UserSlice.actions;
export default UserSlice.reducer;
