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
  handleMidtransPaymentAPI,
  handleOnlinePaymentAPI,
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
  isProcessing: false,
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
    onProcess: (initialState, action) => {
      initialState.isProcessing = action.payload.data;
    },
  },
});

export const getAllTransactionSlice = (values) => async (dispatch) => {
  try {
    dispatch(onProcess(true));
    let token = localStorage.getItem('token');

    const { data } = await getUserTransactions(token, values);
    dispatch(onGetData(data));
  } catch (error) {
    toast.error(error.message);
  } finally {
    dispatch(onProcess(false));
  }
};
export const updateTransactionHistorySlice = (data) => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');
    const response = await updateUserTransactionHistoryAPI(token, data);
    // dispatch(getAllTransactionSlice())
    // dispatch(getAllTxStatus());
  } catch (error) {
    return toast.error(error.message);
  }
};
export const uploadPaymentSlice = (data) => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');
    const response = await uploadPaymentAPI(token, data);
    toast.success(response.data.message);
  } catch (error) {
    return toast.error(error.message);
  }
};

export const getTransactionSlice = (values) => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');

    const { data } = await getTransaction(token, values.id);
    dispatch(onGetOne(data));
  } catch (error) {
    return toast.error(error.message);
  }
};

// export const getTransactionDetailSlice = (values) => async (dispatch) => {
//   try {
//     let token = localStorage.getItem('token');

//     const { data } = await getTransaction(token, values.id);
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

export const handleMidtransPaymentSlice = (values) => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');
    // throw {};
    const { data } = await handleMidtransPaymentAPI(token, values);

    // dispatch(getAllTransactionSlice({ selectedStatusId: 1 }));
  } catch (error) {
    return toast.error(error.message);
  }
};

export const openMidtransSnapSlice = (values, navigate) => async (dispatch) => {
  try {
    let response;
    if (values.tokenMidtrans)
      window.snap.pay(values.tokenMidtrans, {
        onSuccess: async function (result) {
          response = await dispatch(handleMidtransPaymentSlice(result));
          navigate('/user/transaction');
          alert('payment success!');
        },
        onPending: async function (result) {
          navigate('/user/transaction');
          alert('wating your payment!');
        },
        onError: async function (result) {
          response = await dispatch(
            handleMidtransPaymentSlice({
              result,
              transactionId: values.transactionId,
            }),
          );
          alert('payment failed!');
        },
        onClose: async function () {
          // await dispatch(handleMidtransPaymentSlice(result));
          response = await dispatch(
            handleMidtransPaymentSlice({ transactionId: values.transactionId }),
          );
          navigate('/user/transaction');
          alert('you closed the popup without finishing the payment');
        },
      });
  } catch (error) {
    return toast.error(error.message);
  }
};

export const { onGetData, onGetOne, onProcess } = TransactionSlice.actions;

export default TransactionSlice.reducer;
