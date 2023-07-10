import { configureStore } from '@reduxjs/toolkit';

import UserReducer from '.././Features/User/UserSlice';

export const Store = configureStore({
  reducer: {
    user: UserReducer,
  },
});
