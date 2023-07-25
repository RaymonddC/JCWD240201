import { createSlice } from '@reduxjs/toolkit';
import { getAllCategoriesAPI } from '../../API/categoryAPI';


const initialState = {
  categories: null,
  isSubmitting: false,
};

export const CategorySlice = createSlice({
  name: 'Category',
  initialState,
  reducers: {
    categories: (initialState, action) => {
      console.log(action.payload);
      initialState.categories = action.payload;
    },
  },
});

export const getAllCategories = (data) => async (dispatch) => {
  try {
    let response = await getAllCategoriesAPI();
    console.log(response?.data.data);
    dispatch(categories(response?.data.data));
  } catch (error) {
    console.log(error);
  }
};

export const { categories } = CategorySlice.actions;
export default CategorySlice.reducer;
