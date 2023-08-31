import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { getPromotionAPI } from '../../API/promotionAPI';

const initialState = {
  promotions: [],
  promotion: null,
};

export const PromotionSlice = createSlice({
  name: 'promotion',
  initialState,
  reducers: {
    onGetData: (initialState, action) => {
      initialState.promotions = action.payload.data.rows;
    },
  },
});

export const getPromotionsSlice = (values) => async (dispatch) => {
  try {
    let { data } = await getPromotionAPI(values);
    dispatch(onGetData(data));
  } catch (error) {
    toast.error(error.message);
  }
};

export const { onGetData } = PromotionSlice.actions;

export default PromotionSlice.reducer;
