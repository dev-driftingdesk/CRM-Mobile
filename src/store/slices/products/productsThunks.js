import { createAsyncThunk } from '@reduxjs/toolkit';
import productsService from '../../../services/product-service/productsService';

/**
 * Products Thunks
 *
 * Async thunks for products-related API operations.
 * Follows the same pattern as leads and deals thunks.
 */

/**
 * Fetch all products
 * GET /products
 */
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      console.log('📦 Fetching products from API...');
      const response = await productsService.getAllProducts();
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue({
          message:
            error.response.data.message || 'Failed to fetch products',
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
 * Fetch single product by ID
 * GET /api/products/{productId}
 */
export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await productsService.getProductById(productId);
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue({
          message:
            error.response.data.message || 'Failed to fetch product details',
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
 * Search products
 * GET /products/search?query={query}
 */
export const searchProducts = createAsyncThunk(
  'products/search',
  async (query, { rejectWithValue }) => {
    try {
      const response = await productsService.searchProducts(query);
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue({
          message:
            error.response.data.message || 'Failed to search products',
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
