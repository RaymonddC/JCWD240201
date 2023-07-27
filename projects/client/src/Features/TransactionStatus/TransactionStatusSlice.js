import { createSlice } from '@reduxjs/toolkit';
import { getAllTxStatusAPI } from '../../API/txStatusAPI';
import { toast } from 'react-hot-toast';

const initialState = {
  txStatuses: [],
  isSubmitting: false,
};

export const TransactionStatusSlice = createSlice({
  name: 'txStatus',
  initialState,
  reducers: {
    onGetData: (initialState, action) => {
      initialState.txStatuses = action.payload;
    },
  },
});

export const getAllTxStatus = () => async (dispatch) => {
  try {
    let { data } = await getAllTxStatusAPI();
    dispatch(onGetData(data.data));
  } catch (error) {
    toast.error(error);
  }
};

export const { onGetData } = TransactionStatusSlice.actions;
export default TransactionStatusSlice.reducer;
