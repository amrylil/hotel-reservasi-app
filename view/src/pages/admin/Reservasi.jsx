import { useState, useEffect } from 'react';
import {
  Search,
  SlidersHorizontal,
  Calendar,
  User,
  Hash,
  DollarSign,
  Info,
  AlertTriangle,
} from 'lucide-react';

// Main component for Admin Reservation Management
export default function ReservasiPage() {
  // State management
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const API_URL = 'http://localhost:5000/api/reservations';

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL, {
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `HTTP error! Status: ${response.status}`
          );
        }

        const result = await response.json();

        if (result.status === 'success' && Array.isArray(result.data)) {
          const dataWithStatus = result.data.map((r) => ({
            ...r,
            status: r.status || 'Confirmed',
          }));
          console.log(result.data);
          setReservations(dataWithStatus);
        } else {
          throw new Error('Invalid data format received from API.');
        }
      } catch (err) {
        console.error('Fetch error:', err.message);
        setError(`Gagal memuat reservasi: ${err.message}`);
        setReservations([]); // Clear any existing data on error
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []); // Empty dependency array ensures this runs only once on mount

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diffTime = Math.abs(outDate - inDate);
    // Ensure at least one night is calculated for same-day check-in/out
    const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    return diffDays;
  };

  const filteredReservations = reservations.filter((res) => {
    // Defensive check to ensure res and nested properties exist
    if (!res || !res.user || !res.room) return false;

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      (res.user.name && res.user.name.toLowerCase().includes(searchLower)) ||
      (res.user.email && res.user.email.toLowerCase().includes(searchLower)) ||
      (res.room.room_number && res.room.room_number.includes(searchLower)) ||
      (res.room.room_type &&
        res.room.room_type.toLowerCase().includes(searchLower));

    const matchesStatus =
      filterStatus === 'all' ||
      (res.status && res.status.toLowerCase() === filterStatus);

    return matchesSearch && matchesStatus;
  });

  // Status color mapping
  const statusColors = {
    Confirmed: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Dasbor Reservasi</h1>
          <p className="text-gray-600 mt-2">
            Awasi dan kelola semua reservasi tamu.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari berdasarkan tamu, email, kamar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
            </div>
            <div className="flex-shrink-0 w-full sm:w-auto relative">
              <SlidersHorizontal className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full sm:w-48 pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none"
              >
                <option value="all">Semua Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat reservasi...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md my-6 flex items-center gap-3">
            <AlertTriangle className="h-6 w-6" />
            <div>
              <p className="font-bold">Terjadi Kesalahan</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Reservations Table (only shown if not loading and no error) */}
        {!loading && !error && (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-600 uppercase tracking-wider">
                      <User className="inline-block mr-2 h-4 w-4" />
                      Tamu
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-600 uppercase tracking-wider">
                      <Hash className="inline-block mr-2 h-4 w-4" />
                      Detail Kamar
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-600 uppercase tracking-wider">
                      <Calendar className="inline-block mr-2 h-4 w-4" />
                      Tanggal
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-600 uppercase tracking-wider">
                      <DollarSign className="inline-block mr-2 h-4 w-4" />
                      Total
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-600 uppercase tracking-wider">
                      <Info className="inline-block mr-2 h-4 w-4" />
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredReservations.map((res) => {
                    const nights = calculateNights(res.check_in, res.check_out);
                    const totalPrice =
                      nights * (res.room?.price_per_night || 0);
                    return (
                      <tr
                        key={res._id}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-bold text-gray-900">
                            {res.user_name || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-semibold text-gray-800">
                            Kamar {res.room?.room_number || 'N/A'}
                          </div>
                          <div className="text-gray-500">
                            {res.room?.room_type || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <span className="font-semibold">Masuk:</span>{' '}
                            {formatDate(res.check_in)}
                          </div>
                          <div>
                            <span className="font-semibold">Keluar:</span>{' '}
                            {formatDate(res.check_out)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-semibold text-gray-800">
                            {totalPrice.toLocaleString('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                            })}
                          </div>
                          <div className="text-gray-500">{nights} malam</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full font-semibold ${
                              statusColors[res.status] ||
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {res.status || 'Unknown'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Results Message */}
        {!loading && !error && filteredReservations.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-700">
              Tidak Ada Reservasi Ditemukan
            </h3>
            <p className="text-gray-500 mt-2">
              Coba sesuaikan pencarian atau filter Anda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
