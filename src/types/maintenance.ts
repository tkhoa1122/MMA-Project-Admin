// ============= MAINTENANCE MANAGEMENT =============
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
