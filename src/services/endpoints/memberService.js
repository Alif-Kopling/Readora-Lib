import api from '../api';
import { authService } from './authService';

/**
 * Mapping function: API response → Frontend format
 * Converts Indonesian field names to English
 */
const mapMemberToFrontend = (apiUser) => ({
  id: apiUser.id,
  name: apiUser.nama,
  email: apiUser.email,
  role: apiUser.role,
  status: 'Active', // Default status, can be updated based on business logic
  joinDate: apiUser.createdAt,
});

export const memberService = {
  /**
   * Get all members
   * Note: API doesn't have dedicated /anggota endpoint
   * Extracts unique users from transactions
   */
  getAll: async () => {
    try {
      const response = await api.get('/pinjam');
      const users = response.data.data.map((t) => t.user);
      
      // Remove duplicates
      const uniqueUsers = users.filter(
        (user, index, self) => 
          index === self.findIndex((u) => u.id === user.id)
      );
      
      return uniqueUsers.map(mapMemberToFrontend);
    } catch (error) {
      // If no transactions exist, return empty array
      return [];
    }
  },

  /**
   * Get member by ID
   * Note: API doesn't have dedicated endpoint, extracts from transactions
   * @param {string} id - User ID
   */
  getById: async (id) => {
    try {
      const response = await api.get('/pinjam', { params: { userId: id } });
      if (response.data.data.length > 0) {
        return mapMemberToFrontend(response.data.data[0].user);
      }
      return null;
    } catch (error) {
      return null;
    }
  },

  /**
   * Get current user profile
   * GET /api/auth/profile
   */
  getProfile: async () => {
    const response = await authService.getProfile();
    return mapMemberToFrontend(response.data);
  },

  /**
   * Create new member (via registration)
   * POST /api/auth/register
   * @param {Object} memberData - Member data
   * @param {string} memberData.name - Full name
   * @param {string} memberData.email - Email
   * @param {string} memberData.password - Password
   * @param {string} memberData.role - Role: 'USER' or 'ADMIN'
   */
  create: async (memberData) => {
    const response = await authService.register(
      memberData.name,
      memberData.email,
      memberData.password,
      memberData.role || 'USER'
    );
    return mapMemberToFrontend(response.data);
  },

  /**
   * Update member status
   * Note: API doesn't have dedicated update user endpoint
   * This is a placeholder for future implementation
   * @param {string} id - User ID
   * @param {Object} memberData - Updated member data
   */
  update: async (id, memberData) => {
    // TODO: Implement when API supports user update
    console.warn('Update member not yet implemented in API');
    return { id, ...memberData };
  },

  /**
   * Delete member
   * Note: API doesn't have dedicated delete user endpoint
   * This is a placeholder for future implementation
   * @param {string} id - User ID
   */
  delete: async (id) => {
    // TODO: Implement when API supports user deletion
    console.warn('Delete member not yet implemented in API');
    return { message: 'Not implemented' };
  },
};
