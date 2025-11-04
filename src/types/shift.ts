// ============= SHIFT MANAGEMENT =============
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
