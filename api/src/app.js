const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hotel Reservation API is running');
});

app.use(cookieParser());
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

module.exports = app;
