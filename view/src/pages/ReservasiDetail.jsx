// src/pages/ReservationDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ReservationDetail() {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/reservations/${id}`,
          {
            credentials: 'include',
          }
        );

        if (!res.ok) throw new Error('Failed to fetch reservation');

        const json = await res.json();
        setReservation(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [id]);

  const handlePayment = async () => {
    setPaymentLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/reservations/${id}/pay`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );

      if (!res.ok) throw new Error('Payment failed');

      const json = await res.json();
      setReservation(json.data);
      alert('Payment successful!');
    } catch (err) {
      console.error(err);
      alert('Payment failed. Please try again.');
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <p className="text-gray-400">Reservation not found</p>
      </div>
    );
  }

  // Calculate nights and total price
  const checkIn = new Date(reservation.check_in);
  const checkOut = new Date(reservation.check_out);
  const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  const pricePerNight = reservation.room?.price_per_night || 0;
  const totalPrice = nights * pricePerNight;

  return (
    <div className="min-h-screen text-white">
      <header className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Reservation Details</h1>
        <Link
          to="/my-reservations"
          className="text-blue-400 hover:underline inline-block"
        >
          ← Back to Reservations
        </Link>
      </header>

      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg overflow-hidden">
          {/* Room Image */}
          <img
            src={reservation.room?.images?.[0] || '/placeholder.jpg'}
            alt={reservation.room?.room_type || 'Room'}
            className="w-full h-64 object-cover"
          />

          <div className="p-6">
            {/* Room Info */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {reservation.room?.room_type || 'Room'}
                </h2>
                <p className="text-gray-300">
                  Room {reservation.room?.room_number}
                </p>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  reservation.status === 'confirmed'
                    ? 'bg-green-600/20 text-green-300'
                    : reservation.status === 'cancelled'
                    ? 'bg-red-600/20 text-red-300'
                    : 'bg-yellow-600/20 text-yellow-300'
                }`}
              >
                {reservation.status}
              </span>
            </div>

            {/* Guest & Date Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Guest Name</p>
                  <p className="text-white font-medium">
                    {reservation.user_name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Check-in</p>
                  <p className="text-white font-medium">
                    {checkIn.toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Check-out</p>
                  <p className="text-white font-medium">
                    {checkOut.toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {/* Facilities */}
              <div>
                <p className="text-gray-400 text-sm mb-2">Room Facilities</p>
                <div className="space-y-2">
                  {reservation.room?.facilities?.map((facility, index) => (
                    <p key={index} className="text-white text-sm">
                      • {facility}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-white/5 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Price Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Price per night</span>
                  <span className="text-white">
                    Rp {pricePerNight.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Number of nights</span>
                  <span className="text-white">
                    {nights} night{nights > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="border-t border-white/20 pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-white">Total Amount</span>
                    <span className="text-white">
                      Rp {totalPrice.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            {reservation.status === 'pending' && (
              <div className="text-center">
                <p className="text-gray-300 mb-4">
                  Your reservation is pending payment. Click the button below to
                  complete your payment.
                </p>
                <button
                  onClick={handlePayment}
                  disabled={paymentLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  {paymentLoading
                    ? 'Processing...'
                    : `Pay Rp ${totalPrice.toLocaleString('id-ID')}`}
                </button>
              </div>
            )}

            {reservation.status === 'confirmed' && (
              <div className="text-center">
                <p className="text-green-300 mb-2">✓ Payment Confirmed</p>
                <p className="text-gray-300 text-sm">
                  Your reservation has been confirmed. Please present this
                  confirmation at check-in.
                </p>
              </div>
            )}

            {reservation.status === 'cancelled' && (
              <div className="text-center">
                <p className="text-red-300 mb-2">✗ Reservation Cancelled</p>
                <p className="text-gray-300 text-sm">
                  This reservation has been cancelled.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
