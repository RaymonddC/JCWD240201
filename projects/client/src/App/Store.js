import { configureStore } from '@reduxjs/toolkit';

import UserReducer from '.././Features/User/UserSlice';
import QnAReducer from '.././Features/QnA/QnASlice';
import CartReducer from '.././Features/Cart/CartSlice';

export const Store = configureStore({
  reducer: {
    user: UserReducer,
    QnA: QnAReducer,
    cart: CartReducer,
  },
});
