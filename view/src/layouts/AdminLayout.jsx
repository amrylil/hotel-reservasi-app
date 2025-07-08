import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Users,
  Bed,
  CreditCard,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
} from 'lucide-react';

// Helper function to delete a cookie
const deleteCookie = (name) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState('checking'); // 'checking', 'authenticated', 'unauthenticated'
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
          credentials: 'include',
        });

        if (res.ok) {
          const result = await res.json();
          setUser(result.data); // Assuming the user data is in result.data
          setAuthStatus('authenticated');
        } else {
          setUser(null);
          setAuthStatus('unauthenticated');
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setUser(null);
        setAuthStatus('unauthenticated');
        navigate('/login', { replace: true });
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    deleteCookie('accessToken');
    setUser(null);
    setAuthStatus('unauthenticated');
    navigate('/login', { replace: true });
  };

  const menuItems = [
    { to: 'reservasi', icon: Calendar, label: 'Reservasi' },
    { to: 'rooms', icon: Bed, label: 'Kamar' },
    { to: 'users', icon: Users, label: 'Users' },
    // { to: 'pembayaran', icon: CreditCard, label: 'Pembayaran' },
  ];

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest('.user-menu')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  // Show a loading spinner while checking authentication
  if (authStatus === 'checking') {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg
          transform duration-300 ease-in-out lg:translate-x-0 lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* brand */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Bed className="w-5 h-5 text-white" />
            </div>
            <h1 className="ml-2 text-xl font-semibold text-gray-900">
              HotelAdmin
            </h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* menu */}
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {menuItems.map(({ to, icon: Icon, label, exact }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={exact}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                      ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Dynamic user info at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          {user ? (
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Not logged in</p>
          )}
        </div>
      </aside>

      {/* konten utama */}
      <div className="flex-1 lg:ml-64">
        {/* topbar */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="ml-2 text-lg font-semibold text-gray-900 lg:ml-0">
                Dashboard
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              {/* user dropdown */}
              <div className="relative user-menu">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg"
                >
                  <User className="w-5 h-5" />
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-red-50 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* outlet */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
