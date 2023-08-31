import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { LoginSchema, SignupSchema } from '../../utils/ValidationSchema';
import {
  loginWithGoogleSlice,
  onLoginAsync,
  onRegister,
} from '../../Features/User/UserSlice';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FcGoogle } from 'react-icons/fc';
import { Input } from './Input/Input';
import { InputPassword } from './Input/InputPassword';

// import { PhoneInput } from 'react-contact-number-input';

export const AuthForm = (propss) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const key = process.env.REACT_APP_API_SECRET_KEY;

  useEffect(() => {
    const loadScriptByURL = (id, url, callback) => {
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }

      if (isScriptExist && callback) callback();
    };

    // load the script by passing the URL
    loadScriptByURL(
      key,
      `https://www.google.com/recaptcha/api.js?render=${key}`,
    );
  }, []);
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
      onSubmit={async (values, { resetForm }) => {
        try {
          setIsSubmitting(true);
          window.grecaptcha.ready(() => {
            window.grecaptcha
              .execute(key, { action: 'submit' })
              .then(async (captchaToken) => {
                const isSuccess = await dispatch(
                  propss.isRegis
                    ? onRegister(values, captchaToken)
                    : onLoginAsync(values, captchaToken),
                );

                if (!propss.isRegis) {
                  setIsSubmitting(false);
                  if (isSuccess) return navigate('/');
                  resetForm();
                } else {
                  setIsSubmitting(false);
                  if (isSuccess) return navigate('/login');
                }
              });
          });
        } catch (error) {}
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
              <Link to={'/resetPassword'} className="text-blue-500">
                Forgot Password?
              </Link>
            </>
          )}
          <button
            type="submit"
            className={`g-recaptcha btn text-white font-bold rounded-xl py-[10px] w-full mt-[20px] mb-[5px] ${
              props.isSubmitting ? 'btn-disabled' : 'btn-primary '
            } `}
            disabled={isSubmitting}
          >
            {propss.isRegis ? 'Register' : 'Login'}
          </button>
          <div className="btnOther w-full text-[13px] font-bold ">
            <button
             disabled={isSubmitting}
              type="button"
              onClick={() => {
                dispatch(loginWithGoogleSlice());
              }}
              className="btn btn-outline rounded-xl btn-secondary w-full"
            >
              <FcGoogle size={25} />{' '}
              {propss.isRegis ? 'Login with ' : 'Sign in with  '}
              Google
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};
