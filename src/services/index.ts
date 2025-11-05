// ============= SHARED API CLIENT =============
export { apiClient } from './api/apiClient';

// ============= BACKEND API (Real APIs from backend) =============
export { backendApi } from './api/backendApi';
export type { 
  VehicleType, 
  ServiceMode, 
  ServiceType, 
  CreateAppointmentDto,
  AppointmentHistory,
  RegisterDto,
  LoginDto,
  AuthResponse,
  UserProfile,
  UpdateProfileDto
} from './api/backendApi';

// ============= ADMIN APIs =============
// Switch between mock and real API based on your needs:

// 🔥 REAL API - Use this when backend is ready
import { adminApi } from './api/admin/adminApi';
export { adminApi };
export const dashboardApi = adminApi.dashboard;
export const appointmentApi = adminApi.appointments;
export const invoiceApi = adminApi.invoices;

// 🧪 MOCK API - Use this for testing without backend (comment out above, uncomment below)
// export { dashboardApi, appointmentApi, invoiceApi } from './api/admin/mockApi';

// ============= STAFF APIs =============
// 🔥 REAL API - Use this when backend is ready
import { staffApiReal } from './api/staff/staffApiReal';
export const staffApi = staffApiReal;

// 🧪 MOCK API - Use this for testing without backend (comment out above, uncomment below)
// export { staffApi } from './api/staff/staffApi';


