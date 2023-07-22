import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { useSelector } from 'react-redux';
import Footer from './Footer';
import Navbar from './Navbar';

export const PublicLayout = (props) => {
  useEffect(() => {
    setTimeout(
      () => {
        //   props.setAuthStorage(JSON.parse(localStorage.getItem('auth')));
        //   checkToken();
      },
      5 * 60 * 1000,
    );
  }, []);
  // console.log('layout', user);
  // if (!user) return <Navigate to={'/login'} />;

  return (
    <div className="min-h-[100vh]">
      <Navbar></Navbar>
      <div className="relative  px-[3em] py-[2em]">
        <div className="z-10">{props.children[0]}</div>
        {/* <div className="z-50 hidden sm:block">
          <div className="avatar absolute right-0  -top-[10em]">
            <div className="w-[500px] rounded-full bg-gradient-radial from-[#D6F5F3]  to-white"></div>
          </div>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};
