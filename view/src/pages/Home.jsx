import { useState } from 'react';
import { Calendar, Users, Wifi, Car, Coffee, Dumbbell } from 'lucide-react';

export default function Home() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const rooms = [ /* ...data kamar Anda... */ ];
  const amenities = [ /* ...data amenities Anda... */ ];

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
            {/* ... Kode Booking Form dari komponen asli Anda ... */}
           </div>
         </div>
      </section>

      {/* Rooms Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ... Kode Rooms Section dari komponen asli Anda ... */}
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           {/* ... Kode Amenities Section dari komponen asli Anda ... */}
        </div>
      </section>
    </>
  );
}