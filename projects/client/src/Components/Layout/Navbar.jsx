import Logo from '../../utils/images/logoHealthyMed.svg';
import { MdOutlineMenu } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAsync } from '../../Features/User/UserSlice';

export default function NavBar() {
  let dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="flex relative gap-2 items-center p-3 ">
        <Link to="/">
          <img className="h-10 px-2" src={Logo} alt="" />
        </Link>
        <div className="hidden sm:block w-full">
          <div className="flex justify-between pr-2">
            <div className="flex">
              <button className="btn btn-ghost">Shop</button>
              <button className="btn btn-ghost">
                <Link to="/QnA">QnA</Link>
              </button>
            </div>
            <div className="flex">
              {user && Object.keys(user).length !== 0 ? (
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    dispatch(logoutAsync());
                  }}
                >
                  <Link to={'/login'}>logout</Link>
                </button>
              ) : (
                <div className='flex gap-3'>
                  <button className="btn btn-primary">
                    <Link to="/login">Login</Link>
                  </button>
                  <button className="btn btn-outline btn-primary">
                    <Link to="/register">Register</Link>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="absolute right-3 sm:hidden">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost rounded-btn">
              <MdOutlineMenu size={25} />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
            >
              <li>
                <Link to="/Landing">SHOP</Link>
              </li>
              <li>
                <Link to="/QnA">QNA</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
