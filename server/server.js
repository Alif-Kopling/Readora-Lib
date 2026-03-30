import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/buku.js';
import loanRoutes from './routes/pinjam.js';
import { initializeData } from './data/mockData.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/buku', bookRoutes);
app.use('/api/pinjam', loanRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Initialize mock data and start server
initializeData();

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   📚 Readora Backend API Server                          ║
║                                                           ║
║   Server running on: http://localhost:${PORT}             ║
║   API Base URL: http://localhost:${PORT}/api             ║
║                                                           ║
║   Endpoints:                                              ║
║   - Auth: /api/auth                                      ║
║   - Books: /api/buku                                     ║
║   - Loans: /api/pinjam                                   ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});
