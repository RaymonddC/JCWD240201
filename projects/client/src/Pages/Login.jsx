import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { AuthForm } from '../Components/AuthForm/AuthForm';
import LoginImage from '../utils/images/Frame.svg';
import Logo from '../utils/images/logoHealthyMed.svg';
import { loginWithGoogleSlice } from '../Features/User/UserSlice';


export const Login = () => {
  const { user } = useSelector((state) => state?.user);

  const [isRegis, setIsRegis] = useState(
    window.location.pathname === '/register',
  );

  useEffect(() => {
    setIsRegis(window.location.pathname === '/register');
  }, [window.location.pathname]);

  // console.log(user);
  if (Object.keys(user).length !== 0) return <Navigate to={'/'} />;

  return (
    <div className="flex h-[100vh] relative">
      <div className={'image flex-1 bg-cover hidden lg:block'}>
        <div className=" min-w-[full] relative">
          <img
            className="absolute w-full h-[100vh] object-cover"
            src={LoginImage}
            alt=""
          />
        </div>
      </div>

      <div className="formSide flex-1 flex flex-col h-[100vh] justify-center">
        <Link to={'/'}>
          <img
            className="absolute h-[2em] sm:h-[2.5em] xl:h-[4em] top-5 left-5 "
            src={Logo}
            alt=""
          />
        </Link>
        <div className="px-[2%] sm:px-[10%] max-h-[100vh] py-[20%] md:py-[10%] lg:py-0">
          <div className="header px-[5%]">
            <p className="text-[30px] ">
              Welcome {isRegis ? 'to  HealthyMed' : 'Back'}!
            </p>
            <p className="text-[15px] pb-[20px] text-[#808080]">
              Please {isRegis ? 'Sign Up ' : 'Sign In '} to continue
            </p>
          </div>

          <AuthForm isRegis={isRegis} />

          <Link to={'/'}>
            <span className="text-[#808080] text-left pb-3">
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
