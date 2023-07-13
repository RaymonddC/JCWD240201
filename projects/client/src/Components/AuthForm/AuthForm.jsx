import { Formik } from 'formik';
import React, { useState } from 'react';
import { LoginSchema, SignupSchema } from '../../utils/ValidationSchema';
import { onLoginAsync, onRegister } from '../../Features/User/UserSlice';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Paper, Box, Grid, InputAdornment } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';

export const AuthForm = (props) => {
  const dispatch = useDispatch();
  const isSubmit = useSelector((state) => state?.user?.isSubmitting);
  const [showPass, setShowPass] = React.useState(false);
  const [showCPass, setShowCPass] = useState(false);
  return (
    <Formik
      initialValues={{
        usernameOrEmail: '',
        password: '',
        email: '',
        confirmPassword: '',
        phoneNumber: '',
      }}
      validationSchema={props.isRegis ? SignupSchema : LoginSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(props.isRegis ? onRegister(values) : onLoginAsync(values));
        if (!props.isRegis) resetForm();
        else {
          return <Navigate to={'/login'} />;
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,

        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} className="min-w-[290px]">
          <div
            className={`inputEmail my-[20px] ${props.isRegis ? '' : 'hidden'}`}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              variant="outlined"
              value={props.value}
              onBlur={props.onBlur}
              onChange={props.onChange}
            />
            {errors.email && touched.email ? (
              <div className="error">{errors.email}</div>
            ) : null}
          </div>
          <div className={`inputUsernameOrEmail my-[20px] `}>
            <TextField
              id="outlined-basic"
              label={`Username ${props.isRegis ? '' : 'or Email'} `}
              variant="outlined"
              name="usernameOrEmail"
              value={values.usernameOrEmail}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full "
            />
            {errors.usernameOrEmail && touched.usernameOrEmail ? (
              <div className="error">{errors.usernameOrEmail}</div>
            ) : null}
          </div>
          <div className="inputPass relative my-[20px]">
            <div className="icon" onClick={() => setShowPass(!showPass)}>
              {showPass ? (
                <VisibilityOutlinedIcon className="absolute right-[20px] top-[20px] z-30" />
              ) : (
                <VisibilityOffOutlinedIcon className="absolute right-[20px] top-[20px] z-30" />
              )}
            </div>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              name="password"
              type={showPass ? 'text' : 'password'}
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full pr-[50px] pl-5"
            />
            {errors.password && touched.password ? (
              <div className="error">{errors.password}</div>
            ) : null}
          </div>
          <div
            className={`inputCPass relative my-[20px] ${
              props.isRegis ? '' : 'hidden'
            }`}
          >
            <div className="icon" onClick={() => setShowCPass(!showCPass)}>
              {showCPass ? (
                <VisibilityOutlinedIcon className="absolute right-[20px] top-[20px] z-30" />
              ) : (
                <VisibilityOffOutlinedIcon className="absolute right-[20px] top-[20px] z-30" />
              )}
            </div>
            <TextField
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              name="confirmPassword"
              type={showCPass ? 'text' : 'password'}
              value={values.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full"
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div className="error">{errors.confirmPassword}</div>
            ) : null}
          </div>
          <div className={`phoneNumber my-[20px] `}>
            <TextField
              id="phoneNumber"
              label={'Phone Number'}
              variant="outlined"
              name="phoneNumber"
              value={values.phoneNumber}
              onBlur={handleBlur}
              onChange={handleChange}
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+62</InputAdornment>
                ),
              }}
              className="w-full "
            />
            {errors.phoneNumber && touched.phoneNumber ? (
              <div className="error">{errors.phoneNumber}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="bg-[#007680]  text-white font-bold rounded-xl py-[10px] w-full mt-[20px] mb-[5px]"
            disabled={isSubmit}
          >
            {props.isRegis ? 'Register' : 'Login'}
          </button>
          <div className="btnOther w-full text-[13px] font-bold ">
            <div className="font-bold rounded-xl py-[8px] w-full  border border-[#898989]  my-[10px] flex items-center">
              <div
                // onClick={() => {
                //   dispatch(onLoginWithGoogle());
                // }}
                className="flex w-full justify-center gap-3 cursor-pointer"
              >
                <FcGoogle size={'24px'} />
                <p>
                  {props.isRegis ? 'Sign up with ' : 'Sign in with  '}
                  Google
                </p>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
