import api from '../../axios/api';

/**
 * Leads Service
 *
 * API service layer for leads management.
 * All leads-related API calls go through this service.
 */

const leadsService = {
  /**
   * Get all leads
   * @returns {Promise} Array of lead objects
   */
  getAllLeads: async () => {
    const response = await api.get('/leads');
    console.log(response);
    return response.data;
  },

  /**
   * Get lead by ID
   * @param {string} leadId - Lead UUID
   * @returns {Promise} Lead object
   */
  getLeadById: async leadId => {
    const response = await api.get(`/leads/${leadId}`);
    return response.data;
  },

  /**
   * Create new lead
   * @param {Object} leadData - Lead data object
   * @returns {Promise} Created lead object
   */
  createLead: async leadData => {
    const response = await api.post('/leads', leadData);
    return response;
  },

  /**
   * Update lead
   * @param {string} leadId - Lead UUID
   * @param {Object} leadData - Updated lead data
   * @returns {Promise} Updated lead object
   */
  updateLead: async (leadId, leadData) => {
    const response = await api.put(`/leads/${leadId}`, leadData);
    return response.data;
  },

  /**
   * Delete lead
   * @param {string} leadId - Lead UUID
   * @returns {Promise} Deletion confirmation
   */
  deleteLead: async leadId => {
    const response = await api.delete(`/leads/${leadId}`);
    return response.data;
  },
};

export default leadsService;
