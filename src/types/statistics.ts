// ============= STATISTICS & DASHBOARD =============
export interface DashboardStats {
  totalAppointments: number;
  pendingAppointments: number;
  completedAppointments: number;
  totalRevenue: number;
  revenueGrowth: number;
  appointmentGrowth: number;
}

// Staff Dashboard Stats (extended)
export interface StaffDashboardStats {
  totalCustomers: number;
  totalStaff: number;
  totalTechnicians: number;
  totalVehicles: number;
  activeCustomers: number;
  monthlyAppointments: number;
  monthlyRevenue: number;
  completedAppointments: number;
  pendingAppointments: number;
  monthlyGrowth: number;
}

export interface StatCard {
  title: string;
  value: number | string;
  icon: string;
  color: 'green' | 'blue' | 'red' | 'purple' | 'orange' | 'yellow';
  trend?: number;
  subtitle?: string;
}

export interface ChartData {
  label: string;
  value: number;
}

export interface RevenueChart {
  month: string;
  revenue: number;
  appointments: number;
}
