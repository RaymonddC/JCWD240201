import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { AuthForm } from '../Components/AuthForm/AuthForm';

import LoginImage from '../utils/images/Frame.svg';
import Logo from '../utils/images/logoHealthyMed.svg';

export const Login = () => {
  const user = useSelector((state) => state?.user?.user);

  const [isRegis, setIsRegis] = useState(
    window.location.pathname == '/register',
  );

  useEffect(() => {
    setIsRegis(window.location.pathname == '/register');
  }, [window.location.pathname]);

  // console.log(user);
  // if (!user || Object.keys(user).length !== 0) return <Navigate to={'/'} />;

  return (
    <div className="flex h-[100vh]">
      <div className={'image flex-1 bg-cover hidden md:block'}>
        <div className=" min-w-[full] relative">
          <img className="absolute w-full h-[100vh]" src={LoginImage} alt="" />
          <img className="absolute h-10 top-5 left-5 " src={Logo} alt="" />
        </div>
      </div>

      <div className="formSide flex-1 flex flex-col h-[100vh] justify-center">
        <div className="px-[10%] max-h-[100vh] ">
          <p className="text-[30px] ">
            Welcome {isRegis ? 'to  HealthyMed' : 'Back'}!
          </p>
          <p className="text-[15px] pb-[20px] text-[#808080]">
            Please {isRegis ? 'Sign Up ' : 'Sign In '} to continue
          </p>

          <AuthForm isRegis={isRegis} />

          <Link to={'/'}>
            <span className="text-[#808080] text-left">
              {isRegis ? 'Already have account?' : "Don't have an account?"}{' '}
            </span>
            <Link
              to={isRegis ? '/login' : '/register'}
              className="text-blue-500"
            >
              {isRegis ? 'Login' : 'Sign Up'}
            </Link>
          </Link>
        </div>
      </div>
    </div>
  );
};
