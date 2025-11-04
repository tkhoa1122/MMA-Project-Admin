import type {
  Appointment,
  AppointmentStatus,
  DashboardStats,
  RevenueChart,
  Invoice,
  InvoiceStatus,
} from '@/types';

// Mock data generators
const generateMockAppointments = (): Appointment[] => {
  const statuses: AppointmentStatus[] = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];
  const services = ['Bảo dưỡng định kỳ', 'Thay dầu động cơ', 'Kiểm tra hệ thống điện', 'Sửa chữa phanh', 'Thay lốp xe'];
  const vehicles = ['VF 8', 'VF 9', 'VF e34', 'VF 5 Plus'];
  
  return Array.from({ length: 20 }, (_, i) => ({
    id: `APT-${String(i + 1).padStart(4, '0')}`,
    customerId: `CUS-${String(i + 1).padStart(4, '0')}`,
    customerName: `Khách hàng ${i + 1}`,
    customerPhone: `09${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
    customerEmail: `customer${i + 1}@example.com`,
    vehicleId: `VEH-${String(i + 1).padStart(4, '0')}`,
    vehiclePlate: `51F-${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`,
    vehicleModel: vehicles[Math.floor(Math.random() * vehicles.length)],
    serviceType: services[Math.floor(Math.random() * services.length)],
    serviceMode: Math.random() > 0.5 ? 'center' : 'mobile',
    scheduledDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    scheduledTime: `${String(Math.floor(Math.random() * 8) + 8).padStart(2, '0')}:00`,
    address: Math.random() > 0.5 ? `${i + 1} Nguyễn Văn Linh, Quận 7, TP.HCM` : undefined,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    technicianId: Math.random() > 0.3 ? `TECH-${String(Math.floor(Math.random() * 10) + 1).padStart(3, '0')}` : undefined,
    technicianName: Math.random() > 0.3 ? `Kỹ thuật viên ${Math.floor(Math.random() * 10) + 1}` : undefined,
    notes: Math.random() > 0.7 ? 'Khách hàng yêu cầu kiểm tra kỹ' : undefined,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  }));
};

const generateMockInvoices = (): Invoice[] => {
  const statuses: InvoiceStatus[] = ['pending', 'paid', 'cancelled'];
  
  return Array.from({ length: 15 }, (_, i) => ({
    id: `INV-${String(i + 1).padStart(4, '0')}`,
    appointmentId: `APT-${String(i + 1).padStart(4, '0')}`,
    customerId: `CUS-${String(i + 1).padStart(4, '0')}`,
    customerName: `Khách hàng ${i + 1}`,
    items: [
      { id: '1', name: 'Công thay dầu động cơ', quantity: 1, price: 500000, total: 500000 },
      { id: '2', name: 'Dầu động cơ tổng hợp', quantity: 4, price: 150000, total: 600000 },
    ],
    subtotal: 1100000,
    tax: 110000,
    discount: 50000,
    total: 1160000,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    paymentMethod: Math.random() > 0.5 ? 'vnpay' : 'cash',
    paidAt: Math.random() > 0.5 ? new Date().toISOString() : undefined,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  }));
};

// Mock appointments data
let mockAppointments = generateMockAppointments();
let mockInvoices = generateMockInvoices();

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ============= DASHBOARD API =============
export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    await delay(500);
    
    const total = mockAppointments.length;
    const pending = mockAppointments.filter(a => a.status === 'pending').length;
    const completed = mockAppointments.filter(a => a.status === 'completed').length;
    const paidInvoices = mockInvoices.filter(i => i.status === 'paid');
    const totalRevenue = paidInvoices.reduce((sum, inv) => sum + inv.total, 0);
    
    return {
      totalAppointments: total,
      pendingAppointments: pending,
      completedAppointments: completed,
      totalRevenue,
      revenueGrowth: 12.5,
      appointmentGrowth: 8.3,
    };
  },

  getRevenueChart: async (): Promise<RevenueChart[]> => {
    await delay(300);
    
    const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
    return months.map((month, i) => ({
      month,
      revenue: Math.floor(Math.random() * 50000000) + 30000000,
      appointments: Math.floor(Math.random() * 50) + 20,
    }));
  },
};

// ============= APPOINTMENT API =============
export const appointmentApi = {
  getAll: async (params?: { status?: AppointmentStatus; search?: string }): Promise<Appointment[]> => {
    await delay(600);
    
    let filtered = [...mockAppointments];
    
    if (params?.status) {
      filtered = filtered.filter(a => a.status === params.status);
    }
    
    if (params?.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(a => 
        a.customerName.toLowerCase().includes(search) ||
        a.customerPhone.includes(search) ||
        a.vehiclePlate.toLowerCase().includes(search)
      );
    }
    
    return filtered;
  },

  getById: async (id: string): Promise<Appointment> => {
    await delay(400);
    const appointment = mockAppointments.find(a => a.id === id);
    if (!appointment) throw new Error('Appointment not found');
    return appointment;
  },

  updateStatus: async (id: string, status: AppointmentStatus): Promise<Appointment> => {
    await delay(500);
    const index = mockAppointments.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Appointment not found');
    
    mockAppointments[index] = {
      ...mockAppointments[index],
      status,
      updatedAt: new Date().toISOString(),
    };
    
    return mockAppointments[index];
  },

  assignTechnician: async (id: string, technicianId: string, technicianName: string): Promise<Appointment> => {
    await delay(500);
    const index = mockAppointments.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Appointment not found');
    
    mockAppointments[index] = {
      ...mockAppointments[index],
      technicianId,
      technicianName,
      status: 'confirmed',
      updatedAt: new Date().toISOString(),
    };
    
    return mockAppointments[index];
  },
};

// ============= INVOICE API =============
export const invoiceApi = {
  getAll: async (params?: { status?: InvoiceStatus }): Promise<Invoice[]> => {
    await delay(600);
    
    if (params?.status) {
      return mockInvoices.filter(i => i.status === params.status);
    }
    
    return mockInvoices;
  },

  getById: async (id: string): Promise<Invoice> => {
    await delay(400);
    const invoice = mockInvoices.find(i => i.id === id);
    if (!invoice) throw new Error('Invoice not found');
    return invoice;
  },

  updateStatus: async (id: string, status: InvoiceStatus): Promise<Invoice> => {
    await delay(500);
    const index = mockInvoices.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Invoice not found');
    
    mockInvoices[index] = {
      ...mockInvoices[index],
      status,
      paidAt: status === 'paid' ? new Date().toISOString() : undefined,
      updatedAt: new Date().toISOString(),
    };
    
    return mockInvoices[index];
  },
};
