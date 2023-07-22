import { createSlice } from '@reduxjs/toolkit';
import { getAllProductsAPI } from '../../API/productAPI';

const initialState = {
  products: null,
  isSubmitting: false,
};

export const ProductSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {
    products: (initialState, action) => {
      // console.log(action.payload);
      initialState.products = action.payload;
    },
    // page: (initialState, action) => {
    //   initialState.page = action.payload;
    // },
  },
});

export const getProducts = (data) => async (dispatch) => {
  try {
    let response = await getAllProductsAPI({
      page: data.page,
      limit: data.limit,
      search: data.search,
      category: data.category,
    });
    // console.log(response?.data.data);
    dispatch(products(response?.data));
  } catch (error) {
    console.log(error);
  }
};

// export const nextPage = (data) => (dispatch) => {
//   const currentPage = data.page;
//   const totalPages = data.totalPages;
//   const nextPage = currentPage >= totalPages ? totalPages : currentPage + 1;
//   dispatch(page(nextPage));
// };

// export const prevPage = (data) => (dispatch) => {
//   const currentPage = data.page;
//   const prefPage = currentPage <= 0 ? 0 : currentPage - 1;
//   dispatch(page(prefPage));
// };

export const { products, page } = ProductSlice.actions;
export default ProductSlice.reducer;
