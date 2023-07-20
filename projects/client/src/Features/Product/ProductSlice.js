import { createSlice } from '@reduxjs/toolkit';
import { getAllProducts } from '../../API/productAPI';

const initialState = {
  products: null,
  isSubmitting: false,
};

export const ProductSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {
    products: (initialState, action) => {
      console.log(action.payload);
      initialState.products = action.payload;
    },
  },
});


export const getProducts = (data) => async (dispatch) => {
  try {
    console.log('getProducts');
    let response = await getAllProducts({
      page: data.page,
      limit: data.limit,
      search: data.search,
      category: data.category,
    });
    console.log(response?.data.data);
    dispatch(products(response?.data));
  } catch (error) {
    console.log(error);
  }
};

export const { products } = ProductSlice.actions;
export default ProductSlice.reducer;
