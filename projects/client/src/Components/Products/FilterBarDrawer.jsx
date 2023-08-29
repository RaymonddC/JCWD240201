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
import { MdArrowDropDown } from 'react-icons/md';
import MultiRangeSlider from '../Layout/MultiRangeSlider/MultiRangeSlider.jsx';

export default function FilterBarDrawer(props) {
  let dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { totalCart } = useSelector((state) => state.cart);
  const location = useLocation();
  const pathname = location.pathname;
  const text = props.value;
  const priceRange = props.priceRange || false;
  // const handleInput = (e) => {
  //   props.setMinValue(e.minValue);
  //   props.setMaxValue(e.maxValue);
  // };

  return (
    <>
      <div className="drawer drawer-end">
        <input
          id="my-drawer-filter"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full flex  relative">
            <div className="flex w-full justify-center">
              <input
                // ref={text}
                type="text"
                placeholder="Search"
                value={props.value}
                className="input input-bordered w-full  mr-3"
                onChange={(e) => {
                  // if (e.target.value.length > 2 || e.target.value.length === 0)
                  props?.setSearch(e.target.value);
                }}
              />

              {pathname === '/' ? (
                ''
              ) : (
                <div className="dropdown dropdown-end hidden md:block mr-3">
                  <label tabIndex={1} className="btn btn-primary text-white">
                    <div className="flex items-center">
                      <div className="w-20">Sort by</div>
                      <MdArrowDropDown size={25} />
                    </div>
                  </label>
                  <ul
                    tabIndex={1}
                    className="menu dropdown-content z-5 p-2 shadow bg-base-100 rounded-box w-52 mt-4"
                  >
                    {props.option.map((value, index) => {
                      return (
                        <li key={`DD${index}`}>
                          <div
                            onClick={() => {
                              props?.setSortType(value.sortType);
                              props?.setSortOrder(value.sortOrder);
                            }}
                          >
                            {value.text}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              <div className="hidden md:block">
                {/* <div className="flex items-start">
            <div>Price range: min =</div>
            <div className="flex flex-col">
              <input type="text" value={`Rp.${props.minPrice}`} />
              <input
                type="range"
                min={0}
                max="100"
                value={props.minPrice}
                className="range range-xs w-40"
                onChange={(e) => {
                  props.setMinPrice(e.target.value);
                }}
              />
            </div>
            <div>max =</div>
          </div> */}
                {priceRange ? (
                  <div className="dropdown dropdown-end hidden md:block">
                    <label tabIndex={1} className="btn btn-primary text-white">
                      <div className="flex items-center">
                        <div className="w-20">Price</div>
                        <MdArrowDropDown size={25} />
                      </div>
                    </label>
                    <ul
                      tabIndex={1}
                      className="menu dropdown-content z-5 p-2 shadow bg-base-100 rounded-box w-[400px] mt-4"
                    >
                      <>
                        <div className="w-full h-20 flex justify-center mt-3">
                          <div className="text-center">Min price</div>
                          <div className="px-3">
                            <MultiRangeSlider
                              min={0}
                              max={1000000}
                              onChange={({ min, max }) => {
                                props?.setMinPrice(min);
                                props?.setMaxPrice(max);
                              }}
                            />
                          </div>
                          <div className="text-center">Max price</div>
                        </div>
                      </>
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex-none md:hidden">
              <label
                htmlFor="my-drawer-filter"
                className="btn btn-square btn-ghost"
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
          </div>
        </div>
        <div className="drawer-side z-10">
          <label htmlFor="my-drawer-filter" className="drawer-overlay"></label>
          <ul className="menu gap-2 p-4 h-full bg-base-200">
            {/* Sidebar content here */}
            {props.option.map((value, index) => {
              return (
                <li key={`side${index}`}>
                  <div
                    onClick={() => {
                      props?.setSortType(value.sortType);
                      props?.setSortOrder(value.sortOrder);
                    }}
                  >
                    {value.text}
                  </div>
                </li>
              );
            })}
            {priceRange ? (
              <>
                <div className="pl-4">Price range</div>
                <div className="w-full h-20 flex justify-center">
                  <div className="px-3">
                    <MultiRangeSlider
                      min={0}
                      max={1000000}
                      onChange={({ min, max }) => {
                        props?.setMinPrice(min);
                        props?.setMaxPrice(max);
                      }}
                    />
                  </div>
                </div>
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </>
  );
}
