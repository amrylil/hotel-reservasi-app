import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Clock, Star, Award, Users } from 'lucide-react';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-600/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"></div>
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <div>
                <span className="text-white text-2xl font-bold block">Luxury Hotel</span>
                <span className="text-amber-400 text-sm font-medium">Experience Excellence</span>
              </div>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-white hover:text-amber-400 transition-colors duration-200 font-medium">
                Home
              </Link>
              <Link to="/rooms" className="text-white hover:text-amber-400 transition-colors duration-200 font-medium">
                Rooms
              </Link>
              <Link to="/about" className="text-white hover:text-amber-400 transition-colors duration-200 font-medium">
                About
              </Link>
              <Link to="/contact" className="text-white hover:text-amber-400 transition-colors duration-200 font-medium">
                Contact
              </Link>
            </nav>
            
            <Link to="/login">
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
              Login
            </button></Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/30 backdrop-blur-lg border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Hotel Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Luxury Hotel</h4>
                  <p className="text-amber-400 text-sm">Experience Excellence</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Discover unparalleled luxury and comfort in the heart of the city. 
                Our world-class amenities and exceptional service create unforgettable experiences.
              </p>
              <div className="flex space-x-4 pt-2">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-gray-300">5-Star Rating</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
              <div className="space-y-3">
                <Link to="/rooms" className="block text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm">
                  Our Rooms
                </Link>
                <Link to="/dining" className="block text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm">
                  Dining
                </Link>
                <Link to="/spa" className="block text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm">
                  Spa & Wellness
                </Link>
                <Link to="/events" className="block text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm">
                  Events
                </Link>
                <Link to="/gallery" className="block text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm">
                  Gallery
                </Link>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Services</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">24/7 Concierge</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Room Service</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Valet Parking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Premium Amenities</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300 text-sm">123 Luxury Avenue</p>
                    <p className="text-gray-300 text-sm">Paradise City, PC 12345</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">info@luxuryhotel.com</span>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="mt-6">
                <h5 className="text-white font-semibold mb-3">Follow Us</h5>
                <div className="flex space-x-3">
                  <a href="#" className="w-8 h-8 bg-white/10 hover:bg-amber-500/20 rounded-full flex items-center justify-center transition-colors duration-200">
                    <Facebook className="w-4 h-4 text-gray-300 hover:text-amber-400" />
                  </a>
                  <a href="#" className="w-8 h-8 bg-white/10 hover:bg-amber-500/20 rounded-full flex items-center justify-center transition-colors duration-200">
                    <Instagram className="w-4 h-4 text-gray-300 hover:text-amber-400" />
                  </a>
                  <a href="#" className="w-8 h-8 bg-white/10 hover:bg-amber-500/20 rounded-full flex items-center justify-center transition-colors duration-200">
                    <Twitter className="w-4 h-4 text-gray-300 hover:text-amber-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="border-t border-white/10 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-300 text-sm">
                &copy; 2025 Luxury Hotel. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="/privacy" className="text-gray-300 hover:text-amber-400 text-sm transition-colors duration-200">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-300 hover:text-amber-400 text-sm transition-colors duration-200">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;