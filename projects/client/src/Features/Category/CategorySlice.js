import { createSlice } from '@reduxjs/toolkit';
import { getAllCategoriesAPI } from '../../API/categoryAPI';

const initialState = {
  categories: null,
  isSubmitting: false,
  search: '',
};

export const CategorySlice = createSlice({
  name: 'Category',
  initialState,
  reducers: {
    categories: (initialState, action) => {
      console.log(action.payload);
      initialState.categories = action.payload;
    },
    setSearch: (initialState, action) => {
      initialState.search = action.payload;
    },
  },
});

export const getAllCategories =
  (search_category = '') =>
  async (dispatch) => {
    try {
      let token = localStorage.getItem('token');
      let response = await getAllCategoriesAPI(token, search_category);
      console.log(response?.data.data);
      dispatch(categories(response?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

export const { categories, setSearch } = CategorySlice.actions;
export default CategorySlice.reducer;
