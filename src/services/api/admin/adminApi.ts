import { apiClient } from '../apiClient';
import type {
  Appointment,
  AppointmentStatus,
  DashboardStats,
  RevenueChart,
  Invoice,
  InvoiceStatus,
} from '@/types';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types';

// ============= DASHBOARD API =============
export const dashboardApi = {
  // Lấy thống kê tổng quan
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const response = await apiClient.get('/admin/dashboard/stats');
    return response.data;
  },

  // Lấy biểu đồ doanh thu
  getRevenueChart: async (params?: { year?: number }): Promise<ApiResponse<RevenueChart[]>> => {
    const response = await apiClient.get('/admin/dashboard/revenue-chart', { params });
    return response.data;
  },
};

// ============= APPOINTMENT API =============
export const appointmentApi = {
  // Lấy danh sách lịch hẹn
  getAll: async (params?: PaginationParams & { status?: AppointmentStatus; search?: string }): Promise<PaginatedResponse<Appointment>> => {
    const response = await apiClient.get('/admin/appointments', { params });
    return response.data;
  },

  // Lấy chi tiết lịch hẹn
  getById: async (id: string): Promise<ApiResponse<Appointment>> => {
    const response = await apiClient.get(`/admin/appointments/${id}`);
    return response.data;
  },

  // Tạo lịch hẹn mới
  create: async (data: Partial<Appointment>): Promise<ApiResponse<Appointment>> => {
    const response = await apiClient.post('/admin/appointments', data);
    return response.data;
  },

  // Cập nhật lịch hẹn
  update: async (id: string, data: Partial<Appointment>): Promise<ApiResponse<Appointment>> => {
    const response = await apiClient.put(`/admin/appointments/${id}`, data);
    return response.data;
  },

  // Cập nhật trạng thái
  updateStatus: async (id: string, status: AppointmentStatus): Promise<ApiResponse<Appointment>> => {
    const response = await apiClient.patch(`/admin/appointments/${id}/status`, { status });
    return response.data;
  },

  // Phân công kỹ thuật viên
  assignTechnician: async (id: string, technicianId: string): Promise<ApiResponse<Appointment>> => {
    const response = await apiClient.post(`/admin/appointments/${id}/assign`, { technicianId });
    return response.data;
  },

  // Xóa lịch hẹn
  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`/admin/appointments/${id}`);
    return response.data;
  },
};

// ============= INVOICE API =============
export const invoiceApi = {
  // Lấy danh sách hóa đơn
  getAll: async (params?: PaginationParams & { status?: InvoiceStatus; search?: string }): Promise<PaginatedResponse<Invoice>> => {
    const response = await apiClient.get('/admin/invoices', { params });
    return response.data;
  },

  // Lấy chi tiết hóa đơn
  getById: async (id: string): Promise<ApiResponse<Invoice>> => {
    const response = await apiClient.get(`/admin/invoices/${id}`);
    return response.data;
  },

  // Tạo hóa đơn
  create: async (data: Partial<Invoice>): Promise<ApiResponse<Invoice>> => {
    const response = await apiClient.post('/admin/invoices', data);
    return response.data;
  },

  // Cập nhật hóa đơn
  update: async (id: string, data: Partial<Invoice>): Promise<ApiResponse<Invoice>> => {
    const response = await apiClient.put(`/admin/invoices/${id}`, data);
    return response.data;
  },

  // Cập nhật trạng thái
  updateStatus: async (id: string, status: InvoiceStatus): Promise<ApiResponse<Invoice>> => {
    const response = await apiClient.patch(`/admin/invoices/${id}/status`, { status });
    return response.data;
  },

  // Xóa hóa đơn
  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`/admin/invoices/${id}`);
    return response.data;
  },
};

// Export API
export const adminApi = {
  dashboard: dashboardApi,
  appointments: appointmentApi,
  invoices: invoiceApi,
};
