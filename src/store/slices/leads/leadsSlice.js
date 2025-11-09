import { createSlice } from '@reduxjs/toolkit';
import {
  fetchLeads,
  fetchLeadById,
  createLead,
  updateLead,
  deleteLead,
} from './leadsThunks';

/**
 * Leads Slice
 *
 * Redux slice for managing leads state.
 * Follows the same pattern as auth slice.
 */

const initialState = {
  // Leads data
  leads: [],
  selectedLead: null,

  // Loading states
  loading: false,
  loadingById: false,
  creating: false,
  updating: false,
  deleting: false,

  // Error states
  error: null,
  errorById: null,

  // Success flags
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,

  // Metadata
  lastFetch: null,
  totalCount: 0,
};

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    /**
     * Clear all errors
     */
    clearError: state => {
      state.error = null;
      state.errorById = null;
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
     * Clear selected lead
     */
    clearSelectedLead: state => {
      state.selectedLead = null;
      state.errorById = null;
    },

    /**
     * Reset leads state
     */
    resetLeadsState: state => {
      return initialState;
    },
  },
  extraReducers: builder => {
    // FETCH ALL LEADS
    builder.addCase(fetchLeads.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchLeads.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.leads = action.payload.data;
      state.totalCount = action.payload.length;
      state.lastFetch = new Date().toISOString();
      state.error = null;
    });
    builder.addCase(fetchLeads.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || {
        message: 'Failed to fetch leads',
        status: 0,
      };
    });

    // ============================================
    // FETCH LEAD BY ID
    // ============================================
    builder.addCase(fetchLeadById.pending, state => {
      state.loadingById = true;
      state.errorById = null;
    });
    builder.addCase(fetchLeadById.fulfilled, (state, action) => {
      state.loadingById = false;
      state.selectedLead = action.payload;
      state.errorById = null;
    });
    builder.addCase(fetchLeadById.rejected, (state, action) => {
      state.loadingById = false;
      state.errorById = action.payload || {
        message: 'Failed to fetch lead details',
        status: 0,
      };
    });

    // ============================================
    // CREATE LEAD
    // ============================================
    builder.addCase(createLead.pending, state => {
      state.creating = true;
      state.error = null;
      state.createSuccess = false;
    });
    builder.addCase(createLead.fulfilled, (state, action) => {
      state.creating = false;
      state.leads.unshift(action.payload); // Add to beginning of array
      state.totalCount += 1;
      state.createSuccess = true;
      state.error = null;
    });
    builder.addCase(createLead.rejected, (state, action) => {
      state.creating = false;
      state.createSuccess = false;
      state.error = action.payload || {
        message: 'Failed to create lead',
        status: 0,
      };
    });

    // ============================================
    // UPDATE LEAD
    // ============================================
    builder.addCase(updateLead.pending, state => {
      state.updating = true;
      state.error = null;
      state.updateSuccess = false;
    });
    builder.addCase(updateLead.fulfilled, (state, action) => {
      state.updating = false;
      // Update lead in array
      const index = state.leads.findIndex(
        lead => lead.id === action.payload.id,
      );
      if (index !== -1) {
        state.leads[index] = action.payload;
      }
      // Update selected lead if it's the same one
      if (state.selectedLead?.id === action.payload.id) {
        state.selectedLead = action.payload;
      }
      state.updateSuccess = true;
      state.error = null;
    });
    builder.addCase(updateLead.rejected, (state, action) => {
      state.updating = false;
      state.updateSuccess = false;
      state.error = action.payload || {
        message: 'Failed to update lead',
        status: 0,
      };
    });

    // ============================================
    // DELETE LEAD
    // ============================================
    builder.addCase(deleteLead.pending, state => {
      state.deleting = true;
      state.error = null;
      state.deleteSuccess = false;
    });
    builder.addCase(deleteLead.fulfilled, (state, action) => {
      state.deleting = false;
      // Remove lead from array
      state.leads = state.leads.filter(lead => lead.id !== action.payload);
      state.totalCount -= 1;
      // Clear selected lead if it was deleted
      if (state.selectedLead?.id === action.payload) {
        state.selectedLead = null;
      }
      state.deleteSuccess = true;
      state.error = null;
    });
    builder.addCase(deleteLead.rejected, (state, action) => {
      state.deleting = false;
      state.deleteSuccess = false;
      state.error = action.payload || {
        message: 'Failed to delete lead',
        status: 0,
      };
    });
  },
});

// Export actions
export const {
  clearError,
  clearSuccessFlags,
  clearSelectedLead,
  resetLeadsState,
} = leadsSlice.actions;

// Export reducer
export default leadsSlice.reducer;
