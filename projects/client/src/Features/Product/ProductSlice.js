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
  isLoad: false,
  productDropdown: [],
  productDetail: [],
};

export const ProductSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {
    products: (initialState, action) => {
      initialState.products = action.payload;
    },
    // page: (initialState, action) => {
    //   initialState.page = action.payload;
    // },
    packagingType: (initialState, action) => {
      initialState.packagingType = action.payload;
    },
    productType: (initialState, action) => {
      initialState.productType = action.payload;
    },
    setProductDropdown: (initialState, action) => {
      initialState.productDropdown = action.payload;
    },
    setProductDetail: (initialState, action) => {
      initialState.productDetail = action.payload;
    },
    setIsLoad: (initialState, action) => {
      initialState.isLoad = action.payload;
    },
  },
});

export const getProducts = (data) => async (dispatch) => {
  try {
    let response = await getAllProductsAPI(data);
    if (response.data.success) {
      dispatch(products(response?.data));
      dispatch(setProductDropdown(response?.data));
      dispatch(setIsLoad(false));
    }
  } catch (error) {
  }
};
export const getProductDetails = (data) => async (dispatch) => {
  try {
    let response = await getProductDetailsAPI({ id: data.id });
    console.log("🚀🚀🚀 ~ file: ProductSlice.js:62 ~ getProductDetails ~ response:", response)
    dispatch(products(response?.data));
    dispatch(setProductDetail(response?.data));
  } catch (error) {
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

    dispatch(products(response?.data));
  } catch (error) {
  }
};

export const getproductLabel = (data) => async (dispatch) => {
  try {
  } catch (error) {}
};

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

export const {
  products,
  page,
  packagingType,
  productType,
  setProductDropdown,
  setProductDetail,
  setIsLoad,
} = ProductSlice.actions;
export default ProductSlice.reducer;
