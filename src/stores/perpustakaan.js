import { create } from 'zustand';
import { bookService } from '../services/endpoints/bookService';
import { memberService } from '../services/endpoints/memberService';
import { loanService } from '../services/endpoints/loanService';

const usePerpustakaanStore = create((set, get) => ({
  // State
  buku: [],
  anggota: [],
  transaksi: [],
  loading: false,
  error: null,

  // ==================== BUKU (BOOKS) ====================

  /**
   * Fetch all books from API
   * @param {Object} params - Query parameters (kategori, search)
   */
  fetchBuku: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const books = await bookService.getAll(params);
      set({ buku: books, loading: false });
      return books;
    } catch (error) {
      set({ error: error.message, loading: false });
      return [];
    }
  },

  /**
   * Add new book
   * @param {Object} bookData - Book data in frontend format
   */
  addBuku: async (bookData) => {
    set({ loading: true, error: null });
    try {
      const newBook = await bookService.create(bookData);
      set((state) => ({
        buku: [...state.buku, newBook],
        loading: false,
      }));
      return newBook;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Update existing book
   * @param {string} id - Book ID
   * @param {Object} bookData - Updated book data
   */
  updateBuku: async (id, bookData) => {
    set({ loading: true, error: null });
    try {
      const updatedBook = await bookService.update(id, bookData);
      set((state) => ({
        buku: state.buku.map((b) => (b.id === id ? updatedBook : b)),
        loading: false,
      }));
      return updatedBook;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Delete book
   * @param {string} id - Book ID
   */
  deleteBuku: async (id) => {
    set({ loading: true, error: null });
    try {
      await bookService.delete(id);
      set((state) => ({
        buku: state.buku.filter((b) => b.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // ==================== ANGGOTA (MEMBERS) ====================

  /**
   * Fetch all members from API
   */
  fetchAnggota: async () => {
    set({ loading: true, error: null });
    try {
      const members = await memberService.getAll();
      set({ anggota: members, loading: false });
      return members;
    } catch (error) {
      set({ error: error.message, loading: false });
      return [];
    }
  },

  /**
   * Add new member
   * @param {Object} memberData - Member data
   */
  addAnggota: async (memberData) => {
    set({ loading: true, error: null });
    try {
      const newMember = await memberService.create(memberData);
      set((state) => ({
        anggota: [...state.anggota, newMember],
        loading: false,
      }));
      return newMember;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Update existing member
   * @param {string} id - Member ID
   * @param {Object} memberData - Updated member data
   */
  updateAnggota: async (id, memberData) => {
    set({ loading: true, error: null });
    try {
      const updatedMember = await memberService.update(id, memberData);
      set((state) => ({
        anggota: state.anggota.map((a) => (a.id === id ? updatedMember : a)),
        loading: false,
      }));
      return updatedMember;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Delete member
   * @param {string} id - Member ID
   */
  deleteAnggota: async (id) => {
    set({ loading: true, error: null });
    try {
      await memberService.delete(id);
      set((state) => ({
        anggota: state.anggota.filter((a) => a.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // ==================== TRANSAKSI (LOANS) ====================

  /**
   * Fetch all transactions from API
   * @param {Object} params - Query parameters (status, userId)
   */
  fetchTransaksi: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const transactions = await loanService.getAll(params);
      set({ transaksi: transactions, loading: false });
      return transactions;
    } catch (error) {
      set({ error: error.message, loading: false });
      return [];
    }
  },

  /**
   * Add new transaction (borrow book)
   * @param {string} userId - User ID
   * @param {string} bukuId - Book ID
   */
  addTransaksi: async (userId, bukuId) => {
    set({ loading: true, error: null });
    try {
      const newTransaction = await loanService.borrow(userId, bukuId);
      set((state) => ({
        transaksi: [...state.transaksi, newTransaction],
        loading: false,
      }));
      return newTransaction;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Update transaction (return book)
   * @param {string} id - Transaction ID
   * @param {number} denda - Fine amount
   */
  updateTransaksi: async (id, denda = 0) => {
    set({ loading: true, error: null });
    try {
      const updatedTransaction = await loanService.return(id, denda);
      set((state) => ({
        transaksi: state.transaksi.map((t) =>
          t.id === id ? updatedTransaction : t
        ),
        loading: false,
      }));
      return updatedTransaction;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Delete transaction
   * @param {string} id - Transaction ID
   */
  deleteTransaksi: async (id) => {
    set({ loading: true, error: null });
    try {
      await loanService.delete(id);
      set((state) => ({
        transaksi: state.transaksi.filter((t) => t.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // ==================== LOADING & ERROR ====================

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // ==================== GETTERS ====================

  getBukuById: (id) => get().buku.find((b) => b.id === id),
  getAnggotaById: (id) => get().anggota.find((a) => a.id === id),
  getTransaksiById: (id) => get().transaksi.find((t) => t.id === id),

  // Get available books
  getAvailableBooks: () => get().buku.filter((b) => b.status === 'Available'),

  // Get borrowed books
  getBorrowedBooks: () => get().buku.filter((b) => b.status === 'Borrowed'),

  // Get active loans
  getActiveLoans: () =>
    get().transaksi.filter((t) => t.status === 'Borrowed' || t.status === 'Overdue'),

  // Get returned loans
  getReturnedLoans: () => get().transaksi.filter((t) => t.status === 'Returned'),
}));

export default usePerpustakaanStore;
