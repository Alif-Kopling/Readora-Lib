import { motion } from "framer-motion";
import { Book as BookType } from "../../utils/mockData";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface BookCardProps {
  book: BookType;
  action?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
  delay?: number;
}

export default function BookCard({ book, action, delay = 0 }: BookCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:shadow-gray-200/80 transition-shadow duration-300 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <ImageWithFallback
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg ${book.available
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
              }`}
          >
            {book.available ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 min-h-[3rem]">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600">{book.author}</p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-xs font-medium rounded-full">
            {book.category}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>ISBN: {book.isbn}</span>
          <span>
            {book.availableCopies}/{book.totalCopies} Available
          </span>
        </div>

        {/* Button */}
        {action && (
          <div className="mt-auto">
            <motion.button
              whileHover={{ scale: action.disabled ? 1 : 1.02 }}
              whileTap={{ scale: action.disabled ? 1 : 0.98 }}
              onClick={action.onClick}
              disabled={action.disabled}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${action.disabled
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
                }`}
            >
              {action.label}
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}