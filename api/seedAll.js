const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const roomModel = require('./src/models/room.model');
const userModel = require('./src/models/user.model');

const rooms = [
  {
    room_number: '101A',
    room_type: 'Deluxe',
    price_per_night: 750000,
    facilities: ['WiFi', 'AC', 'TV', 'Kulkas Mini', 'Air Panas'],
    availability: true,
    images: [
      'https://i.pinimg.com/1200x/84/f7/34/84f734b07a720ff604c8443118f34d7e.jpg',
      'https://i.pinimg.com/1200x/6e/ac/2a/6eac2ae7668708f5c306d6030a557d78.jpg',
    ],
  },
  {
    room_number: '102B',
    room_type: 'Superior',
    price_per_night: 550000,
    facilities: ['WiFi', 'AC', 'TV'],
    availability: true,
    images: [
      'https://i.pinimg.com/1200x/4f/a5/67/4fa567830f4f5986f09e83f237997ca2.jpg',
    ],
  },
  {
    room_number: '103C',
    room_type: 'Standard',
    price_per_night: 400000,
    facilities: ['WiFi', 'Fan'],
    availability: true,
    images: [
      'https://i.pinimg.com/1200x/22/30/87/2230877510df425423f57bb4ed4aa7b1.jpg',
    ],
  },
  {
    room_number: '201A',
    room_type: 'Suite',
    price_per_night: 1200000,
    facilities: ['WiFi', 'AC', 'TV', 'Bathtub', 'Kulkas', 'Living Room'],
    availability: true,
    images: [
      'https://i.pinimg.com/1200x/c3/dc/41/c3dc41570bddfb59007adc76a8127da9.jpg',
      'https://i.pinimg.com/1200x/0b/e5/e3/0be5e302f18b6fcf5f65b3706bc61d10.jpg',
    ],
  },
  {
    room_number: '202B',
    room_type: 'Economy',
    price_per_night: 300000,
    facilities: ['Fan'],
    availability: true,
    images: [
      'https://i.pinimg.com/1200x/ff/c7/8f/ffc78f918d22ea490b7012e7065bae69.jpg',
    ],
  },
  {
    room_number: '203C',
    room_type: 'Family',
    price_per_night: 950000,
    facilities: ['WiFi', 'AC', 'TV', '2 Queen Beds', 'Dining Table'],
    availability: true,
    images: [
      'https://i.pinimg.com/736x/dd/46/cf/dd46cf0f57e6791f5461c59f51a1de09.jpg',
      'https://i.pinimg.com/736x/06/7c/7e/067c7e23ea6f907c9a76f6c7d9191d79.jpg',
      'https://i.pinimg.com/736x/d0/cb/28/d0cb2870d8782d2d87d375dbacf9a81d.jpg',
    ],
  },
];

async function seedAll() {
  try {
    await mongoose.connect('mongodb://localhost:27017/hotel_db');
    await roomModel.deleteMany();
    await roomModel.insertMany(rooms);
    console.log('✅ Data kamar berhasil dimasukkan!');

    // Seed Admin
    const existingAdmin = await userModel.findOne({ email: 'admin@hotel.com' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const adminUser = new userModel({
        name: 'Admin Hotel',
        email: 'admin@hotel.com',
        password: hashedPassword,
        role: 'admin',
      });
      await adminUser.save();
      console.log('✅ Admin berhasil dibuat!');
    } else {
      console.log('ℹ️ Admin sudah ada, tidak dibuat ulang.');
    }

    process.exit();
  } catch (error) {
    console.error('❌ Gagal melakukan seed:', error);
    process.exit(1);
  }
}

seedAll();
