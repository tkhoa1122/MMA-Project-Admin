src/
├── components/          # UI Components (Presentation)
├── containers/          # Logic Components (Container)
├── services/           # API calls
├── hooks/              # Custom hooks (business logic)
├── types/              # TypeScript types
└── utils/              # Helper functions

📁 components/ - Giao diện thuần
Mục đích: Chỉ hiển thị UI, nhận props
Không làm: Gọi API, xử lý nghiệp vụ

📁 Screen/ - Xử lý logic và hiển thị view
Mục đích: Gọi API, xử lý state, business logic
Pass data xuống: Components
Ex:
// AppointmentsScreen.tsx
const { data, loading } = useAppointments();
return <AppointmentList data={data} />

📁 services/ - Gọi API
Mục đích: HTTP requests, kết nối backend
Không làm: UI, state management
Ex:
// appointmentApi.ts
export const appointmentApi = {
  getAll: () => axios.get('/appointments'),
  create: (data) => axios.post('/appointments', data)
}

📁 hooks/ - Business logic
Mục đích: Custom hooks, logic tái sử dụng
Kết hợp: Services + State
Ex:
// useAppointments.ts
export const useAppointments = () => {
  const [data, setData] = useState([]);
  const fetch = async () => {
    const result = await appointmentApi.getAll();
    setData(result);
  };
  return { data, fetch };
}

📁 types/ - Định nghĩa kiểu
Mục đích: TypeScript interfaces, types
Ex:
// appointment.types.ts
export interface Appointment {
  id: string;
  date: Date;
  service: string;
}


Luồng hoạt động:
Screen
  ↓
Container (logic + gọi hooks)
  ↓
Hooks (gọi services)
  ↓
Services (gọi API)
  ↓
Types (định nghĩa data)
  ↓
Container nhận data
  ↓
Pass xuống Components
  ↓
Components hiển thị UI

Ví dụ:
src/
├── components/
│   └── AppointmentCard.tsx      # UI: Hiển thị 1 appointment
│
├── Views/
│   └── AppointmentsScreen.tsx # Logic: Lấy data, xử lý events hay còn gọi là views chính
│
├── services/
│   └── appointmentApi.ts        # API: GET/POST/DELETE
│
├── hooks/
│   └── useAppointments.ts       # Hook: Gọi API + quản lý state
│
└── types/
    └── appointment.types.ts     # Types: Interface Appointment
