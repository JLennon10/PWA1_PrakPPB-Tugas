# 5.5 Hasil Percobaan dan Analisis

Percobaan dilakukan pada aplikasi Bore & Barrel berbasis React dan Vite. Pengamatan meliputi tampilan halaman Catalog, Contact, About, popup detail produk, serta hasil konfigurasi service worker. Pembahasan berikut berfokus pada hasil yang diperoleh dan hubungannya dengan cara kerja aplikasi. Nomor gambar 5.xx disesuaikan dengan urutan gambar pada laporan.

## 5.5.1 Halaman Catalog

Halaman Catalog menampilkan enam produk yang terdiri atas jenis Pistol, Rifle, dan Shotgun. Setiap kartu memuat gambar, nama, jenis, kaliber, serta harga produk. Data diperoleh dari file guns.js dan ditampilkan melalui komponen GunCard pada Catalog.jsx. Bagian kode utama untuk menampilkan daftar adalah:

```jsx
{products.map((gun) => (
  <GunCard key={gun.name} gun={gun} onAdd={onAdd} />
))}
```

Berdasarkan hasil percobaan, seluruh produk berhasil ditampilkan dan gambar pada kartu dapat dimuat. Penggunaan komponen yang sama membuat susunan informasi setiap produk konsisten. Pemisahan data dari tampilan juga memudahkan perubahan nama, harga, dan deskripsi produk tanpa mengubah struktur setiap kartu secara manual.

Pada hasil pengembangan tugas, tinggi area gambar ditetapkan 160px dengan object-fit: contain. Saat pengujian pada lebar browser 648px, keenam area gambar memiliki tinggi yang sama. Pengaturan tersebut menjaga keselarasan kartu karena tinggi gambar tidak mengikuti rasio asli berkas. Gambar tetap ditampilkan secara utuh di dalam area yang tersedia.

Pencarian dan filter juga diuji secara bersamaan. Kata pencarian gLoCk dengan pilihan Pistol menghasilkan satu produk, yaitu Glock 17. Ketika jenis diubah menjadi Rifle, tidak ada produk yang ditampilkan dan aplikasi memberikan pesan hasil kosong. Hasil ini menunjukkan bahwa pencarian nama dan filter jenis menggunakan kedua kriteria sekaligus. Pengurutan harga termahal menempatkan Desert Eagle ($1,599) pada urutan pertama, sedangkan pengurutan termurah menempatkan Mossberg 500 ($399) pada urutan pertama. Dengan demikian, katalog dapat menyesuaikan daftar dengan masukan pengguna tanpa mengubah data produk asli.

*Gambar 5.xx Hasil tampilan halaman Catalog*

## 5.5.2 Halaman Contact

Halaman Contact menampilkan alamat toko, jadwal operasional, dan nomor telepon. Informasi yang ditampilkan adalah alamat 123 Range Road, jadwal Selasa sampai Sabtu pukul 10 sampai 18, serta nomor telepon (555) 010-0100. Halaman ini dibuat pada Contact.jsx dan ditampilkan berdasarkan nilai tab pada App.jsx:

```jsx
{tab === 'Contact' && <Contact />}
```

Berdasarkan hasil percobaan, pemilihan tombol Contact berhasil mengganti isi utama aplikasi menjadi informasi kontak. Header dan footer tetap ditampilkan karena keduanya berada di luar kondisi pemilihan halaman. Susunan tersebut membuat tampilan aplikasi tetap konsisten selama pengguna berpindah halaman.

Perpindahan halaman dilakukan melalui perubahan state tab sehingga tidak membutuhkan pemuatan ulang seluruh aplikasi. Informasi kontak berupa teks statis, sehingga tidak memerlukan pengambilan data dari layanan luar. Namun, halaman ini belum menyediakan formulir atau fungsi pengiriman pesan. Fungsinya pada percobaan terbatas pada penyampaian informasi kontak toko.

*Gambar 5.xx Hasil tampilan halaman Contact*

## 5.5.3 Halaman About

Halaman About menampilkan judul A one-room armory. dan penjelasan singkat mengenai toko Bore & Barrel. Informasi tersebut ditempatkan pada komponen About.jsx. Pemilihan tampilan dilakukan melalui kondisi berikut:

```jsx
{tab === 'About' && <About />}
```

