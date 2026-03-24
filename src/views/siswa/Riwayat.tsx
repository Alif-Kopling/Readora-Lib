import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, AlertCircle } from "lucide-react";
import ConfirmModal from "../../components/siswa/ConfirmModal";
import { borrowedBooks } from "../../utils/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export default function Riwayat() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<typeof borrowedBooks[0] | null>(null);

  const handleReturnClick = (book: typeof borrowedBooks[0]) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const handleConfirmReturn = () => {
    // In a real app, this would call an API
    console.log("Returning book:", selectedBook?.book.title);
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Return Books 📖</h1>
        <p className="text-lg text-gray-600">
          Manage and return your borrowed books easily.
        </p>
      </motion.div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg shadow-blue-500/30 text-white mb-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">
              {borrowedBooks.length} Books Borrowed
            </h2>
            <p className="text-blue-100">
              {borrowedBooks.filter((b) => b.status === "due-soon").length} due soon,{" "}
              {borrowedBooks.filter((b) => b.status === "overdue").length} overdue
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl">
            <Calendar className="w-5 h-5" />
            <span className="font-semibold">30-day loan period</span>
          </div>
        </div>
      </motion.div>

      {/* Borrowed Books List */}
      <div className="space-y-4">
        {borrowedBooks.map((borrowed, index) => {
          const daysUntilDue = getDaysUntilDue(borrowed.dueDate);
          const isOverdue = daysUntilDue < 0;
          const isDueSoon = daysUntilDue >= 0 && daysUntilDue <= 3;

          return (
            <motion.div
              key={borrowed.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Book Cover */}
                <div className="flex-shrink-0 w-full lg:w-48 h-64 lg:h-auto bg-gradient-to-br from-gray-100 to-gray-200">
                  <ImageWithFallback
                    src={borrowed.book.coverUrl}
                    alt={borrowed.book.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Book Info */}
                <div className="flex-1 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {borrowed.book.title}
                      </h3>
                      <p className="text-lg text-gray-600 mb-3">{borrowed.book.author}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-sm font-medium rounded-full">
                          {borrowed.book.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          ISBN: {borrowed.book.isbn}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <span
                        className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${
                          isOverdue
                            ? "bg-red-100 text-red-700"
                            : isDueSoon
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {isOverdue
                          ? "Overdue"
                          : isDueSoon
                          ? "Due Soon"
                          : "Active"}
                      </span>
                    </div>
                  </div>

                  {/* Dates and Warning */}
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-xl p-4 mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Borrowed Date</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(borrowed.borrowDate).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Due Date</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(borrowed.dueDate).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    {(isOverdue || isDueSoon) && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`flex items-center gap-2 p-3 rounded-lg ${
                          isOverdue
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <p className="text-sm font-medium">
                          {isOverdue
                            ? `This book is ${Math.abs(daysUntilDue)} day${
                                Math.abs(daysUntilDue) !== 1 ? "s" : ""
                              } overdue. Please return it as soon as possible.`
                            : `Due in ${daysUntilDue} day${
                                daysUntilDue !== 1 ? "s" : ""
                              }. Return soon to avoid late fees.`}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Return Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleReturnClick(borrowed)}
                    className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200"
                  >
                    Return Book
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {borrowedBooks.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-16 bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-4">
            <span className="text-4xl">📚</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No borrowed books</h3>
          <p className="text-gray-600 mb-6">
            You don't have any books to return at the moment.
          </p>
          <motion.a
            href="/borrow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all duration-200"
          >
            Browse Books
          </motion.a>
        </motion.div>
      )}

      {/* Return Confirmation Modal */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmReturn}
        title="Return Book"
        message={`Are you sure you want to return "${selectedBook?.book.title}"? Make sure the book is in good condition before returning.`}
        confirmText="Return Book"
        type="success"
      />
    </motion.div>
  );
}
