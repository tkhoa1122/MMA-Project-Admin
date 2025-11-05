import { apiClient } from './apiClient';
import type { ApiResponse } from '@/types';

// ============= Vehicle Type API =============
export interface VehicleType {
  _id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export const vehicleTypeApi = {
  // GET /api/v1/vehicle-type/
  getAll: async (): Promise<ApiResponse<VehicleType[]>> => {
    const response = await apiClient.get('/vehicle-type/');
    return response.data;
  },
};

// ============= Service Mode API =============
export interface ServiceMode {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export const serviceModeApi = {
  // GET /api/v1/appointment/service-mode/
  getAll: async (): Promise<ApiResponse<ServiceMode[]>> => {
    const response = await apiClient.get('/appointment/service-mode/');
    return response.data;
  },
};

// ============= Service Type API =============
export interface ServiceType {
  _id: string;
  name: string;
  description?: string;
  vehicleTypeId: string;
  price?: number;
  estimatedDuration?: number;
  createdAt: string;
  updatedAt: string;
}

export const serviceTypeApi = {
  // GET /api/v1/service-type/vehicle_type/{vehicleTypeId}
  getByVehicleType: async (vehicleTypeId: string): Promise<ApiResponse<ServiceType[]>> => {
    const response = await apiClient.get(`/service-type/vehicle_type/${vehicleTypeId}`);
    return response.data;
  },
};

// ============= Appointment API =============
export interface CreateAppointmentDto {
  vehicleTypeId: string;
  serviceModeId: string;
  serviceTypeId: string;
  scheduledDate: string;
  scheduledTime: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  vehiclePlate?: string;
  address?: string;
  notes?: string;
}

export interface AppointmentHistory {
  _id: string;
  userId: string;
  vehicleTypeId: string;
  vehicleTypeName: string;
  serviceModeId: string;
  serviceModeName: string;
  serviceTypeId: string;
  serviceTypeName: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  vehiclePlate?: string;
  address?: string;
  notes?: string;
  technicianId?: string;
  technicianName?: string;
  createdAt: string;
  updatedAt: string;
}

export const appointmentApi = {
  // POST /api/v1/appointment/
  create: async (data: CreateAppointmentDto): Promise<ApiResponse<AppointmentHistory>> => {
    const response = await apiClient.post('/appointment/', data);
    return response.data;
  },

  // GET /api/v1/appointment/history
  getHistory: async (): Promise<ApiResponse<AppointmentHistory[]>> => {
    const response = await apiClient.get('/appointment/history');
    return response.data;
  },

  // GET /api/v1/appointment/{id}
  getById: async (id: string): Promise<ApiResponse<AppointmentHistory>> => {
    const response = await apiClient.get(`/appointment/${id}`);
    return response.data;
  },
};

// ============= Auth API =============
export interface RegisterDto {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role?: 'customer' | 'staff' | 'admin';
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: {
    id: string;
    _id?: string;
    email: string;
    name: string;
    phone?: string;
    role: string;
    avatar?: string;
    createdAt?: string;
  };
}

export const authApi = {
  // POST /api/v1/auth/register
  register: async (data: RegisterDto): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  // POST /api/v1/auth/login
  login: async (data: LoginDto): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  // POST /api/v1/auth/logout
  logout: async (): Promise<ApiResponse<void>> => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
};

// ============= User Profile API =============
export interface UserProfile {
  _id: string;
  email: string;
  name: string;
  phone?: string;
  role: string;
  avatar?: string;
  dateOfBirth?: string;
  address?: string;
  emergencyContact?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileDto {
  name?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  emergencyContact?: string;
  avatar?: string;
}

export const userApi = {
  // GET /api/v1/user/profile/{id}
  getProfile: async (id: string): Promise<ApiResponse<UserProfile>> => {
    const response = await apiClient.get(`/user/profile/${id}`);
    return response.data;
  },

  // PATCH /api/v1/user/profile/{id}
  updateProfile: async (id: string, data: UpdateProfileDto): Promise<ApiResponse<UserProfile>> => {
    const response = await apiClient.patch(`/user/profile/${id}`, data);
    return response.data;
  },
};

// Export all APIs
export const backendApi = {
  vehicleType: vehicleTypeApi,
  serviceMode: serviceModeApi,
  serviceType: serviceTypeApi,
  appointment: appointmentApi,
  auth: authApi,
  user: userApi,
};
