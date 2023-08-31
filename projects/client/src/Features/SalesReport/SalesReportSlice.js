import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  getRevenueAPI,
  getTopSaleAPI,
  getTotalTransactionAPI,
  getTotalUserAPI,
} from '../../API/salesReportAPI';

const initialState = {
  revenue: [],
  totalTransaction: [],
  totalUser: [],
  topSale: [],
};

export const SalesReportSlice = createSlice({
  name: 'salesReport',
  initialState,
  reducers: {
    setRevenue: (initialState, action) => {
      initialState.revenue = action.payload;
    },
    setTotalTransaction: (initialState, action) => {
      initialState.totalTransaction = action.payload;
    },
    setTotalUser: (initialState, action) => {
      initialState.totalUser = action.payload;
    },
    setTopSale: (initialState, action) => {
      initialState.topSale = action.payload;
    },
  },
});

export const getSalesReportSlice = (query) => async (dispatch) => {
  try {
    const { startDate, endDate, sortType, sortOrder, today_date } = query;
    let token = localStorage.getItem('token');
    const revenue = await getRevenueAPI(
      token,
      today_date
        ? { today_date }
        : {
            start_date: startDate,
            end_date: endDate,
            sort_type: sortType === 'transaction' ? 'today_revenue' : 'date',
            sort_order: sortOrder,
          },
    );
    const totalTransaction = await getTotalTransactionAPI(
      token,
      today_date
        ? { today_date }
        : {
            start_date: startDate,
            end_date: endDate,
            sort_type:
              sortType === 'transaction' ? 'total_transaction' : 'date',
            sort_order: sortOrder,
          },
    );
    const totalUser = await getTotalUserAPI(
      token,
      today_date
        ? { today_date }
        : {
            start_date: startDate,
            end_date: endDate,
            sort_type: sortType === 'transaction' ? 'total_user' : 'date',
            sort_order: sortOrder,
          },
    );

    if (
      revenue.data.success &&
      totalTransaction.data.success &&
      totalUser.data.success
    ) {
      dispatch(setRevenue(revenue.data.data));
      dispatch(setTotalTransaction(totalTransaction.data.data));
      dispatch(setTotalUser(totalUser.data.data));
    }
  } catch (error) {
    return toast.error(error?.response?.data?.message);
  }
};

export const getTopSaleSlice = (query) => async (dispatch) => {
  try {
    const { startDate, endDate } = query;
    let token = localStorage.getItem('token');
    const response = await getTopSaleAPI(token, {
      start_date: startDate,
      end_date: endDate,
    });

    if (response.data.success) {
      dispatch(setTopSale(response.data.data));
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const { setRevenue, setTotalTransaction, setTotalUser, setTopSale } =
  SalesReportSlice.actions;

export default SalesReportSlice.reducer;
