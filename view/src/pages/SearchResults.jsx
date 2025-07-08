'use client';

import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// Helper function to format the date into a more readable format.
// Example: "8 Juli 2025"
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

export default function SearchResults() {
  // Hooks for state management and accessing URL parameters.
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get check-in and check-out dates from the URL.
  const checkIn = searchParams.get('check_in');
  const checkOut = searchParams.get('check_out');

  // This effect runs when the component mounts or when the dates in the URL change.
  useEffect(() => {
    // Validate that dates are present before fetching.
    if (!checkIn || !checkOut) {
      setError('Tanggal check-in dan check-out harus diisi.');
      setLoading(false);
      return;
    }

    const fetchAvailableRooms = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = `http://localhost:5000/api/rooms/available?check_in=${checkIn}&check_out=${checkOut}`;
        const res = await fetch(apiUrl);

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.message || `Error: Terjadi kesalahan ${res.status}`
          );
        }

        const json = await res.json();
        console.log('Available Rooms API response:', json);

        setRooms(json);
      } catch (err) {
        console.error('Failed to fetch available rooms:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableRooms();
  }, [checkIn, checkOut]);
  const renderLoading = () => (
    <div className="text-center py-16">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
      <p className="text-gray-400 mt-6 text-lg">
        Mencari kamar yang tersedia...
      </p>
    </div>
  );

  const renderError = () => (
    <div className="text-center py-20 bg-red-900/20 border border-red-500/50 rounded-2xl">
      <h2 className="text-2xl font-bold text-red-400 mb-4">
        Oops! Terjadi Kesalahan
      </h2>
      <p className="text-gray-300">{error}</p>
      <Link
        to="/"
        className="mt-8 inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );

  const renderNoResults = () => (
    <div className="text-center py-20 bg-slate-800/50 rounded-2xl">
      <h2 className="text-2xl font-bold text-orange-400 mb-4">
        Tidak Ada Kamar Ditemukan
      </h2>
      <p className="text-gray-300 max-w-md mx-auto">
        Maaf, tidak ada kamar yang tersedia untuk tanggal yang dipilih. Silakan
        coba tanggal lain.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Coba Lagi
      </Link>
    </div>
  );

  // Display the list of available rooms.
  const renderResults = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
      {rooms.map((room) => (
        <a href={`/rooms/${room._id}`} key={room._id} className="group block">
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-orange-500/50 hover:bg-black/30 h-full flex flex-col">
            {/* Room Image */}
            <div className="relative overflow-hidden">
              <img
                src={room.images?.[0] || '/placeholder.jpg'}
                alt={room.room_type}
                className="w-full h-64 object-cover group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Availability Badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    room.availability
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {room.availability ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>

            {/* Room Details */}
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-3">
                {room.room_type}
              </h3>

              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-orange-400">
                  Rp {room.price_per_night?.toLocaleString()}
                </span>
                <span className="text-gray-400 ml-2">/ night</span>
              </div>

              {/* Facilities */}
              <div className="flex-1">
                {room.facilities && room.facilities.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                      Facilities
                    </h4>
                    <div className="space-y-1">
                      {room.facilities.slice(0, 4).map((facility, index) => (
                        <div
                          key={index}
                          className="flex items-center text-gray-400 text-sm"
                        >
                          <svg
                            className="w-4 h-4 mr-2 text-orange-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {facility}
                        </div>
                      ))}
                      {room.facilities.length > 4 && (
                        <div className="text-gray-500 text-sm">
                          +{room.facilities.length - 4} more facilities
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* View Details Button */}
              <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-orange-400 font-medium group-hover:text-orange-300">
                    View Details
                  </span>
                  <svg
                    className="w-5 h-5 text-orange-400 group-hover:text-orange-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <main className="max-w-7xl mx-auto px-4 py-28 sm:px-6 lg:px-8 ">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Kamar yang Tersedia
          </h1>
          <p className="text-lg text-orange-400 font-semibold">
            Menampilkan hasil untuk: {formatDate(checkIn)} -{' '}
            {formatDate(checkOut)}
          </p>
        </div>

        {/* Conditional Rendering Logic */}
        {loading ? renderLoading() : null}
        {error ? renderError() : null}
        {!loading &&
          !error &&
          (rooms.length > 0 ? renderResults() : renderNoResults())}
      </main>
    </div>
  );
}
