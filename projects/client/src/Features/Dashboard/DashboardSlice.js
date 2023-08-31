import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  getAllTransactionStatusTotalAPI,
  getTodayRevenueAPI,
  getTodayTransactionAPI,
  getTodayUserAPI,
} from '../../API/dashboardAPI';

const initialState = {
  revenue: {},
  totalTransaction: {},
  totalUser: {},
  transactionStatusTotal: [],
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

    if (
      revenue.data.success &&
      totalTransaction.data.success &&
      totalUser.data.success &&
      getAllTransactionStatusTotal.data.success
    ) {
      dispatch(setTodayRevenue(revenue.data.data));
      dispatch(setTodayTransaction(totalTransaction.data.data));
      dispatch(setTodayUser(totalUser.data.data));
      dispatch(
        setTransactionStatusTotal(getAllTransactionStatusTotal.data.data),
      );
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
} = DashboardSlice.actions;

export default DashboardSlice.reducer;
