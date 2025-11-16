import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth/authSlice';
import leadsSlice from './slices/leads/leadsSlice';
import dealsSlice from './slices/deals/dealsSlice';
import productsSlice from './slices/products/productsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    leads: leadsSlice,
    deals: dealsSlice,
    products: productsSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
