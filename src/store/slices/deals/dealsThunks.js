import { createAsyncThunk } from '@reduxjs/toolkit';
import dealsService from '../../../services/deal-service/dealsService';

/**
 * Deals Thunks
 *
 * Async thunks for deals-related API operations.
 * Follows the same pattern as leads thunks.
 */

/**
 * Fetch all deals
 * GET /deals
 */
export const fetchDeals = createAsyncThunk(
  'deals/fetchAll',
  async (_, { rejectWithValue }) => {
    console.log('📋 Fetching deals from API...');
    const response = await dealsService.getAllDeals();
    return response;
  },
);

/**
 * Fetch single deal by ID
 * GET /deals/{dealId}
 * No mapping needed - returns backend format directly
 */
export const fetchDealById = createAsyncThunk(
  'deals/fetchById',
  async (dealId, { rejectWithValue }) => {
    try {
      const response = await dealsService.getDealById(dealId);

      // Return response directly (no mapping needed)
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue({
          message:
            error.response.data.message || 'Failed to fetch deal details',
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
 * Create new deal
 * POST /deals
 * No mapping needed - frontend sends data in backend format
 */
export const createDeal = createAsyncThunk(
  'deals/create',
  async (dealData, { rejectWithValue }) => {
    const response = await dealsService.createDeal(dealData);
    // Return response directly (no mapping needed for create)
    return response;
  },
);

/**
 * Update deal
 * PUT /deals/{dealId}
 * No mapping needed - returns backend format directly
 */
export const updateDeal = createAsyncThunk(
  'deals/update',
  async ({ dealId, dealData }, { rejectWithValue }) => {
    try {
      const response = await dealsService.updateDeal(dealId, dealData);

      // Return response directly (no mapping needed)
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue({
          message: error.response.data.message || 'Failed to update deal',
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
 * Delete deal
 * DELETE /deals/{dealId}
 */
export const deleteDeal = createAsyncThunk(
  'deals/delete',
  async (dealId, { rejectWithValue }) => {
    try {
      await dealsService.deleteDeal(dealId);

      // Return dealId for removal from state
      return dealId;
    } catch (error) {
      if (error.response) {
        return rejectWithValue({
          message: error.response.data.message || 'Failed to delete deal',
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
