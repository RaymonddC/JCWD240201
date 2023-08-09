import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  deleteCart,
  getUserCarts,
  postCart,
  updateCart,
} from '../../API/cartAPI';
import { getTransaction, getUserTransactions } from '../../API/transactionAPI';
// import UrlApi from '../../Supports/Constants/URLAPI';

const initialState = {
  transactions: [],
  transaction: {},
  transactionDetails: [],
};

export const TransactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    onGetData: (initialState, action) => {
      initialState.transactions = action.payload.data;
    },
    onGetOne: (initialState, action) => {
      initialState.transaction = action.payload.data;
    },
    onGetTxDetails: (initialState, action) => {
      initialState.transactionDetails = action.payload.data;
    },
  },
});

export const getAllTransactionSlice = (values) => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');

    const { data } = await getUserTransactions(token, values);

    dispatch(onGetData(data));
  } catch (error) {
    return toast.error(error.message);
  }
};

export const getTransactionSlice = (values) => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');

    const { data } = await getTransaction(token, values.id);
    console.log(data);
    dispatch(onGetOne(data));
  } catch (error) {
    return toast.error(error.message);
  }
};

// export const getTransactionDetailSlice = (values) => async (dispatch) => {
//   try {
//     let token = localStorage.getItem('token');

//     const { data } = await getTransaction(token, values.id);
//     console.log(data);
//     dispatch(onGetOne(data));
//   } catch (error) {
//     return toast.error(error.message);
//   }
// };

export const { onGetData, onGetOne } = TransactionSlice.actions;

export default TransactionSlice.reducer;
