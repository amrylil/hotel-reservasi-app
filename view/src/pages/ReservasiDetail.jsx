import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// Komponen helper untuk ikon
const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
    />
  </svg>
);
const SuccessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);
const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

export default function ReservationDetail() {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState({ type: '', text: '' });

  const fetchReservationData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/reservations/${id}`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch reservation data.');
      const json = await res.json();
      setReservation(json.data);
    } catch (err) {
      console.error('Fetch Reservation Error:', err);
    }
  };

  const checkStatusAndUpdateView = async (isSilent = false) => {
    if (!isSilent) {
      setIsCheckingStatus(true);
      setPaymentMessage({
        type: 'info',
        text: 'Checking latest payment status...',
      });
    }
    try {
      const res = await fetch(
        `http://localhost:5000/api/payment/manual-check/${id}`,
        {
          credentials: 'include',
        }
      );
      const result = await res.json();
      if (!res.ok && res.status !== 404) {
        throw new Error(result.message || 'Failed to check status.');
      }
      await fetchReservationData();
      if (!isSilent) {
        setPaymentMessage({ type: 'success', text: 'Status is up to date.' });
      }
    } catch (error) {
      console.error('Manual check failed:', error);
      if (!isSilent) {
        setPaymentMessage({ type: 'error', text: error.message });
      }
    } finally {
      if (!isSilent) {
        setIsCheckingStatus(false);
      }
    }
  };

  useEffect(() => {
    const initialLoad = async () => {
      setLoading(true);
      await checkStatusAndUpdateView(true); // Cek status secara otomatis saat load
      setLoading(false);
    };
    initialLoad();
  }, [id]);

  const handlePayment = async () => {
    setPaymentLoading(true);
    setPaymentMessage({ type: '', text: '' });
    if (!window.snap) {
      setPaymentMessage({
        type: 'error',
        text: 'Payment service is not ready. Please refresh.',
      });
      setPaymentLoading(false);
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ reservationId: id }),
      });
      if (!res.ok) throw new Error((await res.json()).message);
      const { data } = await res.json();
      window.snap.pay(data.snapToken, {
        onSuccess: () => {
          setPaymentMessage({
            type: 'success',
            text: 'Payment successful! Refreshing status...',
          });
          checkStatusAndUpdateView(true);
        },
        onPending: () => {
          setPaymentMessage({
            type: 'pending',
            text: 'Waiting for your payment.',
          });
        },
        onError: () =>
          setPaymentMessage({ type: 'error', text: 'Payment process failed.' }),
        onClose: () => {
          if (paymentMessage.type !== 'success') {
            setPaymentMessage({
              type: 'info',
              text: 'You closed the payment window.',
            });
          }
        },
      });
    } catch (err) {
      setPaymentMessage({ type: 'error', text: err.message });
    } finally {
      setPaymentLoading(false);
    }
  };

  const PaymentNotification = () => {
    if (!paymentMessage.text) return null;
    const styles = {
      success: 'bg-green-900/50 text-green-300 border-green-700',
      error: 'bg-red-900/50 text-red-300 border-red-700',
      pending: 'bg-yellow-900/50 text-yellow-300 border-yellow-700',
      info: 'bg-sky-900/50 text-sky-300 border-sky-700',
    };
    const icons = {
      success: <SuccessIcon />,
      error: <ErrorIcon />,
      pending: <InfoIcon />,
      info: <InfoIcon />,
    };
    return (
      <div
        className={`flex items-center gap-3 p-4 mb-4 rounded-lg text-sm border ${
          styles[paymentMessage.type]
        }`}
      >
        {icons[paymentMessage.type]}
        <span>{paymentMessage.text}</span>
      </div>
    );
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
        <p className="text-gray-400">Reservation not found.</p>
      </div>
    );
  }

  const checkIn = new Date(reservation.check_in);
  const checkOut = new Date(reservation.check_out);
  const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)) || 1;
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
          <img
            src={reservation.room?.images?.[0] || '/placeholder.jpg'}
            alt={reservation.room?.room_type || 'Room'}
            className="w-full h-64 object-cover"
          />
          <div className="p-6 md:p-8">
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
                className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
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
              <div>
                <p className="text-gray-400 text-sm mb-2">Room Facilities</p>
                <ul className="space-y-2 list-disc list-inside">
                  {reservation.room?.facilities?.map((facility, index) => (
                    <li key={index} className="text-white text-sm">
                      {facility}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-6 mb-8">
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
                <div className="border-t border-white/20 pt-3 mt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-white">Total Amount</span>
                    <span className="text-white">
                      Rp {totalPrice.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {reservation.status === 'pending' && (
              <div className="text-center">
                <PaymentNotification />
                <p className="text-gray-300 mb-4">
                  Your reservation requires payment to be confirmed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={handlePayment}
                    disabled={paymentLoading || isCheckingStatus}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 w-full sm:w-auto text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    {paymentLoading
                      ? 'Processing...'
                      : `Pay Rp ${totalPrice.toLocaleString('id-ID')}`}
                  </button>
                  <button
                    onClick={() => checkStatusAndUpdateView(false)}
                    disabled={isCheckingStatus || paymentLoading}
                    className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-500 w-full sm:w-auto text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    {isCheckingStatus ? 'Checking...' : 'Check Payment Status'}
                  </button>
                </div>
              </div>
            )}

            {reservation.status === 'confirmed' && (
              <div className="text-center p-6 bg-green-900/50 rounded-lg">
                <p className="text-green-300 mb-2 font-semibold flex items-center justify-center gap-2">
                  <SuccessIcon /> Payment Confirmed
                </p>
                <p className="text-gray-300 text-sm">
                  Your reservation is confirmed. We look forward to welcoming
                  you!
                </p>
              </div>
            )}

            {reservation.status === 'cancelled' && (
              <div className="text-center p-6 bg-red-900/50 rounded-lg">
                <p className="text-red-300 mb-2 font-semibold flex items-center justify-center gap-2">
                  <ErrorIcon /> Reservation Cancelled
                </p>
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
