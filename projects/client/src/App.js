// import axios from 'axios';
// import { useEffect, useState } from 'react';
import './App.css';
// import { Route, Routes } from 'react-router-dom';
// import VerifyEmail from './Pages/VerifyEmail';
// import Landing from './Pages/Landing';
// import QnA from './Pages/QnA';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';

// import Profile from './Pages/Profile';
// import { Login } from './Pages/Login';
import { Toaster } from 'react-hot-toast';
// import VerifyEmail from './Pages/VerifyEmail';
// import Landing from './Pages/Landing';
// import QnA from './Pages/QnA';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { keepLoginAsync } from './Features/User/UserSlice';
import AdminRoute from './utils/routes/adminRoute';
import PublicRoute from './utils/routes/publicRoutes';
// import { RequestGetDataUser } from './Features/User/UserSlice';
// import ReqResetPassword from './Pages/ReqResetPassword';
// import ResetPasswordForm from './Pages/ResetPasswordForm';
// import ChangePassword from './Pages/ChangePassword.jsx';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/greetings`
  //     );
  //     setMessage(data?.message || "");
  //   })();
  // }, []);

  useEffect(() => {
    // dispatch(RequestGetDataUser());
    // const dispatch = useDispatch();
    dispatch(keepLoginAsync());
  }, []);

  return (
    <>
      <Toaster />
      {user.role_id === 1 ? <AdminRoute /> : <PublicRoute />}
    </>
  );
}

export default App;
