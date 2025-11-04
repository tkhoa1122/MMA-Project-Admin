import React, { useEffect, useState } from 'react';
import {
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import type { DashboardStats, RevenueChart } from '@/types';
import { dashboardApi } from '@/services/api/mockApi';
import { Loading } from '@/components/common';

export const DashboardScreen: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [revenueData, setRevenueData] = useState<RevenueChart[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, chartData] = await Promise.all([
          dashboardApi.getStats(),
          dashboardApi.getRevenueChart(),
        ]);
        setStats(statsData);
        setRevenueData(chartData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading text="Đang tải dữ liệu..." />;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const statCards = [
    {
      title: 'Tổng lịch hẹn',
      value: stats?.totalAppointments || 0,
      icon: Calendar,
      color: 'blue',
      bgColor: 'bg-[#5D7B6F]',
      lightBg: 'bg-[#B0D4B8]/30',
      textColor: 'text-[#5D7B6F]',
      growth: stats?.appointmentGrowth,
    },
    {
      title: 'Chờ xác nhận',
      value: stats?.pendingAppointments || 0,
      icon: Clock,
      color: 'yellow',
      bgColor: 'bg-[#A4C3A2]',
      lightBg: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      title: 'Đã hoàn thành',
      value: stats?.completedAppointments || 0,
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-[#5D7B6F]',
      lightBg: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Doanh thu',
      value: formatCurrency(stats?.totalRevenue || 0),
      icon: DollarSign,
      color: 'purple',
      bgColor: 'bg-[#A4C3A2]',
      lightBg: 'bg-[#D7F9FA]/30',
      textColor: 'text-[#5D7B6F]',
      growth: stats?.revenueGrowth,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Tổng quan hệ thống EVCare</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 text-sm font-medium mb-2">{card.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {card.value}
                  </h3>
                  {card.growth !== undefined && (
                    <div className="flex items-center space-x-1">
                      {card.growth > 0 ? (
                        <TrendingUp className="text-green-500" size={16} />
                      ) : (
                        <TrendingDown className="text-red-500" size={16} />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          card.growth > 0 ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {Math.abs(card.growth)}%
                      </span>
                      <span className="text-gray-500 text-sm">so với tháng trước</span>
                    </div>
                  )}
                </div>
                <div className={`${card.lightBg} p-3 rounded-lg`}>
                  <Icon className={card.textColor} size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Doanh thu theo tháng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [formatCurrency(value), 'Doanh thu']}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#5D7B6F"
                strokeWidth={3}
                dot={{ fill: '#5D7B6F', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Appointments Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Lịch hẹn theo tháng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [value, 'Lịch hẹn']}
              />
              <Bar dataKey="appointments" fill="#A4C3A2" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-linear-to-r from-[#5D7B6F] to-[#4a6159] rounded-xl shadow-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Quản lý nhanh</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm px-6 py-4 rounded-lg font-medium transition-all text-left">
            <div className="text-sm opacity-90 mb-1">Xem tất cả</div>
            <div className="text-lg font-bold">Lịch hẹn</div>
          </button>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm px-6 py-4 rounded-lg font-medium transition-all text-left">
            <div className="text-sm opacity-90 mb-1">Quản lý</div>
            <div className="text-lg font-bold">Hóa đơn</div>
          </button>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm px-6 py-4 rounded-lg font-medium transition-all text-left">
            <div className="text-sm opacity-90 mb-1">Xem báo cáo</div>
            <div className="text-lg font-bold">Thống kê</div>
          </button>
        </div>
      </div>
    </div>
  );
};
