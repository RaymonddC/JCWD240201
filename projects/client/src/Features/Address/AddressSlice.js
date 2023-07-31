import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  getCity,
  getCityUser,
  getProvince,
  getUserAddress,
} from '../../API/addressAPI';

const initialState = {
  address: [],
  loadAddress: null,
  province: [],
  city: [],
  editAddressData: {},
  selectedAddress: {},
  cityUser: {},
};

export const AddressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddress: (initialState, action) => {
      initialState.address = action.payload;
    },
    setloadAddress: (initialState, action) => {
      initialState.loadAddress = action.payload;
    },
    setProvince: (initialState, action) => {
      initialState.province = action.payload;
    },
    setCity: (initialState, action) => {
      initialState.city = action.payload;
    },
    setEditAddressData: (initialState, action) => {
      initialState.editAddressData = action.payload;
    },
    setSelectedAddress: (initialState, action) => {
      initialState.selectedAddress = action.payload;
    },
    setCityUser: (initialState, action) => {
      initialState.cityUser = action.payload;
    },
  },
});

export const getUserAddressAsync = () => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');
    dispatch(setloadAddress(true));
    const result = await getUserAddress(token);
    if (result.data.success) {
      dispatch(setCityUser({}));
      dispatch(setloadAddress(false));
      dispatch(setAddress(result.data.data));
      dispatch(setSelectedAddress(result?.data?.data[0]));
    }
  } catch (error) {
    if (error.response.data.message === 'jwt malformed')
      return toast.error('Please log in first');
    return toast.error(error.message);
  }
};

export const getProvinceAsync = () => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');

    const response = await getProvince(token);

    dispatch(setProvince(response.data.data));
  } catch (error) {}
};

export const getCityAsync = (province_id) => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');

    const response = await getCity(province_id, token);

    dispatch(setCity(response.data.data));
  } catch (error) {
    toast.error(error.message);
  }
};

export const getCityUserSlice = (city_id) => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');

    const response = await getCityUser(city_id, token);

    dispatch(setCityUser(response.data.data));
  } catch (error) {
    toast.error(error.message);
  }
};

export const {
  setAddress,
  setloadAddress,
  setProvince,
  setCity,
  setEditAddressData,
  setSelectedAddress,
  setCityUser,
} = AddressSlice.actions;

export default AddressSlice.reducer;
