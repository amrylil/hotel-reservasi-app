const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// ✅ PASANG CORS PALING ATAS
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hotel Reservation API is running');
});

const roomRoutes = require('./routes/room.routes');
app.use('/api/rooms', roomRoutes);

const roomTypeRoutes = require('./routes/roomType.routes');
app.use('/api/rooms-type', roomTypeRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/api/users', userRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const reservationRoutes = require('./routes/reservation.routes');
app.use('/api/reservations', reservationRoutes);

const PaymentRoutes = require('./routes/payment.routes');
app.use('/api/payment', PaymentRoutes);

module.exports = app;
