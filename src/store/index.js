import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth/authSlice';
import leadsSlice from './slices/leads/leadsSlice';
import dealsSlice from './slices/deals/dealsSlice';
import productsSlice from './slices/products/productsSlice';
import usersSlice from './slices/users/usersSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    leads: leadsSlice,
    deals: dealsSlice,
    products: productsSlice,
    users: usersSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
