import { useRef } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { resetPassword } from '../API/authAPI';
import { useSearchParams } from 'react-router-dom';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function ResetPasswordForm() {
  const [disable, setDisable] = useState(false);
  const _newPassword = useRef();
  const _confirmNewPassword = useRef();
  const navigate = useNavigate();

  //show password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const onShowPassword = () => {
    if (showPassword) setShowPassword(false);
    if (!showPassword) setShowPassword(true);
  };

  const onShowConfirmPassword = () => {
    if (showConfirmPassword) setShowConfirmPassword(false);
    if (!showConfirmPassword) setShowConfirmPassword(true);
  };
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
  const onResetPassword = async (e) => {
    try {
      e.preventDefault()
      setDisable(false);
      let token = searchParams.get('token');
      const password = _newPassword.current.value;
      const confirmPassword = _confirmNewPassword.current.value;
      const result = await resetPassword(password, token);
      const errorMessage = { message: result.data?.message };
      const passwordNotMatch = { message: 'Password Does not Match' };

      if (confirmPassword !== password) throw passwordNotMatch;

      if (result.data?.success) {
        toast.success(result.data?.message);
      } else {
        throw errorMessage;
      }
      _newPassword.current.value = '';
      _confirmNewPassword.current.value = '';
      setDisable(false);
      navigate('/login');
    } catch (error) {
      setDisable(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="flex gap-4 border-b-2 h-14 p-3">
        <div className="flex items-center font-semibold">Reset Password</div>
      </div>
      <form onSubmit={onResetPassword}>
        <div className="lg:flex lg:justify-center lg:p-4 md:flex md:justify-center md:p-4">
          <div className="flex flex-col p-4 lg:max-w-lg md:max-w-lg">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Enter your new password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  ref={_newPassword}
                  className={
                    passwordValidation
                      ? 'input input-bordered w-full pr-8'
                      : 'input input-bordered input-error w-full pr-8'
                  }
                  onChange={() => onPassword(_newPassword.current.value)}
                />
                {showPassword ? (
                  <MdOutlineVisibilityOff
                    onClick={() => onShowPassword()}
                    className="absolute bottom-3.5 right-3"
                  />
                ) : (
                  <MdOutlineVisibility
                    onClick={() => onShowPassword()}
                    className="absolute bottom-3.5 right-3"
                  />
                )}
              </div>
              <label className="label">
                <span className="label-text-alt px-3">
                  Passwords should contain at least 8 characters including an
                  uppercase letter, a symbol, and a number.
                </span>
              </label>
            </div>
            <div className="form-control w-full relative">
              <label className="label">
                <span className="label-text">Confirm your new password</span>
              </label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                ref={_confirmNewPassword}
                className={
                  passwordConfirmation
                    ? 'input input-bordered w-full pr-8'
                    : 'input input-bordered input-error w-full pr-8'
                }
                onChange={() =>
                  onConfirmPassword(
                    _newPassword.current.value,
                    _confirmNewPassword.current.value,
                  )
                }
              />
              {showPassword ? (
                <MdOutlineVisibilityOff
                  onClick={() => onShowConfirmPassword()}
                  className="absolute bottom-3.5 right-3"
                />
              ) : (
                <MdOutlineVisibility
                  onClick={() => onShowConfirmPassword()}
                  className="absolute bottom-3.5 right-3"
                />
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full text-white my-4"
              disabled={disable ? true : false}
            >
              Reset Password
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
