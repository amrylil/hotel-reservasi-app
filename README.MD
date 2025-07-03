# 🏨 Sistem Aplikasi Reservasi Hotel Online

**Sistem Reservasi Hotel Online - Kelompok 4**

## 👨‍💻 Tim Pengembang

Proyek ini dikembangkan oleh **Kelompok 4** yang terdiri dari:

| NIM    | Nama Lengkap          |
| ------ | --------------------- |
| 222278 | Muh. Rezky Ramadhana  |
| 222283 | Siti Fatimah Azzahra  |
| 222277 | Ulil Amry Al Qadri😎  |
| 222280 | Abdullah Amar Azzikra |
| 222264 | M. Habil Azzikri🥶    |
| 222308 | Nur Afifah Najwa      |

## 🛠️ Teknologi yang Digunakan

![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

API ini dibangun menggunakan tumpukan teknologi yang andal dan modern:

- **Node.js** - Runtime JavaScript untuk backend
- **Express.js** - Framework web untuk Node.js
- **MongoDB** - Database NoSQL untuk penyimpanan data
- **Mongoose** - ODM (Object Document Mapper) untuk MongoDB
- **Redis** - In-memory database untuk caching
- **JavaScript** - Bahasa pemrograman utama
- **JWT** - JSON Web Tokens untuk autentikasi

## 📝 Deskripsi Proyek

Sistem Reservasi Hotel Online adalah backend API yang menangani semua logika bisnis untuk aplikasi pemesanan hotel. API ini dirancang untuk memberikan performa tinggi dengan implementasi caching menggunakan Redis, keamanan yang kuat dengan JWT authentication, dan skalabilitas yang baik dengan arsitektur yang terstruktur.

## ✨ Fitur Utama

### 🔐 Autentikasi & Otorisasi

- Registrasi dan login menggunakan email & password
- Proteksi route dengan middleware JWT
- Role-based access (`admin` dan `user`)

---

### 🛌 Manajemen Kamar & Tipe Kamar

- CRUD Tipe Kamar (Standard, Deluxe, Suite, dll)
- CRUD Data Kamar (Nomor kamar, tipe, harga, fasilitas)
- Atur ketersediaan kamar (`availability: true/false`)

---

### 📅 Sistem Reservasi

- Pemesanan kamar dengan tanggal check-in & check-out
- Validasi ketersediaan kamar real-time
- Riwayat reservasi pengguna
- Fitur pembatalan reservasi

---

### 💳 Pembayaran (Simulasi)

- Status pembayaran: `unpaid`, `paid`, `cancelled`
- Input nominal & tanggal pembayaran

---

### 🔍 Pencarian & Filter Kamar

- Pencarian berdasarkan:
  - Tanggal check-in dan check-out
- Filter berdasarkan:
  - Tipe kamar
  - Fasilitas (AC, WiFi, TV, dll)
  - Harga per malam
- Sorting berdasarkan harga (rendah ke tinggi, tinggi ke rendah)

---

### ⚡ Redis Caching

- Caching tipe kamar & daftar kamar yang sering diakses
- Cache hasil pencarian berdasarkan query
- Cache invalidation saat data berubah

---

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

### 3. Jalankan Aplikasi

**Development Mode:**

```bash
npm run dev
```

**Production Mode:**

```bash
npm start
```

- Server Backend akan berjalan di `http://localhost:5000`
- Server Aplikasi akan berjalan di `http://localhost:5173`

## 📁 Struktur Proyek

```
HOTEL_RESERVASI_APP/
├── api/                    # Direktori untuk semua kode backend (sisi server)
│   ├── src/                # Folder utama untuk kode sumber backend
│   │   ├── config/         # Konfigurasi (database, Redis, dll.)
│   │   ├── controllers/    # Penangan request HTTP (Request handlers)
│   │   ├── dtos/           # Data Transfer Objects
│   │   ├── helpers/        # Fungsi-fungsi bantuan
│   │   ├── middlewares/    # Middleware untuk Express.js
│   │   ├── models/         # Skema database (Mongoose schemas)
│   │   ├── routes/         # Definisi rute atau endpoint API
│   │   ├── services/       # Logika bisnis utama aplikasi
│   │   └── utils/          # Fungsi-fungsi utilitas
│   ├── app.js              # Konfigurasi utama aplikasi Express
│   ├── server.js           # Titik masuk (entry point) untuk memulai server
│   ├── .env                # Menyimpan variabel lingkungan (environment variables)
│   ├── .gitignore          # Aturan ignore Git untuk direktori API
│   └── package.json        # Dependensi & skrip khusus untuk backend
├── node_modules/           # Direktori semua dependensi proyek
├── view/                   # Direktori untuk semua kode frontend (sisi klien)
├── package-lock.json       # Mengunci versi pasti dari setiap dependensi
├── package.json            # Dependensi & skrip untuk tingkat atas proyek
└── README.md               # File dokumentasi utama proyek

```

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/register` - Registrasi pengguna baru
- `POST /api/auth/login` - Login pengguna
- `POST /api/auth/logout` - Logout pengguna

### Kamar

- `GET /api/rooms` - Daftar semua kamar
- `GET /api/rooms/:id` - Detail kamar
- `POST /api/rooms` - Tambah kamar baru (Admin)
- `PUT /api/rooms/:id` - Update kamar (Admin)
- `DELETE /api/rooms/:id` - Hapus kamar (Admin)

### Reservarsi

- `GET /api/reservations` - Riwayat booking pengguna
- `POST /api/reservations` - Buat booking baru
- `GET /api/reservations/:id` - Detail booking
- `PUT /api/reservations/:id/cancel` - Batalkan booking

### Pembayaran

- `GET /api/payment` - Riwayat pembayaran pengguna
- `POST /api/payment` - Melakukan pembayaran
- `GET /api/payment/:id` - Detail pembayaran

## 🤝 Kontribusi

Proyek ini dikembangkan sebagai tugas akademik oleh **Kelompok 4**. Kontribusi dari semua anggota tim sangat dihargai untuk pengembangan dan perbaikan sistem.

### Guidelines Kontribusi:

1. Buat branch baru untuk setiap fitur
2. Ikuti konvensi penamaan yang konsisten
3. Tambahkan dokumentasi untuk fitur baru
4. Test sebelum merge ke main branch

## 📄 Lisensi

Proyek ini dibuat untuk keperluan akademik dan pembelajaran. Semua hak cipta dimiliki oleh anggota **Kelompok 4**.

## 📞 Kontak

Untuk pertanyaan atau dukungan teknis, silakan hubungi salah satu anggota tim pengembang.

---

**© 2025 Kelompok 4 - Sistem Aplikasi Reservasi Hotel Online**
