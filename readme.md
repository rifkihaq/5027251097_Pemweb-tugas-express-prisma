# Tugas API Daftar Produk (ExpressJS)

## Petunjuk Menjalankan Program
1. Buka terminal pada direktori folder projek ini.
2. Jalankan arahan `npm install` untuk memasang semua kebergantungan pakej (dependencies).
3. Jalankan arahan `npm run dev` untuk memulakan pelayan (server) Express.
4. Pelayan akan berjalan pada alamat `http://localhost:3000`.

## Daftar Endpoint API
Berikut adalah senarai endpoint yang telah diimplementasikan berserta pemisahan route dan controller:

1. **Mendapatkan Semua Produk**
   - **Method:** `GET`
   - **URL:** `/products`
   - **Hasil Diharapkan:** Status `200 OK` dan mengembalikan respons JSON tatasusunan (array) keseluruhan produk.

2. **Mendapatkan Produk Berdasarkan ID**
   - **Method:** `GET`
   - **URL:** `/products/:id`
   - **Hasil Diharapkan (Berjaya):** Status `200 OK` dan mengembalikan respons JSON objek produk yang sepadan dengan parameter ID.
   - **Hasil Diharapkan (Gagal):** Status `404 Not Found` berserta respons mesej JSON "produk tidak ditemukan" jika ID tiada dalam pangkalan data array.

3. **Menambah Produk Baharu**
   - **Method:** `POST`
   - **URL:** `/products`
   - **Body Request (Penerimaan JSON):**
     ```json
     {
       "name": "Nama Produk",
       "price": 10000
     }
     ```
   - **Hasil Diharapkan:** Status `201 Created` dan mengembalikan respons JSON data produk yang baru ditambah berserta janaan `id` baharu.