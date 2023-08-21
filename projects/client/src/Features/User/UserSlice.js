import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  checkCredential,
  googleLoginAPI,
  keepLogin,
  register,
} from '../../API/authAPI';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../../firebase';

// const token = localStorage.getItem('token')
//   ? localStorage?.getItem('token')
//   : '';

const provider = new GoogleAuthProvider();
const initialState = {
  user: {},
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onSaveUser: (initialState, action) => {
      initialState.user = action.payload;
    },
    setUser: (initialState, action) => {
      initialState.user = action.payload;
    },
  },
});

// example get another user data
// export const RequestGetDataUser = (user_id) => async (dispatch) => {
//   try {
//     let response = await getDataUser();
//     console.log(response);
//     dispatch(setUser(response.data));
//   } catch (error) {
//     console.log(error);
//   }
// };

export const keepLoginAsync = () => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');
    // if (token == null) throw { message: 'No User' };
    if (token) {
      let response = await keepLogin(token);

      if (
        response?.data?.message === 'jwt expired' ||
        !response?.data ||
        response?.message
      )
        localStorage.removeItem('token');
      dispatch(onSaveUser(response.data.data));
    }
  } catch (error) {
    if (error?.response?.data?.message === 'jwt expired')
      localStorage.removeItem('token');
  }
};

export const logoutAsync = (navigate) => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
      dispatch(onSaveUser({}));
    }
    navigate('/login');
    toast.success('Logout success!');
  } catch (error) {}
};

export const checkCredentialAsync =
  (usernameOrEmail, password, token) => async (dispatch) => {
    try {
      let response = await checkCredential({
        usernameOrEmail,
        password,
        token,
      });

      return response.data;
    } catch (error) {
      error.message = error?.response?.data?.message || error?.message;
      throw error;
      // throw {
      //   message: error?.response?.data?.message || error?.message,
      // };
    }
  };

export const onLoginAsync = (values, token) => async (dispatch) => {
  try {
    const { usernameOrEmail, password } = values;

    let result = await dispatch(
      checkCredentialAsync(usernameOrEmail, password, token),
    );

    localStorage.removeItem('token');

    localStorage.setItem('token', result.token);

    dispatch(onSaveUser(result.data));

    toast.success('Login success!');
    return true;
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const onRegister = (values, token) => async (dispatch) => {
  try {
    const {
      fullName,
      email,
      usernameOrEmail,
      password,
      confirmPassword,
      phoneNumber,
    } = values;

    await register({
      fullName,
      username: usernameOrEmail,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      phoneNumber: '0' + phoneNumber,
      token,
    });

    toast.success('Register success! Check email for verification');
    return true;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
export const loginWithGoogleSlice = () => async (dispatch) => {
  // const dispatch = useDispatch()
  try {
    let response = await signInWithPopup(auth, provider);
    console.log(response);
    const email = response.user.email;
    const full_name = response.user.displayName;
    const result = await googleLoginAPI({ email, full_name });
    console.log(email);
    toast.success('Login success!');
  } catch (error) {
    console.log(error);
    toast.error(error);
  }
};
export const { onSaveUser, toggleBtn, setUser } = UserSlice.actions;

export default UserSlice.reducer;
