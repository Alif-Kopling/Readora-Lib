import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, ArrowLeftRight, Library, Settings } from 'lucide-react';

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/books', label: 'Books Management', icon: BookOpen },
  { path: '/admin/members', label: 'Members Management', icon: Users },
  { path: '/admin/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Library className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-900">LibraryMS</h1>
            <p className="text-xs text-gray-500">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">© 2026 LibraryMS</p>
      </div>
    </aside>
  );
}