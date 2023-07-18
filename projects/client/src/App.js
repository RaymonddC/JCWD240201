// import axios from 'axios';
// import { useEffect, useState } from 'react';
import './App.css';

import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { keepLoginAsync } from './Features/User/UserSlice';
import AdminRoute from './utils/routes/adminRoute';
import PublicRoute from './utils/routes/publicRoutes';

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
