'use client';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/rooms');
        const json = await res.json();
        console.log('Rooms API response:', json);

        // ✅ Fix: ambil dari json.data
        setRooms(json.data.slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch rooms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('/images/banner.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-20">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              Experience
              <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent mt-2 animate-pulse">
                Luxury Redefined
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
              Discover unparalleled comfort and elegance in the heart of
              paradise.
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Where every moment becomes a cherished memory.
            </p>
          </div>
        </div>

        {/* Floating Search Form */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-6xl px-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/15">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              {/* Check-in */}
              <div className="relative">
                <label className="block text-white/90 font-medium mb-2 text-sm uppercase tracking-wide">
                  Check-in
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:bg-white/20 transition-all duration-300 hover:bg-white/15"
                />
              </div>

              {/* Check-out */}
              <div className="relative">
                <label className="block text-white/90 font-medium mb-2 text-sm uppercase tracking-wide">
                  Check-out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:bg-white/20 transition-all duration-300 hover:bg-white/15"
                />
              </div>

              <div className="relative">
                <label className="block text-white/90 font-medium mb-2 text-sm uppercase tracking-wide">
                  Guests
                </label>

                {/* Wrapper untuk memposisikan ikon */}
                <div className="relative w-full">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    // 1. Sembunyikan panah default & tambah padding kanan untuk ikon baru
                    className="w-full appearance-none rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-4 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:bg-white/20 transition-all duration-300 hover:bg-white/15"
                  >
                    <option value="1" className="bg-gray-900 text-white">
                      1 Guest
                    </option>
                    <option value="2" className="bg-gray-900 text-white">
                      2 Guests
                    </option>
                    <option value="3" className="bg-gray-900 text-white">
                      3 Guests
                    </option>
                    <option value="4" className="bg-gray-900 text-white">
                      4 Guests
                    </option>
                    <option value="5" className="bg-gray-900 text-white">
                      5+ Guests
                    </option>
                  </select>

                  {/* 2. Tambahkan ikon SVG kustom di sini */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/70">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="relative flex items-end">
                <button className="w-full h-14 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 rounded-xl text-white font-semibold text-lg hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-500/40 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>

                  <span>Search Rooms</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900/30 via-slate-800/20 to-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Welcome to
                <span className="block text-orange-400 mt-1">Paradise</span>
              </h2>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Nestled in the heart of nature's beauty, our hotel offers an
                extraordinary escape from the ordinary. With breathtaking views,
                world-class amenities, and unparalleled service, we create
                moments that last a lifetime.
              </p>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                From intimate romantic getaways to family adventures, our
                carefully curated experiences ensure every guest feels the
                warmth of genuine hospitality combined with modern luxury.
              </p>
              <Link
                to="/about"
                className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Learn More About Us
              </Link>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-center text-white">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="transform hover:scale-105 transition-transform duration-300">
                      <h3 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-2">
                        150+
                      </h3>
                      <p className="text-gray-300 font-medium">Luxury Rooms</p>
                    </div>
                    <div className="transform hover:scale-105 transition-transform duration-300">
                      <h3 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-2">
                        4.9
                      </h3>
                      <p className="text-gray-300 font-medium">Guest Rating</p>
                    </div>
                    <div className="transform hover:scale-105 transition-transform duration-300">
                      <h3 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-2">
                        24/7
                      </h3>
                      <p className="text-gray-300 font-medium">
                        Concierge Service
                      </p>
                    </div>
                    <div className="transform hover:scale-105 transition-transform duration-300">
                      <h3 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-2">
                        10+
                      </h3>
                      <p className="text-gray-300 font-medium">
                        Years Excellence
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Kamar <span className="text-orange-400">Terlaris</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our most popular rooms, each designed with your comfort and
            luxury in mind
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
            <p className="text-gray-400 mt-6 text-lg">
              Loading our beautiful rooms...
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <Link
                to={`/rooms/${room._id}`}
                key={room._id}
                className="group rounded-2xl overflow-hidden shadow-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-105 hover:shadow-2xl hover:bg-white/15 transition-all duration-500 block"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={room.images?.[0] || '/placeholder.jpg'}
                    alt={room.room_type}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Popular
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                    {room.room_type}
                  </h3>
                  <p className="text-orange-400 mb-4 text-xl font-bold">
                    Rp {room.price_per_night?.toLocaleString()}
                    <span className="text-gray-400 text-sm font-normal">
                      / malam
                    </span>
                  </p>
                  <ul className="text-gray-300 text-sm space-y-2">
                    {room.facilities?.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-center">
                        <span className="text-orange-400 mr-3 text-lg">•</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <Link
            to="/rooms"
            className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Rooms
          </Link>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900/30 via-slate-800/20 to-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              World-Class <span className="text-orange-400">Amenities</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Enjoy exceptional facilities designed to make your stay
              unforgettable
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🌐',
                title: 'Free WiFi',
                desc: 'Stay connected with high-speed internet throughout the property. Perfect for business travelers and social media enthusiasts.',
              },
              {
                icon: '🚗',
                title: 'Secure Parking',
                desc: 'Safe and secure parking space available for all guests. 24/7 surveillance and valet service available.',
              },
              {
                icon: '💪',
                title: 'Fitness Center',
                desc: 'State-of-the-art gym facilities with modern equipment to keep you active during your stay.',
              },
              {
                icon: '🏊',
                title: 'Swimming Pool',
                desc: 'Relax and unwind in our beautiful outdoor pool with stunning views and poolside service.',
              },
              {
                icon: '🍽️',
                title: 'Fine Dining',
                desc: 'Experience culinary excellence at our award-winning restaurant featuring international and local cuisine.',
              },
              {
                icon: '🧘',
                title: 'Spa & Wellness',
                desc: 'Rejuvenate your body and mind at our luxurious spa with professional treatments and therapies.',
              },
            ].map((amenity, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center hover:bg-white/15 hover:scale-105 transition-all duration-300 group"
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {amenity.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
                  {amenity.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{amenity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Premium <span className="text-orange-400">Services</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Our dedicated team ensures every aspect of your stay exceeds
              expectations
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🛎️',
                title: '24/7 Concierge',
                desc: 'Round-the-clock assistance for all your needs',
              },
              {
                icon: '🚐',
                title: 'Airport Transfer',
                desc: 'Complimentary pickup and drop-off service',
              },
              {
                icon: '🧹',
                title: 'Housekeeping',
                desc: 'Daily cleaning and turndown service',
              },
              {
                icon: '👨‍💼',
                title: 'Business Center',
                desc: 'Fully equipped facilities for business travelers',
              },
            ].map((service, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-3xl">{service.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900/30 via-slate-800/20 to-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Our <span className="text-orange-400">Guests Say</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Real experiences from our valued guests who have made memories
              with us
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                rating: '⭐⭐⭐⭐⭐',
                text: 'Absolutely incredible experience! The staff went above and beyond to make our anniversary special. The room was stunning and the service was impeccable.',
                name: 'Ahmad & Sari',
                room: 'Honeymoon Suite',
                initials: 'AS',
              },
              {
                rating: '⭐⭐⭐⭐⭐',
                text: "Perfect location, amazing amenities, and the most friendly staff. Our family vacation was everything we hoped for and more. Can't wait to come back!",
                name: "Maria's Family",
                room: 'Family Suite',
                initials: 'MF',
              },
              {
                rating: '⭐⭐⭐⭐⭐',
                text: 'Business trip turned into a luxury experience. The business center was well-equipped and the spa helped me unwind after long meetings. Highly recommended!',
                name: 'Robert Kim',
                room: 'Executive Room',
                initials: 'RK',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300"
              >
                <div className="text-yellow-400 mb-6 text-xl">
                  {testimonial.rating}
                </div>
                <p className="text-gray-300 mb-8 italic text-lg leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold text-lg">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-orange-400 text-sm font-medium">
                      {testimonial.room}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 rounded-3xl p-12 shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-orange-700/20 animate-pulse"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Ready for Your Perfect Stay?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Don't wait - book your dream vacation today and experience
                luxury like never before.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/rooms"
                  className="bg-white text-orange-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  View Available Rooms
                </Link>
                <Link
                  to="/contact"
                  className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-105"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
