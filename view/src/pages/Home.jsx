import { useState } from 'react';
import { Calendar, MapPin, Users, Star, Wifi, Car, Coffee, Dumbbell, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

export default function HotelHomepage() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const rooms = [
    {
      id: 1,
      name: "Deluxe Ocean View",
      price: "$299/night",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
      features: ["Ocean View", "King Bed", "Balcony", "Free WiFi"]
    },
    {
      id: 2,
      name: "Presidential Suite",
      price: "$599/night",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
      features: ["2 Bedrooms", "Living Room", "Jacuzzi", "Butler Service"]
    },
    {
      id: 3,
      name: "Standard Room",
      price: "$199/night",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
      features: ["Queen Bed", "City View", "Free WiFi", "Mini Bar"]
    }
  ];

  const amenities = [
    { icon: Wifi, name: "Free WiFi", desc: "High-speed internet throughout" },
    { icon: Car, name: "Valet Parking", desc: "Complimentary parking service" },
    { icon: Coffee, name: "24/7 Room Service", desc: "Dining at your convenience" },
    { icon: Dumbbell, name: "Fitness Center", desc: "State-of-the-art equipment" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>

      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-white text-2xl font-bold">Luxury Hotel</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-white hover:text-purple-300 transition-colors">Home</a>
              <a href="#" className="text-white hover:text-purple-300 transition-colors">Rooms</a>
              <a href="#" className="text-white hover:text-purple-300 transition-colors">Amenities</a>
              <a href="#" className="text-white hover:text-purple-300 transition-colors">Contact</a>
            </nav>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
              Book Now
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Experience
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Luxury Redefined
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Discover unparalleled comfort and elegance in the heart of paradise. Where every moment becomes a cherished memory.
          </p>

          {/* Booking Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-4xl mx-auto border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Check-in"
                />
                <label className="absolute -top-2 left-3 text-xs text-gray-300 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 px-2">Check-in</label>
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Check-out"
                />
                <label className="absolute -top-2 left-3 text-xs text-gray-300 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 px-2">Check-out</label>
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                </select>
                <label className="absolute -top-2 left-3 text-xs text-gray-300 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 px-2">Guests</label>
              </div>
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all font-semibold">
                Search Rooms
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Luxury Rooms</h2>
            <p className="text-gray-300 text-lg">Choose from our carefully curated selection of rooms and suites</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div key={room.id} className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all">
                <div className="aspect-w-16 aspect-h-9 bg-gray-300 rounded-t-3xl">
                  <img src={room.image} alt={room.name} className="w-full h-48 object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{room.name}</h3>
                    <span className="text-purple-400 font-bold text-lg">{room.price}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.features.map((feature, index) => (
                      <span key={index} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all font-semibold">
                    Book This Room
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">World-Class Amenities</h2>
            <p className="text-gray-300 text-lg">Everything you need for a perfect stay</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((amenity, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
                  <amenity.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{amenity.name}</h3>
                <p className="text-gray-300">{amenity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white/5 backdrop-blur-lg border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <span className="text-white text-2xl font-bold">Luxury Hotel</span>
              </div>
              <p className="text-gray-300 mb-4">Experience the pinnacle of luxury and comfort at our world-class hotel.</p>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Rooms & Suites</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Dining</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Spa & Wellness</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Concierge</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Room Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Transportation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Events</a></li>
              </ul>
            </div>
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
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-gray-300">&copy; 2025 Luxury Hotel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}