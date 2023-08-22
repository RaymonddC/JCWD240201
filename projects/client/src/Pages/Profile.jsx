import { MdPerson } from 'react-icons/md';
import { Link, Navigate } from 'react-router-dom';
import UserEditModal from '../Components/Profile/UserEditModal';
import { useSelector } from 'react-redux';
import { convertDate } from '../Helper/userHelper';
import MenuBarDesktop from '../Components/Layout/MenuBarDesktop';
import MenuBarMobile from '../Components/Layout/MenuBarMobile';
import { formatDate } from '../Helper/formatDateHelper';

export default function Profile() {
  let token = localStorage.getItem('token');

  const { user } = useSelector((state) => state.user);
  console.log("🚀 ~ file: Profile.jsx:14 ~ Profile ~ user:", user)
  if (!token) return <Navigate to={'/login'} />;
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
          <div className="text-[16px] shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-lg p-4">
            <div className="flex items-center gap-4">
              {user?.profile_image ? (
                <img
                  className="w-[64px] h-[64px] rounded-full"
                  src={`${process.env.REACT_APP_API_BASE_URL}/${user?.profile_image}`}
                  alt="profile"
                />
              ) : (
                <MdPerson className="w-[64px] h-[64px]" />
              )}
              <div>
                <p className="font-bold md:text-[18px]">{user?.full_name}</p>
                <p className="md:text-[16px] text-[14px]">
                  {user?.phone_number}
                </p>
                <p className="md:text-[16px] text-[14px]">{user?.email}</p>
              </div>
            </div>
            <div className="flex justify-between py-4 border-b-2 border-[#eeeeee]">
              <p className="text-[#7f7f7f] text-[14px] md:text-[16px]">
                Birth of date
              </p>
              <p className="text-[14px] md:text-[16px]">
                {user?.birthdate ? formatDate(new Date(user?.birthdate)) : '-'}
              </p>
            </div>
            <div className="flex justify-between pt-4">
              <p className="text-[#7f7f7f] text-[14px] md:text-[16px]">
                Gender
              </p>
              <p className="text-[14px] md:text-[16px]">
                {user?.gender ? user?.gender : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
