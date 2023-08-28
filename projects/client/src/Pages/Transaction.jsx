import React, { useState, useEffect } from 'react';
import MenuBarMobile from '../Components/Layout/MenuBarMobile';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../Components/Transaction/SearchBar';
import TransactionCard from '../Components/Transaction/TransactionCard';
import { getAllTxStatus } from '../Features/TransactionStatus/TransactionStatusSlice';
import DateRangePicker from '../Components/Transaction/DateRangePicker';
import FilterBar from '../Components/Products/FilterBar';
import useDebounce from '../Hooks/useDebounce';
import { getAllTransactionSlice } from '../Features/Transaction/TransactionSlice';
import Pagination from '../Components/Layout/Pagination';

export default function Transaction() {
  let token = localStorage.getItem('token');
  const dispatch = useDispatch();

  const { txStatuses } = useSelector((state) => state.txStatus);
  const { transactions, totalPages } = useSelector(
    (state) => state.transaction,
  );
  const [togle, setTogle] = useState(false);
  const [toggleDateRange, setToggleDateRange] = useState(false);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedStatus, setSelectedStatus] = useState('Waiting for payment');
  const [selectedStatusId, setSelectedStatusId] = useState(1);
  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  let queryParams = {};

  const debouncedSearchValue = useDebounce(search, 1500);

  useEffect(() => {
    dispatch(getAllTxStatus());
    // setSelectedStatus('Waiting for payment');
  }, []);

  useEffect(() => {
    if (Number(searchParams.get('page')) === page) {
      setPage(1);
      // queryParams['page'] = 1;
    }
    if (page) {
      queryParams['page'] = page;
    }
    if (debouncedSearchValue) {
      queryParams['search'] = debouncedSearchValue;
    }
    if (selectedStatus) queryParams['status'] = selectedStatus;
    setSearchParams(queryParams);
    dispatch(
      getAllTransactionSlice({
        selectedStatusId,
        debouncedSearchValue,
        page,
        limitPage: 5,
        date: range[0],
      }),
    );
  }, [page, debouncedSearchValue, togle, toggleDateRange, selectedStatusId]);

  //PaymentGateway
  useEffect(() => {
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';

    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;

    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY || '';
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  if (!token) return <Navigate to={'/login'} />;

  return (
    <div className="w-full max-w-[736px] lg:max-w-[776px] lg:p-4 rounded-lg">
      <div className="flex justify-between mb-4">
        <div className="flex lg:h-[48px] items-center">
          <MenuBarMobile />
          <h3 className="text-[20px] lg:text-[23px] font-bold">
            My Transaction
          </h3>
        </div>
      </div>
      <div className="text-[16px] shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-lg pb-4">
        <div className="sticky z-10 top-0 pt-7 pb-3 bg-white px-4 rounded-lg">
          <div className="top flex items-center justify-between">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-full md:w-fit   mx-3"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <DateRangePicker
              range={range}
              setRange={setRange}
              clickHandler={() => setToggleDateRange(!toggleDateRange)}
            />
          </div>
          <div className="status flex overflow-x-auto">
            {/* <span className="font-bold">Status</span> */}
            {txStatuses.map((value, index) => {
              return (
                <button
                  key={'txStatus' + value.id}
                  className={`statusses flex-1 text-center mb-2 border-b-4 px-2  py-3 flex justify-center  items-center min-w-[50%] md:min-w-[18%]  ${
                    selectedStatus === value.status
                      ? 'border-blue-500 font-bold hover:border-blue-500 '
                      : ''
                  } hover:border-blue-200 hover:font-bold`}
                  onClick={() => {
                    setSelectedStatusId(value.id);
                    setSelectedStatus(value.status);
                  }}
                >
                  <div className="status items-center">{value.status}</div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="div px-4 pb-4">
          {transactions.map((value) => {
            return (
              <TransactionCard
                tx={value}
                key={'tx' + value.id}
                setTogle={setTogle}
                togle={togle}
              />
            );
          })}
        </div>
      </div>
      {totalPages > 0 && (
        <div className="pagination ">
          <Pagination setPage={setPage} page={page} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
