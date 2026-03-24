import { motion } from "framer-motion";
import { BookOpen, Calendar, Clock, TrendingUp } from "lucide-react";
import StatCard from "../../components/siswa/StatCard";
import { studentInfo, studentStats, borrowedBooks } from "../../utils/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto"
    >
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {studentInfo.name.split(" ")[0]}! 👋
        </h1>
        <p className="text-lg text-gray-600">
          Here's what's happening with your library account today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Borrowed Books"
          value={studentStats.borrowedBooks}
          icon={BookOpen}
          color="blue"
          delay={0.1}
        />
        <StatCard
          title="Due This Week"
          value={studentStats.dueThisWeek}
          icon={Calendar}
          color="orange"
          delay={0.2}
        />
        <StatCard
          title="Total History"
          value={studentStats.totalHistory}
          icon={TrendingUp}
          color="purple"
          delay={0.3}
        />
        <StatCard
          title="Overdue Books"
          value={studentStats.overdueBooks}
          icon={Clock}
          color="green"
          delay={0.4}
        />
      </div>

      {/* Currently Borrowed Books */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Currently Borrowed</h2>
          <span className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold rounded-full text-sm">
            {borrowedBooks.length} Books
          </span>
        </div>

        <div className="space-y-4">
          {borrowedBooks.map((borrowed, index) => (
            <motion.div
              key={borrowed.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-xl hover:shadow-md transition-all duration-200"
            >
              <div className="flex-shrink-0 w-16 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-md">
                <ImageWithFallback
                  src={borrowed.book.coverUrl}
                  alt={borrowed.book.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 mb-1 truncate">
                  {borrowed.book.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{borrowed.book.author}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>Borrowed: {new Date(borrowed.borrowDate).toLocaleDateString()}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>Due: {new Date(borrowed.dueDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex-shrink-0">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                    borrowed.status === "overdue"
                      ? "bg-red-100 text-red-700"
                      : borrowed.status === "due-soon"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {borrowed.status === "overdue"
                    ? "Overdue"
                    : borrowed.status === "due-soon"
                    ? "Due Soon"
                    : "Active"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg shadow-blue-500/30 text-white">
          <h3 className="text-xl font-bold mb-2">Need a new book?</h3>
          <p className="text-blue-100 mb-4">
            Browse our extensive collection and borrow books instantly.
          </p>
          <motion.a
            href="/borrow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Browse Books
          </motion.a>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg shadow-purple-500/30 text-white">
          <h3 className="text-xl font-bold mb-2">Return a book?</h3>
          <p className="text-purple-100 mb-4">
            Manage your borrowed books and process returns easily.
          </p>
          <motion.a
            href="/return"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Return Books
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}
