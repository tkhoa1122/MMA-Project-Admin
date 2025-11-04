// ============= STAFF =============
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
