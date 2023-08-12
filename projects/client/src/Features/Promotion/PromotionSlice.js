import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  promotions: [],
  promotion: {},
};

export const PromotionSlice = createSlice({
  name: 'promotion',
  initialState,
  reducers: {
    onGetData: (initialState, action) => {
      initialState.promotions = action.payload;
    },
  },
});

export const getPromotionsSlice = () => async (dispatch) => {
  try {
    // let token = localStorage.getItem('token');
    // if (!token) {
    //   throw { message: 'No User' };
    // }
    // let { data } = await getUserCarts(token);
    // dispatch(onGetData(data));
  } catch (error) {
    console.log(error);
  }
};

export const {
  onGetData,
  getCurrentCart,
  setPrescriptionCarts,
  setDetailprescriptionCart,
} = PromotionSlice.actions;

export default PromotionSlice.reducer;
