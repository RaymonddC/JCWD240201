import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  createPrescriptionCartProductAPI,
  deletePrescriptionCartProductAPI,
  getPrescriptionCartProductListAPI,
  updatePrescriptionCartProductAPI,
} from '../../API/prescriptionCartAPI';

const initialState = {
  prescriptionCartProductList: [],
};

export const AddressSlice = createSlice({
  name: 'prescriptionCart',
  initialState,
  reducers: {
    setPrescriptionCartProductList: (initialState, action) => {
      initialState.prescriptionCartProductList = action.payload;
    },
  },
});

export const getPrescriptionCartProductListSlice =
  (cart_id) => async (dispatch) => {
    try {
      let token = localStorage.getItem('token');

      const response = await getPrescriptionCartProductListAPI(token, cart_id);

      dispatch(setPrescriptionCartProductList(response?.data?.data));
    } catch (error) {}
  };

export const createPrescriptionCartProductSlice =
  (cart_id, data) => async (dispatch) => {
    try {
      let token = localStorage.getItem('token');

      console.log(data);

      const response = await createPrescriptionCartProductAPI(token, data);
      if (response.data.success)
        dispatch(getPrescriptionCartProductListSlice(cart_id));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

export const updatePrescriptionCartProductSlice =
  (cart_id, id, data) => async (dispatch) => {
    try {
      let token = localStorage.getItem('token');

      console.log(data);

      const response = await updatePrescriptionCartProductAPI(token, id, data);
      if (response.data.success)
        dispatch(getPrescriptionCartProductListSlice(cart_id));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

export const deletePrescriptionCartProductSlice =
  (cart_id, id) => async (dispatch) => {
    try {
      let token = localStorage.getItem('token');

      const response = await deletePrescriptionCartProductAPI(token, id);
      if (response.data.success)
        dispatch(getPrescriptionCartProductListSlice(cart_id));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

export const { setPrescriptionCartProductList } = AddressSlice.actions;

export default AddressSlice.reducer;
