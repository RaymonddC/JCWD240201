import { createSlice } from '@reduxjs/toolkit';
import { getAllCategoriesAPI } from '../../API/categoryAPI';

const initialState = {
  categories: null,
  isSubmitting: false,
  search: '',
  loadCategory: true,
};

export const CategorySlice = createSlice({
  name: 'Category',
  initialState,
  reducers: {
    categories: (initialState, action) => {
      initialState.categories = action.payload;
    },
    setSearch: (initialState, action) => {
      initialState.search = action.payload;
    },
    setLoadCategory: (initialState, action) => {
      initialState.loadCategory = action.payload;
    },
  },
});

export const getAllCategories =
  (search_category = '') =>
  async (dispatch) => {
    try {
      dispatch(setLoadCategory(true));
      let response = await getAllCategoriesAPI(search_category);
      if (response.data.success) {
        dispatch(categories(response?.data?.data));
        dispatch(setLoadCategory(false));
      }
    } catch (error) {}
  };

export const { categories, setSearch, setLoadCategory } = CategorySlice.actions;
export default CategorySlice.reducer;
