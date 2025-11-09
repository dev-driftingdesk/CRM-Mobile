import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth/authSlice';
import leadsSlice from './slices/leads/leadsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    leads: leadsSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
