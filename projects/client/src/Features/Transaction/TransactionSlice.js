import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  deleteCart,
  getUserCarts,
  postCart,
  updateCart,
} from '../../API/cartAPI';
// import UrlApi from '../../Supports/Constants/URLAPI';

const initialState = {
  carts: [],
  totalCart: 0,
  activeCart: 0,
  totalPrice: 0,
};

export const TransactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    onGetData: (initialState, action) => {
      initialState.carts = action.payload.data;
      initialState.totalCart = action.payload.totalCart;
      initialState.activeCart = action.payload.activeCart;
      initialState.totalPrice = action.payload.totalPrice;
    },
  },
});

export const { onGetData } = TransactionSlice.actions;

export default TransactionSlice.reducer;
