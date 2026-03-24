# Perpustakaan API Documentation

**Base URL:** `http://localhost:5000/api`

---

## Table of Contents

1. [Authentication](#authentication)
2. [Books (Buku)](#books-buku)
3. [Loans (Peminjaman)](#loans-peminjaman)
4. [Error Handling](#error-handling)
5. [Frontend Integration Guide](#frontend-integration-guide)

---

## Authentication

### Register User

Create a new user account.

```http
POST /api/auth/register
Content-Type: application/json
```

**Request Body:**
```json
{
  "nama": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "USER"
}
```

| Field    | Type   | Required | Default | Description              |
|----------|--------|----------|---------|--------------------------|
| nama     | string | Yes      | -       | User's full name         |
| email    | string | Yes      | -       | User's email (unique)    |
| password | string | Yes      | -       | User's password          |
| role     | string | No       | USER    | User role: USER or ADMIN |

**Success Response (201):**
```json
{
  "message": "User berhasil didaftarkan",
  "data": {
    "id": "clxxx...",
    "nama": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

---

### Login

Authenticate user and receive JWT token.

```http
POST /api/auth/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login berhasil",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "clxxx...",
      "nama": "John Doe",
      "email": "john@example.com",
      "role": "USER"
    }
  }
}
```

**Error Responses:**
- `400` - Email dan password wajib diisi
- `401` - Email atau password salah

---

### Get User Profile

Get authenticated user's profile.

```http
GET /api/auth/profile
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "data": {
    "id": "clxxx...",
    "nama": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## Books (Buku)

### Get All Books

Retrieve all books with optional filtering.

```http
GET /api/buku
GET /api/buku?kategori=Fiction
GET /api/buku?search=javascript
```

**Query Parameters:**

| Parameter | Type   | Required | Description                    |
|-----------|--------|----------|--------------------------------|
| kategori  | string | No       | Filter by category             |
| search    | string | No       | Search by title or author      |

**Success Response (200):**
```json
{
  "data": [
    {
      "id": "clxxx...",
      "judul": "Belajar JavaScript",
      "penulis": "John Doe",
      "stok": 10,
      "kategori": "Programming",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Get Book by ID

Retrieve a single book by ID.

```http
GET /api/buku/:id
```

**Success Response (200):**
```json
{
  "data": {
    "id": "clxxx...",
    "judul": "Belajar JavaScript",
    "penulis": "John Doe",
    "stok": 10,
    "kategori": "Programming",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "message": "Buku tidak ditemukan"
}
```

---

### Create Book

Create a new book (Admin only).

```http
POST /api/buku
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "judul": "Belajar JavaScript",
  "penulis": "John Doe",
  "stok": 10,
  "kategori": "Programming"
}
```

| Field    | Type   | Required | Default | Description         |
|----------|--------|----------|---------|---------------------|
| judul    | string | Yes      | -       | Book title          |
| penulis  | string | Yes      | -       | Author name         |
| stok     | number | No       | 0       | Available stock     |
| kategori | string | Yes      | -       | Book category       |

**Success Response (201):**
```json
{
  "message": "Buku berhasil ditambahkan",
  "data": {
    "id": "clxxx...",
    "judul": "Belajar JavaScript",
    "penulis": "John Doe",
    "stok": 10,
    "kategori": "Programming",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Judul, penulis, dan kategori wajib diisi
- `401` - Token tidak ditemukan / Token tidak valid
- `403` - Akses ditolak. Hanya admin yang dapat mengakses

---

### Update Book

Update an existing book (Admin only).

```http
PUT /api/buku/:id
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "judul": "Updated Title",
  "penulis": "Updated Author",
  "stok": 15,
  "kategori": "Updated Category"
}
```

**Success Response (200):**
```json
{
  "message": "Buku berhasil diupdate",
  "data": {
    "id": "clxxx...",
    "judul": "Updated Title",
    "penulis": "Updated Author",
    "stok": 15,
    "kategori": "Updated Category",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

---

### Delete Book

Delete a book (Admin only).

```http
DELETE /api/buku/:id
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "message": "Buku berhasil dihapus"
}
```

---

## Loans (Peminjaman)

### Get All Transactions

Get all transactions (Admin) or user's own transactions.

```http
GET /api/pinjam
Authorization: Bearer <token>
GET /api/pinjam?status=dipinjam
GET /api/pinjam?userId=clxxx...
```

**Query Parameters:**

| Parameter | Type   | Required | Description                          |
|-----------|--------|----------|--------------------------------------|
| status    | string | No       | Filter by status: dipinjam/dikembalikan |
| userId    | string | No       | Filter by user ID                    |

**Success Response (200):**
```json
{
  "data": [
    {
      "id": "clxxx...",
      "userId": "clxxx...",
      "bukuId": "clxxx...",
      "status": "dipinjam",
      "tanggalPinjam": "2024-01-01T00:00:00.000Z",
      "tanggalKembali": null,
      "denda": 0,
      "user": {
        "id": "clxxx...",
        "nama": "John Doe",
        "email": "john@example.com"
      },
      "buku": {
        "id": "clxxx...",
        "judul": "Belajar JavaScript",
        "penulis": "John Doe"
      }
    }
  ]
}
```

---

### Get Transaction by ID

Retrieve a single transaction by ID.

```http
GET /api/pinjam/:id
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "data": {
    "id": "clxxx...",
    "userId": "clxxx...",
    "bukuId": "clxxx...",
    "status": "dipinjam",
    "tanggalPinjam": "2024-01-01T00:00:00.000Z",
    "tanggalKembali": null,
    "denda": 0,
    "user": {
      "id": "clxxx...",
      "nama": "John Doe",
      "email": "john@example.com"
    },
    "buku": {
      "id": "clxxx...",
      "judul": "Belajar JavaScript",
      "penulis": "John Doe",
      "stok": 10
    }
  }
}
```

---

### Get User's Active Loans

Get all active loans for a specific user.

```http
GET /api/pinjam/user/:userId/aktif
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "data": [
    {
      "id": "clxxx...",
      "userId": "clxxx...",
      "bukuId": "clxxx...",
      "status": "dipinjam",
      "tanggalPinjam": "2024-01-01T00:00:00.000Z",
      "buku": {
        "id": "clxxx...",
        "judul": "Belajar JavaScript",
        "penulis": "John Doe"
      }
    }
  ]
}
```

---

### Borrow Book

Create a new loan transaction.

```http
POST /api/pinjam/pinjam
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "userId": "clxxx...",
  "bukuId": "clxxx..."
}
```

| Field   | Type   | Required | Description     |
|---------|--------|----------|-----------------|
| userId  | string | Yes      | User ID         |
| bukuId  | string | Yes      | Book ID         |

**Success Response (201):**
```json
{
  "message": "Peminjaman berhasil",
  "data": {
    "id": "clxxx...",
    "userId": "clxxx...",
    "bukuId": "clxxx...",
    "status": "dipinjam",
    "tanggalPinjam": "2024-01-01T00:00:00.000Z",
    "user": {
      "id": "clxxx...",
      "nama": "John Doe",
      "email": "john@example.com"
    },
    "buku": {
      "id": "clxxx...",
      "judul": "Belajar JavaScript",
      "penulis": "John Doe"
    }
  }
}
```

**Error Responses:**
- `400` - User ID dan Buku ID wajib diisi
- `400` - Stok buku tidak tersedia
- `400` - User sedang meminjam buku ini
- `404` - User tidak ditemukan / Buku tidak ditemukan

---

### Return Book

Return a borrowed book.

```http
POST /api/pinjam/:id/kembali
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "denda": 0
}
```

| Field  | Type   | Required | Default | Description      |
|--------|--------|----------|---------|------------------|
| denda  | number | No       | 0       | Fine amount (if any) |

**Success Response (200):**
```json
{
  "message": "Pengembalian berhasil",
  "data": {
    "id": "clxxx...",
    "userId": "clxxx...",
    "bukuId": "clxxx...",
    "status": "dikembalikan",
    "tanggalPinjam": "2024-01-01T00:00:00.000Z",
    "tanggalKembali": "2024-01-15T00:00:00.000Z",
    "denda": 0,
    "user": {
      "id": "clxxx...",
      "nama": "John Doe",
      "email": "john@example.com"
    },
    "buku": {
      "id": "clxxx...",
      "judul": "Belajar JavaScript",
      "penulis": "John Doe"
    }
  }
}
```

**Error Responses:**
- `400` - Buku sudah dikembalikan
- `404` - Transaksi tidak ditemukan

---

### Delete Transaction

Delete a transaction (Admin only).

```http
DELETE /api/pinjam/:id
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "message": "Transaksi berhasil dihapus"
}
```

---

## Error Handling

### Standard Error Response Format

```json
{
  "message": "Error description",
  "error": "Detailed error message (in development)"
}
```

### HTTP Status Codes

| Code | Description | Common Causes |
|------|-------------|---------------|
| 200  | OK          | Successful request |
| 201  | Created     | Resource created successfully |
| 400  | Bad Request | Invalid input, missing required fields |
| 401  | Unauthorized | Missing or invalid token |
| 403  | Forbidden   | Insufficient permissions |
| 404  | Not Found   | Resource not found |
| 500  | Server Error | Internal server error |

### Common Error Messages

**400 Bad Request:**
```json
{
  "message": "Judul, penulis, dan kategori wajib diisi"
}
```

**401 Unauthorized:**
```json
{
  "message": "Token tidak ditemukan"
}
// or
{
  "message": "Token telah kadaluarsa"
}
// or
{
  "message": "Token tidak valid"
}
```

**403 Forbidden:**
```json
{
  "message": "Akses ditolak. Hanya admin yang dapat mengakses"
}
```

**404 Not Found:**
```json
{
  "message": "Buku tidak ditemukan"
}
```

---

## Frontend Integration Guide

### Quick Start

1. **Store the JWT token** after login
2. **Include Authorization header** in all protected requests
3. **Handle errors** appropriately

### React Example with Custom Hook

```javascript
// hooks/useApi.js
import { useState, useCallback } from 'react';

