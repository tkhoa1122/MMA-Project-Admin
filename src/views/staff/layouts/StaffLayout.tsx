import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { useAuth } from '@/contexts/AuthContext';
import '../staff.css';

interface StaffLayoutProps {
  children: React.ReactNode;
}

export const StaffLayout: React.FC<StaffLayoutProps> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<string>('dashboard');
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="staff-app flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar currentScreen={currentScreen} onScreenChange={setCurrentScreen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          userName={user?.name || user?.email || 'Staff'} 
          userEmail={user?.email || ''} 
          onLogout={handleLogout}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};
