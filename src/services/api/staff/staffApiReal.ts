import { apiClient } from '../apiClient';
import type {
  StaffDashboardStats,
  Shift,
  CreateShiftDto,
  UpdateShiftDto,
  MaintenanceTask,
  CreateMaintenanceDto,
  UpdateMaintenanceDto,
  AddMaintenanceNoteDto,
  AddPartReplacementDto,
  UpdateChecklistItemDto,
  StaffProfile,
  UpdateProfileDto,
  ChangePasswordDto,
  AppSettings,
} from '@/types';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types';
import type { StaffAppointment } from './mockData';

// ============ Dashboard APIs ============
export const dashboardApi = {
  // Lấy thống kê tổng quan
  getStats: async (): Promise<ApiResponse<StaffDashboardStats>> => {
    const response = await apiClient.get('/staff/dashboard/stats');
    return response.data;
  },

  // Lấy thống kê theo khoảng thời gian
  getStatsByDateRange: async (startDate: string, endDate: string): Promise<ApiResponse<StaffDashboardStats>> => {
    const response = await apiClient.get('/staff/dashboard/stats', {
      params: { startDate, endDate },
    });
    return response.data;
  },
};

// ============ Shift Management APIs ============
export const shiftApi = {
  // Lấy danh sách ca làm
  getMyShifts: async (params?: PaginationParams & { status?: string; date?: string }): Promise<PaginatedResponse<Shift>> => {
    const response = await apiClient.get('/staff/shifts', { params });
    return response.data;
  },

  // Lấy chi tiết ca làm
  getShiftById: async (shiftId: string): Promise<ApiResponse<Shift>> => {
    const response = await apiClient.get(`/staff/shifts/${shiftId}`);
    return response.data;
  },

  // Lấy ca làm theo tháng (cho calendar)
  getShiftsByMonth: async (year: number, month: number): Promise<ApiResponse<Shift[]>> => {
    const response = await apiClient.get('/staff/shifts/calendar', {
      params: { year, month },
    });
    return response.data;
  },

  // Bắt đầu ca làm
  startShift: async (shiftId: string): Promise<ApiResponse<Shift>> => {
    const response = await apiClient.post(`/staff/shifts/${shiftId}/start`);
    return response.data;
  },

  // Kết thúc ca làm
  endShift: async (shiftId: string, notes?: string): Promise<ApiResponse<Shift>> => {
    const response = await apiClient.post(`/staff/shifts/${shiftId}/end`, { notes });
    return response.data;
  },

  // Admin: Tạo ca làm mới
  createShift: async (data: CreateShiftDto): Promise<ApiResponse<Shift>> => {
    const response = await apiClient.post('/admin/shifts', data);
    return response.data;
  },

  // Admin: Cập nhật ca làm
  updateShift: async (shiftId: string, data: UpdateShiftDto): Promise<ApiResponse<Shift>> => {
    const response = await apiClient.put(`/admin/shifts/${shiftId}`, data);
    return response.data;
  },

  // Admin: Xóa ca làm
  deleteShift: async (shiftId: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`/admin/shifts/${shiftId}`);
    return response.data;
  },

  // Admin: Phân công ca làm
  assignShift: async (shiftId: string, staffId: string): Promise<ApiResponse<Shift>> => {
    const response = await apiClient.post(`/admin/shifts/${shiftId}/assign`, { staffId });
    return response.data;
  },
};

