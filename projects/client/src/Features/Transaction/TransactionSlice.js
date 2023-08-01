import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  deleteCart,
  getUserCarts,
  postCart,
  updateCart,
} from '../../API/cartAPI';
import { getUserTransactions } from '../../API/transactionAPI';
// import UrlApi from '../../Supports/Constants/URLAPI';

const initialState = {
  transactions: [],
};

export const TransactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    onGetData: (initialState, action) => {
      initialState.transactions = action.payload.data;
    },
  },
});

export const getAllTransactionSlice = (values) => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');

    const { data } = await getUserTransactions(token);

    dispatch(onGetData(data));
  } catch (error) {
    return toast.error(error.message);
  }
};

export const { onGetData } = TransactionSlice.actions;

export default TransactionSlice.reducer;
