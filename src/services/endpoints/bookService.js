import api from '../api';

/**
 * Mapping function: API response → Frontend format
 * Converts Indonesian field names to English
 */
const mapBookToFrontend = (apiBook) => ({
  id: apiBook.id,
  title: apiBook.judul,
  author: apiBook.penulis,
  category: apiBook.kategori,
  status: apiBook.stok > 0 ? 'Available' : 'Borrowed',
  stock: apiBook.stok,
  createdAt: apiBook.createdAt,
  updatedAt: apiBook.updatedAt,
});

/**
 * Mapping function: Frontend → API format
 * Converts English field names to Indonesian
 */
const mapBookToApi = (book) => ({
  judul: book.title,
  penulis: book.author,
  kategori: book.category,
  stok: book.stock !== undefined ? book.stock : (book.status === 'Available' ? 1 : 0),
});

export const bookService = {
  /**
   * Get all books with optional filtering
   * GET /api/buku
   * @param {Object} params - Query parameters
   * @param {string} params.kategori - Filter by category
   * @param {string} params.search - Search by title or author
   */
  getAll: async (params = {}) => {
    const response = await api.get('/buku', { params });
    return response.data.data.map(mapBookToFrontend);
  },

  /**
   * Get book by ID
   * GET /api/buku/:id
   * @param {string} id - Book ID
   */
  getById: async (id) => {
    const response = await api.get(`/buku/${id}`);
    return mapBookToFrontend(response.data.data);
  },

  /**
   * Create new book (Admin only)
   * POST /api/buku
   * @param {Object} bookData - Book data in frontend format
   */
  create: async (bookData) => {
    const response = await api.post('/buku', mapBookToApi(bookData));
    return mapBookToFrontend(response.data.data);
  },

  /**
   * Update book (Admin only)
   * PUT /api/buku/:id
   * @param {string} id - Book ID
   * @param {Object} bookData - Updated book data
   */
  update: async (id, bookData) => {
    const response = await api.put(`/buku/${id}`, mapBookToApi(bookData));
    return mapBookToFrontend(response.data.data);
  },

  /**
   * Delete book (Admin only)
   * DELETE /api/buku/:id
   * @param {string} id - Book ID
   */
  delete: async (id) => {
    const response = await api.delete(`/buku/${id}`);
    return response.data;
  },
};
