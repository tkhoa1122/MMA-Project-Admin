import React, { useState } from 'react';
import { Button, Input } from '@/components/common';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (email === 'longstaff@gmail.com' && password === 'password') {
        localStorage.setItem('auth_token', 'mock_token_123');
        localStorage.setItem('user_email', email);
        onLoginSuccess();
      } else {
        setError('Email hoặc mật khẩu không đúng');
      }
    } catch (err) {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decorations */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '-100px',
        width: '300px',
        height: '300px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        filter: 'blur(60px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        right: '-150px',
        width: '400px',
        height: '400px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        filter: 'blur(80px)'
      }} />

      {/* Left Side - Branding */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px',
        color: '#ffffff',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '72px',
            marginBottom: '24px',
            animation: 'float 3s ease-in-out infinite'
          }}>
            🚗
          </div>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            marginBottom: '16px',
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
          }}>
            EVCare
          </h1>
          <p style={{
            fontSize: '20px',
            opacity: 0.95,
            lineHeight: '1.6',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            Hệ thống quản lý chăm sóc xe điện chuyên nghiệp
          </p>
          <div style={{
            marginTop: '40px',
            display: 'flex',
            gap: '24px',
            justifyContent: 'center'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700' }}>500+</div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Khách hàng</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700' }}>50+</div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Nhân viên</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700' }}>99%</div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Hài lòng</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '48px',
          width: '100%',
          maxWidth: '480px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '8px'
            }}>
              Đăng nhập
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#64748b'
            }}>
              Chào mừng trở lại! Vui lòng đăng nhập để tiếp tục.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              backgroundColor: '#fee2e2',
              border: '2px solid #ef4444',
              borderRadius: '12px',
              padding: '12px 16px',
              marginBottom: '24px',
              color: '#991b1b',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '18px' }}>⚠️</span>
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '8px'
              }}>
                Email
              </label>
              <Input
                type="email"
                placeholder="longstaff@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '8px'
              }}>
                Mật khẩu
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '32px'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#64748b'
              }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: '#667eea'
                  }}
                />
                Ghi nhớ đăng nhập
              </label>
              <a
                href="#"
                style={{
                  fontSize: '14px',
                  color: '#667eea',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  alert('Vui lòng liên hệ quản trị viên để đặt lại mật khẩu');
                }}
              >
                Quên mật khẩu?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px 24px',
                background: isLoading 
                  ? '#94a3b8' 
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isLoading 
                  ? 'none' 
                  : '0 4px 12px rgba(102, 126, 234, 0.4)',
                transform: isLoading ? 'none' : 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                }
              }}
            >
              {isLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span style={{ 
                    width: '16px', 
                    height: '16px', 
                    border: '2px solid #ffffff',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.6s linear infinite'
                  }} />
                  Đang đăng nhập...
                </span>
              ) : (
                'Đăng nhập'
              )}
            </button>
          </form>

          {/* Demo Info */}
          <div style={{
            marginTop: '32px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              fontSize: '12px',
              color: '#64748b',
              marginBottom: '8px',
              fontWeight: '600'
            }}>
              🔐 Tài khoản demo:
            </div>
            <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
              <strong>Email:</strong> longstaff@gmail.com<br />
              <strong>Password:</strong> password
            </div>
          </div>
        </div>
      </div>

      {/* Add spinning animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};
