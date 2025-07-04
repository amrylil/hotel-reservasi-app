import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen text-white">
      <header className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4">Our Rooms</h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Explore all our available rooms and pick your perfect stay.
        </p>
        <Link to="/" className="text-blue-400 hover:underline mt-6 inline-block">
          ← Back to Home
        </Link>
      </header>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : rooms.length === 0 ? (
          <p className="text-center text-gray-400">No rooms found.</p>
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
                  <p className="mt-2 text-sm text-green-400">
                    {room.availability ? 'Available' : 'Unavailable'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
