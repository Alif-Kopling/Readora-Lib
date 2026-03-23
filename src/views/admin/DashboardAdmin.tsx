import { Layout } from '../../components/layout/Layout';
import { BookOpen, Users, ArrowLeftRight, TrendingUp, Activity, Star, Clock, Library, ArrowRight } from 'lucide-react';
import { mockBooks, mockMembers, mockTransactions } from '../../services/mockData';
import { DashboardStats } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function DashboardAdmin() {
  const navigate = useNavigate();
  const [chartView, setChartView] = useState<'weekly' | 'monthly'>('weekly');

  const stats: DashboardStats = {
    totalBooks: mockBooks.length,
    availableBooks: mockBooks.filter((b) => b.status === 'Available').length,
    totalMembers: mockMembers.length,
    activeTransactions: mockTransactions.filter((t) => t.status === 'Borrowed' || t.status === 'Overdue').length,
  };

  const recentTransactions = mockTransactions.slice(0, 5);

  // Dynamic Trend Data
  const weeklyDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const monthlyMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const weeklyValues = [25, 40, 30, 55, 45, 75, 65];
  const monthlyValues = [45, 60, 55, 80, 70, 95, 85, 90, 75, 85, 100, 90];

  const currentLabels = chartView === 'weekly' ? weeklyDays : monthlyMonths;
  const currentValues = chartView === 'weekly' ? weeklyValues : monthlyValues;

  return (
    <Layout title="Dashboard Overview">
      <div className="space-y-8 pb-8">
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Books', value: stats.totalBooks, sub: `${stats.availableBooks} available`, icon: BookOpen, color: 'blue', link: '/admin/books' },
            { label: 'Total Members', value: stats.totalMembers, sub: '5 new this week', icon: Users, color: 'purple', link: '/admin/members' },
            { label: 'Active Loans', value: stats.activeTransactions, sub: `${mockTransactions.filter(t => t.status === 'Overdue').length} overdue alerts`, icon: ArrowLeftRight, color: 'orange', link: '/admin/transactions' },
            { label: 'Avg. Rating', value: '4.8', sub: 'Across 120 reviews', icon: Star, color: 'yellow', link: '#' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => item.link !== '#' && navigate(item.link)}
              className="bg-white/50 dark:bg-black/20 backdrop-blur-xl rounded-2xl shadow-glass border border-white/20 dark:border-white/10 p-6 hover:shadow-premium transition-all group overflow-hidden relative cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700" />
              
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{item.label}</p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1 tracking-tight">{item.value}</h3>
                </div>
                <div className={`p-3 rounded-2xl bg-${item.color}-500/10 dark:bg-${item.color}-500/20 text-${item.color}-600 dark:text-${item.color}-400 ring-1 ring-${item.color}-500/20 group-hover:rotate-12 transition-transform`}>
                  <item.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-green-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> +12%
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{item.sub}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-300 dark:text-white/20 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Trends Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white/50 dark:bg-black/20 backdrop-blur-xl rounded-3xl shadow-glass border border-white/20 dark:border-white/10 p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Borrowing Trends</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Real-time analysis based on {mockTransactions.length} records</p>
              </div>
              <div className="flex bg-gray-100/50 dark:bg-white/5 rounded-xl p-1">
                <button 
                  onClick={() => setChartView('weekly')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    chartView === 'weekly' 
                      ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-sm' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  Weekly
                </button>
                <button 
                  onClick={() => setChartView('monthly')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    chartView === 'monthly' 
                      ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-sm' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            {/* Simple Animated SVG Chart */}
            <div className="h-64 flex items-end justify-between items-center gap-2 group px-2">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={chartView}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex items-end justify-between gap-1 sm:gap-2 h-full"
                >
                  {currentLabels.map((label, i) => (
                    <div key={label} className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                      <div className="w-full relative group/bar h-full flex items-end">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${currentValues[i]}%` }}
                          transition={{ duration: 1, delay: i * (chartView === 'weekly' ? 0.1 : 0.05), ease: "easeOut" }}
                          className="w-full bg-gradient-to-t from-blue-600/40 to-blue-500 rounded-lg relative overflow-hidden ring-1 ring-white/20"
                        >
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/bar:translate-y-0 transition-transform duration-500" />
                        </motion.div>
                        {/* Tooltip on hover */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap">
                          {Math.round(currentValues[i] / 100 * (chartView === 'weekly' ? 50 : 200))} items
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase">
                        {label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Activity Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/50 dark:bg-black/20 backdrop-blur-xl rounded-3xl shadow-glass border border-white/20 dark:border-white/10 p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Live Activity</h3>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Activity className="h-4 w-4 text-blue-500 animate-pulse" />
              </div>
            </div>
            
            <div className="flex-1 space-y-7 overflow-y-auto pr-2 custom-scrollbar max-h-[400px]">
              {recentTransactions.map((transaction, index) => (
                <div key={transaction.id} className="relative pl-9 pb-1 group/item cursor-default">
                  {/* Timeline Line */}
                  {index !== recentTransactions.length - 1 && (
                    <div className="absolute left-[13px] top-7 bottom-0 w-[2px] bg-gray-200 dark:bg-white/5 group-hover/item:bg-blue-500/20 transition-colors" />
                  )}
                  
                  {/* Timeline Dot */}
                  <div className={`absolute left-0 top-1.5 w-7 h-7 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center ${
                    transaction.status === 'Returned' ? 'bg-green-500' : transaction.status === 'Overdue' ? 'bg-red-500' : 'bg-blue-500'
                  } shadow-lg z-10 transition-transform group-hover/item:scale-110`} title={transaction.status}>
                     <Clock className="w-2.5 h-2.5 text-white/70" />
                  </div>
                  
                  <div className="flex flex-col">
                    <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight group-hover/item:text-blue-500 transition-colors">{transaction.memberName}</p>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                      {transaction.status === 'Returned' ? 'successfully returned' : 'is currently borrowing'} <span className="text-gray-900 dark:text-gray-200 font-semibold italic">"{transaction.bookTitle}"</span>
                    </p>
                    <div className="flex items-center gap-2 mt-2.5 text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">
                      <span>{index + 2} hours ago</span>
                      <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
                      <span>{transaction.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => navigate('/admin/transactions')}
              className="mt-8 w-full py-3.5 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 text-[11px] font-black rounded-2xl hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all uppercase tracking-[0.2em] shadow-sm transform active:scale-95"
            >
              View Full History
            </button>
          </motion.div>
        </div>

        {/* Quick Access Section */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-xl shadow-blue-900/10 relative overflow-hidden group"
        >
          {/* Decorative Elements */}
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4 transition-transform group-hover:rotate-12 duration-1000">
            <Library className="w-80 h-80" />
          </div>
          <div className="absolute left-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">Admin Productivity</span>
              <h3 className="text-3xl font-black mb-3 tracking-tight">Streamline your library management.</h3>
              <p className="text-blue-100/70 text-base leading-relaxed">Add new members, browse the catalog, and track transactions with our all-in-one premium interface.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/admin/books')}
                className="px-8 py-4 bg-white text-blue-700 font-black rounded-2xl hover:bg-blue-50 hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 uppercase text-xs tracking-wider"
              >
                Catalog Books
              </button>
              <button 
                onClick={() => navigate('/admin/members')}
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black rounded-2xl hover:bg-white/20 transition-all active:scale-95 uppercase text-xs tracking-wider"
              >
                Manage Members
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
