# Cấu hình API - EVCare Admin

## 📌 Tổng quan

Dự án này hỗ trợ **cả Mock API và Real API**, dễ dàng switch giữa 2 môi trường để phát triển và test.

---

## 🔧 Cấu hình Backend API

### 1. Cập nhật `.env`

Mở file `.env` và cập nhật URL của backend:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api

# Nếu backend của bạn dùng port khác hoặc domain khác:
# VITE_API_URL=http://localhost:8080/api
# VITE_API_URL=https://api.evcare.vn/api
```

### 2. Đảm bảo backend đang chạy

Backend cần expose các endpoints sau:

#### **Authentication**
- `POST /auth/login` - Đăng nhập
  ```json
  Request: { "email": "admin@evcare.com", "password": "admin123", "role": "admin" }
  Response: { 
    "token": "jwt-token-here",
    "user": { "id": "1", "name": "Admin", "email": "admin@evcare.com", "role": "admin", ... }
  }
  ```

#### **Admin APIs**
- `GET /admin/dashboard/stats` - Thống kê dashboard
- `GET /admin/dashboard/revenue-chart` - Biểu đồ doanh thu
- `GET /admin/appointments` - Danh sách lịch hẹn
- `GET /admin/appointments/:id` - Chi tiết lịch hẹn
- `POST /admin/appointments` - Tạo lịch hẹn
- `PUT /admin/appointments/:id` - Cập nhật lịch hẹn
- `PATCH /admin/appointments/:id/status` - Cập nhật trạng thái
- `POST /admin/appointments/:id/assign` - Phân công kỹ thuật viên
- `DELETE /admin/appointments/:id` - Xóa lịch hẹn
- `GET /admin/invoices` - Danh sách hóa đơn
- `POST /admin/shifts` - Tạo ca làm
- `POST /admin/maintenance` - Tạo công việc bảo trì

#### **Staff APIs**
- `GET /staff/dashboard/stats` - Thống kê staff
- `GET /staff/shifts` - Danh sách ca làm
- `POST /staff/shifts/:id/start` - Bắt đầu ca làm
- `POST /staff/shifts/:id/end` - Kết thúc ca làm
- `GET /staff/maintenance` - Danh sách công việc bảo trì
- `PATCH /staff/maintenance/:id/status` - Cập nhật trạng thái
- `POST /staff/maintenance/:id/notes` - Thêm ghi chú
- `POST /staff/maintenance/:id/photos` - Upload ảnh
- `GET /staff/profile` - Lấy thông tin profile
- `PUT /staff/profile` - Cập nhật profile
- `POST /staff/profile/avatar` - Upload avatar

---

## 🔄 Switch giữa Mock và Real API

### **Hiện tại: REAL API (Kết nối với backend)**

File `src/services/index.ts` đang sử dụng **Real API**.

### **Chuyển về Mock API (không cần backend)**

Nếu muốn test mà không cần backend chạy, mở file `src/services/index.ts`:

```typescript
// ============= ADMIN APIs =============
// 🔥 REAL API - Use this when backend is ready
// import { adminApi } from './api/admin/adminApi';
// export { adminApi };
// export const dashboardApi = adminApi.dashboard;
// export const appointmentApi = adminApi.appointments;
// export const invoiceApi = adminApi.invoices;

// 🧪 MOCK API - Use this for testing without backend
export { dashboardApi, appointmentApi, invoiceApi } from './api/admin/mockApi';

// ============= STAFF APIs =============
// 🔥 REAL API - Use this when backend is ready
// import { staffApiReal } from './api/staff/staffApiReal';
// export const staffApi = staffApiReal;

// 🧪 MOCK API - Use this for testing without backend
export { staffApi } from './api/staff/staffApi';
```

---

## 🔐 Authentication Flow

1. **User login** tại `/` (LoginScreen)
2. Frontend gửi request đến `POST /auth/login`
3. Backend trả về `{ token, user }`
4. Token được lưu vào `localStorage` và attach vào mọi request tiếp theo
5. Redirect user đến `/admin` dashboard

### Token Management

- Token tự động được thêm vào header:
  ```javascript
  Authorization: Bearer <token>
  ```

- Nếu API trả về 401 (Unauthorized), user sẽ bị logout và redirect về login

File `src/services/api/apiClient.ts` đã cấu hình interceptors:
```typescript
// Request interceptor - Thêm token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Xử lý 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);
```

---

## 📝 Response Format

Backend cần trả về format chuẩn:

### **Single Item Response**
```typescript
{
  "data": { /* object data */ },
  "message": "Success",
  "success": true
}
```

### **Paginated Response**
```typescript
{
  "data": [ /* array of items */ ],
  "total": 100,
  "page": 1,
  "limit": 10,
  "totalPages": 10
}
```

### **Error Response**
```typescript
{
  "message": "Error message",
  "success": false,
  "errors": [ /* validation errors */ ]
}
```

---

## 🚀 Testing

### Test với Real API:
```bash
# 1. Start backend server
cd backend
npm run dev

# 2. Start frontend (terminal khác)
cd frontend
npm run dev
```

### Test với Mock API:
```bash
# Chỉ cần start frontend
npm run dev
```

---

## 🔍 Debug

### Check API calls trong DevTools:

1. Mở Chrome DevTools (F12)
2. Tab **Network**
3. Filter: **Fetch/XHR**
4. Xem các request gửi đến backend

### Common Issues:

**❌ CORS Error:**
```
Access to XMLHttpRequest at 'http://localhost:3000/api' from origin 'http://localhost:5173' 
has been blocked by CORS policy
```
**Fix:** Backend cần enable CORS:
```javascript
// Express.js example
app.use(cors({ 
  origin: 'http://localhost:5173',
  credentials: true 
}));
```

**❌ 401 Unauthorized:**
- Check token có trong localStorage không
- Check backend có validate token đúng không
- Check header Authorization có được gửi không

**❌ Network Error:**
- Check backend có đang chạy không
- Check `VITE_API_URL` trong `.env` đúng chưa
- Check firewall/antivirus có block không

---

## 📚 Tài liệu thêm

- [Axios Documentation](https://axios-http.com/)
- [React Query](https://tanstack.com/query/latest) (nếu muốn improve API handling)
- [JWT Authentication](https://jwt.io/)

---

## ✅ Checklist khi deploy Production

- [ ] Cập nhật `VITE_API_URL` trong `.env.production`
- [ ] Remove tất cả mock API code
- [ ] Test tất cả endpoints với real data
- [ ] Enable HTTPS
- [ ] Implement proper error handling
- [ ] Add loading states
- [ ] Add retry logic cho failed requests
- [ ] Implement token refresh logic
- [ ] Add API response caching nếu cần

---

**Created:** November 5, 2025  
**Version:** 1.0.0  
**Project:** EVCare Admin - MMA Project
