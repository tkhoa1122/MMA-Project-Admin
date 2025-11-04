# 🚀 Quick Start Guide - Staff Dashboard

## 📦 Các file đã tạo

### 1. Types & Interfaces

- `src/types/staff.ts` - Tất cả TypeScript types và interfaces

### 2. API Services

- `src/services/api/staffApi.ts` - API endpoints cho Staff features

### 3. Components

- `src/components/common/StatisticsCard.tsx` - Component thẻ thống kê
- `src/components/common/Button.tsx` - Updated với variant 'outline'

### 4. Screens

```
src/screens/
├── StaffDashboardScreen.tsx              # Dashboard chính
├── shifts/
│   └── MyShiftsListScreen.tsx            # Danh sách ca làm
├── maintenance/
│   ├── MyMaintenanceTasksScreen.tsx      # Danh sách bảo dưỡng
│   └── MaintenanceDetailScreen.tsx       # Chi tiết công việc
└── profile/
    └── ProfileScreen.tsx                  # Hồ sơ nhân viên
```

### 5. Demo Files

- `DemoApp.tsx` - Demo app với navigation
- `App.demo.tsx` - Simple demo
- `STAFF_SCREENS_README.md` - Tài liệu chi tiết
- `IMPLEMENTATION_SUMMARY.md` - Tóm tắt implementation

## 🎯 Test màn hình

### Option 1: Sử dụng DemoApp (Recommended)

```tsx
// Trong main.tsx hoặc App.tsx
import DemoApp from "./DemoApp";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DemoApp />
  </React.StrictMode>
);
```

DemoApp có navigation bar để chuyển đổi giữa các màn hình:

- 📊 Dashboard
- 📋 Ca làm
- 🔧 Bảo dưỡng
- 📝 Chi tiết
- 👤 Hồ sơ

### Option 2: Test từng màn hình

```tsx
import { StaffDashboardScreen } from "@/screens";

function App() {
  return <StaffDashboardScreen />;
}
```

## 🔧 Setup Backend (Mock hoặc Real API)

### Mock Data Setup

Tạo file `src/services/api/mockData.ts`:

```typescript
import type { DashboardStats, Shift, MaintenanceTask } from "@/types/staff";

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
  monthlyGrowth: 15.6,
};

export const mockShifts: Shift[] = [
  {
    id: "1",
    staffId: "staff-1",
    staffName: "longstaff@gmail.com",
    date: "2025-11-04",
    startTime: "08:00",
    endTime: "12:00",
    status: "scheduled",
    location: "Chi nhánh Quận 1",
    notes: "Ca sáng",
    createdAt: "2025-11-01",
    updatedAt: "2025-11-01",
  },
  // ... more shifts
];

export const mockMaintenanceTasks: MaintenanceTask[] = [
  {
    id: "1",
    vehicleId: "vehicle-1",
    vehicleName: "Honda City",
    vehiclePlate: "ABC-123",
    assignedTo: "tech-1",
    technicianName: "Nguyễn Văn A",
    title: "Bảo dưỡng định kỳ",
    description: "Thay dầu, kiểm tra phanh",
    type: "routine",
    priority: "medium",
    status: "pending",
    scheduledDate: "2025-11-05",
    estimatedDuration: 2,
    checklist: [
      { id: "1", title: "Thay dầu động cơ", isCompleted: false },
      { id: "2", title: "Kiểm tra phanh", isCompleted: false },
    ],
    notes: [],
    partsReplaced: [],
    photos: [],
    createdAt: "2025-11-01",
    updatedAt: "2025-11-01",
  },
  // ... more tasks
];
```

### Sử dụng Mock Data

Trong `staffApi.ts`, comment API calls và return mock data:

```typescript
export const dashboardApi = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    // Mock data for testing
    return {
      data: mockDashboardStats,
      message: "Success",
      success: true,
    };

    // Real API call (uncomment when backend ready)
    // const response = await apiClient.get('/dashboard/stats');
    // return response.data;
  },
};
```

### Real Backend Setup