// ============ Maintenance Management APIs ============
export const maintenanceApi = {
  // Lấy danh sách công việc bảo dưỡng của tôi
  getMyTasks: async (params?: PaginationParams & { status?: string; priority?: string }): Promise<PaginatedResponse<MaintenanceTask>> => {
    const response = await apiClient.get('/staff/maintenance', { params });
    return response.data;
  },

  // Lấy chi tiết công việc bảo dưỡng
  getTaskById: async (taskId: string): Promise<ApiResponse<MaintenanceTask>> => {
    const response = await apiClient.get(`/staff/maintenance/${taskId}`);
    return response.data;
  },

  // Cập nhật trạng thái công việc
  updateTaskStatus: async (taskId: string, status: MaintenanceTask['status']): Promise<ApiResponse<MaintenanceTask>> => {
    const response = await apiClient.patch(`/staff/maintenance/${taskId}/status`, { status });
    return response.data;
  },

  // Cập nhật checklist item
  updateChecklistItem: async (
    taskId: string,
    itemId: string,
    data: UpdateChecklistItemDto
  ): Promise<ApiResponse<MaintenanceTask>> => {
    const response = await apiClient.patch(`/staff/maintenance/${taskId}/checklist/${itemId}`, data);
    return response.data;
  },

  // Thêm ghi chú
  addNote: async (taskId: string, data: AddMaintenanceNoteDto): Promise<ApiResponse<MaintenanceTask>> => {
    const response = await apiClient.post(`/staff/maintenance/${taskId}/notes`, data);
    return response.data;
  },

  // Thêm phụ tùng thay thế
  addPartReplacement: async (taskId: string, data: AddPartReplacementDto): Promise<ApiResponse<MaintenanceTask>> => {
    const response = await apiClient.post(`/staff/maintenance/${taskId}/parts`, data);
    return response.data;
  },

  // Upload ảnh
  uploadPhotos: async (taskId: string, files: File[]): Promise<ApiResponse<MaintenanceTask>> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('photos', file);
    });
    const response = await apiClient.post(`/staff/maintenance/${taskId}/photos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Hoàn thành công việc bảo dưỡng
  completeTask: async (taskId: string, actualDuration: number): Promise<ApiResponse<MaintenanceTask>> => {
    const response = await apiClient.post(`/staff/maintenance/${taskId}/complete`, { actualDuration });
    return response.data;
  },

  // Admin: Tạo công việc bảo dưỡng
  createTask: async (data: CreateMaintenanceDto): Promise<ApiResponse<MaintenanceTask>> => {
    const response = await apiClient.post('/admin/maintenance', data);
    return response.data;
  },

  // Admin: Cập nhật công việc
  updateTask: async (taskId: string, data: UpdateMaintenanceDto): Promise<ApiResponse<MaintenanceTask>> => {
    const response = await apiClient.put(`/admin/maintenance/${taskId}`, data);
    return response.data;
  },

  // Admin: Xóa công việc
  deleteTask: async (taskId: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`/admin/maintenance/${taskId}`);
    return response.data;
  },
};

// ============ Appointment APIs (for Staff) ============
export const appointmentApi = {
  // Lấy danh sách lịch hẹn
  getAppointments: async (params?: PaginationParams & { status?: string; date?: string }): Promise<PaginatedResponse<StaffAppointment>> => {
    const response = await apiClient.get('/staff/appointments', { params });
    return response.data;
  },

  // Lấy chi tiết lịch hẹn
  getAppointmentById: async (appointmentId: string): Promise<ApiResponse<StaffAppointment>> => {
    const response = await apiClient.get(`/staff/appointments/${appointmentId}`);
    return response.data;
  },

  // Cập nhật trạng thái lịch hẹn
  updateAppointmentStatus: async (appointmentId: string, status: StaffAppointment['status']): Promise<ApiResponse<StaffAppointment>> => {
    const response = await apiClient.patch(`/staff/appointments/${appointmentId}/status`, { status });
    return response.data;
  },
};

// ============ Profile & Settings APIs ============
export const profileApi = {
  // Lấy thông tin profile
  getProfile: async (): Promise<ApiResponse<StaffProfile>> => {
    const response = await apiClient.get('/staff/profile');
    return response.data;
  },

  // Cập nhật profile
  updateProfile: async (data: UpdateProfileDto): Promise<ApiResponse<StaffProfile>> => {
    const response = await apiClient.put('/staff/profile', data);
    return response.data;
  },

  // Đổi mật khẩu
  changePassword: async (data: ChangePasswordDto): Promise<ApiResponse<void>> => {
    const response = await apiClient.post('/staff/profile/change-password', data);
    return response.data;
  },

  // Upload avatar
  uploadAvatar: async (file: File): Promise<ApiResponse<{ avatar: string }>> => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await apiClient.post('/staff/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// ============ Settings APIs ============
export const settingsApi = {
  // Lấy cài đặt
  getSettings: async (): Promise<ApiResponse<AppSettings>> => {
    const response = await apiClient.get('/staff/settings');
    return response.data;
  },

  // Cập nhật cài đặt
  updateSettings: async (data: Partial<AppSettings>): Promise<ApiResponse<AppSettings>> => {
    const response = await apiClient.put('/staff/settings', data);
    return response.data;
  },
};

// Export tất cả APIs
export const staffApiReal = {
  dashboard: dashboardApi,
  shifts: shiftApi,
  maintenance: maintenanceApi,
  appointments: appointmentApi,
  profile: profileApi,
  settings: settingsApi,
};
