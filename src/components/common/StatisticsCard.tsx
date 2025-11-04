import React from 'react';
import { Card } from './Card';
import type { StatCard as StatCardType } from '@/types/staff';

interface StatisticsCardProps {
  stats: StatCardType[];
}

export const StatisticsCard: React.FC<{ stat: StatCardType }> = ({ stat }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const colors = {
    green: { bg: '#ffffff', border: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', shadow: 'rgba(16, 185, 129, 0.3)' },
    blue: { bg: '#ffffff', border: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', shadow: 'rgba(59, 130, 246, 0.3)' },
    red: { bg: '#ffffff', border: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', shadow: 'rgba(239, 68, 68, 0.3)' },
    purple: { bg: '#ffffff', border: '#667eea', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', shadow: 'rgba(102, 126, 234, 0.3)' },
    orange: { bg: '#ffffff', border: '#f97316', gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', shadow: 'rgba(249, 115, 22, 0.3)' },
    yellow: { bg: '#ffffff', border: '#eab308', gradient: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)', shadow: 'rgba(234, 179, 8, 0.3)' },
  };

  const color = colors[stat.color];
  const trendColor = stat.trend && stat.trend >= 0 ? '#10b981' : '#ef4444';

  return (
    <div 
      style={{
        backgroundColor: color.bg,
        borderRadius: '16px',
        padding: '24px',
        borderLeft: `4px solid ${color.border}`,
        border: '2px solid #e2e8f0',
        borderLeftWidth: '4px',
        borderLeftColor: color.border,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? `0 12px 24px ${color.shadow}` 
          : '0 2px 8px rgba(0, 0, 0, 0.04)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <p style={{ 
            fontSize: '13px', 
            color: '#64748b',
            marginBottom: '8px',
            fontWeight: '600',
            letterSpacing: '0.02em'
          }}>
            {stat.title}
          </p>
          <p style={{ 
            fontSize: '32px', 
            fontWeight: '700', 
            color: '#1e293b',
            marginBottom: '8px',
            lineHeight: '1'
          }}>
            {stat.value}
          </p>
          {stat.subtitle && (
            <p style={{ 
              fontSize: '12px', 
              color: '#94a3b8',
              marginBottom: '8px'
            }}>
              {stat.subtitle}
            </p>
          )}
          {stat.trend !== undefined && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '8px',
              fontSize: '13px',
              fontWeight: '600',
              color: trendColor
            }}>
              <span style={{ marginRight: '4px', fontSize: '16px' }}>
                {stat.trend >= 0 ? '↑' : '↓'}
              </span>
              <span>{Math.abs(stat.trend)}%</span>
              <span style={{ 
                color: '#94a3b8', 
                marginLeft: '6px',
                fontWeight: '400'
              }}>
                so với tháng trước
              </span>
            </div>
          )}
        </div>
        <div style={{
          width: '56px',
          height: '56px',
          background: color.gradient,
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'rotate(10deg) scale(1.1)' : 'rotate(0) scale(1)',
          boxShadow: `0 4px 12px ${color.shadow}`
        }}>
          {stat.icon}
        </div>
      </div>
    </div>
  );
};

export const StatisticsCards: React.FC<StatisticsCardProps> = ({ stats }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px',
      marginBottom: '24px'
    }}>
      {stats.map((stat, index) => (
        <StatisticsCard key={index} stat={stat} />
      ))}
    </div>
  );
};
