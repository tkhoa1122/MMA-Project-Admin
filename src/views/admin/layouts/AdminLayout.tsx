import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Menu,
  X,
  LogOut,
  User,
  Bell,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import '../admin.css';

interface AdminLayoutProps {
  children: ReactNode;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Lịch hẹn', path: '/admin/appointments', icon: Calendar },
  { label: 'Ca làm việc', path: '/admin/shifts', icon: Calendar },
  { label: 'Bảo trì', path: '/admin/maintenance', icon: FileText },
  { label: 'Hồ sơ', path: '/admin/profile', icon: User },
  { label: '🧪 API Test', path: '/admin/api-test', icon: FileText },
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-app min-h-screen bg-[#EAE7D6]">
      {/* Sidebar */}
      <aside
        style={{
          background: 'linear-gradient(180deg, #5D7B6F 0%, #4a6159 100%)'
        }}
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-[#A4C3A2]/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#D7F9FA] rounded-lg flex items-center justify-center">
              <span className="text-[#5D7B6F] font-bold text-xl">EV</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">EVCare</h1>
              <p className="text-[#B0D4B8] text-xs">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-[#4a6159] p-1 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#D7F9FA] text-[#5D7B6F] shadow-lg'
                    : 'text-white hover:bg-[#4a6159]'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#A4C3A2]/30">
          <div className="flex items-center space-x-3 px-4 py-3 bg-[#4a6159] rounded-lg">
            <img
              src={user?.avatar || 'https://ui-avatars.com/api/?name=Admin'}
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">{user?.name}</p>
              <p className="text-[#B0D4B8] text-xs truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-2 flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'lg:ml-64' : 'ml-0'} transition-all`}>
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-30 border-b border-[#EAE7D6]">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <button className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg">
                <img
                  src={user?.avatar || 'https://ui-avatars.com/api/?name=Admin'}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">{user?.name}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
