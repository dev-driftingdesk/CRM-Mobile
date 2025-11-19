import api from '../../axios/api';

/**
 * Users Service
 *
 * API service layer for users management.
 * All users-related API calls go through this service.
 */

const usersService = {
  /**
   * Get all users
   * @returns {Promise} Array of user objects
   */
  getAllUsers: async () => {
    const response = await api.get('/users');
    console.log('👥 Users API Response:', response);
    return response.data;
  },

  /**
   * Get user by ID
   * @param {string} userId - User UUID
   * @returns {Promise} User object
   */
  getUserById: async userId => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  /**
   * Create new user
   * @param {Object} userData - User data object
   * @returns {Promise} Created user object
   */
  createUser: async userData => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  /**
   * Update user
   * @param {string} userId - User UUID
   * @param {Object} userData - Updated user data
   * @returns {Promise} Updated user object
   */
  updateUser: async (userId, userData) => {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  },

  /**
   * Delete user
   * @param {string} userId - User UUID
   * @returns {Promise} Deletion confirmation
   */
  deleteUser: async userId => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  },

  /**
   * Get current user profile
   * @returns {Promise} Current user object
   */
  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  /**
   * Update current user profile
   * @param {Object} userData - Updated user data
   * @returns {Promise} Updated user object
   */
  updateCurrentUser: async userData => {
    const response = await api.put('/users/me', userData);
    return response.data;
  },
};

export default usersService;
