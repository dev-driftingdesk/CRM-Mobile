import { createAsyncThunk } from '@reduxjs/toolkit';
import leadsService from '../../../services/lead-service/leadsService';

/**
 * Leads Thunks
 *
 * Async thunks for leads-related API operations.
 * Follows the same pattern as auth thunks.
 */

/**
 * Fetch all leads
 * GET /api/leads
 */
export const fetchLeads = createAsyncThunk(
  'leads/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      console.log('📋 Fetching leads from API...');
      const response = await leadsService.getAllLeads();
      return response;
    } catch (error) {
      // Handle error with proper error message
      console.error('❌ Error fetching leads:', error);

      if (error.response) {
        // Server responded with error status
        console.error('📡 Server error:', {
          status: error.response.status,
          data: error.response.data,
        });
        return rejectWithValue({
          message: error.response.data?.message || 'Failed to fetch leads',
          status: error.response.status,
        });
      } else if (error.request) {
        // Request made but no response
        console.error('🌐 Network error - No response received');
        return rejectWithValue({
          message: 'Network error. Please check your connection.',
          status: 0,
        });
      } else {
        // Something else happened
        console.error('⚠️ Unexpected error:', error.message);
        return rejectWithValue({
          message: error.message || 'An unexpected error occurred',
          status: 0,
        });
      }
    }
  },
);

/**
 * Fetch single lead by ID
 * GET /leads/{leadId}
 * No mapping needed - returns backend format directly
 */
export const fetchLeadById = createAsyncThunk(
  'leads/fetchById',
  async (leadId, { rejectWithValue }) => {
    try {
      const response = await leadsService.getLeadById(leadId);

      // Return response directly (no mapping needed)
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue({
          message:
            error.response.data.message || 'Failed to fetch lead details',
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
 * Create new lead
 * POST /api/leads
 * No mapping needed - frontend sends data in backend format
 */
export const createLead = createAsyncThunk(
  'leads/create',
  async (leadData, { rejectWithValue }) => {
    const response = await leadsService.createLead(leadData);
    // Return response directly (no mapping needed for create)
    return response;
  },
);

/**
 * Update lead
 * PUT /leads/{leadId}
 * No mapping needed - returns backend format directly
 */
export const updateLead = createAsyncThunk(
  'leads/update',
  async ({ leadId, leadData }, { rejectWithValue }) => {
    try {
      const response = await leadsService.updateLead(leadId, leadData);

      // Return response directly (no mapping needed)
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue({
          message: error.response.data.message || 'Failed to update lead',
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
 * Delete lead
 * DELETE /leads/{leadId}
 */
export const deleteLead = createAsyncThunk(
  'leads/delete',
  async (leadId, { rejectWithValue }) => {
    try {
      await leadsService.deleteLead(leadId);

      // Return leadId for removal from state
      return leadId;
    } catch (error) {
      if (error.response) {
        return rejectWithValue({
          message: error.response.data.message || 'Failed to delete lead',
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
