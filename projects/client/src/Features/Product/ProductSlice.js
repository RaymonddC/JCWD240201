import { createSlice } from '@reduxjs/toolkit';
import {
  getAllLabelsAPI,
  getAllProductsAPI,
  getProductDetailsAPI,
  getPackagingType,
  getProductType,
} from '../../API/productAPI';

const initialState = {
  products: null,
  isSubmitting: false,
  packagingType: null,
  productType: null,
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
    packagingType: (initialState, action) => {
      initialState.packagingType = action.payload;
    },
    productType: (initialState, action) => {
      initialState.packagingType = action.payload;
    },
  },
});

export const getProducts = (data) => async (dispatch) => {
  try {
    let response = await getAllProductsAPI({
      page: data.page,
      limit: data.limit,
      search: data.search,
      sortType: data.sortType,
      sortOrder: data.sortOrder,
    });
    console.log(response?.data.data);
    dispatch(products(response?.data));
  } catch (error) {
    console.log(error);
  }
};
export const getProductDetails = (data) => async (dispatch) => {
  try {
    let response = await getProductDetailsAPI({ id: data.id });
    dispatch(products(response?.data));
  } catch (error) {
    console.log(error);
  }
};

export const getLabels = (data) => async (dispatch) => {
  try {
    let response = await getAllLabelsAPI({
      page: data.page,
      limit: data.limit,
      search: data.search,
      sortType: data.sortType,
      sortOrder: data.sortOrder,
      category: data.category,
    });

    console.log(response);
    dispatch(products(response?.data));
  } catch (error) {
    console.log(error);
  }
};

export const getproductLabel = (data) => async (dispatch) => {
  try {
  } catch (error) {}
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

export const getPackaging = () => async (dispatch) => {
  const result = await getPackagingType();
  dispatch(packagingType(result.data.data));
};

export const getType = () => async (dispatch) => {
  const result = await getProductType();
  dispatch(productType(result.data.data));
};

export const { products, page, packagingType, productType } =
  ProductSlice.actions;
export default ProductSlice.reducer;
