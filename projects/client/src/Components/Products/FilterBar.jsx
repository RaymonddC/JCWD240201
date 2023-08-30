import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdArrowDropDown } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../Features/Category/CategorySlice';
import { MdAdd } from 'react-icons/md';

export default function FilterBar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;

  // console.log(location);
  // const CategoryStore = useSelector((state) => state?.categories.categories);
  // console.log(CategoryStore?.data);
  // const categoriesMap = CategoryStore?.data?.map((value, index) => {
  //   return (
  //     <li key={`Category${index}`}>
  //       <div>{value.category_name}</div>
  //     </li>
  //   );
  // });
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  return (
    <>
      <div className="flex justify-center gap-2">
        <input
          // ref={text}
          type="text"
          placeholder="Search"
          value={props.value}
          className={
            props.add
              ? 'input input-bordered w-full max-w-2xl mx-3'
              : props.product
              ? 'input input-bordered w-full max-w-3xl mx-3'
              : 'input input-bordered w-full md:w-96 mx-3'
          }
          onChange={(e) => {
            // if (e.target.value.length > 2 || e.target.value.length === 0)
            props?.setSearch(e.target.value);
          }}
        />

        {pathname === '/' ? (
          ''
        ) : (
          <div className="dropdown dropdown-end hidden md:block">
            <label tabIndex={0} className="btn btn-primary text-white">
              Sort by <MdArrowDropDown size={25} />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
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
        {props.add ? (
          <div
            className="flex justify-center items-center bg-primary w-10 h-10 lg:w-12 lg:h-12 rounded-full hover:cursor-pointer"
            onClick={() => navigate('/products/new')}
          >
            <MdAdd size={40} color="white" />
          </div>
        ) : null}
      </div>
    </>
  );
}
