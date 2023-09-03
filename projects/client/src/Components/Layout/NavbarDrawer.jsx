import React, { useEffect, useState } from 'react';
import Logo from '../../utils/images/Medicore.png';
import Logo1 from '../../utils/images/medicore_icon.png';
import { MdOutlineMenu } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutAsync } from '../../Features/User/UserSlice';
import { MdPerson } from 'react-icons/md';
import { SlBag } from 'react-icons/sl';
import { getCartUserAsync } from '../../Features/Cart/CartSlice';

export default function NavbarDrawer() {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { totalCart } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getCartUserAsync());
  }, [user]);

  return (
    <>
      <div className="drawer">
        <input
          readOnly
          checked={open}
          id="my-drawer-3"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar flex  relative">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                className="btn btn-square btn-ghost"
                onClick={() => setOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>

            <div className="flex w-full justify-center mr-16 lg:mr-0 lg:w-fit lg:justify-normal px-2 mx-2">
              <div>
                <div className="w-60 hidden lg:block">
                  <Link to="/">
                    <img className="px-2 h-20" src={Logo} alt="" />
                  </Link>
                </div>
                <div className="flex lg:hidden">
                  <Link to="/">
                    <img className="px-2 h-20" src={Logo1} alt="" />
                  </Link>
                </div>
              </div>
              {user && Object.keys(user).length !== 0 ? (
                <Link
                  to="/cart"
                  className="btn z-10 btn-sm btn-ghost absolute right-6 lg:right-48"
                >
                  <button className="">
                    <SlBag size={25} />
                    {totalCart > 0 && Object.keys(user).length !== 0 ? (
                      <div className="cart absolute top-0 right-0  rounded-[100%] w-[22px] h-[22px] bg-[#3EBFB8] flex items-center justify-center">
                        <span className="text-[12px] text-white">
                          {totalCart}
                        </span>
                      </div>
                    ) : (
                      ''
                    )}
                  </button>
                </Link>
              ) : (
                ''
              )}
            </div>
            <div className=" hidden relative  lg:block w-full">
              {/* Navbar menu content here */}
              <div className="flex mr-44 justify-center">
                <div className="flex gap-3">
                  <Link to="/products">
                    <button className="btn btn-ghost font-bold w-36">
                      SHOP
                    </button>
                  </Link>
                  <Link to="/discussions">
                    <button className="btn btn-ghost font-bold w-36">
                      DISCUSSIONS
                    </button>
                  </Link>
                  <Link to="/location">
                    <button className="btn btn-ghost font-bold w-36">
                      LOCATION
                    </button>
                  </Link>
                </div>
              </div>
              <div className="absolute top-1 right-3 w-40">
                {user && Object.keys(user).length !== 0 ? (
                  <div className="flex gap-2">
                    <Link
                      to="/user/profile"
                      className="flex justify-center items-center gap-2 "
                    >
                      {user?.profile_image ? (
                        <img
                          className="w-[40px] h-[40px] rounded-full"
                          src={`${process.env.REACT_APP_API_BASE_URL}/${user?.profile_image}`}
                          alt="profile"
                        />
                      ) : (
                        <MdPerson className="w-[40px] h-[40px]" />
                      )}
                      <div className="font-bold w-24 truncate">
                        {user?.username}
                      </div>
                    </Link>
                  </div>
                ) : (
                  <div className="flex mt-1  gap-3">
                    <button className="btn btn-sm btn-primary text-white">
                      <Link to="/login">Login</Link>
                    </button>
                    <button className="btn btn-sm btn-outline btn-primary">
                      <Link to="/register">Register</Link>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="drawer-side z-20">
          <label
            onClick={() => setOpen(false)}
            htmlFor="my-drawer-3"
            className="drawer-overlay"
          ></label>
          <ul className="menu gap-2 p-4 w-52 h-full bg-base-200">
            {/* Sidebar content here */}
            {user && Object.keys(user).length !== 0 ? (
              <li>
                <div className="flex gap-2 ">
                  <Link
                    to="/user/profile"
                    className="flex justify-left items-center gap-2 "
                  >
                    {user?.profile_image ? (
                      <img
                        className="w-[40px] h-[40px] rounded-full"
                        src={`${process.env.REACT_APP_API_BASE_URL}/${user?.profile_image}`}
                        alt="profile"
                      />
                    ) : (
                      <MdPerson className="w-[40px] h-[40px]" />
                    )}
                    <span className="font-bold max-w-[132px] truncate">
                      {user?.username}
                    </span>
                  </Link>
                </div>
              </li>
            ) : (
              <>
                <li>
                  <button
                    className="btn btn-sm w-full btn-primary text-white"
                    onClick={() => {
                      setOpen(false);
                      navigate('/login');
                    }}
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn-sm btn-outline btn-primary"
                    onClick={() => {
                      setOpen(false);
                      navigate('/register');
                    }}
                  >
                    Register
                  </button>
                </li>
              </>
            )}
            <li>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setOpen(false);
                  navigate('/products');
                }}
              >
                shop
              </button>
            </li>
            <li>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setOpen(false);
                  navigate('/discussions');
                }}
              >
                discussions
              </button>
            </li>
            <li>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setOpen(false);
                  navigate('/location');
                }}
              >
                location
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
