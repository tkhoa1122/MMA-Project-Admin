import React, { useEffect, useState } from 'react';
import { Card, Button, Loading } from '@/components/common';
import { staffApi } from '@/services';
import type { Shift } from '@/types';

export const ShiftsScreen: React.FC = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'in-progress' | 'completed'>('all');

  useEffect(() => {
    fetchShifts();
  }, [filter]);

  const fetchShifts = async () => {
    try {
      setLoading(true);
      const response = await staffApi.shifts.getMyShifts({
        page: 1,
        limit: 50,
        status: filter === 'all' ? undefined : filter,
      });
      setShifts(response.data);
    } catch (error) {
      console.error('Error fetching shifts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: Shift['status']) => {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status];
  };

  const getStatusText = (status: Shift['status']) => {
    const texts = {
      scheduled: 'Đã lên lịch',
      'in-progress': 'Đang làm',
      completed: 'Hoàn thành',
      cancelled: 'Đã hủy',
    };
    return texts[status];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý ca làm việc</h1>
        <p className="text-gray-600">Quản lý lịch làm việc của nhân viên</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex space-x-2">
        <Button
          variant={filter === 'all' ? 'primary' : 'outline'}
          onClick={() => setFilter('all')}
        >
          Tất cả
        </Button>
        <Button
          variant={filter === 'scheduled' ? 'primary' : 'outline'}
          onClick={() => setFilter('scheduled')}
        >
          Đã lên lịch
        </Button>
        <Button
          variant={filter === 'in-progress' ? 'primary' : 'outline'}
          onClick={() => setFilter('in-progress')}
        >
          Đang làm
        </Button>
        <Button
          variant={filter === 'completed' ? 'primary' : 'outline'}
          onClick={() => setFilter('completed')}
        >
          Hoàn thành
        </Button>
      </div>

      {/* Shifts List */}
      <div className="space-y-4">
        {shifts.length === 0 ? (
          <Card>
            <div className="text-center py-8">
              <p className="text-gray-500">Không có ca làm nào</p>
            </div>
          </Card>
        ) : (
          shifts.map((shift) => (
            <Card key={shift.id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {new Date(shift.date).toLocaleDateString('vi-VN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(shift.status)}`}>
                      {getStatusText(shift.status)}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Thời gian:</span> {shift.startTime} - {shift.endTime}
                    </p>
                    <p>
                      <span className="font-medium">Địa điểm:</span> {shift.location}
                    </p>
                    {shift.notes && (
                      <p>
                        <span className="font-medium">Ghi chú:</span> {shift.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="ml-4 flex flex-col space-y-2">
                  {shift.status === 'scheduled' && (
                    <Button variant="primary" size="small">
                      Bắt đầu ca
                    </Button>
                  )}
                  {shift.status === 'in-progress' && (
                    <Button variant="danger" size="small">
                      Kết thúc ca
                    </Button>
                  )}
                  <Button variant="outline" size="small">
                    Chi tiết
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
