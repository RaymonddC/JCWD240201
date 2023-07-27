import React, { useState, useEffect } from 'react';
import MenuBarMobile from '../Components/Layout/MenuBarMobile';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../Components/Transaction/SearchBar';
import TransactionCard from '../Components/Transaction/TransactionCard';
import { getAllTxStatus } from '../Features/TransactionStatus/TransactionStatusSlice';
import DateRangePicker from '../Components/Transaction/DateRangePicker';
import FilterBar from '../Components/Products/FilterBar';
import useDebounce from '../Hooks/useDebounce';

const Transaction = () => {
  let token = localStorage.getItem('token');
  const dispatch = useDispatch();

  const { txStatuses } = useSelector((state) => state.txStatus);
  console.log(txStatuses, '1');
  const windowLoc = window.location.pathname;
  if (!token) return <Navigate to={'/login'} />;
  const [search, setSearch] = useState('');
  const debouncedSearchValue = useDebounce(search, 1500);

  useEffect(() => {
    dispatch(getAllTxStatus());
  }, [debouncedSearchValue]);

  return (
    <div className="w-full max-w-[736px] lg:max-w-[776px] lg:p-4 rounded-lg">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <MenuBarMobile />
          <h3 className="text-[20px] lg:text-[23px] font-bold">
            My Transaction
          </h3>
        </div>
      </div>
      <div className="text-[16px] shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-lg p-4">
        <div className="sticky z-10 top-0 py-3 bg-white">
          <div className="top flex items-center justify-between">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-full md:w-fit   mx-3"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <DateRangePicker />
          </div>
          <div className="status flex overflow-scroll">
            {/* <span className="font-bold">Status</span> */}
            {txStatuses.map((value) => {
              return (
                <div
                  className={`statusses flex-1 text-center border-b-4 px-2  py-3 flex justify-center  items-center ${
                    windowLoc === value.status ? 'border-blue-500' : ''
                  }`}
                  onClick={() => (queryParams['status'] = value.status)}
                >
                  <div className="status items-center">{value.status}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="div ">
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
