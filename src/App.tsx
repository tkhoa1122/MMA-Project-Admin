import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { AdminLayout } from '@/views/admin/layouts/AdminLayout';
import { StaffLayout } from '@/views/staff/layouts/StaffLayout';
import { LoginScreen } from './LoginScreen';
import { DashboardScreen } from '@/views/admin/screens/DashboardScreen';
import { AppointmentListScreen } from '@/views/admin/screens/AppointmentListScreen';
import { StaffDashboardScreen } from '@/views/staff/screens/StaffDashboardScreen';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactElement; allowedRole?: 'admin' | 'staff' }> = ({ children, allowedRole }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Check role if specified
  if (allowedRole && user?.role !== allowedRole) {
    // Redirect to appropriate dashboard based on user role
    if (user?.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/staff" replace />;
    }
  }

  return children;
};

// Public Route Component
const PublicRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    // Redirect based on user role
    if (user?.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/staff" replace />;
    }
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes - Root is Login */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <LoginScreen />
          </PublicRoute>
        }
      />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout>
              <DashboardScreen />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/appointments"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout>
              <AppointmentListScreen />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/invoices"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout>
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Invoice Management</h2>
                <p className="text-gray-600">Coming soon...</p>
              </div>
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Protected Staff Routes */}
      <Route
        path="/staff"
        element={
          <ProtectedRoute allowedRole="staff">
            <StaffLayout>
              <StaffDashboardScreen />
            </StaffLayout>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

