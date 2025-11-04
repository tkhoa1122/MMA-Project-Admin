import React, { useState } from 'react';

interface SidebarProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentScreen, onScreenChange }) => {
  const [expandedMenu, setExpandedMenu] = useState<string | null>('quan-ly');

  const menuItems = [
    {
      id: 'tong-quan',
      label: 'Tổng quan',
      icon: '📊',
      screen: 'dashboard'
    },
    {
      id: 'quan-ly',
      label: 'Quản lý',
      icon: '👤',
      hasSubmenu: true,
      submenu: [
        { id: 'khach-hang', label: 'Quản lý khách hàng', screen: 'customers' },
        { id: 'nhan-vien', label: 'Quản lý nhân viên & kỹ thuật viên', screen: 'staff' }
      ]
    },
    {
      id: 'mau-xe',
      label: 'Mẫu xe',
      icon: '🚗',
      screen: 'vehicles'
    },
    {
      id: 'ho-so-xe',
      label: 'Hồ sơ xe người dùng',
      icon: '📋',
      screen: 'user-vehicles'
    },
    {
      id: 'phu-tung',
      label: 'Phụ tùng',
      icon: '🔧',
      hasSubmenu: true,
      submenu: [
        { id: 'danh-muc', label: 'Danh mục phụ tùng', screen: 'parts' },
        { id: 'phu-tung-xe', label: 'Phụ tùng xe', screen: 'vehicle-parts' }
      ]
    },
    {
      id: 'bao-hanh',
      label: 'Bảo hành',
      icon: '🛡️',
      screen: 'warranty'
    },
    {
      id: 'lich-hen',
      label: 'Quản lý lịch hẹn',
      icon: '📅',
      screen: 'appointments'
    },
    {
      id: 'ca-lam',
      label: 'Ca làm',
      icon: '⏰',
      screen: 'shifts'
    },
    {
      id: 'chat',
      label: 'Chat với khách hàng',
      icon: '💬',
      screen: 'chat'
    }
  ];

  const toggleMenu = (menuId: string) => {
    setExpandedMenu(expandedMenu === menuId ? null : menuId);
  };

  return (
    <aside style={{
      width: '280px',
      background: 'linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)',
      borderRight: '1px solid #e2e8f0',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '2px 0 8px rgba(0, 0, 0, 0.04)'
    }}>
      {/* Logo */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '22px',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
          }}>
            E
          </div>
          <div>
            <div style={{
              fontWeight: '700',
              fontSize: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>EVCare</div>
            <div style={{
              fontSize: '11px',
              color: '#94a3b8',
              fontWeight: '500',
              marginTop: '2px'
            }}>Admin Dashboard</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav style={{
        flex: 1,
        overflowY: 'auto',
        paddingTop: '20px',
        paddingBottom: '20px',
        paddingLeft: '12px',
        paddingRight: '12px'
      }}>
        {menuItems.map((item) => (
          <div key={item.id} style={{ marginBottom: '4px' }}>
            {item.hasSubmenu ? (
              <>
                <button
                  onClick={() => toggleMenu(item.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    color: '#475569',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontSize: '14px',
                    fontWeight: '600',
                    borderRadius: '10px',
                    letterSpacing: '0.01em'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f1f5f9';
                    e.currentTarget.style.transform = 'translateX(2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '20px', filter: 'grayscale(0.3)' }}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <span style={{
                    transform: expandedMenu === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    fontSize: '10px',
                    color: '#94a3b8'
                  }}>
                    ▼
                  </span>
                </button>
                {expandedMenu === item.id && item.submenu && (
                  <div style={{ 
                    backgroundColor: '#f8fafc',
                    borderRadius: '10px',
                    marginTop: '4px',
                    marginBottom: '4px',
                    padding: '4px 0',
                    animation: 'slideIn 0.3s ease-out'
                  }}>
                    {item.submenu.map((subitem) => (
                      <button
                        key={subitem.id}
                        onClick={() => onScreenChange(subitem.screen)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 16px 10px 52px',
                          fontSize: '13px',
                          backgroundColor: currentScreen === subitem.screen ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                          color: currentScreen === subitem.screen ? '#ffffff' : '#64748b',
                          fontWeight: currentScreen === subitem.screen ? '600' : '500',
                          borderLeft: currentScreen === subitem.screen ? '3px solid #667eea' : 'none',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          borderRadius: '8px',
                          margin: '2px 8px',
                          boxShadow: currentScreen === subitem.screen ? '0 2px 8px rgba(102, 126, 234, 0.3)' : 'none',
                          background: currentScreen === subitem.screen ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          if (currentScreen !== subitem.screen) {
                            e.currentTarget.style.backgroundColor = '#e2e8f0';
                            e.currentTarget.style.paddingLeft = '56px';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentScreen !== subitem.screen) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.paddingLeft = '52px';
                          }
                        }}
                      >
                        {subitem.label}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => item.screen && onScreenChange(item.screen)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  backgroundColor: currentScreen === item.screen ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  color: currentScreen === item.screen ? '#ffffff' : '#475569',
                  borderLeft: currentScreen === item.screen ? '3px solid #667eea' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  borderRadius: '10px',
                  letterSpacing: '0.01em',
                  boxShadow: currentScreen === item.screen ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none',
                  background: currentScreen === item.screen ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (currentScreen !== item.screen) {
                    e.currentTarget.style.backgroundColor = '#f1f5f9';
                    e.currentTarget.style.transform = 'translateX(2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentScreen !== item.screen) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
              >
                <span style={{ fontSize: '20px', filter: currentScreen === item.screen ? 'none' : 'grayscale(0.3)' }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};
