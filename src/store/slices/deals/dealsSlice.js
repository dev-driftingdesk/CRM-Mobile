import { createSlice } from '@reduxjs/toolkit';
import {
  fetchDeals,
  fetchDealById,
  createDeal,
  updateDeal,
  deleteDeal,
  fetchDealsByLeadId,
} from './dealsThunks';

/**
 * Deals Slice
 *
 * Redux slice for managing deals state.
 * Follows the same pattern as leads slice.
 */

const initialState = {
  // Deals data
  deals: [],
  selectedDeal: null,
  leadDeals: [],

  // Loading states
  loading: false,
  loadingById: false,
  loadingLeadDeals: false,
  creating: false,
  updating: false,
  deleting: false,

  // Error states
  error: null,
  errorById: null,
  errorLeadDeals: null,

  // Success flags
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,

  // Metadata
  lastFetch: null,
  totalCount: 0,
};

const dealsSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    /**
     * Clear all errors
     */
    clearError: state => {
      state.error = null;
      state.errorById = null;
      state.errorLeadDeals = null;
    },

    /**
     * Clear lead deals
     */
    clearLeadDeals: state => {
      state.leadDeals = [];
      state.errorLeadDeals = null;
    },

    /**
     * Clear success flags
     */
    clearSuccessFlags: state => {
      state.createSuccess = false;
      state.updateSuccess = false;
      state.deleteSuccess = false;
    },

    /**
     * Clear selected deal
     */
    clearSelectedDeal: state => {
      state.selectedDeal = null;
      state.errorById = null;
    },

    /**
     * Reset deals state
     */
    resetDealsState: state => {
      return initialState;
    },
  },
  extraReducers: builder => {
    // ============================================
    // FETCH ALL DEALS
    // ============================================
    builder.addCase(fetchDeals.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDeals.fulfilled, (state, action) => {
      state.loading = false;
      state.deals = action?.payload?.data;
      state.totalCount = action?.payload?.length;
      state.lastFetch = new Date().toISOString();
      state.error = null;
    });
    builder.addCase(fetchDeals.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || {
        message: 'Failed to fetch deals',
        status: 0,
      };
    });

    // ============================================
    // FETCH DEAL BY ID
    // ============================================
    builder.addCase(fetchDealById.pending, state => {
      state.loadingById = true;
      state.errorById = null;
    });
    builder.addCase(fetchDealById.fulfilled, (state, action) => {
      state.loadingById = false;
      state.selectedDeal = action.payload;
      state.errorById = null;
    });
    builder.addCase(fetchDealById.rejected, (state, action) => {
      state.loadingById = false;
      state.errorById = action.payload || {
        message: 'Failed to fetch deal details',
        status: 0,
      };
    });

    // ============================================
    // CREATE DEAL
    // ============================================
    builder.addCase(createDeal.pending, state => {
      state.creating = true;
      state.error = null;
      state.createSuccess = false;
    });
    builder.addCase(createDeal.fulfilled, (state, action) => {
      state.creating = false;
      state.createSuccess = true;
      state.error = null;
    });
    builder.addCase(createDeal.rejected, (state, action) => {
      state.creating = false;
      state.createSuccess = false;
      state.error = action.payload || {
        message: 'Failed to create deal',
        status: 0,
      };
    });

    // ============================================
    // UPDATE DEAL
    // ============================================
    builder.addCase(updateDeal.pending, state => {
      state.updating = true;
      state.error = null;
      state.updateSuccess = false;
    });
    builder.addCase(updateDeal.fulfilled, (state, action) => {
      state.updating = false;
      // Update deal in array
      const index = state.deals.findIndex(
        deal => deal.id === action.payload.id,
      );
      if (index !== -1) {
        state.deals[index] = action.payload;
      }
      // Update selected deal if it's the same one
      if (state.selectedDeal?.id === action.payload.id) {
        state.selectedDeal = action.payload;
      }
      state.updateSuccess = true;
      state.error = null;
    });
    builder.addCase(updateDeal.rejected, (state, action) => {
      state.updating = false;
      state.updateSuccess = false;
      state.error = action.payload || {
        message: 'Failed to update deal',
        status: 0,
      };
    });

    // ============================================
    // DELETE DEAL
    // ============================================
    builder.addCase(deleteDeal.pending, state => {
      state.deleting = true;
      state.error = null;
      state.deleteSuccess = false;
    });
    builder.addCase(deleteDeal.fulfilled, (state, action) => {
      state.deleting = false;
      // Remove deal from array
      state.deals = state.deals.filter(deal => deal.id !== action.payload);
      state.totalCount -= 1;
      // Clear selected deal if it was deleted
      if (state.selectedDeal?.id === action.payload) {
        state.selectedDeal = null;
      }
      state.deleteSuccess = true;
      state.error = null;
    });
    builder.addCase(deleteDeal.rejected, (state, action) => {
      state.deleting = false;
      state.deleteSuccess = false;
      state.error = action.payload || {
        message: 'Failed to delete deal',
        status: 0,
      };
    });

    // ============================================
    // FETCH DEALS BY LEAD ID
    // ============================================
    builder.addCase(fetchDealsByLeadId.pending, state => {
      state.loadingLeadDeals = true;
      state.errorLeadDeals = null;
    });
    builder.addCase(fetchDealsByLeadId.fulfilled, (state, action) => {
      state.loadingLeadDeals = false;
      state.leadDeals = action?.payload?.data || action.payload || [];
      state.errorLeadDeals = null;
    });
    builder.addCase(fetchDealsByLeadId.rejected, (state, action) => {
      state.loadingLeadDeals = false;
      state.leadDeals = [];
      state.errorLeadDeals = action.payload || {
        message: 'Failed to fetch deals for lead',
        status: 0,
      };
    });
  },
});

// Export actions
export const {
  clearError,
  clearSuccessFlags,
  clearSelectedDeal,
  clearLeadDeals,
  resetDealsState,
} = dealsSlice.actions;

// Export reducer
export default dealsSlice.reducer;
