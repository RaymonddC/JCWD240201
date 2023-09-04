import { MdPerson } from 'react-icons/md';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { InputPassword } from '../Components/AuthForm/Input/InputPassword';
import { useRef, useState } from 'react';
import { changePassword } from '../API/authAPI';
import toast from 'react-hot-toast';
import MenuBarDesktop from '../Components/Layout/MenuBarDesktop';
import MenuBarMobile from '../Components/Layout/MenuBarMobile';

export default function ChangePassword() {
  let token = localStorage.getItem('token');
  const { user } = useSelector((state) => state.user);
  const _oldPassword = useRef();
  const _newPassword = useRef();
  const _confirmNewPassword = useRef();
  const [isDisable, setIsDisable] = useState(false)

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

  const onChangePassword = async (e) => {
    try {
      e.preventDefault();
      setIsDisable(true)
      const oldPassword = _oldPassword.current.value;
      const newPassword = _newPassword.current.value;
      const confirmNewPassword = _confirmNewPassword.current.value;
      const passwordNotMatch = { message: 'Password does not match' };
      if (newPassword !== confirmNewPassword) throw passwordNotMatch;

      const result = await changePassword(user.id, oldPassword, newPassword);
      const errorMessage = { message: result?.data?.message };
      if (result?.data?.success) {
        toast.success(result?.data?.message);
      } else {
        throw errorMessage;
      }
      _oldPassword.current.value = '';
      _newPassword.current.value = '';
      _confirmNewPassword.current.value = '';
      setIsDisable(false)
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      setIsDisable(false)
    }
  };

  if (!token) return <Navigate to={'/login'} />;
  return (
    <>
      {/* <NavBar /> */}
      <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-center px-4 gap-4 pt-2">
        <MenuBarDesktop />
        <div className="w-full max-w-[736px] lg:max-w-[776px] lg:p-4 rounded-lg">
          <div className="flex lg:h-[48px] items-center mb-4">
            <MenuBarMobile />
            <h3 className="text-[20px] lg:text-[23px] font-bold">
              Change Password
            </h3>
          </div>
          <div className="text-[16px] shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-lg p-4">
            <div className="hidden md:block">
              <div className="flex">
                {user?.profile_image ? (
                  <img alt=""></img>
                ) : (
                  <MdPerson className="w-[100px] h-[100px]" />
                )}
                <div>
                  <p className="font-bold text-[18px]">{user?.full_name}</p>
                  <p className="text-[16px]">{user?.phone_number}</p>
                  <p className="text-[16px]">{user?.email}</p>
                </div>
              </div>
            </div>
            <form onSubmit={onChangePassword}>
              <div>
                <InputPassword
                  label={`Old Password`}
                  name="password"
                  defineRef={_oldPassword}
                />
                <InputPassword
                  label={`New Password`}
                  name="password"
                  defineRef={_newPassword}
                  className={passwordValidation ? '' : 'input-error'}
                  onChanged={() => onPassword(_newPassword.current.value)}
                />
                <InputPassword
                  label={`Confirm New Password`}
                  name="password"
                  defineRef={_confirmNewPassword}
                  className={passwordConfirmation ? '' : 'input-error'}
                  onChanged={() =>
                    onConfirmPassword(
                      _newPassword.current.value,
                      _confirmNewPassword.current.value,
                    )
                  }
                />
                <button
                  type="submit"
                  className="btn btn-primary w-full lg:w-6/12 md:w-6/12 text-white my-4"
                  disabled={isDisable}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
