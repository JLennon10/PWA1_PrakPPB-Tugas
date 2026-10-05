# Bore & Barrel — Tugas Praktikum PPB

Katalog simulasi berbasis React + Vite dengan dukungan Progressive Web App (PWA).
Pengembangan dari proyek awal [Redzzaja/PWA1_PrakPPB](https://github.com/Redzzaja/PWA1_PrakPPB).

## Fitur tugas

- Gambar kartu memiliki tinggi tetap dan `object-fit: contain` agar rasio gambar tidak mengubah layout.
- Pencarian nama produk tanpa membedakan huruf besar/kecil, dikombinasikan dengan filter jenis.
- Tombol Nama/Harga dan toggle arah A–Z/Z–A atau Termurah/Termahal.
- Tombol tambah pada setiap kartu; badge menunjukkan jumlah seluruh unit di keranjang.
- Kontrol kuantitas, hapus produk, subtotal per produk, dan total harga otomatis.
- Tampilan hasil kosong, reset pencarian/filter, dan keranjang kosong.

## Menjalankan di VS Code

Gunakan Node.js 24 seperti lingkungan pengujian, kemudian:

```bash
npm ci
npm run dev
```

Pada terminal PowerShell yang memblokir `npm.ps1`, gunakan `npm.cmd ci` dan `npm.cmd run dev`.
Buka URL Local yang ditampilkan Vite. Port default 5173; Vite memilih port lain jika port tersebut sudah dipakai.

Task VS Code tersedia melalui **Terminal → Run Task → PWA: Run development server**.
Build produksi dapat dijalankan dengan **Ctrl+Shift+B**.

```bash
npm test         # tes pencarian/filter/sort dan perhitungan keranjang
npm run lint    # pemeriksaan oxlint
npm run build   # build produksi + manifest dan service worker
npm run preview # jalankan hasil build
```

## Dokumentasi hasil

[Laporan langkah pengerjaan, screenshot, dan analisis singkat](docs/LAPORAN_TUGAS.md).

Keranjang menyimpan data selama aplikasi terbuka dan tetap tersedia saat berpindah tab.
Reload mengosongkan keranjang. Harga mengikuti data awal dalam USD. Aplikasi ini merupakan simulasi praktikum tanpa pembayaran.
