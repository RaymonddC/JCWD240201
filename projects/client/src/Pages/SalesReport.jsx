import { useEffect, useRef, useState } from 'react';
import DateRangePicker from '../Components/Transaction/DateRangePicker';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSalesReportSlice,
  getTopSaleSlice,
} from '../Features/SalesReport/SalesReportSlice';
import { useReactToPrint } from 'react-to-print';
import { useSearchParams } from 'react-router-dom';
import { formatDate, formatDateParams } from '../Helper/formatDateHelper';
import ExcelDownload from '../Components/SalesReport/ExcelDownload';
import { DropdownSortSales } from '../Components/SalesReport/DropdownSortSales';
import { TableTopSales } from '../Components/SalesReport/TableTopSales';
import '../utils/print-style.css';
import NewChart from '../Components/SalesReport/NewChart';
// import BarChart from '../Components/SalesReport/BarChart';

export default function SalesReport() {
  const dispatch = useDispatch();
  const chartAndTable = useRef();
  const { revenue, totalTransaction, totalUser } = useSelector(
    (state) => state.salesReport,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  let queryParams = {};
  const [toggle, setToggle] = useState(false);
  const [sortType, setSortType] = useState(
    searchParams.get('sortType') || 'date',
  );
  const [sortOrder, setSortOrder] = useState(
    searchParams.get('sortOrder') || 'ASC',
  );
  const [range, setRange] = useState([
    {
      startDate: new Date(searchParams.get('startDate') || '2023-07-01'),
      endDate: new Date(searchParams.get('endDate') || '2023-07-31'),
      key: 'selection',
    },
  ]);

  useEffect(() => {
    if (range[0].startDate)
      queryParams['startDate'] = formatDateParams(range[0].startDate);
    if (range[0].endDate)
      queryParams['endDate'] = formatDateParams(range[0].endDate);
    if (sortType) queryParams['sortType'] = sortType;
    if (sortOrder) queryParams['sortOrder'] = sortOrder;
    setSearchParams(queryParams);
    dispatch(
      getSalesReportSlice({
        startDate: range[0]?.startDate,
        endDate: range[0]?.endDate,
        sortType,
        sortOrder,
      }),
    );
    dispatch(
      getTopSaleSlice({
        startDate: range[0]?.startDate,
        endDate: range[0]?.endDate,
      }),
    );
  }, [toggle]);

  const PrintHandler = useReactToPrint({
    content: () => chartAndTable?.current,
    documentTitle: 'sales',
    // onAfterPrint: () => alert('Print Success'),
  });

  const sortHandler = (type, order) => {
    setSortType(type);
    setSortOrder(order);
    if (range[0].startDate)
      queryParams['startDate'] = formatDateParams(range[0].startDate);
    if (range[0].endDate)
      queryParams['endDate'] = formatDateParams(range[0].endDate);
    queryParams['sortType'] = type;
    queryParams['sortOrder'] = order;
    setSearchParams(queryParams);
    dispatch(
      getSalesReportSlice({
        startDate: range[0]?.startDate,
        endDate: range[0]?.endDate,
        sortType: type,
        sortOrder: order,
      }),
    );
  };

  return (
    <>
      <h1 className="font-bold text-xl mb-4">Sales Report</h1>

      <div className="w-full flex justify-center mb-4 gap-2">
        <div className="flex items-center">
          <DateRangePicker
            range={range}
            setRange={setRange}
            clickHandler={() => setToggle(!toggle)}
          />
        </div>
        <DropdownSortSales sortHandler={sortHandler} />
        <button className="btn btn-primary text-white" onClick={PrintHandler}>
          Print
        </button>
        <ExcelDownload />
      </div>

      <div
        ref={chartAndTable}
        className="w-full flex flex-col gap-4 react-printable-parent"
      >
        <div className="w-full rounded-lg shadow-xl p-4 bg-white react-print">
          <h1 className="ml-[65px] font-bold text-lg mb-4">Revenue</h1>
          <div className="h-[340px] bar-chart">
            <NewChart
              data={revenue}
              dataKey="today_revenue"
              label="Today Revenue"
            />
          </div>
        </div>
        <div className="w-full rounded-lg shadow-xl p-4 bg-white">
          <h1 className="ml-[65px] font-bold text-lg mb-4">Transaction</h1>
          <div className="w-full h-[340px] min-w-[0px]">
            <NewChart
              data={totalTransaction}
              dataKey="total_transaction"
              label="Total Transaction"
            />
          </div>
        </div>
        <div className="w-full rounded-lg shadow-xl p-4  bg-white">
          <h1 className="ml-[65px] font-bold text-lg mb-4">User</h1>
          <div className="w-full h-[340px]">
            <NewChart
              data={totalUser}
              dataKey="total_user"
              label="Total User"
            />
          </div>
        </div>
        <div className="w-full overflow-x-auto rounded-lg shadow-lg p-4 bg-white">
          <h1 className="ml-[65px] font-bold text-lg mb-4 ">
            Top Sales Product
          </h1>
          <TableTopSales />
        </div>
      </div>
    </>
  );
}
