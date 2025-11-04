// ============= STATISTICS =============
export interface DashboardStats {
  totalAppointments: number;
  pendingAppointments: number;
  completedAppointments: number;
  totalRevenue: number;
  revenueGrowth: number;
  appointmentGrowth: number;
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
