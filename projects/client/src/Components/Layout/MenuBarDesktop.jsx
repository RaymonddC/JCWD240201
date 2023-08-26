import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAsync } from '../../Features/User/UserSlice';

export default function MenuBarDesktop() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  return (
    <div className="hidden lg:flex w-full h-fit lg:max-w-[255px] lg:flex-col flex-row mt-20 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-lg">
      <Link
        to="/user/profile"
        className={`p-3 cursor-pointer hover:font-bold border-b border-[#D5D7DD] ${
          window.location.pathname === '/user/profile'
            ? 'text-primary font-bold'
            : null
        }`}
      >
        Profile
      </Link>
      <Link
        to="/user/address"
        className={`p-3 cursor-pointer hover:font-bold border-b border-[#D5D7DD] ${
          window.location.pathname === '/user/address'
            ? 'text-primary font-bold'
            : null
        }`}
      >
        Address
      </Link>
      {user?.google_login ? null : (
        <Link
          to="/user/change-password"
          className={`p-3 cursor-pointer hover:font-bold border-b border-[#D5D7DD] ${
            window.location.pathname === '/user/change-password'
              ? 'text-primary font-bold'
              : null
          }`}
        >
          Change Passsword
        </Link>
      )}
      <Link
        to="/user/transaction"
        className={`p-3 cursor-pointer hover:font-bold border-b border-[#D5D7DD] ${
          window.location.pathname === '/user/transaction'
            ? 'text-primary font-bold'
            : null
        }`}
      >
        Transaction
      </Link>
      <Link
        to="/user/dicussions"
        className={`p-3 cursor-pointer hover:font-bold border-b border-[#D5D7DD] ${
          window.location.pathname === '/user/discussions'
            ? 'text-primary font-bold'
            : null
        }`}
      >
        Discussions
      </Link>
      <div
        onClick={() => {
          dispatch(logoutAsync(navigate));
        }}
        className={`p-3 cursor-pointer hover:font-bold text-error`}
      >
        Log Out
      </div>
    </div>
  );
}
