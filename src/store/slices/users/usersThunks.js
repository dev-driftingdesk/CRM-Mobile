import { createAsyncThunk } from '@reduxjs/toolkit';
import usersService from '../../../services/user-service/usersService';

/**
 * Users Thunks
 *
 * Async thunks for users-related API operations.
 * Follows the same pattern as leads and products thunks.
 */

/**
 * Fetch all users
 * GET /users
 */
export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      console.log('👥 Fetching users from API...');
      const response = await usersService.getAllUsers();
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue({
          message: error.response.data.message || 'Failed to fetch users',
          status: error.response.status,
        });
      } else if (error.request) {
        return rejectWithValue({
          message: 'Network error. Please check your connection.',
          status: 0,
        });
      } else {
        return rejectWithValue({
          message: error.message || 'An unexpected error occurred',
          status: 0,
        });
      }
    }
  },
);

/**
 * Fetch single user by ID
 * GET /users/{userId}
 */
export const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await usersService.getUserById(userId);
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue({
          message: error.response.data.message || 'Failed to fetch user details',
          status: error.response.status,
        });
      } else if (error.request) {
        return rejectWithValue({
          message: 'Network error. Please check your connection.',
          status: 0,
        });
      } else {
        return rejectWithValue({
          message: error.message || 'An unexpected error occurred',
          status: 0,
        });
      }
    }
  },
);

/**
 * Create new user
 * POST /users
 */
export const createUser = createAsyncThunk(
  'users/create',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await usersService.createUser(userData);
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue({
          message: error.response.data.message || 'Failed to create user',
          status: error.response.status,
        });
      } else if (error.request) {
        return rejectWithValue({
          message: 'Network error. Please check your connection.',
          status: 0,
        });
      } else {
        return rejectWithValue({
          message: error.message || 'An unexpected error occurred',
          status: 0,
        });
      }
    }
  },
);

/**
 * Update user
 * PUT /users/{userId}
 */
export const updateUser = createAsyncThunk(
  'users/update',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await usersService.updateUser(userId, userData);
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue({
          message: error.response.data.message || 'Failed to update user',
          status: error.response.status,
        });
      } else if (error.request) {
        return rejectWithValue({
          message: 'Network error. Please check your connection.',
          status: 0,
        });
      } else {
        return rejectWithValue({
          message: error.message || 'An unexpected error occurred',
          status: 0,
        });
      }
    }
  },
);

/**
 * Delete user
 * DELETE /users/{userId}
 */
export const deleteUser = createAsyncThunk(
  'users/delete',
  async (userId, { rejectWithValue }) => {
    try {
      await usersService.deleteUser(userId);
      // Return userId for removal from state
      return userId;
    } catch (error) {
      if (error.response) {
        return rejectWithValue({
          message: error.response.data.message || 'Failed to delete user',
          status: error.response.status,
        });
      } else if (error.request) {
        return rejectWithValue({
          message: 'Network error. Please check your connection.',
          status: 0,
        });
      } else {
        return rejectWithValue({
          message: error.message || 'An unexpected error occurred',
          status: 0,
        });
      }
    }
  },
);

/**
 * Fetch current user profile
 * GET /users/me
 */
export const fetchCurrentUser = createAsyncThunk(
  'users/fetchCurrent',
  async (_, { rejectWithValue }) => {
    try {
      console.log('👤 Fetching current user profile...');
      const response = await usersService.getCurrentUser();
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue({
          message: error.response.data.message || 'Failed to fetch user profile',
          status: error.response.status,
        });
      } else if (error.request) {
        return rejectWithValue({
          message: 'Network error. Please check your connection.',
          status: 0,
        });
      } else {
        return rejectWithValue({
          message: error.message || 'An unexpected error occurred',
          status: 0,
        });
      }
    }
  },
);

/**
 * Update current user profile
 * PUT /users/me
 */
export const updateCurrentUser = createAsyncThunk(
  'users/updateCurrent',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await usersService.updateCurrentUser(userData);
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue({
          message: error.response.data.message || 'Failed to update profile',
          status: error.response.status,
        });
      } else if (error.request) {
        return rejectWithValue({
          message: 'Network error. Please check your connection.',
          status: 0,
        });
      } else {
        return rejectWithValue({
          message: error.message || 'An unexpected error occurred',
          status: 0,
        });
      }
    }
  },
);
