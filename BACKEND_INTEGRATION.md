# 🔌 Kết nối Backend API - EVCare Admin

## ✅ Đã cấu hình xong!

Frontend đã được cấu hình để kết nối với backend API thực tế của bạn.

---

## 🎯 Backend API Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

### Đã implement trong frontend:

#### 1. **Authentication** 
- ✅ `POST /auth/register` - Đăng ký tài khoản mới
- ✅ `POST /auth/login` - Đăng nhập
- ✅ `POST /auth/logout` - Đăng xuất

#### 2. **Vehicle Types**
- ✅ `GET /vehicle-type/` - Lấy danh sách loại xe

#### 3. **Service Modes**
- ✅ `GET /appointment/service-mode/` - Lấy danh sách chế độ dịch vụ (tại trung tâm/lưu động)

#### 4. **Service Types**
- ✅ `GET /service-type/vehicle_type/{vehicleTypeId}` - Lấy danh sách dịch vụ theo loại xe

#### 5. **Appointments**
- ✅ `POST /appointment/` - Tạo lịch hẹn mới
- ✅ `GET /appointment/history` - Lấy lịch sử lịch hẹn
- ✅ `GET /appointment/{id}` - Lấy chi tiết lịch hẹn

#### 6. **User Profile**
- ✅ `GET /user/profile/{id}` - Lấy thông tin profile
- ✅ `PATCH /user/profile/{id}` - Cập nhật profile

---

## 🔧 Cấu hình

### File `.env`
```env
VITE_API_URL=http://localhost:3000/api/v1
```

### Backend `.env`
```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/evcare_db
JWT_SECRET=your_very_secure_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret
```

---

## 🚀 Cách sử dụng API trong Frontend

### 1. Authentication

#### Login
```typescript
import { backendApi } from '@/services';

// Đăng nhập
const response = await backendApi.auth.login({
  email: 'admin@evcare.com',
  password: 'admin123'
});

// Response: { data: { token, refreshToken?, user }, message, success }
console.log(response.data.user);
```

#### Register
```typescript
const response = await backendApi.auth.register({
  email: 'user@example.com',
  password: 'password123',
  name: 'Nguyễn Văn A',
  phone: '0901234567',
  role: 'customer'
});
```

#### Logout
```typescript
await backendApi.auth.logout();
```

### 2. Vehicle & Services

#### Lấy danh sách loại xe
```typescript
const response = await backendApi.vehicleType.getAll();
const vehicles = response.data; // VehicleType[]
```

#### Lấy danh sách service mode
```typescript
const response = await backendApi.serviceMode.getAll();
const modes = response.data; // ServiceMode[]
```

#### Lấy services theo loại xe
```typescript
const response = await backendApi.serviceType.getByVehicleType('vehicleTypeId123');
const services = response.data; // ServiceType[]
```

### 3. Appointments

#### Tạo lịch hẹn
```typescript
const response = await backendApi.appointment.create({
  vehicleTypeId: 'vt123',
  serviceModeId: 'sm123',
  serviceTypeId: 'st123',
  scheduledDate: '2025-11-10',
  scheduledTime: '09:00',
  customerName: 'Nguyễn Văn A',
  customerPhone: '0901234567',
  customerEmail: 'customer@example.com',
  vehiclePlate: '51F-12345',
  address: '123 Nguyễn Văn Linh, Q7',
  notes: 'Ghi chú'
});
```

#### Lấy lịch sử lịch hẹn
```typescript
const response = await backendApi.appointment.getHistory();
const appointments = response.data; // AppointmentHistory[]
```

#### Lấy chi tiết lịch hẹn
```typescript
const response = await backendApi.appointment.getById('appointmentId123');
const appointment = response.data;
```

### 4. User Profile

#### Lấy profile
```typescript
const response = await backendApi.user.getProfile(userId);
const profile = response.data; // UserProfile
```

