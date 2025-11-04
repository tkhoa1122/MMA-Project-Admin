// ============= INVOICE =============
export type InvoiceStatus = 'pending' | 'paid' | 'cancelled';
export type PaymentMethod = 'cash' | 'vnpay' | 'bank_transfer';

export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: string;
  appointmentId: string;
  customerId: string;
  customerName: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: InvoiceStatus;
  paymentMethod?: PaymentMethod;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInvoiceDto {
  appointmentId: string;
  items: Omit<InvoiceItem, 'id'>[];
  discount?: number;
}
