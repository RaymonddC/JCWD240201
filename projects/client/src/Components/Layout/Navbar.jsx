import React, { useEffect } from 'react';
import Logo from '../../utils/images/logoHealthyMed.svg';
import { MdOutlineMenu } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
      <div className="flex relative gap-2 items-center p-3 ">
        <div className="w-72">
          <Link to="/">
            <img className="px-2" src={Logo} alt="" />
          </Link>
        </div>
        <div className="hidden sm:block w-full">
          <div className="flex justify-between pr-2 items-center">
            <div className="flex">
              <button className="btn btn-sm btn-ghost">
                <Link to="/products">Shop</Link>
              </button>
              <button className="btn btn-sm btn-ghost">
                <Link to="/discussions">QnA</Link>
              </button>
              {user && Object.keys(user).length !== 0 ? (
                <button className="btn btn-sm btn-ghost relative">
                  <Link to={'/cart'}>
                    <SlBag className="h-[24px] w-[24px]" />
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
            </div>
            <div className="flex">
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
                    <span className="font-bold">{user?.full_name}</span>
                  </Link>
                  <button
                    className="btn btn-ghost"
                    onClick={() => {
                      dispatch(logoutAsync());
                    }}
                  >
                    <Link to={'/login'}>logout</Link>
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button className="btn btn-sm btn-primary">
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
              className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
            >
              <li>
                <Link to="/products">SHOP</Link>
              </li>
              <li>
                <Link to="/discussions">QNA</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
