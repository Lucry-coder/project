import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onClose: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simula una chiamata API
    setTimeout(() => {
      onLogin(email, password);
      setIsLoading(false);
    }, 1000);
  };

  const handleGuestLogin = () => {
    onLogin('guest@netflix.com', 'guest');
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Background con gradiente Netflix */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900/20 to-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-cover bg-center opacity-20"></div>
      </div>

      {/* Login Form */}
      <div className="relative z-10 bg-black/90 backdrop-blur-md p-8 rounded-lg shadow-2xl w-full max-w-md mx-4 border border-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-red-600 text-3xl font-bold mb-2">NETFLIX</h1>
          <h2 className="text-white text-xl font-semibold">Sign In</h2>
          <p className="text-gray-400 text-sm mt-2">Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-600/20 border border-red-600/50 rounded-md p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white font-semibold py-3 px-4 rounded-md transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-600"></div>
          <span className="px-4 text-gray-400 text-sm">or</span>
          <div className="flex-1 border-t border-gray-600"></div>
        </div>

        {/* Guest Login */}
        <button
          onClick={handleGuestLogin}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-md transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
        >
          <User className="h-5 w-5" />
          <span>Continue as Guest</span>
        </button>

        {/* Quick Login Options */}
        <div className="mt-6 space-y-2">
          <p className="text-gray-400 text-sm text-center">Quick login options:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              'john.doe@email.com',
              'maria.rossi@email.com',
              'admin@netflix.com'
            ].map((quickEmail) => (
              <button
                key={quickEmail}
                onClick={() => {
                  setEmail(quickEmail);
                  setPassword('password123');
                }}
                className="px-3 py-1 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600 hover:border-gray-500 transition-all duration-200"
              >
                {quickEmail}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-xs">
            New to Netflix?{' '}
            <button className="text-red-400 hover:text-red-300 underline transition-colors">
              Sign up now
            </button>
          </p>
          <p className="text-gray-500 text-xs mt-2">
            This is a demo application
          </p>
        </div>
      </div>
    </div>
  );
};