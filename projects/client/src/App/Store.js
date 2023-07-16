import { configureStore } from '@reduxjs/toolkit';

import UserReducer from '.././Features/User/UserSlice';
import QnaReducer from '.././Features/QnA/QnASlice';

export const Store = configureStore({
  reducer: {
    user: UserReducer,
    QnA: QnaReducer
  },
});
