import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Clock,
  Star,
  Award,
  Users,
  User,
  Calendar,
  LogOut,
  ChevronDown,
} from 'lucide-react';

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // ✅ Check login status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
          credentials: 'include',
        });
        if (res.ok) {
          const userData = await res.json();
          setUser(userData.data);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoggedIn(false);
      setUser(null);
      setIsDropdownOpen(false);
      navigate('/login');
    }
  };

  // ✅ Get initials from user name for avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    } else {
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }
  };

  // ✅ Get display name (max 2 words)
  const getDisplayName = (name) => {
    if (!name) return 'User';
    const words = name.trim().split(' ');
    if (words.length <= 2) {
      return name;
    } else {
      return words.slice(0, 2).join(' ');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-jost">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-600/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/10  ">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4">
          <div className="flex justify-between items-center py-4  ">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <div>
                <span className="text-white text-2xl font-bold block">
                  Luxury Hotel
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className="text-white hover:text-amber-400 transition-colors duration-200 font-medium"
              >
                Home
              </Link>
              <Link
                to="/rooms"
                className="text-white hover:text-amber-400 transition-colors duration-200 font-medium"
              >
                Rooms
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-amber-400 transition-colors duration-200 font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-amber-400 transition-colors duration-200 font-medium"
              >
                Contact
              </Link>
            </nav>

            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                {/* Avatar Button */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-white hover:text-amber-400 px-2 py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-white/10"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">
                      {getInitials(user?.name || user?.username)}
                    </span>
                  </div>
                  <span className="hidden sm:block">
                    {getDisplayName(user?.name || user?.username)}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-lg rounded-lg shadow-xl border border-white/20 overflow-hidden">
                    <div className="py-2">
                      {/* Profile */}
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/10 hover:text-amber-400 transition-colors duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span className="font-medium">Profile</span>
                      </Link>

                      {/* Reservasi */}
                      <Link
                        to="/my-reservations"
                        className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/10 hover:text-amber-400 transition-colors duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">Reservasi</span>
                      </Link>

                      {/* Divider */}
                      <hr className="my-2 border-white/20" />

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors duration-200 w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 ">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/40 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Hotel Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold">Luxury Hotel</h3>
                  <p className="text-amber-400 text-sm">
                    Experience Excellence
                  </p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Nikmati pengalaman menginap yang tak terlupakan dengan layanan
                premium dan fasilitas mewah di hotel bintang 5 kami.
              </p>
              <div className="flex items-center space-x-2 text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <span className="text-white text-sm ml-2">5.0 Rating</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-white text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/rooms"
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm"
                  >
                    Rooms & Suites
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/reservations"
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm"
                  >
                    My Reservations
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-white text-lg font-semibold">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">
                    Jl. Perintis Kemerdekaan
                    <br />
                    Tamalanrea Indah, Makassar 10220
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">+62 21 1234 5678</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">info@luxuryhotel.com</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">24/7 Customer Service</p>
                </div>
              </div>
            </div>

            {/* Follow Us */}
            <div className="space-y-4">
              <h4 className="text-white text-lg font-semibold">Follow Us</h4>
              <p className="text-gray-300 text-sm">
                Stay connected for exclusive offers and updates
              </p>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Users className="w-4 h-4 text-amber-400" />
                <span>10,000+ Happy Guests</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Best Hotel Award 2024</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-300 text-sm">
                © 2024 Luxury Hotel. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <a
                  href="#"
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-200"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-200"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-200"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
