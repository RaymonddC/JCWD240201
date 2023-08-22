import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  deleteCart,
  getUserCarts,
  postCart,
  updateCart,
} from '../../API/cartAPI';
import {
  deleteTransaction,
  getTransaction,
  getUserTransactions,
  updateUserTransactionHistoryAPI,
  uploadPaymentAPI,
} from '../../API/transactionAPI';
import { getAllTxStatus } from '../TransactionStatus/TransactionStatusSlice';
import { async } from 'q';
// import UrlApi from '../../Supports/Constants/URLAPI';

const initialState = {
  transactions: [],
  transaction: {},
  transactionDetails: [],
  totalPages: null,
};

export const TransactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    onGetData: (initialState, action) => {
      initialState.transactions = action.payload.data;
      initialState.totalPages = action.payload.totalPage;
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
    console.log(data);
    dispatch(onGetData(data));
  } catch (error) {
    return toast.error(error.message);
  }
};
export const updateTransactionHistorySlice = (data) => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');
    const response = await updateUserTransactionHistoryAPI(token, data);
    // dispatch(getAllTransactionSlice())
    // dispatch(getAllTxStatus());
  } catch (error) {
    console.log(error);
    return toast.error(error.message);
  }
};
export const uploadPaymentSlice = (data) => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');
    const response = await uploadPaymentAPI(token, data);
    console.log(response);
    toast.success(response.data.message);
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

export const cancelTransaction = (values) => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');

    const { data } = await deleteTransaction(token, values.id);

    dispatch(getAllTransactionSlice({ selectedStatusId: 1 }));
  } catch (error) {
    return toast.error(error.message);
  }
};

export const { onGetData, onGetOne } = TransactionSlice.actions;

export default TransactionSlice.reducer;
