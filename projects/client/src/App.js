// import axios from 'axios';
// import { useEffect, useState } from 'react';
import './App.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { keepLoginAsync } from './Features/User/UserSlice';
import AdminRoute from './utils/routes/adminRoute';
import PublicRoute from './utils/routes/publicRoutes';
import { getCartUserAsync } from './Features/Cart/CartSlice';
import NavBar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const location = window.location.pathname;
  let navbar = false;
  let footer = false;

  if (
    location === '/' ||
    location === '/dicussions' ||
    location === '/profile'
  ) {
    navbar = true;
    footer = true;
  }

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
      <div className="">
        <Toaster />
        {navbar ? <NavBar /> : ''}
        {user.role?.role_name === 'admin' ? <AdminRoute /> : <PublicRoute />}
        {footer ? <Footer /> : ''}
      </div>
    </>
  );
}

export default App;
