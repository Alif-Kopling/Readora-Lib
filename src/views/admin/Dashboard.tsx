import { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { BookOpen, Users, ArrowLeftRight, TrendingUp } from 'lucide-react';
import { mockBooks, mockMembers, mockTransactions } from '../../services/mockData';
import { mockNotifications } from '../../services/notificationService';
import { NotificationPanel } from '../../components/notifications/NotificationPanel';
import { DashboardStats } from '../../types';
import { motion } from 'motion/react';

export function Dashboard() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const stats: DashboardStats = {
    totalBooks: mockBooks.length,
    availableBooks: mockBooks.filter((b) => b.status === 'Available').length,
    totalMembers: mockMembers.length,
    activeTransactions: mockTransactions.filter((t) => t.status === 'Borrowed' || t.status === 'Overdue').length,
  };

  const recentTransactions = mockTransactions.slice(0, 5);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <>
      <Layout
        title="Dashboard"
        notificationCount={unreadCount}
        onNotificationClick={() => setIsNotificationOpen(true)}
      >
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Books</p>
                <h3 className="text-3xl font-bold text-gray-900">{stats.totalBooks}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-3 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {stats.availableBooks} available
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Available Books</p>
                <h3 className="text-3xl font-bold text-gray-900">{stats.availableBooks}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              {Math.round((stats.availableBooks / stats.totalBooks) * 100)}% of total
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Members</p>
                <h3 className="text-3xl font-bold text-gray-900">{stats.totalMembers}</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              {mockMembers.filter((m) => m.status === 'Active').length} active members
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Transactions</p>
                <h3 className="text-3xl font-bold text-gray-900">{stats.activeTransactions}</h3>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <ArrowLeftRight className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <p className="text-xs text-orange-600 mt-3">
              {mockTransactions.filter((t) => t.status === 'Overdue').length} overdue
            </p>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
            <div className="space-y-4">
              {recentTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{transaction.bookTitle}</p>
                    <p className="text-xs text-gray-500">{transaction.memberName}</p>
                  </div>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      transaction.status === 'Returned'
                        ? 'bg-green-100 text-green-800'
                        : transaction.status === 'Overdue'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Popular Books */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Categories</h3>
            <div className="space-y-3">
              {['Fiction', 'Fantasy', 'Science Fiction', 'Non-Fiction', 'Romance'].map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white text-xs font-medium">
                      {category.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{category}</span>
                  </div>
                  <span className="text-sm text-gray-500">{5 - index} books</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Layout>

      <NotificationPanel
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDelete={handleDeleteNotification}
      />
    </>
  );
}