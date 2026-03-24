import api from '../api';

/**
 * Mapping function: API response → Frontend format
 * Converts Indonesian field names to English
 */
const mapLoanToFrontend = (apiLoan) => ({
  id: apiLoan.id,
  bookId: apiLoan.bukuId,
  bookTitle: apiLoan.buku?.judul,
  memberId: apiLoan.userId,
  memberName: apiLoan.user?.nama,
  borrowDate: apiLoan.tanggalPinjam,
  returnDate: apiLoan.tanggalKembali,
  status: apiLoan.status === 'dipinjam' ? 'Borrowed' : 
          apiLoan.status === 'dikembalikan' ? 'Returned' : 'Overdue',
  fine: apiLoan.denda,
  // Include nested objects if needed
  user: apiLoan.user,
  buku: apiLoan.buku,
});

export const loanService = {
  /**
   * Get all transactions
   * GET /api/pinjam
   * @param {Object} params - Query parameters
   * @param {string} params.status - Filter by status: 'dipinjam' or 'dikembalikan'
   * @param {string} params.userId - Filter by user ID
   */
  getAll: async (params = {}) => {
    const response = await api.get('/pinjam', { params });
    return response.data.data.map(mapLoanToFrontend);
  },

  /**
   * Get transaction by ID
   * GET /api/pinjam/:id
   * @param {string} id - Transaction ID
   */
  getById: async (id) => {
    const response = await api.get(`/pinjam/${id}`);
    return mapLoanToFrontend(response.data.data);
  },

  /**
   * Get user's active loans
   * GET /api/pinjam/user/:userId/aktif
   * @param {string} userId - User ID
   */
  getActiveLoans: async (userId) => {
    const response = await api.get(`/pinjam/user/${userId}/aktif`);
    return response.data.data.map(mapLoanToFrontend);
  },

  /**
   * Borrow a book
   * POST /api/pinjam/pinjam
   * @param {string} userId - User ID
   * @param {string} bukuId - Book ID
   */
  borrow: async (userId, bukuId) => {
    const response = await api.post('/pinjam/pinjam', { userId, bukuId });
    return mapLoanToFrontend(response.data.data);
  },

  /**
   * Return a borrowed book
   * POST /api/pinjam/:id/kembali
   * @param {string} id - Transaction ID
   * @param {number} denda - Fine amount (default: 0)
   */
  return: async (id, denda = 0) => {
    const response = await api.post(`/pinjam/${id}/kembali`, { denda });
    return mapLoanToFrontend(response.data.data);
  },

  /**
   * Delete transaction (Admin only)
   * DELETE /api/pinjam/:id
   * @param {string} id - Transaction ID
   */
  delete: async (id) => {
    const response = await api.delete(`/pinjam/${id}`);
    return response.data;
  },
};
