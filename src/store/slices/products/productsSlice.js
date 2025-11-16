import { createSlice } from '@reduxjs/toolkit';
import {
  fetchProducts,
  fetchProductById,
  searchProducts,
} from './productsThunks';

/**
 * Products Slice
 *
 * Redux slice for managing products state.
 * Follows the same pattern as leads and deals slices.
 */

const initialState = {
  // Products data
  products: [],
  selectedProduct: null,
  searchResults: [],

  // Loading states
  loading: false,
  loadingById: false,
  searching: false,

  // Error states
  error: null,
  errorById: null,
  searchError: null,

  // Metadata
  lastFetch: null,
  totalCount: 0,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    /**
     * Clear all errors
     */
    clearError: state => {
      state.error = null;
      state.errorById = null;
      state.searchError = null;
    },

    /**
     * Clear selected product
     */
    clearSelectedProduct: state => {
      state.selectedProduct = null;
      state.errorById = null;
    },

    /**
     * Clear search results
     */
    clearSearchResults: state => {
      state.searchResults = [];
      state.searchError = null;
    },

    /**
     * Reset products state
     */
    resetProductsState: state => {
      return initialState;
    },
  },
  extraReducers: builder => {
    // ============================================
    // FETCH ALL PRODUCTS
    // ============================================
    builder.addCase(fetchProducts.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action?.payload?.data || action?.payload || [];
      state.totalCount = state.products.length;
      state.lastFetch = new Date().toISOString();
      state.error = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || {
        message: 'Failed to fetch products',
        status: 0,
      };
    });

    // ============================================
    // FETCH PRODUCT BY ID
    // ============================================
    builder.addCase(fetchProductById.pending, state => {
      state.loadingById = true;
      state.errorById = null;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loadingById = false;
      state.selectedProduct = action.payload;
      state.errorById = null;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loadingById = false;
      state.errorById = action.payload || {
        message: 'Failed to fetch product details',
        status: 0,
      };
    });

    // ============================================
    // SEARCH PRODUCTS
    // ============================================
    builder.addCase(searchProducts.pending, state => {
      state.searching = true;
      state.searchError = null;
    });
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.searching = false;
      state.searchResults = action?.payload?.data || action?.payload || [];
      state.searchError = null;
    });
    builder.addCase(searchProducts.rejected, (state, action) => {
      state.searching = false;
      state.searchError = action.payload || {
        message: 'Failed to search products',
        status: 0,
      };
    });
  },
});

// Export actions
export const {
  clearError,
  clearSelectedProduct,
  clearSearchResults,
  resetProductsState,
} = productsSlice.actions;

// Export reducer
export default productsSlice.reducer;
