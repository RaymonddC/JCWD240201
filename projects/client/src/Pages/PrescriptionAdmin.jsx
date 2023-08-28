import { MdArrowDropDown } from 'react-icons/md';
import PrescriptionCard from '../Components/Prescription/PrescriptionCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllPrescriptionsCartsSlice } from '../Features/Cart/CartSlice';
import useDebounce from '../Hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../Components/Layout/Pagination';

export default function PrescriptionAdmin() {
  const dispatch = useDispatch();
  let queryParams = {};
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [search, setSearch] = useState(searchParams.get('searchUser') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  const [confirmation, setConfirmation] = useState(
    searchParams.get('confirmation') || '',
  );
  const debouncedSearchValue = useDebounce(search, 1000);

  const { prescriptionCarts } = useSelector((state) => state.cart);
  const { detailprescriptionCart } = useSelector((state) => state.cart);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchValue, confirmation, sort]);

  useEffect(() => {
    if (search) queryParams['searchUser'] = search;
    if (confirmation) queryParams['confirmation'] = confirmation;
    if (sort) queryParams['sort'] = sort;
    if (page) queryParams['page'] = page;
    setSearchParams(queryParams);
    dispatch(
      getAllPrescriptionsCartsSlice({
        search_user: debouncedSearchValue,
        confirmation: confirmation,
        sort: sort,
        page: page,
        limit: 5,
      }),
    );
  }, [debouncedSearchValue, confirmation, sort, page]);

  return (
    <div>
      <article className="prose">
        <h2>Prescription</h2>
      </article>
      <div className="flex justify-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search user"
          className="input input-bordered input-success w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="dropdown dropdown-end hidden md:block">
          <label tabIndex={0} className="btn btn-primary">
            Sort by <MdArrowDropDown size={25} />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
          >
            <li onClick={() => setSort('ASC')}>
              <div>Prescription new to old</div>
            </li>
            <li onClick={() => setSort('DESC')}>
              <div>Prescription old to new</div>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-end hidden md:block">
          <label tabIndex={0} className="btn btn-primary">
            Status <MdArrowDropDown size={25} />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
          >
            <li onClick={() => setConfirmation('null')}>
              <div>Waiting for Approval</div>
            </li>
            <li onClick={() => setConfirmation('true')}>
              <div>Accepted</div>
            </li>
            <li onClick={() => setConfirmation('false')}>
              <div>Rejected</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid gap-4 place-items-center mb-4">
        {prescriptionCarts?.rows?.map((value, index) => {
          return <PrescriptionCard data={value} key={index} />;
        })}
      </div>
      <Pagination
        setPage={setPage}
        page={page}
        totalPages={prescriptionCarts?.totalPage}
      />
    </div>
  );
}
