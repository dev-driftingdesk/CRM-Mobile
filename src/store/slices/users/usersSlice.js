import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
  fetchCurrentUser,
  updateCurrentUser,
} from './usersThunks';

/**
 * Users Slice
 *
 * Redux slice for managing users state.
 * Follows the same pattern as leads and products slices.
 */

const initialState = {
  // Users data
  users: [],
  selectedUser: null,
  currentUser: null, // Logged-in user profile

  // Loading states
  loading: false,
  loadingById: false,
  loadingCurrent: false,
  creating: false,
  updating: false,
  updatingCurrent: false,
  deleting: false,

  // Error states
  error: null,
  errorById: null,
  errorCurrent: null,

  // Success flags
  createSuccess: false,
  updateSuccess: false,
  updateCurrentSuccess: false,
  deleteSuccess: false,

  // Metadata
  lastFetch: null,
  totalCount: 0,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    /**
     * Clear all errors
     */
    clearError: state => {
      state.error = null;
      state.errorById = null;
      state.errorCurrent = null;
    },

    /**
     * Clear success flags
     */
    clearSuccessFlags: state => {
      state.createSuccess = false;
      state.updateSuccess = false;
      state.updateCurrentSuccess = false;
      state.deleteSuccess = false;
    },

    /**
     * Clear selected user
     */
    clearSelectedUser: state => {
      state.selectedUser = null;
      state.errorById = null;
    },

    /**
     * Clear current user
     */
    clearCurrentUser: state => {
      state.currentUser = null;
      state.errorCurrent = null;
    },

    /**
     * Reset users state
     */
    resetUsersState: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    // ============================================
    // FETCH ALL USERS
    // ============================================
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action?.payload?.data || action?.payload || [];
      state.totalCount = state.users.length;
      state.lastFetch = new Date().toISOString();
      state.error = null;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || {
        message: 'Failed to fetch users',
        status: 0,
      };
    });

    // ============================================
    // FETCH USER BY ID
    // ============================================
    builder.addCase(fetchUserById.pending, state => {
      state.loadingById = true;
      state.errorById = null;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loadingById = false;
      state.selectedUser = action.payload;
      state.errorById = null;
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.loadingById = false;
      state.errorById = action.payload || {
        message: 'Failed to fetch user details',
        status: 0,
      };
    });

    // ============================================
    // CREATE USER
    // ============================================
    builder.addCase(createUser.pending, state => {
      state.creating = true;
      state.error = null;
      state.createSuccess = false;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.creating = false;
      // Add new user to array
      state.users.push(action.payload);
      state.totalCount += 1;
      state.createSuccess = true;
      state.error = null;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.creating = false;
      state.createSuccess = false;
      state.error = action.payload || {
        message: 'Failed to create user',
        status: 0,
      };
    });

    // ============================================
    // UPDATE USER
    // ============================================
    builder.addCase(updateUser.pending, state => {
      state.updating = true;
      state.error = null;
      state.updateSuccess = false;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.updating = false;
      // Update user in array
      const index = state.users.findIndex(
        user => user.id === action.payload.id,
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
      // Update selected user if it's the same one
      if (state.selectedUser?.id === action.payload.id) {
        state.selectedUser = action.payload;
      }
      state.updateSuccess = true;
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.updating = false;
      state.updateSuccess = false;
      state.error = action.payload || {
        message: 'Failed to update user',
        status: 0,
      };
    });

    // ============================================
    // DELETE USER
    // ============================================
    builder.addCase(deleteUser.pending, state => {
      state.deleting = true;
      state.error = null;
      state.deleteSuccess = false;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.deleting = false;
      // Remove user from array
      state.users = state.users.filter(user => user.id !== action.payload);
      state.totalCount -= 1;
      // Clear selected user if it was deleted
      if (state.selectedUser?.id === action.payload) {
        state.selectedUser = null;
      }
      state.deleteSuccess = true;
      state.error = null;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.deleting = false;
      state.deleteSuccess = false;
      state.error = action.payload || {
        message: 'Failed to delete user',
        status: 0,
      };
    });

    // ============================================
    // FETCH CURRENT USER
    // ============================================
    builder.addCase(fetchCurrentUser.pending, state => {
      state.loadingCurrent = true;
      state.errorCurrent = null;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.loadingCurrent = false;
      state.currentUser = action.payload;
      state.errorCurrent = null;
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.loadingCurrent = false;
      state.errorCurrent = action.payload || {
        message: 'Failed to fetch user profile',
        status: 0,
      };
    });

    // ============================================
    // UPDATE CURRENT USER
    // ============================================
    builder.addCase(updateCurrentUser.pending, state => {
      state.updatingCurrent = true;
      state.errorCurrent = null;
      state.updateCurrentSuccess = false;
    });
    builder.addCase(updateCurrentUser.fulfilled, (state, action) => {
      state.updatingCurrent = false;
      state.currentUser = action.payload;
      state.updateCurrentSuccess = true;
      state.errorCurrent = null;
    });
    builder.addCase(updateCurrentUser.rejected, (state, action) => {
      state.updatingCurrent = false;
      state.updateCurrentSuccess = false;
      state.errorCurrent = action.payload || {
        message: 'Failed to update profile',
        status: 0,
      };
    });
  },
});

// Export actions
export const {
  clearError,
  clearSuccessFlags,
  clearSelectedUser,
  clearCurrentUser,
  resetUsersState,
} = usersSlice.actions;

// Export reducer
export default usersSlice.reducer;
