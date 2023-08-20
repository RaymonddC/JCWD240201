import React, { useEffect, useState } from 'react';
import Logo from '../../utils/images/logoHealthyMed.svg';
import Logo1 from '../../utils/images/Medicore.png'
import { MdOutlineMenu } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logoutAsync } from '../../Features/User/UserSlice';
import { MdPerson } from 'react-icons/md';
import { SlBag } from 'react-icons/sl';
import { getCartUserAsync } from '../../Features/Cart/CartSlice';

export default function NavBar() {
  let dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { totalCart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartUserAsync());
  }, [user]);

  return (
    <>
      <div className="flex relative gap-2 items-center px-5 pt-3 ">
        <div className="w-72">
          <Link to="/">
            <img className="px-2 h-20" src={Logo1} alt="" />
          </Link>
        </div>
        <div className="hidden sm:block w-full">
          <div className="flex justify-between pr-2 items-center">
            <div className="flex">
              <button className="btn btn-sm btn-ghost">
                <Link to="/products">SHOP</Link>
              </button>
              <button className="btn btn-sm btn-ghost">
                <Link to="/discussions">DISCUSSIONS</Link>
              </button>
            </div>
            <div className="flex items-center relative">
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
              {user && Object.keys(user).length !== 0 ? (
                <div className="flex gap-2 w-40 truncate">
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
                    <span className="font-bold">{user?.full_name}</span>
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
        <div className="absolute right-3 sm:hidden">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost rounded-btn">
              <MdOutlineMenu size={25} />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[20] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
            >
              <li>
                <Link to="/products">SHOP</Link>
              </li>
              <li>
                <Link to="/discussions">DISCUSSIONS</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
