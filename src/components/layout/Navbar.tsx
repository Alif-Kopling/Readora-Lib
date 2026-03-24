import { Bell, Search, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

type NavbarProps = {
  title?: string;
};

export function Navbar({ title = 'Dashboard' }: NavbarProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>

          {/* Notifications */}
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
          >
            <Bell className="h-5 w-5 text-gray-600" />
          </button>

          {/* Settings */}
          <Link to="/admin/settings" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="h-5 w-5 text-gray-600" />
          </Link>

          {/* Admin Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@readora.com</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              AU
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}