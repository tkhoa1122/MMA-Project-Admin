import React, { useEffect, useState } from 'react';
import { Card, StatisticsCards, Loading, Button } from '@/components/common';
import { staffApi } from '../services/api/staffApi';
import type { DashboardStats, StatCard } from '../types/staff';

// Quick Action Card Component
const QuickActionCard: React.FC<{ icon: string; title: string; subtitle: string }> = ({ icon, title, subtitle }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '20px',
        border: '2px solid #e2e8f0',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? '0 12px 24px rgba(102, 126, 234, 0.15)' 
          : '0 2px 8px rgba(0, 0, 0, 0.04)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{ fontSize: '36px' }}>{icon}</div>
        <div>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '4px'
          }}>
            {title}
          </h3>
          <p style={{
            fontSize: '13px',
            color: '#64748b'
          }}>
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export const StaffDashboardScreen: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await staffApi.dashboard.getStats();
      setStats(response.data);
      setError(null);
    } catch (err) {
      setError('Không thể tải dữ liệu dashboard');
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '24px' }}>
        <div style={{
          backgroundColor: '#fee2e2',
          border: '2px solid #ef4444',
          color: '#991b1b',
          padding: '16px 20px',
          borderRadius: '12px'
        }}>
          <p>{error}</p>
          <Button onClick={fetchDashboardStats} style={{ marginTop: '8px' }}>
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  const statCards: StatCard[] = [
    {
      title: 'Tổng số khách hàng',
      value: stats?.totalCustomers || 0,
      icon: '👥',
      color: 'green',
      subtitle: `${stats?.activeCustomers || 0} đang hoạt động`,
    },
    {
      title: 'Tổng số nhân viên',
      value: stats?.totalStaff || 0,
      icon: '👨‍💼',
      color: 'blue',
      subtitle: 'Nhân viên',
    },
    {
      title: 'Tổng số kỹ thuật viên',
      value: stats?.totalTechnicians || 0,
      icon: '🔧',
      color: 'red',
      subtitle: 'Kỹ thuật viên',
    },
    {
      title: 'Tổng số xe',
      value: stats?.totalVehicles || 0,
      icon: '🚗',
      color: 'purple',
      subtitle: 'Phương tiện',
    },
    {
      title: 'Lịch hẹn tháng này',
      value: stats?.monthlyAppointments || 0,
      icon: '📅',
      color: 'orange',
      trend: stats?.monthlyGrowth,
    },
    {
      title: 'Doanh thu tháng này',
      value: `${(stats?.monthlyRevenue || 0).toLocaleString('vi-VN')} đ`,
      icon: '💰',
      color: 'green',
      trend: stats?.monthlyGrowth,
    },
    {
      title: 'Lịch hẹn hoàn thành',
      value: stats?.completedAppointments || 0,
      icon: '✅',
      color: 'green',
      subtitle: 'Đã hoàn thành',
    },
    {
      title: 'Lịch hẹn chờ xác nhận',
      value: stats?.pendingAppointments || 0,
      icon: '⏳',
      color: 'yellow',
      subtitle: 'Đang chờ',
    },
  ];

  return (
    <div style={{
      padding: '32px',
      backgroundColor: '#f8fafc',
      minHeight: '100%'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          color: '#1e293b',
          marginBottom: '8px'
        }}>
          Xin chào, longstaff@gmail.com!
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#64748b'
        }}>
          Chào mừng trở lại với bảng điều khiển của bạn
        </p>
      </div>

      {/* Statistics Cards */}
      <StatisticsCards stats={statCards} />

      {/* Quick Actions */}
      <div style={{ marginTop: '32px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#1e293b',
          marginBottom: '16px'
        }}>
          Hành động nhanh
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px'
        }}>
          {[
            { icon: '📋', title: 'Ca làm của tôi', subtitle: 'Xem lịch làm việc' },
            { icon: '🔧', title: 'Công việc bảo dưỡng', subtitle: 'Nhiệm vụ của tôi' },
            { icon: '📅', title: 'Lịch hẹn', subtitle: 'Xem lịch hẹn' },
            { icon: '👤', title: 'Hồ sơ của tôi', subtitle: 'Cài đặt tài khoản' }
          ].map((action, index) => (
            <QuickActionCard key={index} {...action} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        marginTop: '32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '20px'
      }}>
        {/* Ca làm sắp tới */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '24px',
          border: '2px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '16px'
          }}>
            Ca làm sắp tới
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              backgroundColor: '#dbeafe',
              borderRadius: '12px',
              border: '2px solid #93c5fd'
            }}>
              <div>
                <p style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '4px'
                }}>
                  Ca sáng
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#64748b'
                }}>
                  08:00 - 12:00
                </p>
              </div>
              <span style={{
                fontSize: '11px',
                padding: '6px 12px',
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                borderRadius: '9999px',
                fontWeight: '600'
              }}>
                Hôm nay
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              backgroundColor: '#f1f5f9',
              borderRadius: '12px',
              border: '2px solid #e2e8f0'
            }}>
              <div>
                <p style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '4px'
                }}>
                  Ca chiều
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#64748b'
                }}>
                  13:00 - 17:00
                </p>
              </div>
              <span style={{
                fontSize: '11px',
                padding: '6px 12px',
                backgroundColor: '#64748b',
                color: '#ffffff',
                borderRadius: '9999px',
                fontWeight: '600'
              }}>
                Mai
              </span>
            </div>
          </div>
        </div>

        {/* Công việc cần làm */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '24px',
          border: '2px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '16px'
          }}>
            Công việc cần làm
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              backgroundColor: '#ffedd5',
              borderRadius: '12px',
              border: '2px solid #fdba74'
            }}>
              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '4px'
                }}>
                  Bảo dưỡng xe ABC-123
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#64748b'
                }}>
                  Thay dầu, kiểm tra phanh
                </p>
              </div>
              <span style={{
                fontSize: '11px',
                padding: '6px 12px',
                backgroundColor: '#f97316',
                color: '#ffffff',
                borderRadius: '9999px',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                marginLeft: '12px'
              }}>
                Urgent
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              backgroundColor: '#fef9c3',
              borderRadius: '12px',
              border: '2px solid #fde047'
            }}>
              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '4px'
                }}>
                  Sửa chữa xe XYZ-789
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#64748b'
                }}>
                  Kiểm tra động cơ
                </p>
              </div>
              <span style={{
                fontSize: '11px',
                padding: '6px 12px',
                backgroundColor: '#eab308',
                color: '#ffffff',
                borderRadius: '9999px',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                marginLeft: '12px'
              }}>
                Medium
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
