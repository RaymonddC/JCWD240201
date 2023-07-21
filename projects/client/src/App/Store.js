import { configureStore } from '@reduxjs/toolkit';

import UserReducer from '.././Features/User/UserSlice';
import QnAReducer from '.././Features/QnA/QnASlice';
import ProductReducer from '.././Features/Product/ProductSlice';

export const Store = configureStore({
  reducer: {
    user: UserReducer,
    QnA: QnAReducer,
    products: ProductReducer,
  },
});
