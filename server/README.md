# Readora Backend Server

Backend API server for Readora Library application built with Express.js.

## 🚀 Quick Start

### Install Dependencies

```bash
cd server
npm install
```

### Run the Server

**Development mode (with nodemon):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

Base URL: `http://localhost:5000/api`

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get user profile (protected)

### Books (Buku)
- `GET /buku` - Get all books (with optional filtering)
- `GET /buku/:id` - Get book by ID
- `POST /buku` - Create new book (Admin only, protected)
- `PUT /buku/:id` - Update book (Admin only, protected)
- `DELETE /buku/:id` - Delete book (Admin only, protected)

### Loans (Peminjaman)
- `GET /pinjam` - Get all transactions (protected)
- `GET /pinjam/:id` - Get transaction by ID (protected)
- `GET /pinjam/user/:userId/aktif` - Get active loans (protected)
- `POST /pinjam/pinjam` - Borrow a book (protected)
- `POST /pinjam/:id/kembali` - Return a book (protected)
- `DELETE /pinjam/:id` - Delete transaction (Admin only, protected)

## 🔐 Test Accounts

The server comes with pre-configured test accounts:

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@readora.com` | `admin123` |
| Student | `ahmad@student.com` | `student123` |
| Student | `siti@student.com` | `student123` |

## 📝 Sample Data

The server initializes with:
- 3 users (1 admin, 2 students)
- 6 sample books across different categories
- Empty loans collection

## 🔧 Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

## 🛡️ Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Token is obtained by calling `/api/auth/login` endpoint.

## 📊 API Response Format

### Success Response
```json
{
  "message": "Success message",
  "data": { ... }
}
```

### Error Response
```json
{
  "message": "Error message"
}
```

## 🗄️ Database

This backend uses an **in-memory database** for simplicity and demonstration purposes. 

**Note:** All data will be lost when the server restarts. For production use, replace with a persistent database (PostgreSQL, MongoDB, etc.).

## 📁 Project Structure

```
server/
├── data/
│   └── mockData.js       # Mock database and sample data
├── middleware/
│   └── auth.js           # JWT authentication middleware
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── buku.js           # Book management routes
│   └── pinjam.js         # Loan transaction routes
├── package.json
└── server.js             # Main server entry point
```

## 🔗 CORS Configuration

The server is configured to accept requests from:
- `http://localhost:5173` (Vite default)
- `http://localhost:3000` (React default)
- `http://localhost:5174` (Alternative Vite port)

To add more origins, edit `server.js`:

```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'YOUR_URL'],
  credentials: true,
}));
```

## 🐛 Troubleshooting

### Port already in use
If port 5000 is already in use, either:
1. Change the PORT in `.env` file
2. Kill the process using port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # Linux/Mac
   lsof -ti:5000 | xargs kill -9
   ```

### CORS errors
Make sure your frontend URL is added to the CORS configuration in `server.js`.

### Token errors
- Ensure you're sending the token in the correct format: `Bearer <token>`
- Check if the token is expired (tokens expire after 7 days by default)

## 📚 API Documentation

For detailed API documentation, see [API_DOCUMENTATION.md](../API_DOCUMENTATION.md) in the root directory.
