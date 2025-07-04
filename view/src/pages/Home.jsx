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
      <section className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Experience
            <span className="block bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Luxury Redefined
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Discover unparalleled comfort and elegance in the heart of paradise.
            Where every moment becomes a cherished memory.
          </p>

          {/* Booking Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-4xl mx-auto border border-white/20">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-white mb-2">Check-in</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur p-2 text-white"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Check-out</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur p-2 text-white"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Guests</label>
                <input
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur p-2 text-white"
                />
              </div>
            </div>
            <button className="mt-6 w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300">
              Search Available Rooms
            </button>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800/20 to-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Welcome to Paradise
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
                className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
              >
                Learn More About Us
              </Link>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="text-center text-white">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-3xl font-bold text-orange-400">
                        150+
                      </h3>
                      <p className="text-gray-300">Luxury Rooms</p>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-orange-400">
                        4.9
                      </h3>
                      <p className="text-gray-300">Guest Rating</p>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-orange-400">
                        24/7
                      </h3>
                      <p className="text-gray-300">Concierge Service</p>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-orange-400">
                        10+
                      </h3>
                      <p className="text-gray-300">Years Excellence</p>
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
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Kamar Terlaris</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover our most popular rooms, each designed with your comfort and
            luxury in mind
          </p>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <p className="text-gray-400 mt-4">Loading our beautiful rooms...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <Link
                to={`/rooms/${room._id}`}
                key={room._id}
                className="rounded-xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 block group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={room.images?.[0] || '/placeholder.jpg'}
                    alt={room.room_type}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {room.room_type}
                  </h3>
                  <p className="text-orange-400 mb-4 text-lg font-bold">
                    Rp {room.price_per_night?.toLocaleString()} / malam
                  </p>
                  <ul className="text-gray-400 text-sm space-y-1">
                    {room.facilities?.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-center">
                        <span className="text-orange-400 mr-2">•</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/rooms"
            className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
          >
            View All Rooms
          </Link>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800/20 to-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              World-Class Amenities
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Enjoy exceptional facilities designed to make your stay
              unforgettable
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-center hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Free WiFi
              </h3>
              <p className="text-gray-300">
                Stay connected with high-speed internet throughout the property.
                Perfect for business travelers and social media enthusiasts.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-center hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Secure Parking
              </h3>
              <p className="text-gray-300">
                Safe and secure parking space available for all guests. 24/7
                surveillance and valet service available.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-center hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Fitness Center
              </h3>
              <p className="text-gray-300">
                State-of-the-art gym facilities with modern equipment to keep
                you active during your stay.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-center hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">🏊</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Swimming Pool
              </h3>
              <p className="text-gray-300">
                Relax and unwind in our beautiful outdoor pool with stunning
                views and poolside service.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-center hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Fine Dining
              </h3>
              <p className="text-gray-300">
                Experience culinary excellence at our award-winning restaurant
                featuring international and local cuisine.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-center hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">🧘</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Spa & Wellness
              </h3>
              <p className="text-gray-300">
                Rejuvenate your body and mind at our luxurious spa with
                professional treatments and therapies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Premium Services
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Our dedicated team ensures every aspect of your stay exceeds
              expectations
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛎️</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                24/7 Concierge
              </h3>
              <p className="text-gray-400">
                Round-the-clock assistance for all your needs
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚐</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Airport Transfer
              </h3>
              <p className="text-gray-400">
                Complimentary pickup and drop-off service
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧹</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Housekeeping
              </h3>
              <p className="text-gray-400">
                Daily cleaning and turndown service
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Business Center
              </h3>
              <p className="text-gray-400">
                Fully equipped facilities for business travelers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800/20 to-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              What Our Guests Say
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Real experiences from our valued guests who have made memories
              with us
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
              <div className="text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-300 mb-6 italic">
                "Absolutely incredible experience! The staff went above and
                beyond to make our anniversary special. The room was stunning
                and the service was impeccable."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">AS</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Ahmad & Sari</h4>
                  <p className="text-gray-400 text-sm">Honeymoon Suite</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
              <div className="text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-300 mb-6 italic">
                "Perfect location, amazing amenities, and the most friendly
                staff. Our family vacation was everything we hoped for and more.
                Can't wait to come back!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">MF</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Maria's Family</h4>
                  <p className="text-gray-400 text-sm">Family Suite</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
              <div className="text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-300 mb-6 italic">
                "Business trip turned into a luxury experience. The business
                center was well-equipped and the spa helped me unwind after long
                meetings. Highly recommended!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">RK</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Robert Kim</h4>
                  <p className="text-gray-400 text-sm">Executive Room</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready for Your Perfect Stay?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Don't wait - book your dream vacation today and experience luxury
              like never before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/rooms"
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
              >
                View Available Rooms
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
