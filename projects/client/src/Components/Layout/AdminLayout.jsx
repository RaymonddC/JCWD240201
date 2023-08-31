import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';

export const AdminLayout = (props) => {
  const { user } = useSelector((state) => state.user);
  // console.log(props);
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
    <div className="flex">
      <Sidebar />
      <div
        className="lg:ml-[250px] sm:ml-[80px] ml-0 grow md:flex flex-col  
       h-full w-full   md:grow  md:w-[50vw] "
      >
        <div className="bg-gradient-to-b from-[#f1f1f1] from-10% via-[#f5f5f5] via-90% to-[#efefef] min-h-[100vh] px-5 pt-14 pb-20">
          {props?.children[0]}
        </div>
      </div>
    </div>
  );
};
