import { Link } from 'react-router-dom';
import { MdArrowDropDown } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../Features/Category/CategorySlice';

export default function FilterBar(props) {
  const dispatch = useDispatch();
  const CategoryStore = useSelector((state) => state?.categories.categories);
  // console.log(CategoryStore?.data);
  const categoriesMap = CategoryStore?.data?.map((value, index) => {
    return (
      <li key={`Category${index}`}>
        <div>{value.category_name}</div>
      </li>
    );
  });
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  return (
    <>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full md:w-96 mx-3"
          onChange={(e) => {
            if (e.target.value.length > 2 || e.target.value.length === 0)
              props?.setSearch(e.target.value);
          }}
        />
        {/* <div className="dropdown dropdown-end border hidden md:block">
          <label tabIndex={0} className="btn btn-secondary">
            Category <MdArrowDropDown size={25} />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
          >
            {categoriesMap}
          </ul>
        </div> */}
        <div className="dropdown dropdown-end hidden md:block">
          <label tabIndex={0} className="btn btn-primary text-white">
            Sort by <MdArrowDropDown size={25} />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
          >
            {props.option.map((value) => {
              return (
                <li>
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
      </div>
    </>
  );
}