Berdasarkan hasil percobaan, tombol About berhasil menampilkan deskripsi toko pada bagian utama aplikasi. Perubahan ini menggunakan mekanisme navigasi yang sama dengan halaman Contact, sehingga pengguna dapat kembali ke Catalog melalui tombol pada header.

Halaman About memberikan konteks mengenai toko yang produknya ditampilkan pada katalog. Pemisahan informasi ke halaman tersendiri menjaga agar halaman katalog tetap berfokus pada daftar produk. Dari sisi pengelolaan aplikasi, isi About dapat diubah tanpa mengubah komponen kartu maupun data produk. Pada hasil percobaan ini, halaman About masih berisi informasi toko; identitas anggota kelompok belum ditambahkan.

*Gambar 5.xx Hasil tampilan halaman About*

## 5.5.4 Popup Detail Produk

Popup detail digunakan untuk menampilkan informasi produk secara lebih lengkap. Fitur ini dibuat pada GunCard.jsx menggunakan elemen dialog. Ketika kartu dipilih, aplikasi membuka dialog melalui:

```jsx
onClick={() => popup.current.showModal()}
```

Berdasarkan hasil percobaan, pemilihan kartu Glock 17 menampilkan popup yang memuat gambar, nama produk, jenis Pistol, kaliber 9mm, harga $599, dan deskripsi produk. Informasi yang muncul sesuai dengan data kartu yang dipilih karena kartu dan popup menggunakan objek produk yang sama. Dengan demikian, detail tidak perlu ditulis ulang sebagai data terpisah.

Popup dapat ditutup melalui tombol Close maupun dengan menekan area di luar dialog. Setelah popup ditutup, pengguna kembali melihat katalog tanpa berpindah halaman. Cara ini memungkinkan informasi ringkas tetap berada pada kartu, sedangkan deskripsi yang lebih panjang hanya ditampilkan ketika dibutuhkan.

Pada pengembangan tugas, tombol Tambah ke keranjang ditempatkan terpisah dari tombol pembuka detail. Pengujian menunjukkan bahwa produk dapat ditambahkan berulang kali dan kuantitasnya digabungkan dalam keranjang. Dua Glock 17 dan satu AK-47 menghasilkan badge tiga item serta total $2,097. Pemisahan kedua tombol membuat aksi melihat detail dan menambah produk memiliki fungsi yang jelas.

*Gambar 5.xx Hasil tampilan popup detail produk*

## 5.5.5 Penggunaan Service Worker

Konfigurasi service worker dilakukan melalui plugin VitePWA pada vite.config.js. Bagian konfigurasi yang menentukan pembaruan dan berkas precache adalah:

```javascript
registerType: 'autoUpdate',
workbox: {
  globPatterns: ['**/*.{js,css,html,svg,png,webmanifest}'],
},
```

Berdasarkan hasil perintah npm run build, aplikasi berhasil menghasilkan manifest.webmanifest, sw.js, dan berkas Workbox. Proses build juga mencatat berkas yang dimasukkan ke dalam precache. Hasil tersebut menunjukkan bahwa konfigurasi PWA telah diproses dan service worker untuk hasil build berhasil dibuat.

Pola globPatterns mencakup berkas JavaScript, CSS, HTML, SVG, PNG, dan manifest. Berkas tersebut berkaitan dengan struktur halaman, tampilan, serta gambar produk. Penyertaan aset ke dalam precache mendukung penyediaan berkas aplikasi melalui cache setelah service worker hasil build aktif dan pemasangan cache selesai. Sementara itu, registerType: autoUpdate mengatur pembaruan service worker secara otomatis ketika versi baru tersedia.

Pembuatan berkas service worker belum cukup untuk membuktikan bahwa seluruh aplikasi dapat digunakan tanpa jaringan. Pada percobaan yang sudah dilakukan, pengujian pemutusan jaringan belum dijalankan. Pembuktian penggunaan offline perlu dilakukan dengan membuka hasil build melalui npm run preview, memastikan service worker aktif pada browser, kemudian menonaktifkan jaringan dan memuat ulang aplikasi. Oleh karena itu, hasil yang dapat dinyatakan pada tahap ini adalah keberhasilan konfigurasi dan pembuatan service worker, sedangkan kemampuan offline masih perlu diuji.

*Gambar 5.xx Status service worker pada browser*

Repository hasil: [JLennon10/PWA1_PrakPPB-Tugas](https://github.com/JLennon10/PWA1_PrakPPB-Tugas).
