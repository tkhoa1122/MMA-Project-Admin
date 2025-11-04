import type { 
  DashboardStats, 
  Shift, 
  MaintenanceTask, 
  StaffProfile,
  Appointment 
} from '@/staff/types/staff';

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalCustomers: 751,
  totalStaff: 21,
  totalTechnicians: 40,
  totalVehicles: 736,
  activeCustomers: 751,
  monthlyAppointments: 737,
  monthlyRevenue: 116079495,
  completedAppointments: 40,
  pendingAppointments: 507,
  monthlyGrowth: 15.6
};

// Mock Shifts
export const mockShifts: Shift[] = [
  {
    id: '1',
    staffId: 'staff-1',
    staffName: 'longstaff@gmail.com',
    date: '2025-11-04',
    startTime: '08:00',
    endTime: '12:00',
    status: 'scheduled',
    location: 'Chi nhánh Quận 1',
    notes: 'Ca sáng',
    createdAt: '2025-11-01T08:00:00Z',
    updatedAt: '2025-11-01T08:00:00Z'
  },
  {
    id: '2',
    staffId: 'staff-1',
    staffName: 'longstaff@gmail.com',
    date: '2025-11-05',
    startTime: '13:00',
    endTime: '17:00',
    status: 'scheduled',
    location: 'Chi nhánh Quận 3',
    notes: 'Ca chiều',
    createdAt: '2025-11-01T08:00:00Z',
    updatedAt: '2025-11-01T08:00:00Z'
  },
  {
    id: '3',
    staffId: 'staff-1',
    staffName: 'longstaff@gmail.com',
    date: '2025-11-03',
    startTime: '08:00',
    endTime: '12:00',
    status: 'completed',
    location: 'Chi nhánh Quận 1',
    actualStartTime: '08:05',
    actualEndTime: '12:10',
    createdAt: '2025-11-01T08:00:00Z',
    updatedAt: '2025-11-03T12:10:00Z'
  },
  {
    id: '4',
    staffId: 'staff-1',
    staffName: 'longstaff@gmail.com',
    date: '2025-11-04',
    startTime: '13:00',
    endTime: '17:00',
    status: 'in-progress',
    location: 'Chi nhánh Tân Bình',
    actualStartTime: '13:00',
    createdAt: '2025-11-01T08:00:00Z',
    updatedAt: '2025-11-04T13:00:00Z'
  }
];