const API_BASE_URL = 'http://localhost:5000/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getToken = () => localStorage.getItem('token');

  const request = useCallback(async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();
      const config = {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
      };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Auth
  const login = async (email, password) => {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem('token', data.data.token);
    return data.data;
  };

  const register = async (nama, email, password, role) => {
    const data = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ nama, email, password, role }),
    });
    return data.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
  };

  const getProfile = async () => {
    const data = await request('/auth/profile');
    return data.data;
  };

  // Books
  const getBooks = async (kategori, search) => {
    const params = new URLSearchParams();
    if (kategori) params.append('kategori', kategori);
    if (search) params.append('search', search);
    
    const queryString = params.toString();
    const url = `/buku${queryString ? `?${queryString}` : ''}`;
    
    const data = await request(url);
    return data.data;
  };

  const getBookById = async (id) => {
    const data = await request(`/buku/${id}`);
    return data.data;
  };

  const createBook = async (bookData) => {
    const data = await request('/buku', {
      method: 'POST',
      body: JSON.stringify(bookData),
    });
    return data.data;
  };

  const updateBook = async (id, bookData) => {
    const data = await request(`/buku/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookData),
    });
    return data.data;
  };

  const deleteBook = async (id) => {
    const data = await request(`/buku/${id}`, {
      method: 'DELETE',
    });
    return data;
  };

  // Loans
  const getLoans = async (status, userId) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (userId) params.append('userId', userId);
    
    const queryString = params.toString();
    const url = `/pinjam${queryString ? `?${queryString}` : ''}`;
    
    const data = await request(url);
    return data.data;
  };

  const getLoanById = async (id) => {
    const data = await request(`/pinjam/${id}`);
    return data.data;
  };

  const getActiveLoans = async (userId) => {
    const data = await request(`/pinjam/user/${userId}/aktif`);
    return data.data;
  };

  const borrowBook = async (userId, bukuId) => {
    const data = await request('/pinjam/pinjam', {
      method: 'POST',
      body: JSON.stringify({ userId, bukuId }),
    });
    return data.data;
  };

  const returnBook = async (id, denda = 0) => {
    const data = await request(`/pinjam/${id}/kembali`, {
      method: 'POST',
      body: JSON.stringify({ denda }),
    });
    return data.data;
  };

  const deleteLoan = async (id) => {
    const data = await request(`/pinjam/${id}`, {
      method: 'DELETE',
    });
    return data;
  };

  return {
    loading,
    error,
    login,
    register,
    logout,
    getProfile,
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    getLoans,
    getLoanById,
    getActiveLoans,
    borrowBook,
    returnBook,
    deleteLoan,
  };
};

export default useApi;
```

### Usage Example in React Component

```javascript
// components/BookList.jsx
import { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';

const BookList = () => {
  const { getBooks, loading, error } = useApi();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        console.error('Failed to fetch books:', err);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Book List</h1>
      {books.map((book) => (
        <div key={book.id}>
          <h3>{book.judul}</h3>
          <p>By: {book.penulis}</p>
          <p>Stock: {book.stok}</p>
          <p>Category: {book.kategori}</p>
        </div>
      ))}
    </div>
  );
};

export default BookList;
```

### Axios Example

```javascript
// utils/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (nama, email, password, role) => 
    api.post('/auth/register', { nama, email, password, role }),
  getProfile: () => api.get('/auth/profile'),
};

// Books API
export const booksAPI = {
  getAll: (params) => api.get('/buku', { params }),
  getById: (id) => api.get(`/buku/${id}`),
  create: (data) => api.post('/buku', data),
  update: (id, data) => api.put(`/buku/${id}`, data),
  delete: (id) => api.delete(`/buku/${id}`),
};

// Loans API
export const loansAPI = {
  getAll: (params) => api.get('/pinjam', { params }),
  getById: (id) => api.get(`/pinjam/${id}`),
  getActive: (userId) => api.get(`/pinjam/user/${userId}/aktif`),
  borrow: (userId, bukuId) => api.post('/pinjam/pinjam', { userId, bukuId }),
  return: (id, denda = 0) => api.post(`/pinjam/${id}/kembali`, { denda }),
  delete: (id) => api.delete(`/pinjam/${id}`),
};

export default api;
```

### Vue 3 Example with Composable

```javascript
// composables/useApi.js
import { ref } from 'vue';
import { authAPI, booksAPI, loansAPI } from '@/utils/api';

export function useApi() {
  const loading = ref(false);
  const error = ref(null);

  const setLoading = (value) => {
    loading.value = value;
  };

  const setError = (value) => {
    error.value = value;
  };

  return {
    loading,
    error,
    setLoading,
    setError,
    auth: authAPI,
    books: booksAPI,
    loans: loansAPI,
  };
}
```

```vue
<!-- components/LoginForm.vue -->
<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit" :disabled="loading">
      {{ loading ? 'Logging in...' : 'Login' }}
    </button>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useApi } from '@/composables/useApi';

const { auth, loading, setLoading, setError } = useApi();

const email = ref('');
const password = ref('');

const handleLogin = async () => {
  setLoading(true);
  setError(null);

  try {
    const { data } = await auth.login(email.value, password.value);
    localStorage.setItem('token', data.data.token);
    // Redirect to dashboard
  } catch (err) {
    setError(err.message || 'Login failed');
  } finally {
    setLoading(false);
  }
};
</script>
```

---

## Setup & Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/perpus_db"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key"

# Frontend URL (CORS)
FRONTEND_URL="http://localhost:3000"

# Port
PORT=5000
```

### Running the Server

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration

# Generate Prisma client
npm run generate

# Run database migrations
npm run migrate

# Start development server
npm run dev

# Server runs on http://localhost:5000
```

### CORS Configuration

The backend is configured to accept requests from your frontend:

- **Development:** `http://localhost:3000` (React default)
- **Production:** Update `FRONTEND_URL` in `.env` with your production domain

---

## API Response Structure

All responses follow a consistent structure:

**Success:**
```json
{
  "message": "Success message",
  "data": { /* response data */ }
}
```

**Error:**
```json
{
  "message": "Error message",
  "error": "Detailed error (development only)"
}
```

---

## Token Expiration

- JWT tokens expire after **7 days**
- When token expires, frontend should redirect to login page
- Consider implementing token refresh mechanism for better UX

---

## Rate Limiting

Currently, there is no rate limiting implemented. Consider adding rate limiting for production use.

---

## Support

For issues or questions, please check:
1. Error messages in the response
2. Server logs for detailed error information
3. Ensure all required fields are provided
4. Verify token is valid and not expired
