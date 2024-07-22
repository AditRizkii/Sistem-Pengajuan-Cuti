<h1 align="center">Sistem Pengajuan Cuti Pegawai</h1>
<p align="center"> 
  <img src="https://img.shields.io/badge/React-^18.3.1-blue" alt="React JS">
  <img src="https://img.shields.io/badge/Express-^4.19.2-brightgreen" alt="Express JS">
  <img src="https://img.shields.io/badge/pdfreact-^3.4.4-red" alt="PDF React">
</p>
<br>

Sistem Pengajuan Cuti Pegawai adalah aplikasi yang dirancang untuk mempermudah pegawai dalam mengajukan cuti dan mengelola data cuti dengan lebih efisien. Aplikasi ini melayani dua jenis pengguna: pegawai dan admin. Pegawai dapat mengajukan cuti, melihat sisa cuti, serta mencetak dan mengunduh surat izin cuti. Admin memiliki wewenang untuk mengelola data pegawai, kepala stasiun, serta data cuti tahunan yang dimiliki oleh pegawai.

## ✨ Fitur

- **🔑 Halaman Login:** Tersedia untuk pegawai dan admin untuk masuk ke dalam sistem.
- **📄 Form Pengajuan Cuti:** Pegawai dapat mengisi data yang diperlukan dan melihat sisa cuti.
- **📋 Detail Pengajuan Cuti:** Menampilkan data pengajuan untuk verifikasi dan opsi mencetak/unduh surat izin cuti.
- **📝 PDF Surat Izin Cuti:** Surat izin cuti otomatis yang dapat diunduh atau dicetak.
- **📊 Dashboard Admin:** Menampilkan rangkuman informasi pegawai, cuti, dan opsi pengelolaan (add, edit, delete).
- **📌 Halaman Konstan:** Mengelola informasi tetap seperti kepala kantor dan data lainnya.
- **👥 Manajemen Pengguna:** Menambah, mengedit, dan menghapus data pegawai.

## 📋 Prasyarat

Pastikan Anda telah menginstal software berikut sebelum memulai:

- [Node.js](https://nodejs.org/) 🟢
- [XAMPP](https://www.apachefriends.org/index.html) 🐘

## ⚙️ Instalasi

1. Clone repositori ini ke komputer Anda:

    ```bash
    git clone https://github.com/AditRizkii/Sistem-Pengajuan-Cuti.git
    ```

2. Masuk ke direktori proyek:

    ```bash
    cd Sistem-Pengajuan-Cuti
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Aktifkan XAMPP dan buat database dengan nama `auth_db`.

5. Buka file `backend/index.js` dan uncomment bagian berikut:

    ```javascript
    (async () => {
      await db.sync();
    })();
    ```

## 🚀 Menjalankan Aplikasi

Untuk menjalankan aplikasi dalam mode pengembangan, gunakan perintah berikut:

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`.

## 🗂️ Struktur Proyek

- `frontend/`: Berisi kode frontend aplikasi.
- `backend/`: Berisi kode backend aplikasi.

## 👥 Kontributor

- **Akhyar** - [GitHub](https://github.com/Akhyarrrrr)
- **Aditya Rizki Ramadhan** - [GitHub](https://github.com/AditRizkii)
