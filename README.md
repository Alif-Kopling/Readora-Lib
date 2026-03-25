# Readora-Lib

<div align="center">

[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38b2ac?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**Modern Library Management System**

A comprehensive frontend solution for managing library operations with role-based access control.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Documentation](#-documentation) • [Authors](#-authors)

</div>

---

## 📸 Preview

### Authentication
<div align="center">
  <img src="./src/pict-documentation/pre-login.png" alt="Login Page" width="45%" />
  <img src="./src/pict-documentation/pre-register.png" alt="Register Page" width="45%" />
</div>

### Admin Dashboard
<div align="center">
  <img src="./src/pict-documentation/pre-admindashboard.png" alt="Admin Dashboard" width="90%" />
</div>

### Additional Screens
<div align="center">
  <img src="./src/pict-documentation/Screenshot%202026-03-24%20103204.png" alt="Dashboard View" width="30%" />
  <img src="./src/pict-documentation/Screenshot%202026-03-24%20103219.png" alt="Books Management" width="30%" />
  <img src="./src/pict-documentation/Screenshot%202026-03-24%20103228.png" alt="Transactions" width="30%" />
</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Build](#build)
- [Project Structure](#-project-structure)
- [Authentication Flow](#-authentication-flow)
- [State Management](#-state-management)
- [API Integration](#-api-integration)
- [Contributing](#-contributing)
- [Authors](#-authors)
- [License](#-license)

---

## ✨ Features

### 🔐 Authentication & Authorization

| Feature | Description |
|---------|-------------|
| **Role-Based Login** | Separate access for Admin and Siswa (Students) |
| **User Registration** | Self-registration for new users |
| **Protected Routes** | Route guards based on user roles |
| **Persistent Sessions** | LocalStorage + Zustand for state persistence |
| **Auto Redirection** | Role-based dashboard redirection |

### 👨‍💼 Admin Features

| Module | Capabilities |
|--------|--------------|
| **Dashboard** | Library overview, statistics, and quick insights |
| **Books Management** | Full CRUD operations for library books |
| **Members Management** | Manage library members (Anggota) |
| **Transactions** | Handle book borrowing and returning processes |
| **Settings** | System configuration and preferences |

### 👨‍🎓 Student (Siswa) Features

| Module | Capabilities |
|--------|--------------|
| **Dashboard** | Personal overview and quick access |
| **Borrow Books** | Browse catalog and borrow available books |
| **History** | View personal borrowing history |

---

## 🛠️ Tech Stack

### Core Technologies

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | React | 19 |
| **Build Tool** | Vite | 7 |
| **Language** | JavaScript / TypeScript | ES6+ / 5.x |
| **Routing** | React Router DOM | 7 |

### Styling & UI

| Category | Technology | Version |
|----------|------------|---------|
| **CSS Framework** | Tailwind CSS | 4 |
| **UI Components** | shadcn/ui | Latest |
| **Icons** | Lucide React | Latest |
| **Animations** | Framer Motion | Latest |

### State & Data

| Category | Technology | Version |
|----------|------------|---------|
| **State Management** | Zustand | 5 |
| **HTTP Client** | Axios | Latest |
| **Notifications** | Sonner | Latest |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Alif-Kopling/Readora-Lib.git
   cd Readora-Lib
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** (if needed)

   Create a `.env` file in the root directory:

   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at: **http://localhost:5173/**

### Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

---

## 📁 Project Structure

```text
src/
├── assets/                  # Static assets (images, fonts, etc.)
├── components/              # Reusable UI components
│   ├── books/              # Book-related components
│   ├── figma/              # Figma design components
│   ├── layout/             # Layout components
│   │   ├── Footer.jsx
│   │   ├── Layout.tsx
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── SiswaLayout.tsx
│   ├── members/            # Member management components
│   ├── notifications/      # Notification components
│   ├── shared/             # Shared components
│   ├── siswa/              # Student-specific components
│   └── ui/                 # Base UI components (shadcn/ui)
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── modal.tsx
│       ├── select.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       └── ... (55+ components)
├── pict-documentation/      # Screenshots and documentation
├── router/                  # Routing configuration
│   ├── AppRoutes.jsx       # Main routes
│   └── guards.js           # Route guards (RequireAdmin, RequireSiswa)
├── services/                # API and external services
│   ├── endpoints/          # API endpoints
│   │   ├── anggotaService.js
│   │   └── authService.js
│   ├── api.js              # API configuration (Axios instance)
│   ├── mockData.ts         # Mock data for development
│   └── notificationService.ts
├── stores/                  # Zustand state stores
│   ├── auth.js             # Authentication store
│   ├── notification.ts     # Notification store
│   └── perpustakaan.js     # Library store
├── style/                   # Global styles
├── types/                   # TypeScript type definitions
├── utils/                   # Utility functions
├── views/                   # Page views
│   ├── admin/              # Admin pages
│   │   ├── Anggota/        # Member management
│   │   │   └── AnggotaList.jsx
│   │   ├── Buku/           # Book management
│   │   │   └── BukuList.jsx
│   │   ├── Transaksi/      # Transaction management
│   │   │   ├── BooksManagement.tsx
│   │   │   └── TransaksiList.jsx
│   │   ├── Dashboard.tsx
│   │   ├── DashboardAdmin.jsx
│   │   ├── MembersManagement.tsx
│   │   ├── Settings.tsx
│   │   └── Transactions.tsx
│   ├── auth/               # Authentication pages
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   └── siswa/              # Student pages
│       ├── Dashboard.tsx
│       ├── PinjamBuku.tsx
│       └── Riwayat.tsx
├── App.jsx                  # Main app component
└── main.jsx                 # Entry point
```

---

## 🔐 Authentication Flow

```mermaid
graph LR
    A[Login/Register] --> B{Authenticated?}
    B -->|Yes| C{Check Role}
    B -->|No| A
    C -->|Admin| D[/admin/dashboard]
    C -->|Siswa| E[/siswa/dashboard]
    D --> F[Admin Features]
    E --> G[Student Features]
```

### Route Protection

| Role | Protected Routes |
|------|-----------------|
| **Admin** | `/admin/dashboard`, `/admin/books`, `/admin/members`, `/admin/transactions`, `/admin/settings` |
| **Siswa** | `/siswa/dashboard`, `/siswa/pinjam`, `/siswa/riwayat` |

### Implementation

```javascript
// Example route guard
function RequireAdmin({ children }) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const role = useAuthStore((state) => state.role);

    if (!isAuthenticated || role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
}
```

---

## 🗄️ State Management

The application uses **Zustand** for lightweight and efficient state management.

| Store | Purpose | Key State |
|-------|---------|-----------|
| `auth.js` | User authentication | token, role, user info, isAuthenticated |
| `notification.ts` | Notification management | notifications, queue |
| `perpustakaan.js` | Library data | books, members, transactions |

### Example Usage

```javascript
import useAuthStore from './stores/auth';

// Access auth state
const { user, isAuthenticated, logout } = useAuthStore();
```

---

## 🌐 API Integration

### Configuration

API configuration is located in `services/api.js`:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Available Services

| Service | File | Description |
|---------|------|-------------|
| **Auth Service** | `endpoints/authService.js` | Login, register, logout |
| **Anggota Service** | `endpoints/anggotaService.js` | Member management |

### Mock Data

For development purposes, mock data is available in `services/mockData.ts`.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Test your changes before submitting

---

## 👥 Authors

| Name | Role |
|------|------|
| **Alif** | Developer |
| **Vio** | Developer |

---

## 📄 License

This project is **private and proprietary**. All rights reserved.

---

<div align="center">

**Readora-Lib** - Library Management System

Built with ❤️ using React + Vite + Tailwind CSS

</div>
