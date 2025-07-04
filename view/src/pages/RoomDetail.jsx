import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  const [checkIn, setCheckIn] = useState('');
const [checkOut, setCheckOut] = useState('');
const [loadingReservation, setLoadingReservation] = useState(false);
const [reservationMessage, setReservationMessage] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/rooms/${id}`);
        const json = await res.json();
        console.log("Room data: ", json);
        setRoom(json.data);
      } catch (err) {
        console.error('Failed to fetch room:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const handleReservation = async () => {
  setLoadingReservation(true);
  setReservationMessage(null);

  try {
    const token = localStorage.getItem('token'); // Asumsi token login disimpan di localStorage
    const res = await fetch('http://localhost:5000/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
       credentials: 'include',
      },
      body: JSON.stringify({
        room: room._id,
        check_in: checkIn,
        check_out: checkOut,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Reservation failed');
    }

    const data = await res.json();
    console.log('Reservation created:', data);

    setReservationMessage({ type: 'success', text: 'Reservation created successfully!' });
    setCheckIn('');
    setCheckOut('');
  } catch (err) {
    console.error(err);
    setReservationMessage({ type: 'error', text: err.message });
  } finally {
    setLoadingReservation(false);
  }
};


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading room details...</p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Room Not Found</h2>
          <p className="text-gray-300 mb-6">The room you're looking for doesn't exist.</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            ← Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-sm sticky top-0 z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Rooms
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Room Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              {room.room_type}
            </h1>
            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
              room.availability 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              {room.availability ? 'Available' : 'Unavailable'}
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-semibold text-amber-400 mb-2">
            Rp {room.price_per_night?.toLocaleString('id-ID')}
            <span className="text-lg text-gray-300 font-normal"> / malam</span>
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
                <img
                  src={room.images?.[selectedImage] || '/api/placeholder/800/500'}
                  alt={`${room.room_type} - View ${selectedImage + 1}`}
                  className="w-full h-80 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Thumbnail Images */}
              {room.images && room.images.length > 1 && (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {room.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                        selectedImage === idx 
                          ? 'border-amber-400 shadow-lg scale-105' 
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-16 md:h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Room Info Sidebar */}
          <div className="space-y-6">
            {/* Facilities Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-semibold mb-4 text-amber-400 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Room Facilities
              </h2>
              <div className="space-y-3">
                {room.facilities?.map((facility, i) => (
                  <div key={i} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm md:text-base">{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Card */}
            <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20">
  <h3 className="text-xl font-semibold mb-4 text-amber-400">Ready to Book?</h3>
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <span className="text-gray-300">Price per night:</span>
      <span className="text-lg font-semibold text-white">
        Rp {room.price_per_night?.toLocaleString('id-ID')}
      </span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-gray-300">Status:</span>
      <span className={room.availability ? 'text-green-400' : 'text-red-400'}>
        {room.availability ? 'Available Now' : 'Currently Unavailable'}
      </span>
    </div>

    {room.availability && (
      <div className="space-y-3">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Check-in Date</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
            className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur p-2 text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Check-out Date</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
            className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur p-2 text-white"
          />
        </div>
        <button
          onClick={handleReservation}
          disabled={loadingReservation || !checkIn || !checkOut}
          className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 bg-amber-500 hover:bg-amber-600 text-white hover:shadow-lg transform hover:scale-105 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {loadingReservation ? 'Booking...' : 'Book Now'}
        </button>
      </div>
    )}

    {!room.availability && (
      <button
        disabled
        className="w-full py-3 px-6 rounded-lg font-semibold bg-gray-600 text-gray-400 cursor-not-allowed"
      >
        Unavailable
      </button>
    )}

    {reservationMessage && (
      <div
        className={`mt-4 text-sm p-3 rounded-lg border ${
          reservationMessage.type === 'success'
            ? 'border-green-500 text-green-300 bg-green-800/20'
            : 'border-red-500 text-red-300 bg-red-800/20'
        }`}
      >
        {reservationMessage.text}
      </div>
    )}
  </div>
</div>


            {/* Contact Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-amber-400 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Need Help?
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Contact our reception for more information about this room or to make a reservation.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@hotel.com
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +62 xxx-xxxx-xxxx
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}