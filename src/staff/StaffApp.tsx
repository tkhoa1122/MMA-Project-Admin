import React, { useState, useEffect } from 'react';
import {
  StaffDashboardScreen,
  MyShiftsListScreen,
  MyMaintenanceTasksScreen,
  MaintenanceDetailScreen,
  ProfileScreen,
  LoginScreen
} from './screens';
import { Sidebar, Header } from './components/layout';

export const StaffApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    setIsAuthenticated(false);
    setCurrentScreen('dashboard');
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <StaffDashboardScreen />;
      case 'shifts':
        return <MyShiftsListScreen />;
      case 'appointments':
        return <MyMaintenanceTasksScreen />;
      case 'maintenance-detail':
        return <MaintenanceDetailScreen taskId="demo-task-1" />;
      case 'profile':
        return <ProfileScreen />;
      
      // Các màn hình khác (placeholder)
      case 'customers':
        return (
          <div style={{ padding: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
              Quản lý khách hàng
            </h1>
            <p style={{ color: '#6b7280' }}>Màn hình đang được phát triển...</p>
          </div>
        );
      case 'staff':
        return (
          <div style={{ padding: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
              Quản lý nhân viên & kỹ thuật viên
            </h1>
            <p style={{ color: '#6b7280' }}>Màn hình đang được phát triển...</p>
          </div>
        );
      case 'vehicles':
        return (
          <div style={{ padding: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>Mẫu xe</h1>
            <p style={{ color: '#6b7280' }}>Màn hình đang được phát triển...</p>
          </div>
        );
      case 'user-vehicles':
        return (
          <div style={{ padding: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>Hồ sơ xe người dùng</h1>
            <p style={{ color: '#6b7280' }}>Màn hình đang được phát triển...</p>
          </div>
        );
      case 'parts':
        return (
          <div style={{ padding: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>Danh mục phụ tùng</h1>
            <p style={{ color: '#6b7280' }}>Màn hình đang được phát triển...</p>
          </div>
        );
      case 'vehicle-parts':
        return (
          <div style={{ padding: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>Phụ tùng xe</h1>
            <p style={{ color: '#6b7280' }}>Màn hình đang được phát triển...</p>
          </div>
        );
      case 'warranty':
        return (
          <div style={{ padding: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>Bảo hành</h1>
            <p style={{ color: '#6b7280' }}>Màn hình đang được phát triển...</p>
          </div>
        );
      case 'chat':
        return (
          <div style={{ padding: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>Chat với khách hàng</h1>
            <p style={{ color: '#6b7280' }}>Màn hình đang được phát triển...</p>
          </div>
        );
      default:
        return <StaffDashboardScreen />;
    }
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f9fafb'
    }}>
      {/* Sidebar */}
      <Sidebar currentScreen={currentScreen} onScreenChange={setCurrentScreen} />

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <Header 
          userName="longstaff" 
          userEmail="longstaff@gmail.com" 
          onLogout={handleLogout}
        />

        {/* Main Content Area */}
        <main style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: '#f9fafb'
        }}>
          {renderScreen()}
        </main>
      </div>
    </div>
  );
};