1. Tạo file `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

2. Khởi động backend server (Node.js/Express, etc.)

3. Implement các endpoints theo structure trong `staffApi.ts`

## 🎨 Customization

### Thay đổi màu sắc

Trong `StatisticsCard.tsx`:

```typescript
const colorClasses = {
  green: "border-green-500 bg-green-50",
  blue: "border-blue-500 bg-blue-50",
  // ... customize colors
};
```

### Thay đổi layout

Responsive breakpoints trong Tailwind:

- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

Example:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

### Thêm icons

Sử dụng emoji hoặc icon library (React Icons, Heroicons):

```bash
npm install react-icons
```

```tsx
import { FaUser, FaCar, FaTools } from "react-icons/fa";

// Thay thế emoji bằng icon components
<FaUser className="text-2xl text-blue-600" />;
```

## 📱 Testing

### Manual Testing Checklist

#### Dashboard

- [ ] Stats cards hiển thị đúng
- [ ] Trends (tăng/giảm) hiển thị đúng
- [ ] Quick actions clickable
- [ ] Recent activity sections render

#### Shifts

- [ ] Filter buttons hoạt động
- [ ] Shift cards hiển thị đầy đủ info
- [ ] Start/End buttons visible khi đúng status
- [ ] Date formatting correct (Vietnamese)

#### Maintenance

- [ ] Filter by status works
- [ ] Priority badges correct colors
- [ ] Progress indicators (checklist/parts/photos)
- [ ] Detail screen loads
- [ ] Checklist interactive
- [ ] Add note functionality
- [ ] Status updates

#### Profile

- [ ] Avatar upload trigger
- [ ] Edit mode toggle
- [ ] Form fields editable
- [ ] Save/Cancel buttons
- [ ] Role badge display

## 🐛 Common Issues

### Issue: API calls fail

**Solution**: Sử dụng mock data hoặc kiểm tra VITE_API_URL

### Issue: Styles không hiển thị

**Solution**:

1. Kiểm tra Tailwind CSS đã config đúng
2. Run `npm run dev` để rebuild
3. Clear browser cache

### Issue: Type errors

**Solution**:

1. Import đúng types từ `@/types/staff`
2. Kiểm tra API response structure

### Issue: Components không render

**Solution**:

1. Check console errors
2. Verify imports
3. Check React DevTools

## 📚 Resources

- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **React TypeScript**: https://react-typescript-cheatsheet.netlify.app/
- **Axios Docs**: https://axios-http.com/docs/intro
- **Vite Guide**: https://vitejs.dev/guide/

## 🎓 Learning Path

1. **Bắt đầu**: Test DemoApp để xem tất cả màn hình
2. **Hiểu structure**: Đọc `STAFF_SCREENS_README.md`
3. **Tùy chỉnh**: Thay đổi colors, layouts trong các components
4. **Thêm features**: Implement các tính năng optional
5. **Connect backend**: Setup real API endpoints

## 💡 Tips

1. **Development**:

   - Sử dụng React DevTools để debug
   - Check Network tab cho API calls
   - Use console.log strategically

2. **Styling**:

   - Tailwind CSS IntelliSense extension
   - Use className helper cho conditional styles

3. **Performance**:

   - React.memo cho components render nhiều
   - useMemo/useCallback cho expensive operations
   - Lazy load screens với React.lazy

4. **Code Organization**:
   - Tách logic ra custom hooks
   - Reusable components trong common/
   - Constants trong utils/constants.ts

## 🚀 Next Actions

1. **Ngay bây giờ**:

   - [ ] Test DemoApp
   - [ ] Review code trong từng file
   - [ ] Customize theo design của bạn

2. **Tuần này**:

   - [ ] Setup backend API
   - [ ] Implement authentication
   - [ ] Add real data

3. **Tuần sau**:
   - [ ] Calendar view cho shifts
   - [ ] Image upload cho maintenance
   - [ ] Settings screen

## 📞 Need Help?

1. Check `STAFF_SCREENS_README.md` cho detailed docs
2. Review `IMPLEMENTATION_SUMMARY.md` cho overview
3. Look at inline comments trong code
4. Debug với React DevTools và console

---

**Happy Coding! 🎉**

Made with ❤️ for MMA Project Admin
