import { configureStore } from '@reduxjs/toolkit';
import userDetailSlice from './features/user/userDetailSlice';

const store = configureStore({
  reducer: {
    user: userDetailSlice,
  },
});

export default store;
