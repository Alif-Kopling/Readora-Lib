# 📚 Struktur Folder Perpustakaan React Frontend

Struktur folder ini mengikuti best practices untuk aplikasi React dengan state management menggunakan Zustand.

## 📁 Struktur Lengkap

```
perpus_react-fe/
├── 📁 public/                 # Asset statis publik (favicon.ico, logo-sekolah.png)
├── 📁 src/
│   ├── 📁 assets/             # Asset yang diproses compiler (Vite)
│   │   ├── 📁 css/            # main.css, tailwind.css, atau bootstrap.scss
│   │   └── 📁 img/            # Gambar internal, ilustrasi login
│   │
│   ├── 📁 components/         # Komponen UI yang bisa dipakai berulang (Reusable)
│   │   ├── 📁 ui/             # Komponen kecil: Button.jsx, Input.jsx, Modal.jsx, Loader.jsx
│   │   ├── 📁 layout/         # Kerangka: Navbar.jsx, Sidebar.jsx, Footer.jsx
│   │   └── 📁 shared/         # Komponen umum: ProtectedRoute.jsx
│   │
│   ├── 📁 views/              # Halaman utama aplikasi (sesuai Flowchart)
│   │   ├── 📁 auth/           # Login.jsx, Register.jsx
│   │   ├── 📁 admin/          # Dashboard.jsx, KelolaBuku.jsx, KelolaAnggota.jsx, dll
│   │   └── 📁 siswa/          # Dashboard.jsx, PinjamBuku.jsx, Riwayat.jsx
│   │
│   ├── 📁 router/             # Konfigurasi Navigasi (React Router)
│   │   ├── AppRoutes.jsx      # Route utama
│   │   └── guards.js          # Proteksi halaman (Middleware Admin vs Siswa)
│   │
│   ├── 📁 stores/             # State Management (Zustand)
│   │   ├── auth.js            # Simpan data login & Role (Admin/Siswa)
│   │   └── perpustakaan.js    # Simpan state data buku secara global
│   │
│   ├── 📁 services/           # Komunikasi dengan Backend (Axios)
│   │   ├── api.js             # Base config Axios (Base URL, Interceptors)
│   │   └── endpoints/         # authService.js, bukuService.js, transaksiService.js, anggotaService.js
│   │
│   ├── 📁 utils/              # Fungsi pembantu (Helper)
│   │   ├── formatters.js      # Format tanggal, format mata uang
│   │   └── validators.js      # Logika validasi form
│   │
│   ├── App.jsx                # Root component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
│
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 📝 Penjelasan Folder

### 🎨 **components/**
Komponen UI yang dapat digunakan kembali di berbagai halaman.

- **ui/** - Komponen UI kecil dan reusable (Button, Input, Modal, Badge, dll)
- **layout/** - Komponen layout utama (Navbar, Sidebar, Footer)
- **shared/** - Komponen yang digunakan bersama (ProtectedRoute, TableData, ModalConfirm)

### 📄 **views/**
Halaman-halaman utama aplikasi yang sesuai dengan flowchart.

- **auth/** - Halaman autentikasi (Login, Register)
- **admin/** - Halaman khusus admin (Dashboard, Kelola Buku, Kelola Anggota, dll)
- **siswa/** - Halaman khusus siswa (Dashboard, Pinjam Buku, Riwayat)

### 🛣️ **router/**
Konfigurasi routing dan proteksi halaman.

- **AppRoutes.jsx** - Definisi semua route aplikasi
- **guards.js** - Middleware untuk proteksi route berdasarkan role (requireAuth, requireAdmin, requireSiswa, guestOnly)

### 🗄️ **stores/**
State management menggunakan Zustand.

- **auth.js** - Store untuk autentikasi (user, token, role)
- **perpustakaan.js** - Store untuk data perpustakaan (buku, anggota, transaksi)

### 🌐 **services/**
Komunikasi dengan backend API.

- **api.js** - Konfigurasi base Axios (base URL, interceptors, error handling)
- **endpoints/** - Service untuk setiap endpoint API
  - authService.js - Login, register, logout
  - bukuService.js - CRUD buku
  - anggotaService.js - CRUD anggota
  - transaksiService.js - CRUD transaksi peminjaman/pengembalian

### 🛠️ **utils/**
Fungsi-fungsi helper yang dapat digunakan di seluruh aplikasi.

- **formatters.js** - Format tanggal, mata uang, dll
- **validators.js** - Validasi form (email, password, dll)

### 🎨 **assets/**
Asset yang akan diproses oleh bundler (Vite).

- **css/** - File CSS/SCSS
- **img/** - Gambar yang di-import dalam komponen

## 🚀 Cara Penggunaan

### Import Store
```javascript
import useAuthStore from '@/stores/auth';
import usePerpustakaanStore from '@/stores/perpustakaan';

// Di dalam component
const { user, login, logout } = useAuthStore();
const { buku, setBuku, addBuku } = usePerpustakaanStore();
```

### Import Service
```javascript
import { loginUser, registerUser } from '@/services/endpoints/authService';
import { getAllBuku, createBuku } from '@/services/endpoints/bukuService';
```

### Gunakan Route Guards
```javascript
import { requireAuth, requireAdmin, requireSiswa, guestOnly } from '@/router/guards';

// Di dalam route config
{
  path: '/admin/dashboard',
  element: <AdminDashboard />,
  beforeEnter: requireAdmin
}
```

## 📦 Dependencies

Pastikan install dependencies berikut:

```bash
npm install zustand axios react-router-dom
npm install zustand/middleware # untuk persist
```

## 🎯 Best Practices

1. **Komponen** - Buat komponen kecil dan reusable
2. **State Management** - Gunakan Zustand untuk state global
3. **API Calls** - Semua API call harus melalui services
4. **Route Protection** - Gunakan guards untuk proteksi route
5. **Naming Convention** - PascalCase untuk komponen, camelCase untuk functions

---

**Dibuat dengan ❤️ untuk Sistem Perpustakaan**
