# REST API Manajemen Produk

REST API untuk manajemen data produk (CRUD) yang dibangun menggunakan **ExpressJS**, **TypeScript**, dan **Prisma ORM** dengan database **SQLite**.

**Nama:** <isi nama kamu>
**NIM:** <isi NIM kamu>
**Mata Kuliah / Tugas:** <isi nama mata kuliah / nomor tugas>

---

## 🚀 Teknologi yang Digunakan

| Teknologi | Keterangan |
|-----------|------------|
| Node.js & ExpressJS | Runtime dan framework server |
| TypeScript | Bahasa pemrograman |
| Prisma ORM | Pengelolaan database dan migrasi |
| SQLite | Database lokal (`dev.db`) |
| Postman | Pengujian endpoint |

---

## 🛠️ Instalasi & Menjalankan Program

### 1. Clone repository
```bash
git clone <link-repository-kamu>
cd tugas-express
```

### 2. Instal dependencies
```bash
npm install
```

### 3. Inisialisasi database (Prisma Migration)
Perintah ini membuat file `dev.db` berdasarkan skema di `prisma/schema.prisma`.
```bash
npx prisma migrate dev --name init
```

### 4. Jalankan server lokal
```bash
npm run dev
```
Server berjalan di **http://localhost:3000**.

### 5. (Opsional) Buka Prisma Studio
Untuk melihat isi database secara visual:
```bash
npx prisma studio
```

---

## 📌 Daftar Endpoint API

Base URL: `http://localhost:3000`

| Method | Endpoint | Deskripsi | Parameter / Body |
|--------|----------|-----------|------------------|
| GET | `/products` | Menampilkan seluruh data produk | - |
| GET | `/products/:id` | Menampilkan detail produk berdasarkan ID | URL Param: `id` |
| POST | `/products` | Membuat data produk baru | JSON: `{ "name": "...", "price": 10000 }` |
| PUT | `/products` | Mengubah data produk | JSON: `{ "id": 1, "name": "...", "price": 15000 }` |
| DELETE | `/products/:id` | Menghapus produk berdasarkan ID | URL Param: `id` |

### Contoh Request

**POST /products**
```json
{
  "name": "Kopi Susu",
  "price": 10000
}
```

**PUT /products**
```json
{
  "id": 1,
  "name": "Kopi Susu Gula Aren",
  "price": 15000
}
```

### Validasi
- `name` dan `price` **wajib diisi** pada request `POST` dan `PUT`.
- Request tanpa salah satu field tersebut akan ditolak dengan pesan kesalahan.

---

## 📄 Laporan Evidence (Pengujian)

Bukti pengujian menggunakan **Postman** dan perubahan data pada **Prisma Studio** dilampirkan dalam dokumen terpisah: **`Laporan_Evidence.pdf`**.

Laporan tersebut mencakup:

1. Kondisi database **sebelum** perubahan (*Before*).
2. Skenario **sukses** untuk seluruh endpoint (GET, POST, PUT, DELETE).
3. Skenario **kesalahan validasi** (contoh: POST/PUT tanpa parameter `name` atau `price`).
4. Kondisi database **setelah** perubahan (*After*).
