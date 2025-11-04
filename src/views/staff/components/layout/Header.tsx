import React from 'react';

interface HeaderProps {
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  userName = 'longstaff',
  userEmail = 'longstaff@gmail.com',
  onLogout
}) => {
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setShowUserMenu(false);
    if (showUserMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showUserMenu]);
  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
    }}>
      <div style={{ flex: 1 }}>
        {/* Search Bar */}
        <div style={{
          maxWidth: '400px',
          position: 'relative'
        }}>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            style={{
              width: '100%',
              padding: '10px 16px 10px 40px',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '14px',
              outline: 'none',
              transition: 'all 0.2s ease',
              backgroundColor: '#f8fafc'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#667eea';
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.backgroundColor = '#f8fafc';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          <span style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '18px',
            color: '#94a3b8'
          }}>
            🔍
          </span>
        </div>
      </div>

      {/* User Info */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
        {/* Notifications */}
        <button style={{
          padding: '10px',
          backgroundColor: '#f8fafc',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          position: 'relative',
          transition: 'all 0.2s ease',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#667eea';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#f8fafc';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        >
          <span style={{ fontSize: '20px' }}>🔔</span>
          <span style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            width: '10px',
            height: '10px',
            backgroundColor: '#ef4444',
            borderRadius: '9999px',
            border: '2px solid #ffffff',
            animation: 'pulse 2s infinite'
          }}></span>
        </button>

        {/* User Profile */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          paddingLeft: '20px',
          borderLeft: '2px solid #e2e8f0',
          position: 'relative'
        }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#1e293b',
              letterSpacing: '0.01em'
            }}>{userName}</div>
            <div style={{
              fontSize: '12px',
              color: '#94a3b8',
              marginTop: '2px'
            }}>{userEmail}</div>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowUserMenu(!showUserMenu);
            }}
            style={{
              width: '44px',
              height: '44px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '700',
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
            }}
          >
            {userName.charAt(0).toUpperCase()}
          </button>

          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div style={{
              position: 'absolute',
              top: '60px',
              right: '0',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
              border: '1px solid #e2e8f0',
              minWidth: '200px',
              zIndex: 1000,
              overflow: 'hidden'
            }}>
              <div style={{
                padding: '12px 16px',
                borderBottom: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '2px'
                }}>
                  {userName}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#64748b'
                }}>
                  {userEmail}
                </div>
              </div>
              
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  // Navigate to profile
                }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#475569',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                👤 Hồ sơ của tôi
              </button>

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  // Navigate to settings
                }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#475569',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                ⚙️ Cài đặt
              </button>

              <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '4px' }} />

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  if (onLogout) onLogout();
                }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#ef4444',
                  fontWeight: '600',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                🚪 Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
