import { useState, useEffect } from 'react';
import { BookOpen, Clock, CheckCircle, AlertCircle, TrendingUp, Bell } from 'lucide-react';
import { motion } from 'motion/react';
import useAuthStore from '../../stores/auth';
import usePerpustakaanStore from '../../stores/perpustakaan';
import { toast } from 'sonner';

export function StudentDashboard() {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const { user, logout } = useAuthStore();
    const { buku, transaksi, loading, fetchBuku, fetchTransaksi } = usePerpustakaanStore();

    useEffect(() => {
        fetchBuku();
        if (user?.id) {
            fetchTransaksi();
        }
    }, [user]);

    const activeLoans = transaksi?.filter(t => t.status === 'Borrowed') || [];
    const overdueLoans = transaksi?.filter(t => t.status === 'Overdue') || [];

    const stats = {
        totalBooks: buku?.length || 0,
        availableBooks: buku?.filter((b) => b.status === 'Available').length || 0,
        activeLoans: activeLoans.length,
        overdueLoans: overdueLoans.length,
    };

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Readora
                                </h1>
                                <p className="text-xs text-gray-500">Student Portal</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                className="relative p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                <Bell className="w-5 h-5 text-gray-600" />
                                {overdueLoans.length > 0 && (
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                                )}
                            </button>

                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-900">{user?.nama || 'Student'}</p>
                                    <p className="text-xs text-gray-500">{user?.email}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome back, {user?.nama?.split(' ')[0] || 'Student'}! 👋
                    </h2>
                    <p className="text-gray-600">
                        Here's what's happening with your library account today.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalBooks}</p>
                        <p className="text-sm text-gray-500 mt-1">Total Books</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-green-100"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.availableBooks}</p>
                        <p className="text-sm text-gray-500 mt-1">Available Books</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                                <Clock className="w-6 h-6 text-amber-600" />
                            </div>
                            <span className="text-xs text-amber-600 font-medium">Active</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.activeLoans}</p>
                        <p className="text-sm text-gray-500 mt-1">Active Loans</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-red-100"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-red-600" />
                            </div>
                            {overdueLoans.length > 0 && (
                                <span className="text-xs text-red-600 font-medium">Overdue</span>
                            )}
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.overdueLoans}</p>
                        <p className="text-sm text-gray-500 mt-1">Overdue Loans</p>
                    </motion.div>
                </div>

                {/* Recent Activity & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Active Loans */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100"
                    >
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Loans</h3>
                        {activeLoans.length === 0 ? (
                            <div className="text-center py-8">
                                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500">No active loans</p>
                                <p className="text-sm text-gray-400 mt-1">Browse our collection to borrow books</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {activeLoans.map((loan) => (
                                    <div
                                        key={loan.id}
                                        className="p-4 bg-blue-50 rounded-xl border border-blue-100"
                                    >
                                        <p className="font-medium text-gray-900">{loan.bookTitle}</p>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Borrowed: {new Date(loan.borrowDate).toLocaleDateString()}
                                        </p>
                                        <span className="inline-block mt-2 px-3 py-1 bg-blue-200 text-blue-700 text-xs rounded-full">
                                            {loan.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-100"
                    >
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button
                                onClick={() => window.location.href = '/books'}
                                className="w-full p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg shadow-blue-200"
                            >
                                📚 Browse Books
                            </button>
                            <button
                                onClick={() => window.location.href = '/my-loans'}
                                className="w-full p-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all font-medium shadow-lg shadow-amber-200"
                            >
                                ⏰ My Loans
                            </button>
                            <button
                                onClick={() => window.location.href = '/profile'}
                                className="w-full p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all font-medium shadow-lg shadow-purple-200"
                            >
                                👤 My Profile
                            </button>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
