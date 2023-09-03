import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdArrowDropDown } from 'react-icons/md';
import MultiRangeSlider from '../Layout/MultiRangeSlider/MultiRangeSlider.jsx';
import { MdAdd } from 'react-icons/md';

export default function FilterBarDrawer(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const priceRange = props.priceRange || false;
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="drawer drawer-end">
        <input
          readOnly
          checked={open}
          id="my-drawer-filter"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full flex  relative">
            <div className="flex w-full ">
              <input
                // ref={text}
                type="text"
                placeholder="Search"
                value={props.value}
                className="input input-bordered w-full  mr-3"
                onChange={(e) => {
                  props?.setSearch(e.target.value);
                }}
              />

              {pathname === '/' ? (
                ''
              ) : (
                <div className="dropdown dropdown-end hidden md:block ">
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
              {priceRange ? (
                <div className="hidden md:block ml-3">
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
                </div>
              ) : null}
              {props.add ? (
                <div className="hidden md:block  self-center ml-3">
                  <div
                    className="flex justify-center items-center bg-primary w-10 h-10 lg:w-12 lg:h-12 rounded-full hover:cursor-pointer"
                    onClick={() => navigate('/products/new')}
                  >
                    <MdAdd size={40} color="white" />
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex-none md:hidden">
              <label
                htmlFor="my-drawer-filter"
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
          </div>
        </div>
        <div className="drawer-side z-10">
          <label
            htmlFor="my-drawer-filter"
            className="drawer-overlay"
            onClick={() => setOpen(false)}
          ></label>
          <ul className="menu gap-2 p-4 h-full bg-base-200">
            {/* Sidebar content here */}
            {props.option.map((value, index) => {
              return (
                <li key={`side${index}`}>
                  <div
                    onClick={() => {
                      props?.setSortType(value.sortType);
                      props?.setSortOrder(value.sortOrder);
                      setOpen(false);
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
            {props.add ? (
              <li>
                <div onClick={() => navigate('/products/new')}>
                  <div className="flex justify-center items-center bg-primary w-10 h-10 lg:w-12 lg:h-12 rounded-full hover:cursor-pointer">
                    <MdAdd size={40} color="white" />
                  </div>
                  Add product
                </div>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </>
  );
}
