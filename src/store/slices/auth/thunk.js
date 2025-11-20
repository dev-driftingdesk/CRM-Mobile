import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserApi } from '../../../services/auth-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Login thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(credentials);
      console.log('Login API response:', response);
      // Save tokens to AsyncStorage with consistent keys
      await AsyncStorage.setItem('ACCESS_TOKEN', response.accessToken);
      await AsyncStorage.setItem('REFRESH_TOKEN', response.refreshToken);

      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Login failed';
      return rejectWithValue(errorMessage);
    }
  },
);

// Restore session from AsyncStorage
export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
      const refreshToken = await AsyncStorage.getItem('REFRESH_TOKEN');

      if (!accessToken) {
        return rejectWithValue('No session found');
      }

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      return rejectWithValue('Failed to restore session');
    }
  },
);

// Logout and clear tokens
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.removeItem('ACCESS_TOKEN');
      await AsyncStorage.removeItem('REFRESH_TOKEN');
      return true;
    } catch (error) {
      return rejectWithValue('Failed to logout');
    }
  },
);
