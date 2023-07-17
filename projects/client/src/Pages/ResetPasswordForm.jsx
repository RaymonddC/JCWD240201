import { useRef } from 'react';
import { useState } from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';
import { resetPassword } from '../API/auth';
import { useSearchParams } from 'react-router-dom';

export default function ResetPasswordForm() {
  const [disable, setDisable] = useState(false);
  const _newPassword = useRef();
  const _confirmNewPassword = useRef();

  // password validation
  const [passwordValidation, setPasswordValidation] = useState(true);

  const onPassword = (password) => {
    const isPassword = new RegExp(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})',
    );

    if (isPassword.test(password)) {
      setPasswordValidation(true);
    } else {
      setPasswordValidation(false);
    }
  };

  //password confirmation
  const [passwordConfirmation, setPasswordConfirmation] = useState(true);

  const onConfirmPassword = (password, confirmPassword) => {
    if (password === confirmPassword) {
      setPasswordConfirmation(true);
    } else {
      setPasswordConfirmation(false);
    }
  };

  //reset password
  const [searchParams] = useSearchParams();

  const onResetPassword = async () => {
    try {
      setDisable(false);
      let token = searchParams.get('token');
      const password = _newPassword.current.value;
      const result = await resetPassword(password, token);
      console.log(result);
      const errorMessage = { message: result.data?.message };

      if (result.data?.success) {
        toast.success(result.data?.message);
      } else {
        throw errorMessage;
      }
      _newPassword.current.value = '';
      _confirmNewPassword.current.value = '';
      setDisable(false);
    } catch (error) {
      setDisable(false);
      toast.error(error.message);
    }
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex gap-4 border-b-2 h-14 p-3">
        <div className="flex items-center">
          <MdKeyboardBackspace size={25} />
        </div>
        <div className="flex items-center font-semibold">Reset Password</div>
      </div>
      <div className='lg:flex lg:justify-center lg:p-4 md:flex md:justify-center md:p-4'>
        <div className="flex flex-col p-4 lg:max-w-lg md:max-w-lg">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Enter your new password</span>
            </label>
            <input
              type="password"
              placeholder="New Password"
              ref={_newPassword}
              className={
                passwordValidation
                  ? 'input input-bordered w-full'
                  : 'input input-bordered input-error w-full'
              }
              onChange={() => onPassword(_newPassword.current.value)}
            />
            <label className="label">
              <span className="label-text-alt px-3">
                Passwords should contain at least 8 characters including an
                uppercase letter, a symbol, and a number.
              </span>
            </label>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Confirm your new password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              ref={_confirmNewPassword}
              className={
                passwordConfirmation
                  ? 'input input-bordered w-full'
                  : 'input input-bordered input-error w-full'
              }
              onChange={() =>
                onConfirmPassword(
                  _newPassword.current.value,
                  _confirmNewPassword.current.value,
                )
              }
            />
          </div>
          {disable ? (
            <button
              onClick={() => onResetPassword()}
              className="btn btn-accent w-full text-white my-4"
              disabled
            >
              Reset Password
            </button>
          ) : (
            <button
              onClick={() => onResetPassword()}
              className="btn btn-accent w-full text-white my-4"
            >
              Reset Password
            </button>
          )}
        </div>
      </div>
    </>
  );
}
