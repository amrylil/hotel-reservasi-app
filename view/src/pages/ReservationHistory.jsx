// src/pages/ReservationHistory.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ReservationHistory() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/reservations/my', {
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to fetch reservations');

        const json = await res.json();
        setReservations(json.data);
        console.log('data : ', json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="min-h-screen text-white">
      <header className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4">My Reservations</h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          View all your past and upcoming stays.
        </p>
        <Link
          to="/"
          className="text-blue-400 hover:underline mt-6 inline-block"
        >
          ← Back to Home
        </Link>
      </header>

      <section className="max-w-4xl mx-auto px-4 pb-16">
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : reservations.length === 0 ? (
          <p className="text-center text-gray-400">
            You have no reservations yet.
          </p>
        ) : (
          <div className="space-y-6">
            {reservations.map((resv) => (
              <Link
                to={`/reservations/${resv._id}`}
                key={resv._id}
                className="flex rounded-lg overflow-hidden shadow-lg bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-colors block"
              >
                <img
                  src={resv.room?.images?.[0] || '/placeholder.jpg'}
                  alt={resv.room?.room_type || 'Room'}
                  className="w-80 max-h-40 object-cover flex-shrink-0"
                />
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {resv.room?.room_type || 'Room'}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Room {resv.room?.room_number}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        resv.status === 'confirmed'
                          ? 'bg-green-600/20 text-green-300'
                          : resv.status === 'cancelled'
                          ? 'bg-red-600/20 text-red-300'
                          : 'bg-yellow-600/20 text-yellow-300'
                      }`}
                    >
                      {resv.status}
                    </span>
                  </div>

                  <div className="flex gap-6 text-sm">
                    <div>
                      <p className="text-gray-400">Check-in</p>
                      <p className="text-white font-medium">
                        {new Date(resv.check_in).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Check-out</p>
                      <p className="text-white font-medium">
                        {new Date(resv.check_out).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Guest</p>
                      <p className="text-white font-medium">{resv.user_name}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
