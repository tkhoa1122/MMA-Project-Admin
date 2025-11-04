import React, { useEffect, useState } from 'react';
import { Card, Button, Loading, Input } from '@/components/common';
import { staffApi } from '../../services/api/staffApi';
import type { MaintenanceTask, ChecklistItem } from '../../types/staff';

interface MaintenanceDetailScreenProps {
  taskId: string;
}

export const MaintenanceDetailScreen: React.FC<MaintenanceDetailScreenProps> = ({ taskId }) => {
  const [task, setTask] = useState<MaintenanceTask | null>(null);
  const [loading, setLoading] = useState(true);
  const [noteContent, setNoteContent] = useState('');
  const [showAddNote, setShowAddNote] = useState(false);

  useEffect(() => {
    fetchTaskDetail();
  }, [taskId]);

  const fetchTaskDetail = async () => {
    try {
      setLoading(true);
      const response = await staffApi.maintenance.getTaskById(taskId);
      setTask(response.data);
    } catch (error) {
      console.error('Error fetching task detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateChecklistItem = async (itemId: string, isCompleted: boolean) => {
    try {
      await staffApi.maintenance.updateChecklistItem(taskId, itemId, { isCompleted });
      await fetchTaskDetail();
    } catch (error) {
      console.error('Error updating checklist item:', error);
    }
  };

  const handleAddNote = async () => {
    if (!noteContent.trim()) return;
    
    try {
      await staffApi.maintenance.addNote(taskId, { content: noteContent });
      setNoteContent('');
      setShowAddNote(false);
      await fetchTaskDetail();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleStartTask = async () => {
    try {
      await staffApi.maintenance.updateTaskStatus(taskId, 'in-progress');
      await fetchTaskDetail();
    } catch (error) {
      console.error('Error starting task:', error);
    }
  };

  const handleCompleteTask = async () => {
    try {
      const actualDuration = task?.estimatedDuration || 0; // You might want to add a form to input actual duration
      await staffApi.maintenance.completeTask(taskId, actualDuration);
      await fetchTaskDetail();
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="p-6">
        <Card>
          <div className="text-center py-8">
            <p className="text-red-500">Không tìm thấy công việc</p>
          </div>
        </Card>
      </div>
    );
  }

  const completedItems = task.checklist.filter(item => item.isCompleted).length;
  const progressPercentage = (completedItems / task.checklist.length) * 100;

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{task.title}</h1>
            <p className="text-gray-600">{task.description}</p>
          </div>
          <div className="flex space-x-2">
            {task.status === 'pending' && (
              <Button variant="primary" onClick={handleStartTask}>
                Bắt đầu công việc
              </Button>
            )}
            {task.status === 'in-progress' && (
              <Button variant="success" onClick={handleCompleteTask}>
                Hoàn thành
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vehicle Info */}
            <Card title="Thông tin xe">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Tên xe</p>
                  <p className="font-semibold text-gray-900">{task.vehicleName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Biển số</p>
                  <p className="font-semibold text-gray-900">{task.vehiclePlate}</p>
                </div>
              </div>
            </Card>

            {/* Checklist */}
            <Card title={`Checklist (${completedItems}/${task.checklist.length})`}>
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">{Math.round(progressPercentage)}% hoàn thành</p>
              </div>
              <div className="space-y-3">
                {task.checklist.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <input
                      type="checkbox"
                      checked={item.isCompleted}
                      onChange={(e) => handleUpdateChecklistItem(item.id, e.target.checked)}
                      className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      disabled={task.status === 'completed'}
                    />
                    <div className="flex-1">
                      <p className={`font-medium ${item.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {item.title}
                      </p>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      )}
                      {item.isCompleted && item.completedAt && (
                        <p className="text-xs text-gray-500 mt-1">
                          Hoàn thành: {new Date(item.completedAt).toLocaleString('vi-VN')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Parts Replaced */}
            {task.partsReplaced.length > 0 && (
              <Card title="Phụ tùng đã thay thế">
                <div className="space-y-3">
                  {task.partsReplaced.map((part) => (
                    <div key={part.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900">{part.partName}</p>
                          <p className="text-sm text-gray-600">Mã: {part.partNumber}</p>
                          {part.supplier && (
                            <p className="text-sm text-gray-600">Nhà cung cấp: {part.supplier}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {part.cost.toLocaleString('vi-VN')} đ
                          </p>
                          <p className="text-sm text-gray-600">SL: {part.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Notes */}
            <Card title="Ghi chú">
              <div className="space-y-3">
                {task.notes.map((note) => (
                  <div key={note.id} className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <p className="text-gray-900">{note.content}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <span className="font-medium">{note.createdByName}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(note.createdAt).toLocaleString('vi-VN')}</span>
                    </div>
                  </div>
                ))}
                
                {showAddNote ? (
                  <div className="space-y-2">
                    <Input
                      placeholder="Nhập ghi chú..."
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                    />
                    <div className="flex space-x-2">
                      <Button variant="primary" size="small" onClick={handleAddNote}>
                        Thêm
                      </Button>
                      <Button variant="outline" size="small" onClick={() => setShowAddNote(false)}>
                        Hủy
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button variant="outline" size="small" onClick={() => setShowAddNote(true)}>
                    + Thêm ghi chú
                  </Button>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Task Info */}
            <Card title="Thông tin công việc">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Trạng thái</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    task.status === 'pending' ? 'bg-blue-100 text-blue-800' :
                    task.status === 'in-progress' ? 'bg-green-100 text-green-800' :
                    task.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {task.status === 'pending' ? 'Chờ xử lý' :
                     task.status === 'in-progress' ? 'Đang làm' :
                     task.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Độ ưu tiên</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    task.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {task.priority === 'urgent' ? 'Khẩn cấp' :
                     task.priority === 'high' ? 'Cao' :
                     task.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Loại công việc</p>
                  <p className="font-semibold text-gray-900">
                    {task.type === 'routine' ? 'Định kỳ' :
                     task.type === 'repair' ? 'Sửa chữa' :
                     task.type === 'inspection' ? 'Kiểm tra' : 'Khẩn cấp'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ngày hẹn</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(task.scheduledDate).toLocaleDateString('vi-VN')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Thời gian dự kiến</p>
                  <p className="font-semibold text-gray-900">{task.estimatedDuration} giờ</p>
                </div>
                {task.actualDuration && (
                  <div>
                    <p className="text-sm text-gray-600">Thời gian thực tế</p>
                    <p className="font-semibold text-gray-900">{task.actualDuration} giờ</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Kỹ thuật viên</p>
                  <p className="font-semibold text-gray-900">{task.technicianName}</p>
                </div>
              </div>
            </Card>

            {/* Photos */}
            {task.photos.length > 0 && (
              <Card title={`Hình ảnh (${task.photos.length})`}>
                <div className="grid grid-cols-2 gap-2">
                  {task.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition"
                    />
                  ))}
                </div>
                <Button variant="outline" size="small" className="mt-3 w-full">
                  + Thêm ảnh
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
