// ============= USER & AUTH =============
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'staff' | 'customer';
  avatar?: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// ============= API RESPONSE =============
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ============= APPOINTMENT =============
export type AppointmentStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'in_progress' 
  | 'completed' 
  | 'cancelled';

export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleId: string;
  vehiclePlate: string;
  vehicleModel: string;
  serviceType: string;
  serviceMode: 'center' | 'mobile';
  scheduledDate: string;
  scheduledTime: string;
  address?: string;
  status: AppointmentStatus;
  technicianId?: string;
  technicianName?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentDto {
  customerId: string;
  vehicleId: string;
  serviceType: string;
  serviceMode: 'center' | 'mobile';
  scheduledDate: string;
  scheduledTime: string;
  address?: string;
  notes?: string;
}

// ============= INVOICE =============
export type InvoiceStatus = 'pending' | 'paid' | 'cancelled';
export type PaymentMethod = 'cash' | 'vnpay' | 'bank_transfer';

export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: string;
  appointmentId: string;
  customerId: string;
  customerName: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: InvoiceStatus;
  paymentMethod?: PaymentMethod;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInvoiceDto {
  appointmentId: string;
  items: Omit<InvoiceItem, 'id'>[];
  discount?: number;
}

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
