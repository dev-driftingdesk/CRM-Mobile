import api from '../../axios/api';

/**
 * Products Service
 *
 * API service layer for products management.
 * All products-related API calls go through this service.
 *
 * NOTE: Products use alternative base URL (api.teamhandle.com)
 * but api.js is configured with ceedpodservice base URL.
 * Path inconsistencies exist in the API - some use /api/products, others use /products
 */

const productsService = {
  /**
   * Get all products
   * @returns {Promise} Array of product objects
   */
  getAllProducts: async () => {
    const response = await api.get('/products');
    console.log('📦 Products API Response:', response);
    return response.data;
  },

  /**
   * Get product by ID
   * @param {string} productId - Product MongoDB ObjectId
   * @returns {Promise} Product object
   */
  getProductById: async productId => {
    const response = await api.get(`/api/products/${productId}`);
    return response.data;
  },

  /**
   * Search products
   * @param {string} query - Search term
   * @returns {Promise} Array of matching product objects
   */
  searchProducts: async query => {
    const response = await api.get(`/products/search?query=${query}`);
    return response.data;
  },

  /**
   * Get product count
   * @returns {Promise} Total product count
   */
  getProductCount: async () => {
    const response = await api.get('/products/count');
    return response.data;
  },
};

export default productsService;
