import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link, Navigate } from 'react-router-dom';
import { AuthForm } from '../Components/AuthForm/AuthForm';

import LoginImage from '../utils/images/Frame.svg';
import Logo from '../utils/images/logoHealthyMed.svg';
import { Analysis } from '../Components/Dashboard/Analysis/Analysis';
import { OrderStatus } from '../Components/Dashboard/OrderStatus/OrderStatus';
import { MedicStatus } from '../Components/Dashboard/MeidicineStatus/MedicStatus';

export const Dashboard = () => {
  const { user } = useSelector((state) => state?.user);

  // const [isRegis, setIsRegis] = useState(
  //   window.location.pathname == '/register',
  // );

  // useEffect(() => {
  //   setIsRegis(window.location.pathname == '/register');
  // }, [window.location.pathname]);

  // console.log(user);
  // if (Object.keys(user).length !== 0) return <Navigate to={'/'} />;

  return (
    <div className="flex flex-col gap-8">
      <Analysis />
      <div className="medicine flex justify-between">
        <OrderStatus />
        <MedicStatus />
      </div>
    </div>
  );
};
