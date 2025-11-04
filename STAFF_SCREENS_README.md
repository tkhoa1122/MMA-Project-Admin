# Staff Dashboard Screens

Các màn hình quản lý cho nhân viên và kỹ thuật viên trong hệ thống MMA Project Admin.

## 📁 Cấu trúc thư mục

```
src/
├── screens/
│   ├── StaffDashboardScreen.tsx          # Dashboard cho staff
│   ├── shifts/
│   │   └── MyShiftsListScreen.tsx        # Danh sách ca làm
│   ├── maintenance/
│   │   ├── MyMaintenanceTasksScreen.tsx  # Danh sách công việc bảo dưỡng
│   │   └── MaintenanceDetailScreen.tsx   # Chi tiết công việc
│   └── profile/
│       └── ProfileScreen.tsx             # Hồ sơ cá nhân
├── components/
│   └── common/
│       └── StatisticsCard.tsx            # Component thẻ thống kê
├── services/
│   └── api/
│       └── staffApi.ts                   # API endpoints cho staff
└── types/
    └── staff.ts                          # TypeScript types
```

## 🎯 Các màn hình đã implement

### Module 11: Dashboard (Bảng điều khiển)

- ✅ **Staff Dashboard** - Dashboard tổng quan với statistics cards
  - Thống kê: Khách hàng, Nhân viên, Kỹ thuật viên, Xe
  - Lịch hẹn tháng này, Doanh thu, Lịch hẹn hoàn thành/chờ xử lý
  - Quick actions: Ca làm, Bảo dưỡng, Lịch hẹn, Hồ sơ
  - Recent activity: Ca làm sắp tới, Công việc cần làm

### Module 13: Shift Management (Quản lý ca làm)

- ✅ **My Shifts List** - Danh sách ca làm của nhân viên
  - Lọc theo trạng thái: Tất cả, Đã lên lịch, Đang làm, Hoàn thành
  - Hiển thị thông tin: Ngày, giờ, địa điểm, ghi chú
  - Actions: Bắt đầu ca, Kết thúc ca, Xem chi tiết

### Module 14: Maintenance Management (Quản lý bảo dưỡng)

- ✅ **My Maintenance Tasks** - Danh sách công việc bảo dưỡng

  - Lọc theo trạng thái: Tất cả, Chờ xử lý, Đang làm, Hoàn thành
  - Hiển thị: Priority, Status, Xe, Loại công việc, Thời gian
  - Progress: Checklist, Phụ tùng, Ảnh
  - Actions: Bắt đầu, Hoàn thành, Xem chi tiết

- ✅ **Maintenance Detail** - Chi tiết công việc bảo dưỡng
  - Thông tin xe
  - Checklist với progress bar
  - Quản lý phụ tùng đã thay thế
  - Ghi chú (thêm/xem)
  - Upload và xem ảnh
  - Cập nhật trạng thái công việc

### Module 20: Settings & Profile

- ✅ **Profile Screen** - Hồ sơ nhân viên
  - Upload avatar
  - Xem/Chỉnh sửa thông tin cá nhân
  - Đổi mật khẩu
  - Đăng xuất

## 🎨 Components

### StatisticsCard

Component hiển thị thẻ thống kê với:

- Icon, Title, Value
- Trend percentage (tăng/giảm so với tháng trước)
- Subtitle
- 6 màu sắc: green, blue, red, purple, orange, yellow

```tsx
<StatisticsCards
  stats={[
    {
      title: "Tổng số khách hàng",
      value: 751,
      icon: "👥",
      color: "green",
      subtitle: "751 đang hoạt động",
      trend: 15.6,
    },
  ]}
/>
```

## 🔧 API Services

### Dashboard API

- `getStats()` - Lấy thống kê tổng quan
- `getStatsByDateRange(startDate, endDate)` - Lấy thống kê theo khoảng thời gian

### Shift API

