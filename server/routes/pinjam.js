import express from 'express';
import crypto from 'crypto';
import { db } from '../data/mockData.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/pinjam - Get all transactions
router.get('/', authMiddleware, (req, res) => {
  try {
    const { status, userId } = req.query;
    let loans = [...db.loans];

    // Filter by status
    if (status) {
      loans = loans.filter(l => l.status === status);
    }

    // Filter by userId
    if (userId) {
      loans = loans.filter(l => l.userId === userId);
    }

    // If not admin, only show own loans
    if (req.user.role !== 'ADMIN') {
      loans = loans.filter(l => l.userId === req.user.id);
    }

    // Populate user and book data
    const populatedLoans = loans.map(loan => ({
      ...loan,
      user: db.users.find(u => u.id === loan.userId),
      buku: db.books.find(b => b.id === loan.bukuId),
    }));

    res.json({ data: populatedLoans });
  } catch (error) {
    console.error('Get loans error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// GET /api/pinjam/:id - Get transaction by ID
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const loan = db.loans.find(l => l.id === req.params.id);

    if (!loan) {
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }

    // Check permission
    if (req.user.role !== 'ADMIN' && loan.userId !== req.user.id) {
      return res.status(403).json({ message: 'Akses ditolak' });
    }

    // Populate user and book data
    const populatedLoan = {
      ...loan,
      user: db.users.find(u => u.id === loan.userId),
      buku: db.books.find(b => b.id === loan.bukuId),
    };

    res.json({ data: populatedLoan });
  } catch (error) {
    console.error('Get loan error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// GET /api/pinjam/user/:userId/aktif - Get user's active loans
router.get('/user/:userId/aktif', authMiddleware, (req, res) => {
  try {
    // Check permission
    if (req.user.role !== 'ADMIN' && req.user.id !== req.params.userId) {
      return res.status(403).json({ message: 'Akses ditolak' });
    }

    const activeLoans = db.loans.filter(
      l => l.userId === req.params.userId && l.status === 'dipinjam'
    );

    // Populate book data
    const populatedLoans = activeLoans.map(loan => ({
      ...loan,
      buku: db.books.find(b => b.id === loan.bukuId),
    }));

    res.json({ data: populatedLoans });
  } catch (error) {
    console.error('Get active loans error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// POST /api/pinjam/pinjam - Borrow a book
router.post('/pinjam', authMiddleware, (req, res) => {
  try {
    const { userId, bukuId } = req.body;

    // Validation
    if (!userId || !bukuId) {
      return res.status(400).json({ message: 'User ID dan Buku ID wajib diisi' });
    }

    // Check if user exists
    const user = db.users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    // Check if book exists
    const book = db.books.find(b => b.id === bukuId);
    if (!book) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }

    // Check book stock
    if (book.stok <= 0) {
      return res.status(400).json({ message: 'Stok buku tidak tersedia' });
    }

    // Check if user already borrowed this book
    const existingLoan = db.loans.find(
      l => l.userId === userId && l.bukuId === bukuId && l.status === 'dipinjam'
    );
    if (existingLoan) {
      return res.status(400).json({ message: 'User sedang meminjam buku ini' });
    }

    // Create loan
    const newLoan = {
      id: crypto.randomUUID(),
      userId,
      bukuId,
      status: 'dipinjam',
      tanggalPinjam: new Date().toISOString(),
      tanggalKembali: null,
      denda: 0,
    };

    db.loans.push(newLoan);

    // Decrease book stock
    book.stok -= 1;

    // Populate user and book data
    const populatedLoan = {
      ...newLoan,
      user: db.users.find(u => u.id === userId),
      buku: db.books.find(b => b.id === bukuId),
    };

    res.status(201).json({
      message: 'Peminjaman berhasil',
      data: populatedLoan,
    });
  } catch (error) {
    console.error('Borrow book error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// POST /api/pinjam/:id/kembali - Return a book
router.post('/:id/kembali', authMiddleware, (req, res) => {
  try {
    const { denda = 0 } = req.body;
    const loanIndex = db.loans.findIndex(l => l.id === req.params.id);

    if (loanIndex === -1) {
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }

    const loan = db.loans[loanIndex];

    // Check if already returned
    if (loan.status === 'dikembalikan') {
      return res.status(400).json({ message: 'Buku sudah dikembalikan' });
    }

    // Check permission
    if (req.user.role !== 'ADMIN' && loan.userId !== req.user.id) {
      return res.status(403).json({ message: 'Akses ditolak' });
    }

    // Update loan
    loan.status = 'dikembalikan';
    loan.tanggalKembali = new Date().toISOString();
    loan.denda = denda;

    // Increase book stock
    const book = db.books.find(b => b.id === loan.bukuId);
    if (book) {
      book.stok += 1;
    }

    // Populate user and book data
    const populatedLoan = {
      ...loan,
      user: db.users.find(u => u.id === loan.userId),
      buku: db.books.find(b => b.id === loan.bukuId),
    };

    res.json({
      message: 'Pengembalian berhasil',
      data: populatedLoan,
    });
  } catch (error) {
    console.error('Return book error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// DELETE /api/pinjam/:id - Delete transaction (Admin only)
router.delete('/:id', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const loanIndex = db.loans.findIndex(l => l.id === req.params.id);

    if (loanIndex === -1) {
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }

    const loan = db.loans[loanIndex];

    // If loan was active, restore book stock
    if (loan.status === 'dipinjam') {
      const book = db.books.find(b => b.id === loan.bukuId);
      if (book) {
        book.stok += 1;
      }
    }

    db.loans.splice(loanIndex, 1);

    res.json({ message: 'Transaksi berhasil dihapus' });
  } catch (error) {
    console.error('Delete loan error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

export default router;
