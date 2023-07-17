import { Formik } from 'formik';
import React, { useState } from 'react';
import { LoginSchema, SignupSchema } from '../../utils/ValidationSchema';
import { onLoginAsync, onRegister } from '../../Features/User/UserSlice';

import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FcGoogle } from 'react-icons/fc';
import { Input } from './Input/Input';
import { InputPassword } from './Input/InputPassword';

// import { PhoneInput } from 'react-contact-number-input';

export const AuthForm = (propss) => {
  const dispatch = useDispatch();
  const isSubmit = useSelector((state) => state?.user?.isSubmitting);
  return (
    <Formik
      initialValues={{
        fullName: '',
        usernameOrEmail: '',
        password: '',
        email: '',
        confirmPassword: '',
        phoneNumber: '',
      }}
      validationSchema={propss.isRegis ? SignupSchema : LoginSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(propss.isRegis ? onRegister(values) : onLoginAsync(values));
        if (!propss.isRegis) resetForm();
        else {
          return <Navigate to={'/login'} />;
        }
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit} className="min-w-[290px]">
          <div
            className={
              propss.isRegis ? 'grid lg:grid-cols-2 gap-x-5 gap-y-1' : ''
            }
          >
            <Input
              hidden={propss.isRegis ? '' : 'hidden'}
              label="Full Name"
              type="text"
              name="fullName"
              errors={props.errors.fullName}
              touched={props.touched.fullName}
              value={props.values.fullName}
              onBlur={props.handleBlur}
              onChanged={props.handleChange}
            />
            <Input
              hidden={propss.isRegis ? '' : 'hidden'}
              label="Email Address"
              type="email"
              name="email"
              errors={props.errors.email}
              touched={props.touched.email}
              value={props.values.email}
              onBlur={props.handleBlur}
              onChanged={props.handleChange}
            />
            <Input
              label={`Username ${propss.isRegis ? '' : 'or Email'} `}
              type="text"
              name="usernameOrEmail"
              errors={props.errors.usernameOrEmail}
              touched={props.touched.usernameOrEmail}
              value={props.values.usernameOrEmail}
              onBlur={props.handleBlur}
              onChanged={props.handleChange}
            />
            <Input
              hidden={propss.isRegis ? '' : 'hidden'}
              label={'Phone Number'}
              type="number"
              name="phoneNumber"
              errors={props.errors.phoneNumber}
              touched={props.touched.phoneNumber}
              value={props.values.phoneNumber}
              onBlur={props.handleBlur}
              onChanged={props.handleChange}
            />
            {/* <PhoneInput
              disabled={disabled}
              containerClass={containerClass}
              countryCode={currentCountryCode}
              onChange={handleOnChange}
              placeholder={placeholder}
            /> */}

            <InputPassword
              label={`Password`}
              name="password"
              errors={props.errors.password}
              touched={props.touched.password}
              value={props.values.password}
              onBlur={props.handleBlur}
              onChanged={props.handleChange}
            />
            <InputPassword
              hidden={propss.isRegis ? '' : 'hidden'}
              label="Confirm Password"
              name="confirmPassword"
              errors={props.errors.confirmPassword}
              touched={props.touched.confirmPassword}
              value={props.values.confirmPassword}
              onBlur={props.handleBlur}
              onChanged={props.handleChange}
            />
          </div>
          {propss.isRegis ? (
            ''
          ) : (
            <>
              <Link
                to={propss.isRegis ? '/login' : '/register'}
                className="text-blue-500"
              >
                Forgot Password?
              </Link>
            </>
          )}
          <button
            type="submit"
            className="bg-[#007680]  text-white font-bold rounded-xl py-[10px] w-full mt-[20px] mb-[5px]"
            disabled={isSubmit}
          >
            {propss.isRegis ? 'Register' : 'Login'}
          </button>
          {/* <div className="btnOther w-full text-[13px] font-bold ">
            <div className="font-bold rounded-xl py-[8px] w-full  border border-[#898989]  my-[10px] flex items-center">
              <div
                // onClick={() => {
                //   dispatch(onLoginWithGoogle());
                // }}
                className="flex w-full justify-center gap-3 cursor-pointer"
              >
                <FcGoogle size={'24px'} />
                <p>
                  {propss.isRegis ? 'Sign up with ' : 'Sign in with  '}
                  Google
                </p>
              </div>
            </div>
          </div> */}
        </form>
      )}
    </Formik>
  );
};
