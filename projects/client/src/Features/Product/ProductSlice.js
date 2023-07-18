import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { createQuestionAPI, getQuestionsAPI } from '../../API/QnAAPI';
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
      initialState.questions = action.payload;
    },
  },
});

export const submitQuestion = (question) => async (dispatch) => {
  try {
    console.log(question);
    let response = await createQuestionAPI(question);
    if (response.data.success === true) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = (data) => async (dispatch) => {
  try {
    console.log('getProducts');
    let response = await getAllProducts({
      page: data.page,
      limit: data.limit,
      search: data.search,
      category: data.category,
    });
    console.log(response.data.data);
    dispatch(products(response));
  } catch (error) {
    console.log(error);
  }
};

export const { products } = ProductSlice.actions;
export default ProductSlice.reducer;
