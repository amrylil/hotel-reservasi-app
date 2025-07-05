# 🏨 Sistem Aplikasi Reservasi Hotel Online

**Sistem Reservasi Hotel Online - Kelompok 4**

## 👨‍💻 Tim Pengembang

Proyek ini dikembangkan oleh **Kelompok 4** yang terdiri dari:

| NIM    | Nama Lengkap             |
| ------ | ------------------------ |
| 222278 | Muh. Rezky Ramadhana 🚀  |
| 222283 | Siti Fatimah Azzahra 🌟  |
| 222277 | Ulil Amry Al Qadri 😎    |
| 222280 | Abdullah Amar Azzikra 🎯 |
| 222264 | M. Habil Azzikri 🥶      |
| 222308 | Nur Afifah Najwa 💎      |

## 🛠️ Teknologi yang Digunakan

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

Aplikasi ini dibangun menggunakan tumpukan teknologi yang andal dan modern:

### Frontend

- **React** - Library JavaScript untuk membangun user interface
- **Vite** - Build tool yang cepat untuk development
- **TailwindCSS** - Framework CSS utility-first
- **React Router** - Routing untuk aplikasi React
- **Axios** - HTTP client untuk komunikasi dengan API

### Backend

- **Node.js** - Runtime JavaScript untuk backend
- **Express.js** - Framework web untuk Node.js
- **MongoDB** - Database NoSQL untuk penyimpanan data
- **Mongoose** - ODM (Object Document Mapper) untuk MongoDB
- **Redis** - In-memory database untuk caching
- **JWT** - JSON Web Tokens untuk autentikasi

## 📝 Deskripsi Proyek

Sistem Reservasi Hotel Online adalah aplikasi web fullstack yang menangani semua aspek pemesanan hotel, mulai dari pencarian kamar hingga pembayaran. Aplikasi ini dirancang dengan arsitektur modern yang memisahkan frontend dan backend, memberikan user experience yang responsif dan performa tinggi dengan implementasi caching menggunakan Redis.

## ✨ Fitur Utama

### 🔐 Autentikasi & Otorisasi

- Registrasi dan login dengan validasi email & password
- Dashboard pengguna dengan role-based access
- Proteksi route dengan JWT authentication
- Sistem logout yang aman

### 🛌 Manajemen Kamar & Tipe Kamar

- Katalog kamar dengan gambar dan deskripsi lengkap
- Berbagai tipe kamar (Standard, Deluxe, Suite, Presidential)
- Informasi fasilitas kamar (AC, WiFi, TV, Minibar, dll)
- Sistem ketersediaan kamar real-time

### 📅 Sistem Reservasi

- Pemesanan kamar dengan calendar picker
- Validasi ketersediaan kamar berdasarkan tanggal
- Riwayat reservasi dengan status tracking
- Fitur pembatalan dan modifikasi reservasi
- Konfirmasi pemesanan via email

### 💳 Sistem Pembayaran

- Multiple payment methods (Credit Card, Bank Transfer, E-wallet)
- Simulasi pembayaran dengan status tracking
- Invoice dan receipt digital
- Riwayat transaksi lengkap

### 🔍 Pencarian & Filter Kamar

- Pencarian berdasarkan tanggal check-in dan check-out
- Filter berdasarkan tipe kamar, fasilitas, dan harga
- Sorting berdasarkan harga, rating, dan popularitas
- Hasil pencarian dengan paginasi

### 📱 User Interface

- Design responsif untuk desktop dan mobile
- Dashboard admin untuk manajemen hotel
- Interface user yang intuitif dan modern
- Loading states dan error handling

### ⚡ Performance & Caching

- Redis caching untuk data yang sering diakses
- Optimasi query database
- Lazy loading untuk gambar
- API response caching

## 📋 Prerequisites

Pastikan sistem Anda memiliki:

- **Node.js** v16 atau lebih baru
- **MongoDB** (local atau cloud)
- **Redis** server
- **npm** atau **yarn** package manager

## 🚀 Instalasi dan Penggunaan

### 1. Clone Repository

```bash
git clone https://github.com/amrylil/hotel-reservasi-app.git
cd hotel-reservation-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Buat file `.env` di direktori `api/` dengan konfigurasi berikut:

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/hotel_reservation
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Server
PORT=5000
NODE_ENV=development
```

### 4. Jalankan Aplikasi

**Development Mode:**

```bash
npm run dev
```

**Production Mode:**

```bash
npm start
```

- **Frontend** akan berjalan di `http://localhost:5173`
- **Backend API** akan berjalan di `http://localhost:5000`

## 📁 Struktur Proyek

```
HOTEL_RESERVASI_APP/
├── api/                    # Backend API (Server-side)
│   ├── src/                # Source code backend
│   │   ├── config/         # Database & Redis configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── dtos/           # Data Transfer Objects
│   │   ├── helpers/        # Helper functions
│   │   ├── middlewares/    # Express middlewares
│   │   ├── models/         # Database schemas
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   ├── app.js              # Express app configuration
│   ├── server.js           # Server entry point
│   ├── .env                # Environment variables
│   └── package.json        # Backend dependencies
├── view/                   # Frontend React App (Client-side)
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   ├── contexts/       # React contexts
│   │   └── assets/         # Static assets
│   ├── public/             # Public assets
│   ├── index.html          # HTML template
│   ├── vite.config.js      # Vite configuration
│   └── package.json        # Frontend dependencies
├── package.json            # Root package.json
└── README.md               # Project documentation
```

## 🎯 Fitur Aplikasi

### 👤 Untuk Pengguna

- Registrasi dan login account
- Browse dan cari kamar hotel
- Lihat detail kamar dengan foto dan fasilitas
- Booking kamar dengan pilihan tanggal
- Kelola reservasi (lihat, batalkan, modifikasi)
- Proses pembayaran dan lihat invoice
- Riwayat transaksi dan booking

### 👨‍💼 Untuk Admin

- Dashboard admin dengan analytics
- Manajemen kamar (tambah, edit, hapus)
- Manajemen tipe kamar dan fasilitas
- Lihat semua reservasi dan pembayaran
- Kelola ketersediaan kamar
- Laporan revenue dan occupancy

## 🤝 Kontribusi

Proyek ini dikembangkan sebagai tugas akademik oleh **Kelompok 4**. Kontribusi dari semua anggota tim sangat dihargai untuk pengembangan dan perbaikan sistem.

### Guidelines Kontribusi:

1. Buat branch baru untuk setiap fitur
2. Ikuti konvensi penamaan yang konsisten
3. Tambahkan dokumentasi untuk fitur baru
4. Test sebelum merge ke main branch
5. Gunakan commit message yang jelas dan deskriptif

## 📸 Screenshots

> _Screenshots aplikasi akan ditambahkan setelah development selesai_

## 🔮 Pengembangan Selanjutnya

- [ ] Integrasi payment gateway real
- [ ] Sistem review dan rating
- [ ] Push notification
- [ ] Mobile app dengan React Native
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

## 📄 Lisensi

Proyek ini dibuat untuk keperluan akademik dan pembelajaran. Semua hak cipta dimiliki oleh anggota **Kelompok 4**.

## 📞 Kontak

Untuk pertanyaan atau dukungan teknis, silakan hubungi salah satu anggota tim pengembang.

---

**© 2025 Kelompok 4 - Sistem Aplikasi Reservasi Hotel Online**

_Dibuat dengan ❤️ menggunakan React, Express.js, dan MongoDB_
