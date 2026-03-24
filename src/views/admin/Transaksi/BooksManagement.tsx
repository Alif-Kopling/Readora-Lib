import { useState, useEffect } from 'react';
import { Layout } from '../../../components/layout/Layout';
import { BookTable } from '../../../components/books/BookTable';
import { BookModal } from '../../../components/books/BookModal';
import { Plus } from 'lucide-react';
import { mockNotifications } from '../../../services/notificationService';
import { NotificationPanel } from '../../../components/notifications/NotificationPanel';
import { Book } from '../../../types';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import usePerpustakaanStore from '../../../stores/perpustakaan';

export function BooksManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | undefined>();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const {
    buku: books,
    loading,
    fetchBuku,
    addBuku,
    updateBuku,
    deleteBuku,
  } = usePerpustakaanStore();

  // Fetch books on mount
  useEffect(() => {
    fetchBuku();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    toast.success('Notification deleted');
  };

  const handleAddBook = async (bookData: Omit<Book, 'id'>) => {
    try {
      await addBuku(bookData);
      toast.success(`"${bookData.title}" has been added successfully!`);
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to add book. Please try again.');
    }
  };

  const handleEditBook = async (bookData: Omit<Book, 'id'>) => {
    if (editingBook) {
      try {
        await updateBuku(editingBook.id, bookData);
        toast.success(`"${bookData.title}" has been updated successfully!`);
        setEditingBook(undefined);
        setIsModalOpen(false);
      } catch (error) {
        toast.error('Failed to update book. Please try again.');
      }
    }
  };

  const handleDeleteBook = async (id: string) => {
    const book = books.find((b) => b.id === id);
    if (confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBuku(id);
        toast.success(`"${book?.title}" has been deleted`);
      } catch (error) {
        toast.error('Failed to delete book. Please try again.');
      }
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBook(undefined);
  };

  return (
    <>
      <Layout
        title="Books Management"
        notificationCount={unreadCount}
        onNotificationClick={() => setIsNotificationOpen(true)}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <p className="text-gray-600">Manage your library's book collection</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <Plus className="h-5 w-5" />
            Add Book
          </motion.button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <p className="text-sm text-gray-600">Total Books</p>
            <p className="text-2xl font-bold text-gray-900">{books.length}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <p className="text-sm text-gray-600">Available</p>
            <p className="text-2xl font-bold text-green-600">
              {books.filter((b) => b.status === 'Available').length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <p className="text-sm text-gray-600">Borrowed</p>
            <p className="text-2xl font-bold text-yellow-600">
              {books.filter((b) => b.status === 'Borrowed').length}
            </p>
          </motion.div>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <BookTable books={books} onEdit={handleEdit} onDelete={handleDeleteBook} />
        </motion.div>

        {/* Modal */}
        <BookModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={editingBook ? handleEditBook : handleAddBook}
          book={editingBook}
        />
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