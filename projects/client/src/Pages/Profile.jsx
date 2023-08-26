import { MdPerson } from 'react-icons/md';
import { Link, Navigate } from 'react-router-dom';
import UserEditModal from '../Components/Profile/UserEditModal';
import { useSelector } from 'react-redux';
import { convertDate } from '../Helper/userHelper';
import MenuBarDesktop from '../Components/Layout/MenuBarDesktop';
import MenuBarMobile from '../Components/Layout/MenuBarMobile';
import { formatDate } from '../Helper/formatDateHelper';
import ChangeEmailConfirmation from '../Components/Profile/ChangeEmailConfirmation';
import { sendVerificationEmail } from '../API/authAPI';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import ProfileSkl from '../Components/Profile/ProfileSkl';

export default function Profile() {
  let token = localStorage.getItem('token');
  const [isRequest, setIsRequest] = useState(false);

  const { user, loadUser } = useSelector((state) => state.user);
  console.log('🚀 ~ file: Profile.jsx:14 ~ Profile ~ user:', user);
  if (!token) return <Navigate to={'/login'} />;

  const reqVerify = async () => {
    try {
      setIsRequest(true);
      const result = await sendVerificationEmail(user?.email);
      if (result?.data?.success) {
        toast.success(result.data.message);
      }
      setIsRequest(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setIsRequest(false);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-center px-4 gap-4 pt-2">
        <MenuBarDesktop />
        <div className="w-full max-w-[736px] lg:max-w-[776px] lg:p-4 rounded-lg">
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <MenuBarMobile />
              <h3 className="text-[20px] lg:text-[23px] font-bold">Profile</h3>
            </div>
            <UserEditModal data={user} />
          </div>
          {loadUser ? (
            <ProfileSkl />
          ) : (
            <div className="text-[16px] shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-lg p-8">
              <div className="w-full flex flex-col items-center gap-2">
                {user?.profile_image ? (
                  <img
                    className="w-[125px] h-[125px] rounded-full"
                    src={`${process.env.REACT_APP_API_BASE_URL}/${user?.profile_image}`}
                    alt="profile"
                  />
                ) : (
                  <MdPerson size={100} className="rounded-full" />
                )}

                <p className="font-bold md:text-[18px]">{user?.full_name}</p>
              </div>
              <div className="flex justify-between py-4 border-b-2 border-[#eeeeee]">
                <p className="text-[#7f7f7f] text-[14px] md:text-[16px]">
                  Email
                </p>
                <div className="flex gap-2">
                  {user.google_login ? null : (
                    <ChangeEmailConfirmation email={user?.email} />
                  )}
                  <p className="md:text-[16px] text-[14px] overflow-hidden text-ellipsis max-w-[15ch] sm:max-w-none">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="flex justify-between py-4 border-b-2 border-[#eeeeee]">
                <p className="text-[#7f7f7f] text-[14px] md:text-[16px]">
                  Phone number
                </p>
                <p className="md:text-[16px] text-[14px]">
                  {user?.phone_number}
                </p>
              </div>
              <div className="flex justify-between py-4 border-b-2 border-[#eeeeee]">
                <p className="text-[#7f7f7f] text-[14px] md:text-[16px]">
                  Birth of date
                </p>
                <p className="text-[14px] md:text-[16px]">
                  {user?.birthdate
                    ? formatDate(new Date(user?.birthdate))
                    : '-'}
                </p>
              </div>
              <div
                className={
                  user?.verified
                    ? 'flex justify-between pt-4'
                    : 'flex justify-between py-4 border-b-2 border-[#eeeeee]'
                }
              >
                <p className="text-[#7f7f7f] text-[14px] md:text-[16px]">
                  Gender
                </p>
                <p className="text-[14px] md:text-[16px]">
                  {user?.gender ? user?.gender : '-'}
                </p>
              </div>
              {user?.verified ? null : (
                <div className="flex justify-between pt-4">
                  <p className="text-[#7f7f7f] text-[14px] md:text-[16px]">
                    Email verification
                  </p>
                  <button
                    disabled={isRequest}
                    onClick={() => reqVerify()}
                    className="btn btn-primary"
                  >
                    Send request
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
