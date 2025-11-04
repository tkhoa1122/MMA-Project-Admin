import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface DemoAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'staff';
  avatar: string;
  description: string;
}

const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@evcare.com',
    password: 'admin123',
    role: 'admin',
    avatar: '👨‍💼',
    description: 'Quản trị viên hệ thống - Truy cập đầy đủ'
  },
  {
    id: '2',
    name: 'Long Staff',
    email: 'longstaff@gmail.com',
    password: 'password',
    role: 'staff',
    avatar: '👨‍🔧',
    description: 'Nhân viên kỹ thuật - Quản lý ca làm việc'
  }
];

export const LoginScreen: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState<DemoAccount | null>(null);
  const [showManualLogin, setShowManualLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = async (account: DemoAccount) => {
    setError('');
    setLoading(true);
    setSelectedAccount(account);

    try {
      await login(account.email, account.password, account.role);
      
      // Navigate based on role
      if (account.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/staff');
      }
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
      setSelectedAccount(null);
    }
  };

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Find matching account
      const account = DEMO_ACCOUNTS.find(
        acc => acc.email === email && acc.password === password
      );

      if (!account) {
        setError('Email hoặc mật khẩu không đúng');
        setLoading(false);
        return;
      }

      await login(email, password, account.role);
      
      // Navigate based on role
      if (account.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/staff');
      }
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#EAE7D6] via-[#D7F9FA]/20 to-[#B0D4B8]/30 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-[#5D7B6F] to-[#4a6159] rounded-2xl mb-4 shadow-xl">
            <span className="text-[#D7F9FA] font-bold text-3xl">EV</span>
          </div>
          <h1 className="text-4xl font-bold text-[#5D7B6F] mb-2">EVCare System</h1>
          <p className="text-[#5D7B6F]/70 text-lg">Hệ thống quản lý chăm sóc xe điện</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {!showManualLogin ? (
            // Demo Accounts Selection
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#5D7B6F] mb-2">Chọn tài khoản demo</h2>
                <p className="text-gray-600">Click vào tài khoản để đăng nhập nhanh</p>
              </div>

              {error && (
                <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                  <span>⚠️</span>
                  {error}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {DEMO_ACCOUNTS.map((account) => (
                  <button
                    key={account.id}
                    onClick={() => handleDemoLogin(account)}
                    disabled={loading}
                    className={`
                      relative group p-6 rounded-2xl border-2 transition-all duration-300
                      ${selectedAccount?.id === account.id
                        ? 'border-[#5D7B6F] bg-[#5D7B6F]/5 scale-[0.98]'
                        : 'border-[#A4C3A2] hover:border-[#5D7B6F] hover:bg-[#EAE7D6]/30 hover:scale-[1.02]'
                      }
                      ${loading && selectedAccount?.id !== account.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      shadow-md hover:shadow-xl
                    `}
                  >
                    {/* Role Badge */}
                    <div className={`
                      absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold
                      ${account.role === 'admin' 
                        ? 'bg-linear-to-r from-[#5D7B6F] to-[#4a6159] text-white' 
                        : 'bg-linear-to-r from-[#A4C3A2] to-[#B0D4B8] text-[#5D7B6F]'
                      }
                    `}>
                      {account.role === 'admin' ? 'ADMIN' : 'STAFF'}
                    </div>

                    <div className="flex items-start gap-4 text-left">
                      {/* Avatar */}
                      <div className={`
                        w-16 h-16 rounded-2xl flex items-center justify-center text-3xl
                        transition-transform group-hover:scale-110
                        ${account.role === 'admin' 
                          ? 'bg-linear-to-br from-[#5D7B6F] to-[#4a6159]' 
                          : 'bg-linear-to-br from-[#A4C3A2] to-[#B0D4B8]'
                        }
                      `}>
                        {account.avatar}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#5D7B6F] mb-1 flex items-center gap-2">
                          {account.name}
                          {selectedAccount?.id === account.id && loading && (
                            <span className="animate-spin">⚡</span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">{account.description}</p>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Mail size={14} className="text-[#5D7B6F]" />
                            <span className="font-medium">{account.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Lock size={14} className="text-[#5D7B6F]" />
                            <span className="font-mono">{account.password}</span>
                          </div>
                        </div>
                      </div>

                      <ChevronRight 
                        className={`
                          text-[#5D7B6F] transition-transform
                          ${selectedAccount?.id === account.id ? 'opacity-50' : 'group-hover:translate-x-1'}
                        `} 
                        size={24} 
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Manual Login Link */}
              <div className="text-center pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowManualLogin(true)}
                  className="text-[#5D7B6F] hover:text-[#4a6159] font-medium text-sm transition-colors inline-flex items-center gap-2"
                >
                  <User size={16} />
                  Hoặc đăng nhập thủ công
                </button>
              </div>
            </div>
          ) : (
            // Manual Login Form
            <div className="grid md:grid-cols-2">
              {/* Left Side - Info */}
              <div className="bg-linear-to-br from-[#5D7B6F] to-[#4a6159] p-12 text-white flex flex-col justify-center">
                <div className="mb-6">
                  <div className="text-5xl mb-4">🚗</div>
                  <h2 className="text-3xl font-bold mb-3">Chào mừng trở lại!</h2>
                  <p className="text-white/90 leading-relaxed">
                    Đăng nhập để tiếp tục quản lý hệ thống chăm sóc xe điện của bạn.
                  </p>
                </div>

                <div className="space-y-4 mt-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">✓</div>
                    <div>
                      <div className="font-semibold">Quản lý thông minh</div>
                      <div className="text-sm text-white/80">Dashboard trực quan</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">✓</div>
                    <div>
                      <div className="font-semibold">Bảo mật cao</div>
                      <div className="text-sm text-white/80">Dữ liệu được mã hóa</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">✓</div>
                    <div>
                      <div className="font-semibold">Hỗ trợ 24/7</div>
                      <div className="text-sm text-white/80">Luôn sẵn sàng hỗ trợ</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="p-12">
                <button
                  onClick={() => {
                    setShowManualLogin(false);
                    setError('');
                  }}
                  className="text-gray-600 hover:text-[#5D7B6F] mb-6 text-sm flex items-center gap-1"
                >
                  ← Quay lại chọn tài khoản demo
                </button>

                <h2 className="text-2xl font-bold text-[#5D7B6F] mb-6">Đăng nhập</h2>

                {error && (
                  <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                    <span>⚠️</span>
                    {error}
                  </div>
                )}

                <form onSubmit={handleManualLogin} className="space-y-5">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border-2 border-[#A4C3A2] rounded-xl focus:ring-2 focus:ring-[#5D7B6F] focus:border-[#5D7B6F] outline-none transition-all bg-[#EAE7D6]/30"
                        placeholder="admin@evcare.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-[#5D7B6F] mb-2">
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A4C3A2]" size={20} />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border-2 border-[#A4C3A2] rounded-xl focus:ring-2 focus:ring-[#5D7B6F] focus:border-[#5D7B6F] outline-none transition-all bg-[#EAE7D6]/30"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-linear-to-r from-[#5D7B6F] to-[#4a6159] text-white py-3 rounded-xl font-medium hover:from-[#4a6159] hover:to-[#3a4a43] focus:ring-4 focus:ring-[#A4C3A2] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">⚡</span>
                        Đang đăng nhập...
                      </span>
                    ) : (
                      'Đăng nhập'
                    )}
                  </button>
                </form>

                {/* Demo Info */}
                <div className="mt-6 p-4 bg-[#D7F9FA]/50 rounded-xl border border-[#B0D4B8]">
                  <p className="text-sm text-[#5D7B6F] font-medium mb-2">🔐 Tài khoản demo có sẵn:</p>
                  {DEMO_ACCOUNTS.map(acc => (
                    <p key={acc.id} className="text-xs text-[#5D7B6F]/80">
                      {acc.email} / {acc.password}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © 2025 EVCare. All rights reserved.
        </p>
      </div>
    </div>
  );
};
