import React, { useState } from 'react';
import { backendApi } from '@/services';
import { Card, Button } from '@/components/common';

/**
 * Component này để test các API từ backend
 * Có thể xóa sau khi test xong
 */
export const ApiTestScreen: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testApi = async (name: string, apiCall: () => Promise<any>) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await apiCall();
      setResult({ name, response });
      console.log(`✅ ${name}:`, response);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message;
      setError(`❌ ${name}: ${errorMsg}`);
      console.error(`❌ ${name}:`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">🧪 API Testing Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Vehicle Types */}
        <Card>
          <h3 className="font-semibold mb-3">🚗 Vehicle Types</h3>
          <Button
            onClick={() => testApi('Get Vehicle Types', () => backendApi.vehicleType.getAll())}
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            GET /vehicle-type/
          </Button>
        </Card>

        {/* Service Modes */}
        <Card>
          <h3 className="font-semibold mb-3">🔧 Service Modes</h3>
          <Button
            onClick={() => testApi('Get Service Modes', () => backendApi.serviceMode.getAll())}
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            GET /service-mode/
          </Button>
        </Card>

        {/* Service Types */}
        <Card>
          <h3 className="font-semibold mb-3">⚙️ Service Types</h3>
          <input
            type="text"
            id="vehicleTypeId"
            placeholder="Vehicle Type ID"
            className="border rounded px-3 py-2 w-full mb-2 text-sm"
          />
          <Button
            onClick={() => {
              const vehicleTypeId = (document.getElementById('vehicleTypeId') as HTMLInputElement).value;
              if (!vehicleTypeId) {
                alert('Nhập Vehicle Type ID');
                return;
              }
              testApi('Get Service Types', () => backendApi.serviceType.getByVehicleType(vehicleTypeId));
            }}
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            GET /service-type/
          </Button>
        </Card>

        {/* Appointments History */}
        <Card>
          <h3 className="font-semibold mb-3">📋 Appointments</h3>
          <Button
            onClick={() => testApi('Get Appointment History', () => backendApi.appointment.getHistory())}
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            GET /appointment/history
          </Button>
        </Card>

        {/* User Profile */}
        <Card>
          <h3 className="font-semibold mb-3">👤 User Profile</h3>
          <input
            type="text"
            id="userId"
            placeholder="User ID"
            className="border rounded px-3 py-2 w-full mb-2 text-sm"
          />
          <Button
            onClick={() => {
              const userId = (document.getElementById('userId') as HTMLInputElement).value;
              if (!userId) {
                alert('Nhập User ID');
                return;
              }
              testApi('Get User Profile', () => backendApi.user.getProfile(userId));
            }}
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            GET /user/profile/:id
          </Button>
        </Card>

        {/* Register */}
        <Card>
          <h3 className="font-semibold mb-3">📝 Register</h3>
          <Button
            onClick={() => testApi('Register User', () => 
              backendApi.auth.register({
                email: `test${Date.now()}@example.com`,
                password: 'test123',
                name: 'Test User',
                phone: '0901234567',
                role: 'customer'
              })
            )}
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            POST /auth/register
          </Button>
        </Card>
      </div>

      {/* Loading */}
      {loading && (
        <Card className="bg-blue-50">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-blue-900">Đang gọi API...</span>
          </div>
        </Card>
      )}

      {/* Error */}
      {error && (
        <Card className="bg-red-50 border-red-200">
          <h3 className="font-semibold text-red-900 mb-2">❌ Error</h3>
          <pre className="text-sm text-red-800 whitespace-pre-wrap">{error}</pre>
        </Card>
      )}

      {/* Result */}
      {result && (
        <Card>
          <h3 className="font-semibold text-green-900 mb-2">✅ {result.name}</h3>
          <div className="bg-gray-50 rounded p-4 overflow-auto max-h-96">
            <pre className="text-xs">{JSON.stringify(result.response, null, 2)}</pre>
          </div>
        </Card>
      )}

      {/* Instructions */}
      <Card className="mt-6 bg-yellow-50 border-yellow-200">
        <h3 className="font-semibold text-yellow-900 mb-2">📌 Hướng dẫn</h3>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Đảm bảo backend đang chạy ở <code>http://localhost:3000</code></li>
          <li>• Đã login để có token trong localStorage</li>
          <li>• Mở DevTools → Network tab để xem chi tiết requests</li>
          <li>• Check Console để xem logs</li>
        </ul>
      </Card>
    </div>
  );
};
