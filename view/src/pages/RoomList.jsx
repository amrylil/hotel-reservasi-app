import { useEffect, useState } from 'react';

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/rooms');
        const json = await res.json();
        setRooms(json.data);
      } catch (err) {
        console.error('Failed to fetch rooms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header Section */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-orange-500">Rooms</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Discover unparalleled comfort and elegance in our carefully curated
            rooms. Each space is designed to create unforgettable memories.
          </p>
          <a
            href="/"
            className="inline-flex items-center text-orange-400 hover:text-orange-300 font-medium text-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
            <p className="text-gray-400 text-lg">
              Loading our beautiful rooms...
            </p>
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl text-gray-600 mb-4">🏨</div>
            <p className="text-gray-400 text-lg">
              No rooms available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {rooms.map((room) => (
              <a
                href={`/rooms/${room._id}`}
                key={room._id}
                className="group block"
              >
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
                            {room.facilities
                              .slice(0, 4)
                              .map((facility, index) => (
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
        )}
      </div>
    </div>
  );
}
