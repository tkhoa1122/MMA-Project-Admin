import React, { useEffect, useState } from 'react';
import { Card, Button, Input, Loading } from '@/components/common';
import { staffApi } from '@/services';
import type { StaffProfile, UpdateProfileDto } from '@/types';

export const ProfileScreen: React.FC = () => {
  const [profile, setProfile] = useState<StaffProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateProfileDto>({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await staffApi.profile.getProfile();
      setProfile(response.data);
      setFormData({
        name: response.data.name,
        phone: response.data.phone,
        dateOfBirth: response.data.dateOfBirth,
        address: response.data.address,
        emergencyContact: response.data.emergencyContact,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await staffApi.profile.updateProfile(formData);
      await fetchProfile();
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await staffApi.profile.uploadAvatar(file);
      await fetchProfile();
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  const getRoleName = (role: string) => {
    const roles: Record<string, string> = {
      admin: 'Quản trị viên',
      staff: 'Nhân viên',
      technician: 'Kỹ thuật viên',
    };
    return roles[role] || role;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6">
        <Card>
          <div className="text-center py-8">
            <p className="text-red-500">Không thể tải thông tin hồ sơ</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hồ sơ của tôi</h1>
          <p className="text-gray-600">Quản lý thông tin cá nhân</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Avatar & Basic Info */}
          <div className="lg:col-span-1">
            <Card>
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {profile.avatar ? (
                      <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl text-gray-400">👤</span>
                    )}
                  </div>
                  <label className="absolute bottom-4 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                    📷
                  </label>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{profile.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{profile.email}</p>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {getRoleName(profile.role)}
                </span>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    Ngày tham gia:{' '}
                    {new Date(profile.joinedDate).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Thông tin cá nhân</h3>
                {!editing ? (
                  <Button variant="outline" size="small" onClick={() => setEditing(true)}>
                    Chỉnh sửa
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button variant="outline" size="small" onClick={() => setEditing(false)}>
                      Hủy
                    </Button>
                    <Button variant="primary" size="small" onClick={handleSaveProfile}>
                      Lưu
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên
                  </label>
                  {editing ? (
                    <Input
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-900">{profile.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-gray-900">{profile.email}</p>
                  <p className="text-xs text-gray-500 mt-1">Email không thể thay đổi</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  {editing ? (
                    <Input
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-900">{profile.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày sinh
                  </label>
                  {editing ? (
                    <Input
                      type="date"
                      value={formData.dateOfBirth || ''}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-900">
                      {profile.dateOfBirth
                        ? new Date(profile.dateOfBirth).toLocaleDateString('vi-VN')
                        : 'Chưa cập nhật'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ
                  </label>
                  {editing ? (
                    <Input
                      value={formData.address || ''}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-900">{profile.address || 'Chưa cập nhật'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Liên hệ khẩn cấp
                  </label>
                  {editing ? (
                    <Input
                      value={formData.emergencyContact || ''}
                      onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-900">{profile.emergencyContact || 'Chưa cập nhật'}</p>
                  )}
                </div>
              </div>
            </Card>

            {/* Change Password */}
            <Card className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Đổi mật khẩu</h3>
              <Button variant="outline">
                Đổi mật khẩu
              </Button>
            </Card>

            {/* Logout */}
            <Card className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Đăng xuất</h3>
              <p className="text-sm text-gray-600 mb-4">
                Đăng xuất khỏi tài khoản hiện tại
              </p>
              <Button variant="danger">
                Đăng xuất
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
