import React from 'react';
import { Outlet, Link } from 'react-router-dom'; // Gunakan Link untuk navigasi
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Background Elements (bisa juga ditaruh di sini jika ingin ada di setiap halaman) */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 -z-10"></div>
      
      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-white text-2xl font-bold">Luxury Hotel</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-white hover:text-purple-300 transition-colors">Home</Link>
              <Link to="/rooms" className="text-white hover:text-purple-300 transition-colors">Rooms</Link>
              <Link to="/amenities" className="text-white hover:text-purple-300 transition-colors">Amenities</Link>
              <Link to="/contact" className="text-white hover:text-purple-300 transition-colors">Contact</Link>
            </nav>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
              Book Now
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Placeholder */}
      <main className="relative z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-white/5 backdrop-blur-lg border-t border-white/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* ... Kode Footer dari komponen asli Anda ... */}
             <div>
               <h4 className="text-white font-bold mb-4">Contact</h4>
               <div className="space-y-3">
                 <div className="flex items-center space-x-2">
                   <MapPin className="w-5 h-5 text-gray-400" />
                   <span className="text-gray-300">123 Luxury Avenue, Paradise City</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <Phone className="w-5 h-5 text-gray-400" />
                   <span className="text-gray-300">+1 (555) 123-4567</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <Mail className="w-5 h-5 text-gray-400" />
                   <span className="text-gray-300">info@luxuryhotel.com</span>
                 </div>
               </div>
             </div>
             {/* ... Kolom footer lainnya ... */}
           </div>
           <div className="border-t border-white/20 mt-8 pt-8 text-center">
             <p className="text-gray-300">&copy; 2025 Luxury Hotel. All rights reserved.</p>
           </div>
         </div>
      </footer>
    </div>
  );
}

export default Layout;