#### Cập nhật profile
```typescript
const response = await backendApi.user.updateProfile(userId, {
  name: 'Nguyễn Văn B',
  phone: '0987654321',
  address: '456 Đường ABC',
  dateOfBirth: '1990-01-15',
  emergencyContact: '0912345678'
});
```

---

## 🔐 Token Management

### Auto-attach token to requests
Token được tự động attach vào mọi request:
```
Authorization: Bearer {token}
```

### Token được lưu ở:
- `localStorage.getItem('token')` - JWT access token
- `localStorage.getItem('refreshToken')` - Refresh token (nếu có)

### Auto-logout khi 401
Khi API trả về 401 Unauthorized, frontend sẽ tự động:
1. Clear token & user data
2. Redirect về trang login

---

## 📝 Response Format

### Success Response
```typescript
{
  data: T,              // Data trả về (object hoặc array)
  message?: string,     // Message (optional)
  success: true
}
```

### Error Response
```typescript
{
  message: string,      // Error message
  success: false,
  errors?: Array<{      // Validation errors (optional)
    field: string,
    message: string
  }>
}
```

---

## 🧪 Testing với Backend

### 1. Start Backend
```bash
cd backend
npm run dev
# Backend chạy ở http://localhost:3000
```

### 2. Start Frontend
```bash
cd frontend
npm run dev
# Frontend chạy ở http://localhost:5173
```

### 3. Test Login
1. Mở http://localhost:5173
2. Nhập email/password
3. Frontend sẽ gọi `POST http://localhost:3000/api/v1/auth/login`
4. Check Network tab trong DevTools để xem request/response

---

## 🐛 Troubleshooting

### CORS Error
```
Access-Control-Allow-Origin header
```

**Fix trong backend (Express.js):**
```javascript
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));
```

### 401 Unauthorized ngay sau login
- Check backend có trả về `token` trong response không
- Check format response có đúng: `{ data: { token, user } }`
- Check JWT_SECRET trong backend .env

### Cannot connect to MongoDB
```bash
# Start MongoDB
mongod

# Hoặc nếu dùng Docker:
docker run -d -p 27017:27017 mongo
```

### Token không được gửi trong request
- Check localStorage có chứa token không: `localStorage.getItem('token')`
- Check Network tab → Headers → Authorization header

---

## 📊 Backend Data Structure

### User Object
```typescript
{
  _id: string,           // MongoDB ObjectId
  email: string,
  name: string,
  phone?: string,
  role: 'customer' | 'staff' | 'admin',
  avatar?: string,
  createdAt: string,
  updatedAt: string
}
```

### Appointment Object
```typescript
{
  _id: string,
  userId: string,
  vehicleTypeId: string,
  serviceModeId: string,
  serviceTypeId: string,
  scheduledDate: string,  // YYYY-MM-DD
  scheduledTime: string,  // HH:mm
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled',
  customerName: string,
  customerPhone: string,
  customerEmail?: string,
  vehiclePlate?: string,
  address?: string,
  notes?: string,
  createdAt: string,
  updatedAt: string
}
```

---

## ✅ Checklist

- [x] Cập nhật VITE_API_URL → `http://localhost:3000/api/v1`
- [x] Tạo backendApi service
- [x] Cập nhật AuthContext sử dụng real API
- [x] Handle token trong apiClient interceptors
- [x] Export types từ backendApi
- [ ] **Backend phải chạy ở port 3000**
- [ ] **Backend enable CORS cho localhost:5173**
- [ ] **MongoDB phải đang chạy**
- [ ] **Backend đã seed data mẫu (vehicle types, service types, etc.)**

---

## 🎯 Next Steps

1. ✅ Test login với tài khoản có sẵn trong database
2. ✅ Test tạo appointment
3. ✅ Test lấy appointment history
4. ✅ Test update profile
5. ⏳ Implement thêm các API khác nếu backend đã có (shifts, maintenance, etc.)

---

**Updated:** November 5, 2025  
**Backend:** Node.js + Express + MongoDB  
**Frontend:** React 19 + TypeScript + Vite
