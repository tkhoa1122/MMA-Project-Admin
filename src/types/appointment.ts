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
