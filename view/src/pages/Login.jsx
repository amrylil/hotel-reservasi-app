import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Hotel } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');

    // Simple validation
    if (!email || !password) {
      setError('Email and Password are required.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Crucial for cookie-based auth
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const user = data.data.user;
      if (user && user.role === 'admin') {
        // Redirect to the admin dashboard
        navigate('/admin', { replace: true });
      } else {
        // Redirect to the user home page
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Floating orbs for visual interest */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-600/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"></div>

      <div className="relative bg-black/30 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mb-4 shadow-lg">
            <Hotel className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-300">Sign in to your luxury experience</p>
        </div>

        <div className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-amber-400" />
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 hover:bg-white/15"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-amber-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 hover:bg-white/15"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-amber-400 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="text-sm text-red-400 mt-4 text-center border border-red-500/20 bg-red-500/10 rounded-lg p-2">
              {error}
            </div>
          )}
        </div>

        {/* Additional Options */}
        <div className="mt-8 text-center">
          <a
            href="#"
            className="text-sm text-gray-300 hover:text-amber-400 transition-colors"
          >
            Forgot your password?
          </a>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <a
              href="/register"
              className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>

        {/* Guest Access */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-3">or continue as</p>
            <button className="inline-flex items-center space-x-2 text-sm text-gray-300 hover:text-amber-400 transition-colors">
              <User className="w-4 h-4" />
              <span>Guest User</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
