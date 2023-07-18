import { MdPerson } from 'react-icons/md';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { InputPassword } from '../Components/AuthForm/Input/InputPassword';
import { useRef } from 'react';
import { changePassword } from '../API/auth';
import toast from 'react-hot-toast';

export default function ChangePassword() {
  let token = localStorage.getItem('token');
  const { user } = useSelector((state) => state.user);
  const _oldPassword = useRef();
  const _newPassword = useRef();
  const _confirmNPassword = useRef();

  const onChangePassword = async () => {
    try {
      const oldPassword = _oldPassword.current.value;
      const newPassword = _newPassword.current.value;
      const confirmNewPassword = _confirmNPassword.current.value;
      const passwordNotMatch = { message: 'Password does not match' };
      console.log(oldPassword);
      if (newPassword !== confirmNewPassword) throw passwordNotMatch;

      const result = await changePassword(user.id, oldPassword, newPassword);
      const errorMessage = { message: result.data?.message };

      if (result.data?.success) {
        toast.success(result.data?.message);
      } else {
        throw errorMessage;
      }

      _oldPassword.current.value = '';
      _newPassword.current.value = '';
      _confirmNPassword.current.value = '';
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!token) return <Navigate to={'/login'} />;
  return (
    <div className="flex flex-col lg:flex-row justify-center px-4 gap-4 pt-2">
      <div className="p-4 w-full lg:max-w-[255px]">
        <div className="h-full flex lg:flex-col flex-row shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-lg">
          <Link to="/user/profile" className="p-3">
            Profile
          </Link>
          <Link to="/user/address" className="p-3">
            Address
          </Link>
          <Link
            to="/user/profile"
            className={
              window.location.pathname === '/user/change-password'
                ? 'p-3 text-[#00A8B5] font-bold'
                : 'p-3'
            }
          >
            Change Passsword
          </Link>
        </div>
      </div>
      <div className="w-full max-w-[772px] p-4 rounded-lg">
        <div className="flex justify-between pl-4 mb-4">
          <h3 className="text-[23px] font-bold">Change Password</h3>
        </div>
        <div className="text-[16px] shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-lg p-4">
          <div className='hidden md:block'>
            <div className="flex">
              {user?.profile_image ? (
                <img alt=''></img>
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
            />
            <InputPassword
              label={`Confirm New Password`}
              name="password"
              defineRef={_confirmNPassword}
            />
            <button
              className="btn btn-primary w-6/12 text-white my-4"
              onClick={() => onChangePassword()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
