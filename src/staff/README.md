# Staff Module - EVCare Admin Dashboard

Module quản lý Staff (Nhân viên) cho hệ thống EVCare Admin Dashboard.

## 📁 Cấu trúc thư mục

```
src/staff/
├── components/          # Staff-specific components
│   └── layout/         # Layout components (Sidebar, Header)
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── index.ts
├── screens/            # Staff screens/pages
│   ├── auth/          # Authentication screens
│   │   └── LoginScreen.tsx
│   ├── maintenance/   # Maintenance management
│   │   ├── MaintenanceDetailScreen.tsx
│   │   └── MyMaintenanceTasksScreen.tsx
│   ├── profile/       # User profile & settings
│   │   └── ProfileScreen.tsx
│   ├── shifts/        # Shift management
│   │   └── MyShiftsListScreen.tsx
│   ├── StaffDashboardScreen.tsx
│   └── index.ts
├── services/          # API services
│   └── api/
│       ├── apiClient.ts
│       ├── mockData.ts
│       ├── staffApi.ts
│       └── index.ts
├── types/             # TypeScript type definitions
│   ├── staff.ts
│   └── index.ts
├── StaffApp.tsx       # Main Staff application component
└── index.ts           # Module exports

```

## 🚀 Tính năng

### 🔐 Authentication

- Login screen với form validation
- Token-based authentication
- Remember me functionality
- Logout với confirmation

### 📊 Dashboard

- Tổng quan thống kê (8 metrics)
- Quick actions cards
- Upcoming shifts
- Pending maintenance tasks

### ⏰ Shift Management

- Xem danh sách ca làm
- Filter theo trạng thái (scheduled, in-progress, completed)
- Chi tiết ca làm việc
- Check-in/Check-out

### 🔧 Maintenance Management

- Danh sách công việc bảo dưỡng/sửa chữa
- Chi tiết task với checklist
- Thêm ghi chú và thay thế phụ tùng
- Upload ảnh
- Cập nhật trạng thái

### 👤 Profile & Settings

- Xem và chỉnh sửa thông tin cá nhân
- Đổi mật khẩu
- Quản lý thông tin liên hệ

## 🎨 Design System

### Colors

- Primary: `#667eea` → `#764ba2` (Purple gradient)
- Success: `#10b981` (Green)
- Warning: `#f97316` (Orange)
- Error: `#ef4444` (Red)
- Background: `#f8fafc` (Light gray)

### Components

- Sidebar: 280px width, gradient background
- Header: 72px height, search bar, notifications, user menu
- Cards: 16px border-radius, subtle shadows
- Buttons: Gradient backgrounds with hover effects

## 📝 Usage

### Import toàn bộ module

```typescript
import { StaffApp } from "@/staff";

function App() {
  return <StaffApp />;
}
```

### Import specific components

```typescript
import { LoginScreen, StaffDashboardScreen, Sidebar, Header } from "@/staff";
```

### Import types

```typescript
import type { Staff, Shift, MaintenanceTask, StaffProfile } from "@/staff";
```

## 🔧 API Integration

Module sử dụng mock data cho testing. Để kết nối với API thật:

1. Update `src/staff/services/api/apiClient.ts` với backend URL
2. Remove mock data từ `staffApi.ts`
3. Implement real API calls

### Environment Variables

```env
VITE_API_URL=http://your-api-url.com
```

## 🧪 Demo Account

```
Email: longstaff@gmail.com
Password: password
```

## 📦 Dependencies

- React 19.1.1
- TypeScript 5.9.3
- Axios 1.13.1 (API calls)
- Common components từ `@/components/common`

## 🎯 Future Enhancements

- [ ] Real-time notifications
- [ ] Chat với khách hàng
- [ ] Advanced filtering & search
- [ ] Export reports
- [ ] Dark mode
- [ ] Mobile responsive optimization
- [ ] PWA support

## 👥 Maintainers

Module này được tạo cho staff dashboard của hệ thống EVCare.

## 📄 License

Internal use only - EVCare Project
