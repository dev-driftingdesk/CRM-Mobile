import api from '../../axios/api';

/**
 * Deals Service
 *
 * API service layer for deals management.
 * All deals-related API calls go through this service.
 */

const dealsService = {
  /**
   * Get all deals
   * @returns {Promise} Array of deal objects
   */
  getAllDeals: async () => {
    const response = await api.get('/deals');
    console.log(response);
    return response.data;
  },

  /**
   * Get deal by ID
   * @param {string} dealId - Deal UUID
   * @returns {Promise} Deal object
   */
  getDealById: async dealId => {
    const response = await api.get(`/deals/${dealId}`);
    return response.data;
  },

  /**
   * Create new deal
   * @param {Object} dealData - Deal data object
   * @returns {Promise} Created deal object
   */
  createDeal: async dealData => {
    const response = await api.post('/deals', dealData);
    return response;
  },

  /**
   * Update deal
   * @param {string} dealId - Deal UUID
   * @param {Object} dealData - Updated deal data
   * @returns {Promise} Updated deal object
   */
  updateDeal: async (dealId, dealData) => {
    const response = await api.put(`/deals/${dealId}`, dealData);
    return response.data;
  },

  /**
   * Delete deal
   * @param {string} dealId - Deal UUID
   * @returns {Promise} Deletion confirmation
   */
  deleteDeal: async dealId => {
    const response = await api.delete(`/deals/${dealId}`);
    return response.data;
  },
};

export default dealsService;
