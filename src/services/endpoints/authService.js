import api from '../api';

export const authService = {
  /**
   * Register new user
   * POST /api/auth/register
   * @param {string} nama - User's full name
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {string} role - User role: 'USER' or 'ADMIN'
   */
  register: async (nama, email, password, role = 'USER') => {
    const response = await api.post('/auth/register', {
      nama,
      email,
      password,
      role,
    });
    return response.data;
  },

  /**
   * Login user
   * POST /api/auth/login
   * @param {string} email - User's email
   * @param {string} password - User's password
   */
  login: async (email, password) => {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    
    // Save token to localStorage
    if (response.data.data?.token) {
      localStorage.setItem('token', response.data.data.token);
    }
    
    return response.data;
  },

  /**
   * Get current user profile
   * GET /api/auth/profile
   */
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  /**
   * Logout user - remove token from localStorage
   */
  logout: () => {
    localStorage.removeItem('token');
  },
};
