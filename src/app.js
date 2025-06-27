const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hotel Reservation API is running');
});

const roomRoutes = require('./routes/room.routes');
app.use('/api/rooms', roomRoutes);

const roomRoutes = require('./routes/roomType.routes');
app.use('/api/rooms-type', roomRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/api/users', userRoutes);


module.exports = app;
