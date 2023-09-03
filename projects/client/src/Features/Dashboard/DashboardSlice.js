import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  getAllTransactionStatusTotalAPI,
  getTodayRevenueAPI,
  getTodayTransactionAPI,
  getTodayUserAPI,
} from '../../API/dashboardAPI';
import { getRevenueAPI } from '../../API/salesReportAPI';
import moment from 'moment';

const initialState = {
  revenue: {},
  totalTransaction: {},
  totalUser: {},
  transactionStatusTotal: [],
  totalRevenue: [],
};

export const DashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setTodayRevenue: (initialState, action) => {
      initialState.revenue = action.payload;
    },
    setTodayTransaction: (initialState, action) => {
      initialState.totalTransaction = action.payload;
    },
    setTodayUser: (initialState, action) => {
      initialState.totalUser = action.payload;
    },
    setTransactionStatusTotal: (initialState, action) => {
      initialState.transactionStatusTotal = action.payload;
    },
    setTotalRevenue: (initialState, action) => {
      initialState.totalRevenue = action.payload;
    },
  },
});

export const getDashboardDataSlice = (query) => async (dispatch) => {
  try {
    const { today_date } = query;
    let token = localStorage.getItem('token');
    const revenue = await getTodayRevenueAPI(token, { today_date });

    const totalTransaction = await getTodayTransactionAPI(token, {
      today_date,
    });
    const totalUser = await getTodayUserAPI(token, { today_date });

    const getAllTransactionStatusTotal = await getAllTransactionStatusTotalAPI(
      token,
    );

    const currentDate = new Date();
    const currentDateMonth = currentDate.getMonth();
    const currentDateyear = currentDate.getFullYear();
    const start_date = moment([currentDateyear, currentDateMonth]).format(
      'YYYY-MM-DD',
    );
    const end_date = moment(start_date).endOf('month').format('YYYY-MM-DD');

    const getTotalTransaction = await getRevenueAPI(token, {
      start_date,
      end_date,
    });

    if (
      revenue.data.success &&
      totalTransaction.data.success &&
      totalUser.data.success &&
      getAllTransactionStatusTotal.data.success &&
      getTotalTransaction.data.success
    ) {
      dispatch(setTodayRevenue(revenue.data.data));
      dispatch(setTodayTransaction(totalTransaction.data.data));
      dispatch(setTodayUser(totalUser.data.data));
      dispatch(
        setTransactionStatusTotal(getAllTransactionStatusTotal.data.data),
      );
      dispatch(setTotalRevenue(getTotalTransaction.data.data));
    }
  } catch (error) {
    return toast.error(error?.response?.data?.message);
  }
};

export const {
  setTodayRevenue,
  setTodayTransaction,
  setTodayUser,
  setTransactionStatusTotal,
  setTotalRevenue,
} = DashboardSlice.actions;

export default DashboardSlice.reducer;
