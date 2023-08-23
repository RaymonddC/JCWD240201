import React, { useEffect, useState } from 'react';
import Logo from '../../utils/images/Medicore.png';
import Logo1 from '../../utils/images/Medicore.png';
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
  console.log('🚀 ~ file: Navbar.jsx:15 ~ NavBar ~ user:', user);
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
          <div className="w-full navbar bg-base-300">
            <div className="flex-none lg:hidden">
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
            <div className="w-72">
              <Link to="/">
                <img className="px-2 h-20" src={Logo1} alt="" />
              </Link>
            </div>
            {user && Object.keys(user).length !== 0 ? (
              <button className="btn btn-sm btn-ghost absolute right-44">
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
            <div className="flex-none hidden w-full lg:block">
              <div className=" justify-between flex ">
                {/* Navbar menu content here */}
                <div>
                  <button className="btn btn-sm btn-ghost">
                    <Link to="/products">SHOP</Link>
                  </button>
                  <button className="btn btn-sm btn-ghost">
                    <Link to="/discussions">DISCUSSIONS</Link>
                  </button>
                </div>
                <div>
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
                        <span className="font-bold max-w-[132px] truncate">
                          {user?.full_name}
                        </span>
                      </Link>
                      {/* <button
                    className="btn btn-outline btn-secondary ml-3"
                    onClick={() => {
                      dispatch(logoutAsync());
                    }}
                  >
                    <Link to={'/login'}>logout</Link>
                  </button> */}
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
        <div className="drawer-side z-10">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200">
            {/* Sidebar content here */}
            <div className="btn w-full">
              <Link to="/products">SHOP</Link>
            </div>
            <div className="btn w-full">
              <Link to="/discussions">DISCUSSIONS</Link>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
