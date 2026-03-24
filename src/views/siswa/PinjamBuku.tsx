import { useState } from "react";
import { motion } from "framer-motion";
import { Grid, List, SlidersHorizontal } from "lucide-react";
import SearchBar from "../../components/siswa/SearchBar";
import BookCard from "../../components/siswa/BookCard";
import ConfirmModal from "../../components/siswa/ConfirmModal";
import { allBooks, categories } from "../../utils/mockData";

type ViewMode = "grid" | "list";

export default function PinjamBuku() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<typeof allBooks[0] | null>(null);

  const filteredBooks = allBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBorrowClick = (book: typeof allBooks[0]) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const handleConfirmBorrow = () => {
    // In a real app, this would call an API
    console.log("Borrowing book:", selectedBook?.title);
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
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Borrow Books 📚</h1>
        <p className="text-lg text-gray-600">
          Discover and borrow from our extensive collection of books.
        </p>
      </motion.div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by title or author..."
            />
          </div>

          {/* View Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex gap-2 bg-white border border-gray-200 rounded-xl p-1.5 shadow-sm"
          >
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded-lg transition-all duration-200 ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 rounded-lg transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide"
        >
          <div className="flex items-center gap-2 text-gray-600 flex-shrink-0">
            <SlidersHorizontal className="w-5 h-5" />
            <span className="font-semibold">Filter:</span>
          </div>
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="mb-6"
      >
        <p className="text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredBooks.length}</span> books
        </p>
      </motion.div>

      {/* Books Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book, index) => (
            <BookCard
              key={book.id}
              book={book}
              action={{
                label: book.available ? "Borrow Book" : "Unavailable",
                onClick: () => handleBorrowClick(book),
                disabled: !book.available,
              }}
              delay={0.1 * (index % 8)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBooks.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0 w-full sm:w-32 h-48 sm:h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-md">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{book.author}</p>
                    </div>
                    <span
                      className={`ml-3 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                        book.available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {book.available ? "Available" : "Unavailable"}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-sm font-medium rounded-full">
                      {book.category}
                    </span>
                    <span className="text-sm text-gray-500">ISBN: {book.isbn}</span>
                    <span className="text-sm text-gray-500">
                      {book.availableCopies}/{book.totalCopies} copies available
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: book.available ? 1.02 : 1 }}
                    whileTap={{ scale: book.available ? 0.98 : 1 }}
                    onClick={() => handleBorrowClick(book)}
                    disabled={!book.available}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      book.available
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {book.available ? "Borrow Book" : "Unavailable"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-4">
            <span className="text-4xl">📚</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No books found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </motion.div>
      )}

      {/* Borrow Confirmation Modal */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmBorrow}
        title="Borrow Book"
        message={`Are you sure you want to borrow "${selectedBook?.title}" by ${selectedBook?.author}? The book will be due in 30 days.`}
        confirmText="Borrow"
        type="success"
      />
    </motion.div>
  );
}
