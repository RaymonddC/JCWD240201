import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getDataUser } from '../../API/userAPI';
import { getAPI, postAPI } from '../../API/auth';

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
      console.log(initialState.user, action.payload);
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

export const keepLoginAsync = () => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');
    // if (token == null) throw { message: 'No User' };
    if (token) {
      let response = await getAPI('/auth/getUser', {
        Authorization: `bearer ${token}`,
      });

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
      let response = await postAPI('/auth/login', {
        usernameOrEmail,
        password,
      });

      return response.data;
    } catch (error) {
      throw {
        message: error?.response?.data?.message || error?.message,
      };
    }
  };

export const onLoginAsync = (values) => async (dispatch) => {
  try {
    dispatch(toggleBtn());
    const { usernameOrEmail, password } = values;
    if (!usernameOrEmail || !password) return toast.error(`Fill All Data!`);

    let result = await dispatch(
      checkCredentialAsync(usernameOrEmail, password),
    );

    localStorage.removeItem('token');

    localStorage.setItem('token', result.token);

    console.log(result.data);
    dispatch(onSaveUser(result.data));

    toast.success('Login Success!');
  } catch (error) {
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
export const { onSaveUser, toggleBtn, setUser } = UserSlice.actions;

// export const { onSaveUser, toggleBtn } = UserSlice.actions;
export default UserSlice.reducer;
