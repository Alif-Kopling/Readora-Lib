import { useState } from 'react';
import { Layout } from '../../../components/layout/Layout';
import { BookTable } from '../../../components/books/BookTable';
import { BookModal } from '../../../components/books/BookModal';
import { Plus } from 'lucide-react';
import { mockBooks as initialBooks } from '../../../services/mockData';
import { Book } from '../../../types';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export function BukuList() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | undefined>();

  const handleAddBook = (bookData: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...bookData,
      id: (books.length + 1).toString(),
    };
    setBooks([...books, newBook]);
    toast.success(`"${bookData.title}" has been added successfully!`);
  };

  const handleEditBook = (bookData: Omit<Book, 'id'>) => {
    if (editingBook) {
      setBooks(books.map((book) => (book.id === editingBook.id ? { ...bookData, id: book.id } : book)));
      setEditingBook(undefined);
      toast.success(`"${bookData.title}" has been updated successfully!`);
    }
  };

  const handleDeleteBook = (id: string) => {
    const book = books.find((b) => b.id === id);
    if (confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter((book) => book.id !== id));
      toast.success(`"${book?.title}" has been deleted`);
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
    <Layout title="Books Management">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Books', value: books.length, color: 'blue' },
            { label: 'Available', value: books.filter((b) => b.status === 'Available').length, color: 'green' },
            { label: 'Borrowed', value: books.filter((b) => b.status === 'Borrowed').length, color: 'yellow' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
              className="bg-white/50 dark:bg-black/20 backdrop-blur-xl rounded-2xl shadow-glass border border-white/20 dark:border-white/10 p-6 hover:shadow-premium transition-all group"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${
                stat.color === 'green' ? 'text-green-600 dark:text-green-400' : 
                stat.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' : 
                'text-gray-900 dark:text-white'
              }`}>
                {stat.value}
              </p>
            </motion.div>
          ))}
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
  );
}