- `getMyShifts(params)` - Danh sách ca làm
- `getShiftById(shiftId)` - Chi tiết ca làm
- `getShiftsByMonth(year, month)` - Lịch ca làm
- `startShift(shiftId)` - Bắt đầu ca
- `endShift(shiftId, notes)` - Kết thúc ca
- Admin APIs: `createShift`, `updateShift`, `deleteShift`, `assignShift`

### Maintenance API

- `getMyTasks(params)` - Danh sách công việc
- `getTaskById(taskId)` - Chi tiết công việc
- `updateTaskStatus(taskId, status)` - Cập nhật trạng thái
- `updateChecklistItem(taskId, itemId, data)` - Cập nhật checklist
- `addNote(taskId, data)` - Thêm ghi chú
- `addPartReplacement(taskId, data)` - Thêm phụ tùng
- `uploadPhotos(taskId, files)` - Upload ảnh
- `completeTask(taskId, actualDuration)` - Hoàn thành
- Admin APIs: `createTask`, `updateTask`, `deleteTask`

### Profile API

- `getProfile()` - Lấy thông tin profile
- `updateProfile(data)` - Cập nhật profile
- `changePassword(data)` - Đổi mật khẩu
- `uploadAvatar(file)` - Upload avatar

## 📝 Types

### Main Types

- `Staff` - Thông tin nhân viên
- `DashboardStats` - Thống kê dashboard
- `StatCard` - Thẻ thống kê
- `Shift` - Ca làm việc
- `MaintenanceTask` - Công việc bảo dưỡng
- `ChecklistItem` - Mục checklist
- `MaintenanceNote` - Ghi chú
- `PartReplacement` - Phụ tùng thay thế
- `StaffProfile` - Hồ sơ nhân viên
- `AppSettings` - Cài đặt ứng dụng

## 🚀 Sử dụng

### Import screens

```tsx
import {
  StaffDashboardScreen,
  MyShiftsListScreen,
  MyMaintenanceTasksScreen,
  MaintenanceDetailScreen,
  ProfileScreen,
} from "@/screens";
```

### Import API

```tsx
import { staffApi } from "@/services/api";

// Sử dụng
const stats = await staffApi.dashboard.getStats();
const shifts = await staffApi.shifts.getMyShifts({ page: 1, limit: 10 });
```

### Import Types

```tsx
import type { DashboardStats, Shift, MaintenanceTask } from "@/types";
```

## 🎨 Styling

Tất cả components sử dụng Tailwind CSS với:

- Responsive design (mobile-first)
- Consistent color scheme
- Hover effects và transitions
- Loading states
- Error handling

## 📱 Responsive

- Mobile: 1 column
- Tablet (md): 2 columns
- Desktop (lg): 4 columns cho stats, 2-3 columns cho layouts

## 🔐 Authentication

- Tự động thêm Bearer token vào headers
- Redirect về login khi 401
- Token stored trong localStorage

## 🎯 Tính năng cần thêm (optional)

- [ ] Shift Calendar View - Lịch ca làm dạng calendar
- [ ] Create/Edit Shift (Admin)
- [ ] Settings Screen - Cài đặt (notifications, language, theme)
- [ ] Change Password Modal
- [ ] Image Gallery Modal cho Maintenance photos
- [ ] Export reports
- [ ] Push notifications
- [ ] Real-time updates (WebSocket)

## 📞 API Mock Data

Để test, bạn có thể tạo mock data trong `staffApi.ts`:

```tsx
// Mock data example
const mockStats: DashboardStats = {
  totalCustomers: 751,
  totalStaff: 21,
  totalTechnicians: 40,
  totalVehicles: 736,
  activeCustomers: 751,
  monthlyAppointments: 737,
  monthlyRevenue: 116079495,
  completedAppointments: 40,
  pendingAppointments: 507,
  monthlyGrowth: 15.6,
};
```

## 🐛 Troubleshooting

1. **API errors**: Kiểm tra `VITE_API_URL` trong `.env`
2. **Type errors**: Đảm bảo import đúng types từ `@/types/staff`
3. **Styling issues**: Kiểm tra Tailwind CSS config và PostCSS setup
4. **401 errors**: Kiểm tra token trong localStorage

## 📄 License

MIT
