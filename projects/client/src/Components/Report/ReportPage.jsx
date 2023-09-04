import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { useSearchParams } from 'react-router-dom';
import ExcelDownload from '../SalesReport/ExcelDownload';
import { DropdownSortSales } from '../SalesReport/DropdownSortSales';
import '../../utils/print-style.css';
import NewChart from '../SalesReport/NewChart';
import DateRangePicker from '../Transaction/DateRangePicker';
import {
  getSalesReportSlice,
  getTopSaleSlice,
} from '../../Features/SalesReport/SalesReportSlice';
import { TableTopSales } from '../SalesReport/TableTopSales';
import { formatDateParams } from '../../Helper/formatDateHelper';
import ChartSkeleton from '../Skeleton/ChartSkeleton';
import TopSalesSkl from '../Skeleton/TopSalesSkl';
import moment from 'moment';

export default function ReportPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const chartAndTable = useRef();
  const currentDate = new Date();
  const currentDateMonth = currentDate.getMonth();
  const currentDateyear = currentDate.getFullYear();
  const start_date = moment([currentDateyear, currentDateMonth]).format(
    'YYYY-MM-DD',
  );
  const end_date = moment(start_date).endOf('month').format('YYYY-MM-DD');
  const { revenue, totalTransaction, totalUser, loadCharts, loadTopSales } =
    useSelector((state) => state.salesReport);
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
      startDate: searchParams.get('startDate')
        ? new Date(searchParams.get('startDate'))
        : new Date(currentDateyear, currentDateMonth, 1),
      endDate: searchParams.get('endDate')
        ? new Date(searchParams.get('endDate'))
        : new Date(currentDateyear, currentDateMonth + 1, 0),
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
      <div className="flex flex-col gap-3">
        <article className="prose">
          <h2>Report</h2>
        </article>
        <button
          onClick={() => navigate('/report/stock_history')}
          className="btn btn-primary text-white"
        >
          Stock History
        </button>
      </div>

      <div className="mt-8">
        <div className="w-full flex justify-center mb-4 gap-2">
          <div className="flex items-center gap-2">
            <p className="font-bold hidden md:block h-[24px] w-[100px]">
              Filter Date
            </p>
            <DateRangePicker
              range={range}
              setRange={setRange}
              clickHandler={() => setToggle(!toggle)}
              salesReport
              styleInput="h-[50px] truncate max-w-[204px]"
            />
          </div>
          <DropdownSortSales sortHandler={sortHandler} />
          <button
            className="btn btn-primary text-white hidden md:block"
            onClick={PrintHandler}
          >
            Print
          </button>
          <ExcelDownload />
        </div>

        <div
          ref={chartAndTable}
          className="w-full flex flex-col gap-4 react-printable-parent"
        >
          {loadCharts ? (
            <ChartSkeleton limit={3} />
          ) : (
            <>
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
                <h1 className="ml-[65px] font-bold text-lg mb-4">
                  Transaction
                </h1>
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
            </>
          )}
          {loadTopSales ? (
            <TopSalesSkl limit={1} />
          ) : (
            <div className="w-full overflow-x-auto rounded-lg shadow-lg p-4 bg-white">
              <h1 className="ml-[65px] font-bold text-lg mb-4 ">
                Top Sales Product
              </h1>
              <TableTopSales />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
