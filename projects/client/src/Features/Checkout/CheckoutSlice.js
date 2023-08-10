import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { checkoutAPI, getCourierService } from '../../API/checkoutAPI';

const initialState = {
  courierServices: [],
  shippingFee: 0,
};

export const CheckoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCourierServices: (initialState, action) => {
      initialState.courierServices = action.payload;
    },
    setShippingFee: (initialState, action) => {
      initialState.shippingFee = action.payload;
    },
  },
});

export const getCourierServiceSlice = (data) => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');
    dispatch(setCourierServices([]));
    const result = await getCourierService(data, token);
    if (result.data.success) {
      dispatch(setCourierServices(result.data.data[0].costs));
    }
  } catch (error) {
    if (error.response.data.message === 'jwt malformed')
      return toast.error('Please log in first');
    return toast.error(error.message);
  }
};

export const checkoutTxSlice = (values) => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');

    console.log(values);
    process.exit();
    await checkoutAPI(values, token);

    toast.success('Checkout Success');
    return true;
  } catch (error) {
    return toast.error(error.message);
  }
};

export const { setCourierServices, setShippingFee } = CheckoutSlice.actions;

export default CheckoutSlice.reducer;
