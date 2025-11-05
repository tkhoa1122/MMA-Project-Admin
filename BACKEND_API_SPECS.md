# Backend API Endpoints Example

Đây là ví dụ các endpoint mà frontend đang sử dụng. Backend cần implement các endpoint này.

## 🔐 Authentication

### POST /auth/login
Đăng nhập

**Request:**
```json
{
  "email": "admin@evcare.com",
  "password": "admin123",
  "role": "admin"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "name": "Admin User",
    "email": "admin@evcare.com",
    "phone": "0123456789",
    "role": "admin",
    "avatar": "https://...",
    "createdAt": "2025-11-05T10:00:00.000Z"
  }
}
```

---

## 📊 Admin - Dashboard

### GET /admin/dashboard/stats
Lấy thống kê tổng quan

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "data": {
    "totalAppointments": 156,
    "pendingAppointments": 23,
    "completedAppointments": 120,
    "totalRevenue": 450000000,
    "revenueGrowth": 12.5,
    "appointmentGrowth": 8.3
  },
  "message": "Success",
  "success": true
}
```

### GET /admin/dashboard/revenue-chart
Lấy biểu đồ doanh thu

**Query Params:**
- `year` (optional): Năm cần lấy dữ liệu

**Response:**
```json
{
  "data": [
    { "month": "T1", "revenue": 35000000, "appointments": 45 },
    { "month": "T2", "revenue": 42000000, "appointments": 52 },
    ...
  ],
  "message": "Success",
  "success": true
}
```

---

## 📋 Admin - Appointments

### GET /admin/appointments
Lấy danh sách lịch hẹn

**Query Params:**
- `page`: Trang hiện tại (default: 1)
- `limit`: Số items per page (default: 10)
- `status`: Filter by status (pending/confirmed/in_progress/completed/cancelled)
- `search`: Tìm kiếm theo tên, phone, biển số xe

**Response:**
```json
{
  "data": [
    {
      "id": "APT-0001",
      "customerId": "CUS-0001",
      "customerName": "Nguyễn Văn A",
      "customerPhone": "0901234567",
      "customerEmail": "customer@example.com",
      "vehicleId": "VEH-0001",
      "vehiclePlate": "51F-12345",
      "vehicleModel": "VF 8",
      "serviceType": "Bảo dưỡng định kỳ",
      "serviceMode": "center",
      "scheduledDate": "2025-11-10",
      "scheduledTime": "09:00",
      "address": null,
      "status": "pending",
      "technicianId": null,
      "technicianName": null,
      "notes": "Khách hàng yêu cầu kiểm tra kỹ",
      "createdAt": "2025-11-05T10:00:00.000Z",
      "updatedAt": "2025-11-05T10:00:00.000Z"
    }
  ],
  "total": 156,
  "page": 1,
  "limit": 10,
  "totalPages": 16
}
```

### GET /admin/appointments/:id
Lấy chi tiết lịch hẹn

**Response:**
```json
{
  "data": { /* appointment object */ },
  "message": "Success",
  "success": true
}
```

### POST /admin/appointments
Tạo lịch hẹn mới

**Request:**
```json
{
  "customerId": "CUS-0001",
  "vehicleId": "VEH-0001",
  "serviceType": "Bảo dưỡng định kỳ",
  "serviceMode": "center",
  "scheduledDate": "2025-11-10",
  "scheduledTime": "09:00",
  "notes": "..."
}
```

### PUT /admin/appointments/:id
Cập nhật lịch hẹn

### PATCH /admin/appointments/:id/status
Cập nhật trạng thái

**Request:**
```json
{
  "status": "confirmed"
}
```

### POST /admin/appointments/:id/assign
Phân công kỹ thuật viên

**Request:**
```json
{
  "technicianId": "TECH-001"
}
```

### DELETE /admin/appointments/:id
Xóa lịch hẹn

---

## 💰 Admin - Invoices

### GET /admin/invoices
### GET /admin/invoices/:id
### POST /admin/invoices
### PUT /admin/invoices/:id
### PATCH /admin/invoices/:id/status
### DELETE /admin/invoices/:id

*(Tương tự appointments)*

---

## ⏰ Staff - Shifts

### GET /staff/shifts
Lấy danh sách ca làm

**Query Params:**
- `page`, `limit`: Pagination
- `status`: Filter (scheduled/in-progress/completed/cancelled)
- `date`: Filter theo ngày

**Response:**
```json
{
  "data": [
    {
      "id": "SHF-0001",
      "staffId": "STF-001",
      "staffName": "Nguyễn Văn Long",
      "date": "2025-11-05",
      "startTime": "08:00",
      "endTime": "17:00",
      "breakStartTime": "12:00",
      "breakEndTime": "13:00",
      "status": "scheduled",
      "location": "Trung tâm EVCare - Quận 7",
      "role": "technician",
      "tasks": ["Bảo dưỡng xe", "Sửa chữa"],
      "actualStartTime": null,
      "actualEndTime": null,
      "notes": null,
      "createdAt": "2025-11-01T10:00:00.000Z",
      "updatedAt": "2025-11-01T10:00:00.000Z"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 10,
  "totalPages": 5
}
```

### GET /staff/shifts/:id
Lấy chi tiết ca làm

### GET /staff/shifts/calendar
Lấy ca làm theo tháng

**Query Params:**
- `year`: Năm
- `month`: Tháng (1-12)

### POST /staff/shifts/:id/start
Bắt đầu ca làm

**Response:**
```json
{
  "data": { /* shift with actualStartTime updated */ },
  "message": "Đã bắt đầu ca làm",
  "success": true
}
```

### POST /staff/shifts/:id/end
Kết thúc ca làm

**Request:**
```json
{
  "notes": "Ca làm suôn sẻ"
}
```

### POST /admin/shifts (Admin only)
Tạo ca làm mới

### PUT /admin/shifts/:id
Cập nhật ca làm

### DELETE /admin/shifts/:id
Xóa ca làm

### POST /admin/shifts/:id/assign
Phân công staff

---

## 🔧 Staff - Maintenance

### GET /staff/maintenance
Lấy danh sách công việc bảo dưỡng

**Query Params:**
- `page`, `limit`: Pagination
- `status`: Filter (pending/in-progress/completed/cancelled)
- `priority`: Filter (low/medium/high/urgent)

**Response:**
```json
{
  "data": [
    {
      "id": "MNT-0001",
      "vehicleId": "VEH-0001",
      "vehicleName": "VinFast VF 8",
      "vehiclePlate": "51F-12345",
      "appointmentId": "APT-0001",
      "assignedTo": "STF-001",
      "assignedToName": "Nguyễn Văn Long",
      "type": "routine",
      "priority": "medium",
      "status": "in-progress",
      "title": "Bảo dưỡng định kỳ 10.000km",
      "description": "Kiểm tra và thay dầu động cơ...",
      "scheduledDate": "2025-11-05",
      "estimatedDuration": 2,
      "actualDuration": null,
      "checklist": [
        {
          "id": "1",
          "title": "Kiểm tra mức dầu động cơ",
          "isCompleted": true,
          "completedAt": "2025-11-05T09:30:00.000Z",
          "completedBy": "STF-001"
        },
        {
          "id": "2",
          "title": "Thay dầu động cơ",
          "isCompleted": false,
          "completedAt": null,
          "completedBy": null
        }
      ],
      "partsReplaced": [
        {
          "id": "1",
          "partName": "Dầu động cơ tổng hợp",
          "partCode": "OIL-001",
          "quantity": 4,
          "unit": "lít",
          "cost": 600000,
          "addedAt": "2025-11-05T09:45:00.000Z"
        }
      ],
      "photos": [
        {
          "id": "1",
          "url": "https://...",
          "caption": "Trước khi bảo dưỡng",
          "uploadedAt": "2025-11-05T09:00:00.000Z"
        }
      ],
      "notes": [
        {
          "id": "1",
          "content": "Phát hiện rò rỉ dầu nhẹ",
          "createdBy": "STF-001",
          "createdByName": "Nguyễn Văn Long",
          "createdAt": "2025-11-05T09:30:00.000Z"
        }
      ],
      "createdAt": "2025-11-01T10:00:00.000Z",
      "updatedAt": "2025-11-05T09:45:00.000Z",
      "completedAt": null
    }
  ],
  "total": 30,
  "page": 1,
  "limit": 10,
  "totalPages": 3
}
```

### GET /staff/maintenance/:id
Lấy chi tiết công việc

### PATCH /staff/maintenance/:id/status
Cập nhật trạng thái

**Request:**
```json
{
  "status": "in-progress"
}
```

### PATCH /staff/maintenance/:id/checklist/:itemId
Cập nhật checklist item

**Request:**
```json
{
  "isCompleted": true,
  "notes": "Đã kiểm tra xong"
}
```

### POST /staff/maintenance/:id/notes
Thêm ghi chú

**Request:**
```json
{
  "content": "Ghi chú mới"
}
```

### POST /staff/maintenance/:id/parts
Thêm phụ tùng thay thế

**Request:**
```json
{
  "partName": "Lọc gió",
  "partCode": "FILTER-001",
  "quantity": 1,
  "unit": "cái",
  "cost": 150000
}
```

### POST /staff/maintenance/:id/photos
Upload ảnh

**Request:** `multipart/form-data`
```
photos: File[]
```

### POST /staff/maintenance/:id/complete
Hoàn thành công việc

**Request:**
```json
{
  "actualDuration": 2.5
}
```

### POST /admin/maintenance
### PUT /admin/maintenance/:id
### DELETE /admin/maintenance/:id

---

## 👤 Staff - Profile

### GET /staff/profile
Lấy thông tin profile

**Response:**
```json
{
  "data": {
    "id": "STF-001",
    "name": "Nguyễn Văn Long",
    "email": "staff@evcare.com",
    "phone": "0901234567",
    "role": "staff",
    "avatar": "https://...",
    "dateOfBirth": "1990-01-15",
    "address": "123 Nguyễn Văn Linh, Q7, HCM",
    "emergencyContact": "0987654321",
    "joinedDate": "2024-01-01",
    "createdAt": "2024-01-01T10:00:00.000Z"
  },
  "message": "Success",
  "success": true
}
```

### PUT /staff/profile
Cập nhật profile

**Request:**
```json
{
  "name": "Nguyễn Văn Long",
  "phone": "0901234567",
  "dateOfBirth": "1990-01-15",
  "address": "...",
  "emergencyContact": "..."
}
```

### POST /staff/profile/change-password
Đổi mật khẩu

**Request:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword",
  "confirmPassword": "newpassword"
}
```

### POST /staff/profile/avatar
Upload avatar

**Request:** `multipart/form-data`
```
avatar: File
```

**Response:**
```json
{
  "data": {
    "avatar": "https://storage.evcare.vn/avatars/abc123.jpg"
  },
  "message": "Đã upload avatar",
  "success": true
}
```

---

## ⚙️ Settings

### GET /staff/settings
### PUT /staff/settings

**Request:**
```json
{
  "notifications": {
    "email": true,
    "push": true,
    "sms": false
  },
  "language": "vi",
  "theme": "light"
}
```

---

## 📝 Notes

### Common Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Error Response Format
```json
{
  "message": "Error message here",
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error
