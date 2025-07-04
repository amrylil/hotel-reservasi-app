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
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Luxury Redefined
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Discover unparalleled comfort and elegance in the heart of paradise. Where every moment becomes a cherished memory.
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
            <button className="mt-6 w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white font-semibold">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
     <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Kamar Terlaris</h2>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <Link
                to={`/rooms/${room._id}`}
                key={room._id}
                className="rounded-xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-[1.02] transition-transform block"
              >
                <img
                  src={room.images?.[0] || '/placeholder.jpg'}
                  alt={room.room_type}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{room.room_type}</h3>
                  <p className="text-gray-300 mb-2">
                    Rp {room.price_per_night?.toLocaleString()} / malam
                  </p>
                  <ul className="text-gray-400 text-sm space-y-1">
                    {room.facilities?.slice(0, 4).map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Amenities Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-10 text-center">Amenities</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center text-white/80">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-2">Free WiFi</h3>
              <p>Stay connected with high-speed internet throughout the property.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-2">Parking</h3>
              <p>Safe and secure parking space available for all guests.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-2">Fitness Center</h3>
              <p>State-of-the-art gym facilities to keep you active during your stay.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
