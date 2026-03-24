import express from 'express';
import crypto from 'crypto';
import { db } from '../data/mockData.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/buku - Get all books with optional filtering
router.get('/', (req, res) => {
  try {
    const { kategori, search } = req.query;
    let books = [...db.books];

    // Filter by category
    if (kategori) {
      books = books.filter(b => 
        b.kategori.toLowerCase() === kategori.toLowerCase()
      );
    }

    // Search by title or author
    if (search) {
      const searchLower = search.toLowerCase();
      books = books.filter(b =>
        b.judul.toLowerCase().includes(searchLower) ||
        b.penulis.toLowerCase().includes(searchLower)
      );
    }

    res.json({ data: books });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// GET /api/buku/:id - Get book by ID
router.get('/:id', (req, res) => {
  try {
    const book = db.books.find(b => b.id === req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }

    res.json({ data: book });
  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// POST /api/buku - Create new book (Admin only)
router.post('/', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const { judul, penulis, stok = 0, kategori } = req.body;

    // Validation
    if (!judul || !penulis || !kategori) {
      return res.status(400).json({ message: 'Judul, penulis, dan kategori wajib diisi' });
    }

    const newBook = {
      id: crypto.randomUUID(),
      judul,
      penulis,
      stok: parseInt(stok),
      kategori,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.books.push(newBook);

    res.status(201).json({
      message: 'Buku berhasil ditambahkan',
      data: newBook,
    });
  } catch (error) {
    console.error('Create book error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// PUT /api/buku/:id - Update book (Admin only)
router.put('/:id', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const { judul, penulis, stok, kategori } = req.body;
    const bookIndex = db.books.findIndex(b => b.id === req.params.id);

    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }

    // Validation
    if (!judul || !penulis || !kategori) {
      return res.status(400).json({ message: 'Judul, penulis, dan kategori wajib diisi' });
    }

    const updatedBook = {
      ...db.books[bookIndex],
      judul,
      penulis,
      stok: stok !== undefined ? parseInt(stok) : db.books[bookIndex].stok,
      kategori,
      updatedAt: new Date().toISOString(),
    };

    db.books[bookIndex] = updatedBook;

    res.json({
      message: 'Buku berhasil diupdate',
      data: updatedBook,
    });
  } catch (error) {
    console.error('Update book error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// DELETE /api/buku/:id - Delete book (Admin only)
router.delete('/:id', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const bookIndex = db.books.findIndex(b => b.id === req.params.id);

    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }

    db.books.splice(bookIndex, 1);

    res.json({ message: 'Buku berhasil dihapus' });
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

export default router;
