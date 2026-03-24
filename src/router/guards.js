import useAuthStore from '../stores/auth';

/**
 * Route Guards - Middleware untuk proteksi halaman
 * Mengecek autentikasi dan role user sebelum akses halaman
 */

/**
 * Guard untuk halaman yang memerlukan autentikasi
 */
export const requireAuth = (to, from, next) => {
    const { isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
        // Redirect ke login jika belum login
        next('/login');
    } else {
        next();
    }
};

/**
 * Guard untuk halaman Admin
 * Hanya admin yang bisa akses
 */
export const requireAdmin = (to, from, next) => {
    const { isAuthenticated, isAdmin } = useAuthStore.getState();

    if (!isAuthenticated) {
        // Redirect ke login jika belum login
        next('/login');
    } else if (!isAdmin()) {
        // Redirect ke dashboard siswa jika bukan admin
        next('/siswa/dashboard');
    } else {
        next();
    }
};

/**
 * Guard untuk halaman Siswa
 * Hanya siswa yang bisa akses
 */
export const requireSiswa = (to, from, next) => {
    const { isAuthenticated, isSiswa } = useAuthStore.getState();

    if (!isAuthenticated) {
        // Redirect ke login jika belum login
        next('/login');
    } else if (!isSiswa()) {
        // Redirect ke dashboard admin jika bukan siswa
        next('/admin/dashboard');
    } else {
        next();
    }
};

/**
 * Guard untuk halaman guest (login/register)
 * Redirect ke dashboard jika sudah login
 */
export const guestOnly = (to, from, next) => {
    const { isAuthenticated, isAdmin } = useAuthStore.getState();

    if (isAuthenticated) {
        // Redirect ke dashboard sesuai role
        if (isAdmin()) {
            next('/admin/dashboard');
        } else {
            next('/siswa/dashboard');
        }
    } else {
        next();
    }
};
