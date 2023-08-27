import React, { useEffect, useState } from 'react';
import Logo from '../../utils/images/Medicore.png';
import Logo1 from '../../utils/images/medicore_icon.png';
import { MdOutlineMenu } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logoutAsync } from '../../Features/User/UserSlice';
import { MdPerson } from 'react-icons/md';
import { SlBag } from 'react-icons/sl';
import { getCartUserAsync } from '../../Features/Cart/CartSlice';

export default function NavbarDrawer() {
  let dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { totalCart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartUserAsync());
  }, [user]);

  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar flex  relative">
            <div className="flex-none md:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
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
            <div>
              <div className="w-60 hidden md:block">
                <Link to="/">
                  <img className="px-2 h-20" src={Logo} alt="" />
                </Link>
              </div>
              <div className="md:hidden">
                <Link to="/">
                  <img className="px-2 h-20" src={Logo1} alt="" />
                </Link>
              </div>
            </div>
            {user && Object.keys(user).length !== 0 ? (
              <button className="btn btn-sm btn-ghost absolute right-6 md:right-52">
                <Link to={'/cart'}>
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
                </Link>
              </button>
            ) : (
              ''
            )}

            {/* <div className="flex-1 px-2 mx-2">Navbar Title</div> */}
            <div className=" hidden md:block w-full">
              <div className=" justify-between w-full flex pr-8 ">
                {/* Navbar menu content here */}
                <div>
                  <button className="btn btn-sm btn-ghost">
                    <Link to="/products">SHOP</Link>
                  </button>
                  <button className="btn btn-sm btn-ghost">
                    <Link to="/discussions">DISCUSSIONS</Link>
                  </button>
                  <button className="btn  btn-ghost btn-sm">
                    <Link to="/location">LOCATION</Link>
                  </button>
                </div>
                <div>
                  {user && Object.keys(user).length !== 0 ? (
                    <div className="flex gap-2 w-40">
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
                        <span className="font-bold max-w-[132px] truncate mr-10">
                          {user?.username}
                        </span>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex gap-3">
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
        </div>
        <div className="drawer-side z-20">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
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
                  <button className="btn btn-sm btn-primary text-white">
                    <Link to="/login">Login</Link>
                  </button>
                </li>
                <li>
                  <button className="btn btn-sm btn-outline btn-primary">
                    <Link to="/register">Register</Link>
                  </button>
                </li>
              </>
            )}
            <li>
              <button className="btn btn-ghost btn-sm">
                <Link to="/products">SHOP</Link>
              </button>
            </li>
            <li>
              <button className="btn btn-ghost btn-sm">
                <Link to="/discussions">DISCUSSIONS</Link>
              </button>
            </li>
            <li>
              <button className="btn  btn-ghost btn-sm">
                <Link to="/location">LOCATION</Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
