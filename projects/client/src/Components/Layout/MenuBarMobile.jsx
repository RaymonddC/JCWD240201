import { Link, useNavigate } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync } from '../../Features/User/UserSlice';

export default function MenuBarMobile() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    // <div className="hidden lg:flex w-full h-fit lg:max-w-[255px] lg:flex-col flex-row shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-lg">
    //   <Link
    //     to="/user/profile"
    //     className={
    //       window.location.pathname === '/user/profile'
    //         ? 'p-3 text-[#00A8B5] font-bold'
    //         : 'p-3'
    //     }
    //   >
    //     Profile
    //   </Link>
    //   <Link to="/user/address" className="p-3">
    //     Address
    //   </Link>
    // </div>
    <div className="dropdown dropdown-right lg:hidden">
      <label tabIndex={0} className="btn btn-ghost m-1">
        <MdMenu size="25px" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[20] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <Link
            to="/user/profile"
            className={
              window.location.pathname === '/user/profile'
                ? 'p-3 text-[#00A8B5] font-bold'
                : 'p-3'
            }
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/user/address"
            className={
              window.location.pathname === '/user/address'
                ? 'p-3 text-[#00A8B5] font-bold'
                : 'p-3'
            }
          >
            Address
          </Link>
        </li>
        {user?.google_login ? null : (
          <li>
            <Link
              to="/user/change-password"
              className={
                window.location.pathname === '/user/change-password'
                  ? 'p-3 text-[#00A8B5] font-bold'
                  : 'p-3'
              }
            >
              Change Password
            </Link>
          </li>
        )}
        <li>
          <Link
            to="/user/transaction"
            className={
              window.location.pathname === '/user/transaction'
                ? 'p-3 text-[#00A8B5] font-bold'
                : 'p-3'
            }
          >
            Transaction
          </Link>
        </li>
        <li>
          <Link
            to="/user/discussions"
            className={
              window.location.pathname === '/user/transaction'
                ? 'p-3 text-[#00A8B5] font-bold'
                : 'p-3'
            }
          >
            Discussions
          </Link>
        </li>
        <li>
          <div
            onClick={() => {
              dispatch(logoutAsync(navigate));
            }}
            className={`p-3 cursor-pointer hover:font-bold text-error`}
          >
            Log Out
          </div>
        </li>
      </ul>
    </div>
  );
}
