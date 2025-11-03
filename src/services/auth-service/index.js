import api from '../../axios/api';

// Login API call
export const loginUserApi = async credentials => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};
