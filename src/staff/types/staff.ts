// Staff & Dashboard Types

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'staff' | 'technician';
  avatar?: string;
  status: 'active' | 'inactive' | 'on-leave';
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
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

// Shift Management Types
export interface Shift {
  id: string;
  staffId: string;
  staffName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  location: string;
  notes?: string;
  actualStartTime?: string;
  actualEndTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShiftAssignment {
  shiftId: string;
  staffId: string;
  assignedBy: string;
  assignedAt: string;
}

export interface CreateShiftDto {
  staffId: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  notes?: string;
}

export interface UpdateShiftDto extends Partial<CreateShiftDto> {
  status?: Shift['status'];
  actualStartTime?: string;
  actualEndTime?: string;
}

// Maintenance Management Types
export interface MaintenanceTask {
  id: string;
  vehicleId: string;
  vehicleName: string;
  vehiclePlate: string;
  assignedTo: string;
  technicianName: string;
  title: string;
  description: string;
  type: 'routine' | 'repair' | 'inspection' | 'emergency';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  scheduledDate: string;
  completedDate?: string;
  estimatedDuration: number; // in hours
  actualDuration?: number;
  checklist: ChecklistItem[];
  notes: MaintenanceNote[];
  partsReplaced: PartReplacement[];
  photos: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  completedAt?: string;
  completedBy?: string;
}

export interface MaintenanceNote {
  id: string;
  content: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
}

export interface PartReplacement {
  id: string;
  partName: string;
  partNumber: string;
  quantity: number;
  cost: number;
  supplier?: string;
  replacedAt: string;
  replacedBy: string;
}

export interface CreateMaintenanceDto {
  vehicleId: string;
  assignedTo: string;
  title: string;
  description: string;
  type: MaintenanceTask['type'];
  priority: MaintenanceTask['priority'];
  scheduledDate: string;
  estimatedDuration: number;
  checklist?: Omit<ChecklistItem, 'id' | 'isCompleted'>[];
}

export interface UpdateMaintenanceDto extends Partial<CreateMaintenanceDto> {
  status?: MaintenanceTask['status'];
  completedDate?: string;
  actualDuration?: number;
}

export interface AddMaintenanceNoteDto {
  content: string;
}

export interface AddPartReplacementDto {
  partName: string;
  partNumber: string;
  quantity: number;
  cost: number;
  supplier?: string;
}

export interface UpdateChecklistItemDto {
  isCompleted: boolean;
}

// Appointment Types for Staff
export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  vehicleId: string;
  vehiclePlate: string;
  serviceType: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  assignedTo?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Calendar Event Type
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'shift' | 'maintenance' | 'appointment';
  status: string;
  color: string;
}

// Profile & Settings Types
export interface StaffProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: Staff['role'];
  dateOfBirth?: string;
  address?: string;
  emergencyContact?: string;
  joinedDate: string;
}

export interface UpdateProfileDto {
  name?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  emergencyContact?: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AppSettings {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  language: 'vi' | 'en';
  theme: 'light' | 'dark' | 'auto';
}
