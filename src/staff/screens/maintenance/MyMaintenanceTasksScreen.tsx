import React, { useEffect, useState } from 'react';
import { Card, Button, Loading } from '@/components/common';
import { staffApi } from '../../services/api/staffApi';
import type { MaintenanceTask } from '../../types/staff';

export const MyMaintenanceTasksScreen: React.FC = () => {
  const [tasks, setTasks] = useState<MaintenanceTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await staffApi.maintenance.getMyTasks({
        page: 1,
        limit: 50,
        status: filter === 'all' ? undefined : filter,
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: MaintenanceTask['priority']) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800',
    };
    return colors[priority];
  };

  const getPriorityText = (priority: MaintenanceTask['priority']) => {
    const texts = {
      low: 'Thấp',
      medium: 'Trung bình',
      high: 'Cao',
      urgent: 'Khẩn cấp',
    };
    return texts[priority];
  };

  const getStatusColor = (status: MaintenanceTask['status']) => {
    const colors = {
      pending: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status];
  };

  const getStatusText = (status: MaintenanceTask['status']) => {
    const texts = {
      pending: 'Chờ xử lý',
      'in-progress': 'Đang làm',
      completed: 'Hoàn thành',
      cancelled: 'Đã hủy',
    };
    return texts[status];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Công việc bảo dưỡng của tôi</h1>
        <p className="text-gray-600">Quản lý nhiệm vụ bảo dưỡng được giao</p>
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
          variant={filter === 'pending' ? 'primary' : 'outline'}
          onClick={() => setFilter('pending')}
        >
          Chờ xử lý
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

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <Card>
            <div className="text-center py-8">
              <p className="text-gray-500">Không có công việc nào</p>
            </div>
          </Card>
        ) : (
          tasks.map((task) => (
            <Card key={task.id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {getPriorityText(task.priority)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {getStatusText(task.status)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Xe:</span> {task.vehicleName} ({task.vehiclePlate})
                    </div>
                    <div>
                      <span className="font-medium">Loại:</span>{' '}
                      {task.type === 'routine' ? 'Định kỳ' :
                       task.type === 'repair' ? 'Sửa chữa' :
                       task.type === 'inspection' ? 'Kiểm tra' : 'Khẩn cấp'}
                    </div>
                    <div>
                      <span className="font-medium">Ngày:</span>{' '}
                      {new Date(task.scheduledDate).toLocaleDateString('vi-VN')}
                    </div>
                    <div>
                      <span className="font-medium">Thời gian dự kiến:</span> {task.estimatedDuration}h
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">Checklist:</span>
                      <span className="font-medium">
                        {task.checklist.filter(item => item.isCompleted).length}/{task.checklist.length}
                      </span>
                    </div>
                    {task.partsReplaced.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Phụ tùng:</span>
                        <span className="font-medium">{task.partsReplaced.length}</span>
                      </div>
                    )}
                    {task.photos.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Ảnh:</span>
                        <span className="font-medium">{task.photos.length}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-4 flex flex-col space-y-2">
                  {task.status === 'pending' && (
                    <Button variant="primary" size="small">
                      Bắt đầu
                    </Button>
                  )}
                  {task.status === 'in-progress' && (
                    <Button variant="success" size="small">
                      Hoàn thành
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
