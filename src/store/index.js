import { configureStore } from '@reduxjs/toolkit';
// import authSlice from './slices/authSlice';
// import userSlice from './slices/userSlice';
// import counterSlice from './slices/counterSlice';

export const store = configureStore({
  reducer: {
    // auth: authSlice,
    // user: userSlice,
    // counter: counterSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});
