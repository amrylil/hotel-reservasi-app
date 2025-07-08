# 🏨 Sistem Aplikasi Reservasi Hotel Online

**Sistem Reservasi Hotel Online - Kelompok 4**

## 👨‍💻 Tim Pengembang

Proyek ini dikembangkan oleh **Kelompok 4** yang terdiri dari:

| NIM    | Nama Lengkap             |
| ------ | ------------------------ |
| 222278 | Muh. Rezky Ramadhana 😁  |
| 222283 | Siti Fatimah Azzahra 🧕  |
| 222277 | Ulil Amry Al Qadri 😎    |
| 222280 | Abdullah Amar Azzikra 😅 |
| 222264 | M. Habil Azzikri 🥶      |
| 222308 | Nur Afifah Najwa 🧕      |

## 🛠️ Teknologi yang Digunakan

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Midtrans](https://img.shields.io/badge/Midtrans-02B2AC?style=for-the-badge&logo=midtrans&logoColor=white)

## 📝 Deskripsi Proyek

Sistem Reservasi Hotel Online adalah aplikasi web fullstack yang menangani semua aspek pemesanan hotel, mulai dari pencarian kamar hingga pembayaran. Aplikasi ini dirancang dengan arsitektur modern yang memisahkan frontend dan backend, memberikan user experience yang responsif dan performa tinggi dengan implementasi caching menggunakan Redis.

## ✨ Fitur Utama

### 🔐 Autentikasi & Otorisasi

- Login dan registrasi pengguna
- Role-based access control (admin & customer)
- JWT authentication untuk keamanan

### 🛌 Manajemen Kamar Hotel

- CRUD (Create, Read, Update, Delete) data kamar
- Manajemen tipe kamar dan fasilitas
- Upload gambar kamar
- Pengelolaan harga dan availability

### 📅 Sistem Reservasi

- Pemesanan kamar dengan pilihan tanggal check-in dan check-out
- Validasi ketersediaan kamar
- Konfirmasi booking otomatis
- Status reservasi real-time

### 💳 Sistem Pembayaran

- Integrasi dengan **Midtrans Payment Gateway**
- Mendukung berbagai metode pembayaran (kartu kredit, e-wallet, bank transfer)
- Sistem pembayaran yang aman dan terpercaya
- Notifikasi pembayaran otomatis

### 🔍 Pencarian & Filter Kamar

- Filter kamar berdasarkan tanggal check-in dan check-out
- Pencarian berdasarkan tipe kamar
- Filter harga dan fasilitas
- Sorting berdasarkan harga dan rating

### 📊 Riwayat Transaksi

- Melihat riwayat pemesanan
- Detail transaksi dan status pembayaran
- Download invoice/receipt
- Tracking status reservasi

### 📱 User Interface

- Responsive design untuk semua device
- Modern dan user-friendly interface
- Real-time updates menggunakan WebSocket
- Loading states dan error handling

## 📋 Prerequisites

Pastikan sistem Anda memiliki:

- **Node.js** v16 atau lebih baru
- **MongoDB** (local atau cloud)
- **Redis** server
- **npm** atau **yarn** package manager
- **Midtrans Account** untuk payment gateway

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

### 3. Seed Database

Jalankan perintah berikut untuk mengisi database dengan data sampel:

```bash
node api/seedAll.js
```

### 4. Jalankan Aplikasi

**Development Mode:**

```bash
npm run dev
```

- **Frontend** akan berjalan di `http://localhost:5173`
- **Backend API** akan berjalan di `http://localhost:5000`

## 💳 Testing Pembayaran

Untuk melakukan testing pembayaran, gunakan **Midtrans Simulator**:

**🔗 [Midtrans Payment Simulator](https://simulator.sandbox.midtrans.com/)**

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
│   ├── seedAll.js          # Database seeder
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

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/login` - Login pengguna
- `POST /api/auth/register` - Registrasi pengguna
- `POST /api/auth/logout` - Logout pengguna

### Rooms

- `GET /api/rooms` - Mendapatkan daftar kamar
- `POST /api/rooms` - Membuat kamar baru (admin only)
- `PUT /api/rooms/:id` - Update kamar (admin only)
- `DELETE /api/rooms/:id` - Hapus kamar (admin only)

### Reservations

- `POST /api/reservations` - Membuat reservasi
- `GET /api/reservations` - Mendapatkan riwayat reservasi
- `GET /api/reservations/:id` - Detail reservasi

### Payments

- `POST /api/payments/create` - Membuat pembayaran
- `POST /api/payments/notification` - Webhook Midtrans
- `GET /api/payments/status/:orderId` - Status pembayaran

## 🤝 Kontribusi

Proyek ini dikembangkan sebagai tugas akademik oleh **Kelompok 4**. Kontribusi dari semua anggota tim sangat dihargai untuk pengembangan dan perbaikan sistem.

## 📄 Lisensi

Proyek ini dibuat untuk keperluan akademik dan pembelajaran. Semua hak cipta dimiliki oleh anggota **Kelompok 4**.

## 📞 Kontak

Untuk pertanyaan atau dukungan teknis, silakan hubungi salah satu anggota tim pengembang.

---

**© 2025 Kelompok 4 - Sistem Aplikasi Reservasi Hotel Online**

_Dibuat dengan ❤️ menggunakan React, Express.js, MongoDB, dan Midtrans_
