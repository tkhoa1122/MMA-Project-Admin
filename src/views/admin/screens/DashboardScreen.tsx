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
import { dashboardApi } from '@/services';
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
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(93, 123, 111, 0.08)',
                border: '1px solid #f3f4f6',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(93, 123, 111, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(93, 123, 111, 0.08)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '14px', 
                    fontWeight: '500',
                    marginBottom: '8px'
                  }}>
                    {card.title}
                  </p>
                  <h3 style={{ 
                    fontSize: '32px', 
                    fontWeight: '700', 
                    color: '#111827',
                    marginBottom: '12px',
                    lineHeight: '1'
                  }}>
                    {card.value}
                  </h3>
                  {card.growth !== undefined && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {card.growth > 0 ? (
                        <TrendingUp style={{ color: '#10b981' }} size={16} />
                      ) : (
                        <TrendingDown style={{ color: '#ef4444' }} size={16} />
                      )}
                      <span style={{ 
                        fontSize: '13px', 
                        fontWeight: '600',
                        color: card.growth > 0 ? '#10b981' : '#ef4444'
                      }}>
                        {Math.abs(card.growth)}%
                      </span>
                      <span style={{ fontSize: '13px', color: '#9ca3af' }}>
                        so với tháng trước
                      </span>
                    </div>
                  )}
                </div>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: card.lightBg.includes('yellow') ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' :
                              card.lightBg.includes('green') ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' :
                              'linear-gradient(135deg, #B0D4B8 0%, #A4C3A2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon 
                    style={{ 
                      color: card.textColor.includes('yellow') ? '#d97706' : 
                              card.textColor.includes('green') ? '#059669' : '#5D7B6F'
                    }} 
                    size={28} 
                  />
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
      <div 
        style={{
          background: 'linear-gradient(90deg, #5D7B6F 0%, #4a6159 100%)'
        }}
        className="rounded-xl shadow-lg p-8 text-white"
      >
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
