// API Configuration
// Thay đổi này để switch giữa mock và real API

export const API_CONFIG = {
  // Set to true để dùng mock data, false để dùng real API từ backend
  USE_MOCK_API: false,
  
  // Base URL cho backend API (từ .env)
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  
  // Timeout cho API requests (ms)
  TIMEOUT: 10000,
};

// Helper để kiểm tra có dùng mock hay không
export const useMockAPI = () => API_CONFIG.USE_MOCK_API;