// Mock Maintenance Tasks
export const mockMaintenanceTasks: MaintenanceTask[] = [
  {
    id: '1',
    vehicleId: 'vehicle-1',
    vehicleName: 'Honda City',
    vehiclePlate: 'ABC-123',
    assignedTo: 'tech-1',
    technicianName: 'Nguyễn Văn A',
    title: 'Bảo dưỡng định kỳ 10,000km',
    description: 'Thay dầu động cơ, kiểm tra phanh, lọc gió',
    type: 'routine',
    priority: 'medium',
    status: 'pending',
    scheduledDate: '2025-11-05T08:00:00Z',
    estimatedDuration: 2,
    checklist: [
      { 
        id: 'check-1', 
        title: 'Thay dầu động cơ', 
        description: 'Thay dầu tổng hợp 5W-30',
        isCompleted: false 
      },
      { 
        id: 'check-2', 
        title: 'Kiểm tra phanh', 
        description: 'Kiểm tra độ dày má phanh',
        isCompleted: false 
      },
      { 
        id: 'check-3', 
        title: 'Thay lọc gió', 
        isCompleted: false 
      },
      { 
        id: 'check-4', 
        title: 'Kiểm tra lốp xe', 
        description: 'Đo áp suất và độ mòn',
        isCompleted: false 
      }
    ],
    notes: [],
    partsReplaced: [],
    photos: [],
    createdAt: '2025-11-01T08:00:00Z',
    updatedAt: '2025-11-01T08:00:00Z'
  },
  {
    id: '2',
    vehicleId: 'vehicle-2',
    vehicleName: 'Toyota Vios',
    vehiclePlate: 'XYZ-789',
    assignedTo: 'tech-1',
    technicianName: 'Nguyễn Văn A',
    title: 'Sửa chữa hệ thống điện',
    description: 'Kiểm tra và sửa chữa hệ thống điện, đèn không sáng',
    type: 'repair',
    priority: 'high',
    status: 'in-progress',
    scheduledDate: '2025-11-04T13:00:00Z',
    estimatedDuration: 3,
    checklist: [
      { 
        id: 'check-1', 
        title: 'Kiểm tra cầu chì', 
        isCompleted: true,
        completedAt: '2025-11-04T13:30:00Z',
        completedBy: 'tech-1'
      },
      { 
        id: 'check-2', 
        title: 'Kiểm tra dây điện', 
        isCompleted: true,
        completedAt: '2025-11-04T14:00:00Z',
        completedBy: 'tech-1'
      },
      { 
        id: 'check-3', 
        title: 'Thay bóng đèn', 
        isCompleted: false 
      }
    ],
    notes: [
      {
        id: 'note-1',
        content: 'Phát hiện cầu chì bị cháy do quá tải',
        createdBy: 'tech-1',
        createdByName: 'Nguyễn Văn A',
        createdAt: '2025-11-04T13:30:00Z'
      }
    ],
    partsReplaced: [
      {
        id: 'part-1',
        partName: 'Cầu chì 15A',
        partNumber: 'FUSE-15A',
        quantity: 2,
        cost: 20000,
        supplier: 'Phụ tùng ABC',
        replacedAt: '2025-11-04T13:45:00Z',
        replacedBy: 'tech-1'
      }
    ],
    photos: [],
    createdAt: '2025-11-03T08:00:00Z',
    updatedAt: '2025-11-04T14:00:00Z'
  },
  {
    id: '3',
    vehicleId: 'vehicle-3',
    vehicleName: 'Mazda CX-5',
    vehiclePlate: 'DEF-456',
    assignedTo: 'tech-1',
    technicianName: 'Nguyễn Văn A',
    title: 'Kiểm tra tổng thể trước mùa mưa',
    description: 'Kiểm tra hệ thống phanh, lốp, đèn, gạt nước',
    type: 'inspection',
    priority: 'low',
    status: 'completed',
    scheduledDate: '2025-11-02T08:00:00Z',
    completedDate: '2025-11-02T10:30:00Z',
    estimatedDuration: 2,
    actualDuration: 2.5,
    checklist: [
      { 
        id: 'check-1', 
        title: 'Kiểm tra phanh', 
        isCompleted: true,
        completedAt: '2025-11-02T08:30:00Z'
      },
      { 
        id: 'check-2', 
        title: 'Kiểm tra lốp', 
        isCompleted: true,
        completedAt: '2025-11-02T09:00:00Z'
      },
      { 
        id: 'check-3', 
        title: 'Kiểm tra đèn', 
        isCompleted: true,
        completedAt: '2025-11-02T09:30:00Z'
      },
      { 
        id: 'check-4', 
        title: 'Kiểm tra gạt nước', 
        isCompleted: true,
        completedAt: '2025-11-02T10:00:00Z'
      }
    ],
    notes: [
      {
        id: 'note-1',
        content: 'Xe trong tình trạng tốt, sẵn sàng cho mùa mưa',
        createdBy: 'tech-1',
        createdByName: 'Nguyễn Văn A',
        createdAt: '2025-11-02T10:30:00Z'
      }
    ],
    partsReplaced: [],
    photos: [],
    createdAt: '2025-11-01T08:00:00Z',
    updatedAt: '2025-11-02T10:30:00Z'
  },
  {
    id: '4',
    vehicleId: 'vehicle-4',
    vehicleName: 'Hyundai Accent',
    vehiclePlate: 'GHI-999',
    assignedTo: 'tech-1',
    technicianName: 'Nguyễn Văn A',
    title: 'Khẩn cấp - Xe không nổ máy',
    description: 'Khách hàng báo xe không nổ máy, cần kiểm tra ngay',
    type: 'emergency',
    priority: 'urgent',
    status: 'pending',
    scheduledDate: '2025-11-04T15:00:00Z',
    estimatedDuration: 1,
    checklist: [
      { 
        id: 'check-1', 
        title: 'Kiểm tra bình ắc quy', 
        isCompleted: false 
      },
      { 
        id: 'check-2', 
        title: 'Kiểm tra hệ thống khởi động', 
        isCompleted: false 
      }
    ],
    notes: [],
    partsReplaced: [],
    photos: [],
    createdAt: '2025-11-04T14:30:00Z',
    updatedAt: '2025-11-04T14:30:00Z'
  }
];

// Mock Staff Profile
export const mockStaffProfile: StaffProfile = {
  id: 'staff-1',
  name: 'Nguyễn Văn Long',
  email: 'longstaff@gmail.com',
  phone: '0912345678',
  avatar: undefined,
  role: 'staff',
  dateOfBirth: '1995-05-15',
  address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
  emergencyContact: '0987654321 (Nguyễn Văn An - Anh trai)',
  joinedDate: '2023-01-15T00:00:00Z'
};

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: '1',
    customerId: 'customer-1',
    customerName: 'Trần Thị B',
    vehicleId: 'vehicle-1',
    vehiclePlate: 'ABC-123',
    serviceType: 'Bảo dưỡng định kỳ',
    appointmentDate: '2025-11-05',
    appointmentTime: '08:00',
    status: 'confirmed',
    assignedTo: 'tech-1',
    notes: 'Khách hàng yêu cầu thay dầu tổng hợp',
    createdAt: '2025-11-01T08:00:00Z',
    updatedAt: '2025-11-02T10:00:00Z'
  },
  {
    id: '2',
    customerId: 'customer-2',
    customerName: 'Lê Văn C',
    vehicleId: 'vehicle-2',
    vehiclePlate: 'XYZ-789',
    serviceType: 'Sửa chữa',
    appointmentDate: '2025-11-04',
    appointmentTime: '13:00',
    status: 'in-progress',
    assignedTo: 'tech-1',
    createdAt: '2025-11-03T08:00:00Z',
    updatedAt: '2025-11-04T13:00:00Z'
  }
];
