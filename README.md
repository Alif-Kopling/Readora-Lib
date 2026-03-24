# Readora - Library Management System

Full-stack library management system with role-based authentication, built with React, Vite, Express.js, and modern technologies.

## 🌟 Features

- **Role-based Authentication** (Admin/Student)
- **Book Management** - CRUD operations for books
- **Loan Transactions** - Borrow and return books tracking
- **Admin Dashboard** - Complete management interface
- **Student Portal** - Book browsing and loan history
- **Protected Routes** - JWT-based authentication
- **Responsive UI** - Modern, beautiful interface

## 📸 Preview

![Pre Login](./src/pict-documentation/pre-login.png)
![Pre Register](./src/pict-documentation/pre-register.png)
![Admin Dashboard](./src/pict-documentation/pre-admindashboard.png)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### 1. Clone Repository

```bash
git clone https://github.com/Alif-Kopling/perpustakaan_menegement_FE.git
cd Readora-Lib
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 4. Run the Application

You need to run **both** the backend and frontend servers:

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```
Backend runs at: `http://localhost:5000`

**Terminal 2 - Frontend Server:**
```bash
npm run dev
```
Frontend runs at: `http://localhost:5173`

## 🔐 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@readora.com` | `admin123` |
| Student | `ahmad@student.com` | `student123` |
| Student | `siti@student.com` | `student123` |

## 📡 API Documentation

The backend provides RESTful API endpoints. See full documentation:
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Complete API reference
- [server/README.md](./server/README.md) - Backend setup guide

## 🛠️ Tech Stack

### Frontend
- React 19 + Vite 7
- JavaScript
- React Router DOM
- Zustand (state management)
- Tailwind CSS v4
- Lucide React (icons)
- Sonner (toast notifications)
- Axios (HTTP client)

### Backend
- Node.js + Express.js
- JWT Authentication
- bcryptjs (password hashing)
- CORS enabled
- In-memory database (for demo)

## 📜 Available Scripts

### Frontend

```bash
npm run dev      # Start development server
npm run build    # Build production bundle
npm run preview  # Preview production build
npm run lint     # Run linting
```

### Backend

```bash
npm run dev      # Start backend with nodemon (auto-reload)
npm start        # Start backend in production mode
```

## 📁 Project Structure

```
Readora-Lib/
├── src/
│   ├── components/
│   │   ├── layout/       # Navbar, Sidebar, Footer
│   │   ├── ui/           # Reusable UI components
│   │   └── shared/       # Shared components (ProtectedRoute)
│   ├── views/
│   │   ├── auth/         # Login, Register pages
│   │   ├── admin/        # Admin dashboard & management
│   │   └── siswa/        # Student portal pages
│   ├── services/
│   │   ├── api.js        # Axios configuration
│   │   └── endpoints/    # API service functions
│   ├── stores/           # Zustand state management
│   ├── router/           # React Router configuration
│   ├── utils/            # Utility functions
│   └── App.jsx
├── server/
│   ├── routes/           # Express route handlers
│   ├── middleware/       # Auth middleware
│   ├── data/             # Mock database
│   └── server.js         # Main server entry
├── API_DOCUMENTATION.md
└── README.md
```

## 🔗 API Endpoints

Base URL: `http://localhost:5000/api`

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get user profile (protected)

### Books
- `GET /buku` - Get all books
- `GET /buku/:id` - Get book by ID
- `POST /buku` - Create book (Admin only)
- `PUT /buku/:id` - Update book (Admin only)
- `DELETE /buku/:id` - Delete book (Admin only)

### Loans
- `GET /pinjam` - Get all transactions
- `GET /pinjam/:id` - Get transaction by ID
- `POST /pinjam/pinjam` - Borrow book
- `POST /pinjam/:id/kembali` - Return book
- `DELETE /pinjam/:id` - Delete transaction (Admin only)

## 🔧 Configuration

### Backend Environment Variables

Create `server/.env` file:

```env
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

### Frontend API Configuration

The frontend is configured to connect to `http://localhost:5000/api` by default.
Edit `src/services/api.js` if you need to change the API base URL.

## 🐛 Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Run `npm install` in the `server` directory
- Check console for error messages

### Frontend can't connect to backend
- Ensure backend server is running on port 5000
- Check CORS configuration in `server/server.js`
- Verify API base URL in `src/services/api.js`

### Login fails
- Make sure backend is running
- Check browser console for errors
- Verify test account credentials

## 📝 Notes

- The backend uses an **in-memory database** - all data resets when server restarts
- For production use, replace with a persistent database (PostgreSQL, MongoDB, etc.)
- JWT tokens expire after 7 days by default
- Student dashboard flow is still under development

## 🤝 Contributing

This project is under active development on the `development` branch.

## 👨‍💻 Authors

- Alif
- Vio

## 📄 License

This project is for educational purposes.

---

**Happy Coding! 📚✨**

