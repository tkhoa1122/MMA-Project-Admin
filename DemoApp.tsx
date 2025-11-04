import React, { useState } from 'react';
import {
  StaffDashboardScreen,
  MyShiftsListScreen,
  MyMaintenanceTasksScreen,
  MaintenanceDetailScreen,
  ProfileScreen
} from './src/screens';
import { Button } from './src/components/common';

type Screen = 'dashboard' | 'shifts' | 'maintenance' | 'maintenance-detail' | 'profile';

function DemoApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <StaffDashboardScreen />;
      case 'shifts':
        return <MyShiftsListScreen />;
      case 'maintenance':
        return <MyMaintenanceTasksScreen />;
      case 'maintenance-detail':
        return <MaintenanceDetailScreen taskId="demo-task-1" />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <StaffDashboardScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🏢</span>
              <h1 className="text-xl font-bold text-gray-900">MMA Admin - Staff Dashboard</h1>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant={currentScreen === 'dashboard' ? 'primary' : 'outline'}
                size="small"
                onClick={() => setCurrentScreen('dashboard')}
              >
                📊 Dashboard
              </Button>
              <Button
                variant={currentScreen === 'shifts' ? 'primary' : 'outline'}
                size="small"
                onClick={() => setCurrentScreen('shifts')}
              >
                📋 Ca làm
              </Button>
              <Button
                variant={currentScreen === 'maintenance' ? 'primary' : 'outline'}
                size="small"
                onClick={() => setCurrentScreen('maintenance')}
              >
                🔧 Bảo dưỡng
              </Button>
              <Button
                variant={currentScreen === 'maintenance-detail' ? 'primary' : 'outline'}
                size="small"
                onClick={() => setCurrentScreen('maintenance-detail')}
              >
                📝 Chi tiết
              </Button>
              <Button
                variant={currentScreen === 'profile' ? 'primary' : 'outline'}
                size="small"
                onClick={() => setCurrentScreen('profile')}
              >
                👤 Hồ sơ
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Screen Content */}
      <main>
        {renderScreen()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>MMA Project Admin - Staff Dashboard Demo</p>
          <p className="mt-1">
            Current Screen: <span className="font-semibold">{currentScreen}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default DemoApp;
