# 5.5 Hasil Percobaan dan Analisis

Bagian ini menjelaskan hasil aplikasi Bore & Barrel berdasarkan kode proyek yang sudah dijalankan. Setiap kode di bawah merupakan isi file lengkap, termasuk import dan export. Penomoran gambar menggunakan 5.xx agar dapat disesuaikan dengan urutan pada laporan.

## 5.5.1 Halaman Catalog

Halaman Catalog dibuat pada file Catalog.jsx untuk menampilkan daftar produk. Data produk disimpan pada guns.js, sedangkan pencarian, filter, pengurutan, dan perhitungan harga ditempatkan pada catalog.js. Komponen GunCard digunakan untuk menampilkan setiap produk.

**File src/pages/Catalog.jsx**

```jsx
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'
import { useState } from 'react'
import { selectProducts } from '../data/catalog.js'

function Catalog({ onAdd }) {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [direction, setDirection] = useState('asc')
  const products = selectProducts(GUNS, query, type, sortBy, direction)
  function reset() {
    setQuery(''); setType('All'); setSortBy('name'); setDirection('asc')
  }
  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed with its
          type, caliber, and price — nothing else.
        </p>
      </section>

      <section>
        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count" role="status">{products.length} dari {GUNS.length} produk</span>
        </div>
        <div className="catalog-tools">
          <label className="search-field">Cari nama produk
            <input type="search" placeholder="Contoh: Glock" value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
          <label>Jenis produk
            <select value={type} onChange={(event) => setType(event.target.value)}>
              <option value="All">Semua jenis</option>
              {[...new Set(GUNS.map((gun) => gun.type))].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <div className="sort-controls" role="group" aria-label="Urutkan katalog">
            <span>Urutkan berdasarkan</span>
            <div className="sort-buttons">
              <button type="button" aria-pressed={sortBy === 'name'} onClick={() => setSortBy('name')}>Nama</button>
              <button type="button" aria-pressed={sortBy === 'price'} onClick={() => setSortBy('price')}>Harga</button>
              <button type="button" className="direction-btn" aria-label="Balik arah pengurutan" onClick={() => setDirection((current) => current === 'asc' ? 'desc' : 'asc')}>
                {sortBy === 'name' ? (direction === 'asc' ? 'A–Z ↑' : 'Z–A ↓') : (direction === 'asc' ? 'Termurah ↑' : 'Termahal ↓')}
              </button>
            </div>
          </div>
        </div>
        <div className="catalog-summary"><span>{sortBy === 'name' ? 'Nama' : 'Harga'} · {direction === 'asc' ? 'Naik' : 'Turun'}</span>
          <button type="button" className="text-btn" onClick={reset}>Reset pencarian & filter</button></div>
        <ul className="stock">
          {products.map((gun) => <GunCard key={gun.name} gun={gun} onAdd={onAdd} />)}
        </ul>
        {products.length === 0 && <p className="empty-state">Tidak ada produk yang cocok. Coba nama atau jenis lain.</p>}
      </section>
    </>
  )
}

export default Catalog
```

**File src/data/guns.js**

```javascript
const GUNS = [
  {
    name: 'Glock 17',
    type: 'Pistol',
    caliber: '9mm',
    price: 599,
    image: '/guns/pistol.svg',
    description:
      'The duty pistol everything else is measured against. Polymer frame, 17-round magazine, striker-fired trigger. Safe, boring, and it always goes bang.',
  },
  {
    name: 'AK-47',
    type: 'Rifle',
    caliber: '7.62mm',
    price: 899,
    image: '/guns/rifle.svg',
    description:
      'Gas-operated, loose tolerances, and famously indifferent to mud. Seven decades of service and still the benchmark for a rifle that will not quit.',
  },
  {
    name: 'Remington 870',
    type: 'Shotgun',
    caliber: '12 Gauge',
    price: 449,
    image: '/guns/shotgun.svg',
    description:
      'Pump-action workhorse. Five shells in the tube, a receiver that has taken more abuse than most trucks, and a sound that ends arguments.',
  },
  {
    name: 'AR-15',
    type: 'Rifle',
    caliber: '5.56mm',
    price: 799,
    image: '/guns/rifle.svg',
    description:
      'Light-recoiling, endlessly modular, and accurate well past the range most shooters can hold. The platform you can rebuild with one tool.',
  },
  {
    name: 'Desert Eagle',
    type: 'Pistol',
    caliber: '.50 AE',
    price: 1599,
    image: '/guns/pistol.svg',
    description:
      'Gas-operated hand cannon. Three and a half pounds of chromed steel that fires a round most pistols would refuse. Subtle it is not.',
  },
  {
    name: 'Mossberg 500',
    type: 'Shotgun',
    caliber: '12 Gauge',
    price: 399,
    image: '/guns/shotgun.svg',
    description:
      'The other pump gun. Twin action bars, a simple safety on the tang, and a price that leaves money for ammunition.',
  },
]

export default GUNS
```

**File src/data/catalog.js**

```javascript
export const money = (value) => new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD', maximumFractionDigits: 0,
}).format(value)

export function selectProducts(products, query, type, sortBy, direction) {
  const term = query.trim().toLowerCase()
  return products.filter((product) =>
    product.name.toLowerCase().includes(term) && (type === 'All' || product.type === type),
  ).sort((a, b) => {
    const comparison = sortBy === 'price'
      ? a.price - b.price || a.name.localeCompare(b.name)
      : a.name.localeCompare(b.name)
    return direction === 'asc' ? comparison : -comparison
  })
}

export function changeQuantity(cart, name, delta) {
  const quantity = (cart[name] || 0) + delta
  const next = { ...cart }
  if (quantity > 0) next[name] = quantity
  else delete next[name]
  return next
}

export function cartTotals(products, cart) {
  return products.reduce((total, product) => ({
    count: total.count + (cart[product.name] || 0),
    price: total.price + product.price * (cart[product.name] || 0),
  }), { count: 0, price: 0 })
}
```

Berdasarkan hasil percobaan, halaman katalog menampilkan enam produk yang memuat gambar, nama, jenis, kaliber, dan harga. Penggunaan map() membuat setiap produk ditampilkan dengan komponen yang sama. Kolom pencarian dapat dikombinasikan dengan pilihan jenis, sedangkan tombol Nama dan Harga menentukan urutan hasil. Pencarian gLoCk dengan jenis Pistol menghasilkan satu produk, sementara penggantian jenis menjadi Rifle menghasilkan daftar kosong. Hal ini menunjukkan bahwa kedua kriteria diterapkan secara bersamaan.

*Gambar 5.xx Hasil tampilan halaman Catalog*

## 5.5.2 Halaman Contact

Halaman Contact dibuat pada file Contact.jsx untuk menampilkan alamat toko, jadwal operasional, dan nomor telepon. Komponen ini dipanggil melalui App.jsx ketika pengguna memilih tombol Contact.

**File src/pages/Contact.jsx**

```jsx
function Contact() {
  return (
    <div className="page">
      <h1 className="display">Come by the shop.</h1>
      <p className="lede">
        123 Range Road. Open Tuesday to Saturday, 10 to 6. Call (555) 010-0100.
      </p>
    </div>
  )
}

export default Contact
```

Berdasarkan hasil percobaan, tombol Contact berhasil menampilkan alamat 123 Range Road, jadwal operasional Selasa sampai Sabtu pukul 10 sampai 18, dan nomor telepon toko. Perubahan nilai tab pada App.jsx menentukan tampilan yang aktif, sehingga perpindahan halaman dapat dilakukan tanpa memuat ulang seluruh aplikasi.

*Gambar 5.xx Hasil tampilan halaman Contact*

## 5.5.3 Halaman About

Halaman About dibuat pada file About.jsx untuk menampilkan informasi singkat mengenai toko Bore & Barrel. Komponen ini memuat judul dan deskripsi toko yang disusun menggunakan elemen div, h1, dan p.

**File src/pages/About.jsx**

```jsx
function About() {
  return (
    <div className="page">
      <h1 className="display">A one-room armory.</h1>
      <p className="lede">
        Bore &amp; Barrel sells a short, honest list of firearms. Each piece is priced
        from the bench — no markup theatre, no filler.
      </p>
    </div>
  )
}

export default About
```

Berdasarkan hasil percobaan, tombol About berhasil menampilkan judul A one-room armory. beserta deskripsi toko. Pemisahan halaman ke dalam komponen tersendiri membuat isi informasi dapat diperbarui tanpa mengubah kode katalog maupun kontak. Halaman ini berisi informasi toko dan belum menampilkan identitas anggota kelompok.

*Gambar 5.xx Hasil tampilan halaman About*

## 5.5.4 Popup Detail Produk

Popup detail dibuat pada file GunCard.jsx menggunakan elemen dialog. Referensi dialog disimpan dengan useRef(), kemudian showModal() dipanggil ketika kartu produk ditekan. Tombol tambah ke keranjang ditempatkan terpisah dari tombol detail.

**File src/components/GunCard.jsx**

```jsx
import { useRef } from 'react'
import { money } from '../data/catalog.js'

function GunCard({ gun, onAdd }) {
  const popup = useRef(null)

  return (
    <li className="card">
      <button type="button" className="card-btn" onClick={() => popup.current.showModal()} aria-label={`Detail ${gun.name}`}>
        <img className="card-img" src={gun.image} alt="" width="120" height="90" />
        <span className="name display">{gun.name}</span>
        <span className="type">
          {gun.type} · {gun.caliber}
        </span>
        <span className="price">{money(gun.price)}</span>
      </button>
      <button type="button" className="add-btn" onClick={() => onAdd(gun)} aria-label={`Tambah ${gun.name} ke keranjang`}>+ Tambah ke keranjang</button>

      <dialog
        className="popup"
        aria-label={`Detail ${gun.name}`}
        ref={popup}
        onClick={(e) => e.target === popup.current && popup.current.close()}
      >
        <img className="popup-img" src={gun.image} alt="" width="240" height="180" />
        <h3 className="display">{gun.name}</h3>
        <p className="type">
          {gun.type} · {gun.caliber} · <span className="price">${gun.price.toLocaleString()}</span>
        </p>
        <p>{gun.description}</p>
        <form method="dialog">
          <button className="popup-close">Close</button>
        </form>
      </dialog>
    </li>
  )
}

export default GunCard
```

Berdasarkan hasil percobaan, pemilihan kartu Glock 17 membuka dialog yang menampilkan gambar, nama, jenis, kaliber, harga, dan deskripsi produk. Dialog dapat ditutup melalui tombol Close atau dengan menekan area di luar dialog. Pengguna dapat membaca informasi lengkap tanpa berpindah dari katalog. Pemisahan tombol tambah menjaga agar penambahan produk ke keranjang tidak sekaligus membuka detail.

*Gambar 5.xx Hasil tampilan popup detail produk*

## 5.5.5 Penggunaan Service Worker

Konfigurasi PWA dibuat pada file vite.config.js menggunakan plugin VitePWA. Konfigurasi mencakup manifest aplikasi, ikon, tampilan standalone, pembaruan service worker, dan pola berkas yang dimasukkan ke dalam precache.

**File vite.config.js**

```javascript
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      manifest: {
        name: 'Bore & Barrel',
        short_name: 'Bore & Barrel',
        description: 'A small armory — pistols, rifles, and shotguns.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#f2f4f5',
        theme_color: '#f2f4f5',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webmanifest}'],
      },
    }),
  ],
})
```

Berdasarkan hasil npm run build, aplikasi berhasil menghasilkan manifest.webmanifest, sw.js, dan berkas Workbox. Penggunaan registerType: autoUpdate mengatur pembaruan service worker secara otomatis, sedangkan globPatterns menentukan berkas yang diproses untuk precache pada hasil build. Keberhasilan pembuatan berkas tersebut menunjukkan konfigurasi PWA berhasil diproses. Kemampuan offline belum dibuktikan melalui pengujian pemutusan jaringan; untuk membuktikannya, hasil build perlu dibuka, service worker dipastikan aktif, lalu aplikasi diuji tanpa jaringan.

*Gambar 5.xx Status service worker pada browser*

## Lampiran Kode Pendukung Lengkap

File berikut melengkapi komponen di atas. Kode ini mencakup penghubung halaman, navigasi, keranjang, tata letak, entry point, dan dependensi. Aset gambar tetap menggunakan folder public pada repository. Tidak ada bagian kode yang diganti dengan tanda elipsis.

## Penghubung Halaman dan State Keranjang

App.jsx menyimpan tab aktif dan data keranjang, kemudian meneruskan data serta fungsi melalui props.

**File src/App.jsx**

```jsx
import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import { cartTotals, changeQuantity } from './data/catalog.js'
import GUNS from './data/guns.js'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')
  const [cart, setCart] = useState({})
  const [notice, setNotice] = useState('')
  const totals = cartTotals(GUNS, cart)
  function addToCart(gun) {
    setCart((current) => changeQuantity(current, gun.name, 1))
    setNotice(`${gun.name} ditambahkan ke keranjang.`)
  }

  return (
    <div className="shell">
      <Header tab={tab} onTab={setTab} cartCount={totals.count} />

      <main className="main">
        <p className="cart-notice" role="status">{notice}</p>
        <div hidden={tab !== 'Catalog'}><Catalog onAdd={addToCart} /></div>
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
        {tab === 'Cart' && <Cart cart={cart} totals={totals}
          onChange={(name, delta) => {
            setCart((current) => changeQuantity(current, name, delta))
            setNotice(`Kuantitas ${name} diperbarui.`)
          }}
          onRemove={(name) => {
            setCart((current) => {
              const next = { ...current }
              delete next[name]
              return next
            })
            setNotice(`${name} dihapus dari keranjang.`)
          }} onBrowse={() => setTab('Catalog')} />}
      </main>

      <Footer />
    </div>
  )
}

export default App
```

Penempatan state di App membuat katalog, header, dan keranjang menggunakan data yang sama. Data keranjang tetap tersedia saat berpindah tab dan dikosongkan ketika aplikasi dimuat ulang.

## Navigasi dan Footer

Header.jsx menyediakan tombol navigasi dan badge keranjang. Footer.jsx menampilkan identitas toko.

**File src/components/Header.jsx**

```jsx
const NAV = ['Catalog', 'About', 'Contact']

function Header({ tab, onTab, cartCount }) {
  return (
    <header className="header">
      <span className="brand display">Bore &amp; Barrel</span>
      <nav className="nav" aria-label="Navigasi utama">
        {NAV.map((item) => (
          <button
            key={item}
            type="button"
            className={tab === item ? 'nav-link active' : 'nav-link'}
            onClick={() => onTab(item)}
          >
            {item}
          </button>
        ))}
        <button type="button" className={tab === 'Cart' ? 'nav-link active cart-link' : 'nav-link cart-link'}
          onClick={() => onTab('Cart')} aria-label={`Keranjang, ${cartCount} item`}>
          Keranjang <span className="cart-badge">{cartCount}</span>
        </button>
      </nav>
    </header>
  )
}

export default Header
```

**File src/components/Footer.jsx**

```jsx
function Footer() {
  return (
    <footer className="footer">
      <p>Bore &amp; Barrel, 123 Range Road</p>
    </footer>
  )
}

export default Footer
```

Badge menampilkan jumlah seluruh unit produk berdasarkan total kuantitas, bukan jumlah jenis produk.

## Halaman Keranjang

Cart.jsx menampilkan daftar produk yang dipilih, kontrol kuantitas, penghapusan, subtotal, serta total harga.

**File src/pages/Cart.jsx**

```jsx
import GUNS from '../data/guns.js'
import { money } from '../data/catalog.js'

export default function Cart({ cart, totals, onChange, onRemove, onBrowse }) {
  const items = GUNS.filter((gun) => cart[gun.name])
  return <section className="page cart-page">
    <h1 className="display">Keranjang belanja.</h1>
    <p className="lede">{totals.count} item · Katalog simulasi untuk tugas praktikum.</p>
    {items.length === 0 ? <div className="empty-state"><p>Keranjang masih kosong.</p>
      <button className="add-btn" onClick={onBrowse}>Lihat katalog</button></div> : <>
      <ul className="cart-items">{items.map((gun) => <li className="cart-row" key={gun.name}>
        <img src={gun.image} alt="" width="100" height="75" />
        <div className="cart-product"><h2>{gun.name}</h2><p>{gun.type} · {money(gun.price)} / item</p>
          <button className="text-btn" aria-label={`Hapus ${gun.name}`} onClick={() => onRemove(gun.name)}>Hapus</button></div>
        <div className="quantity" role="group" aria-label={`Kuantitas ${gun.name}`}>
          <button aria-label={`Kurangi ${gun.name}`} onClick={() => onChange(gun.name, -1)}>−</button>
          <span aria-label={`Jumlah ${gun.name}`}>{cart[gun.name]}</span>
          <button aria-label={`Tambah kuantitas ${gun.name}`} onClick={() => onChange(gun.name, 1)}>+</button>
        </div>
        <strong className="price cart-subtotal">{money(gun.price * cart[gun.name])}</strong>
      </li>)}</ul>
      <div className="cart-total"><span>Total harga</span><strong>{money(totals.price)}</strong></div>
      <button className="text-btn" onClick={onBrowse}>← Lanjut pilih produk</button>
    </>}
  </section>
}
```

Pada pengujian, dua Glock 17 dan satu AK-47 menghasilkan tiga item dengan total $2,097. Kontrol kuantitas dan penghapusan memperbarui subtotal serta total melalui state pada App.jsx.

## Tata Letak Aplikasi

App.css mengatur komponen aplikasi, sedangkan index.css mengatur warna, font, dan gaya global.

**File src/App.css**

```css
.display {
  font-family: 'Arial Narrow', 'Franklin Gothic Medium', 'Roboto Condensed', system-ui,
    sans-serif;
  font-stretch: condensed;
  letter-spacing: -0.01em;
}

.shell {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 14px 24px;
  background: var(--paper);
  border-bottom: 1px solid var(--line);
  position: sticky;
  top: 0;
  z-index: 10;
}

.brand {
  font-size: 19px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink);
}

.nav {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
}

.nav-link {
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 4px 0;
  color: var(--steel);
  font: inherit;
  cursor: pointer;
}

.nav-link:hover {
  color: var(--ink);
}

.nav-link.active {
  color: var(--ink);
  border-bottom-color: var(--brass);
}

.main {
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 24px 64px;
}

.masthead,
.page {
  padding: 64px 0 40px;
}

.masthead {
  border-bottom: 1px solid var(--line);
}

.masthead h1,
.page h1 {
  font-size: clamp(2.25rem, 6vw, 3.5rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 0 0 16px;
}

.lede {
  color: var(--steel);
  max-width: 46ch;
  margin: 0;
}

.list-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 32px 0 8px;
}

.list-head h2 {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.count {
  color: var(--steel);
  font-size: 0.9rem;
}

.stock {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  border: 1px solid var(--line);
  background: #fff;
}

.card-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 0 14px;
  background: #fff;
  border: none;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.card-btn:hover {
  background: #faf9f5;
}

.card-img {
  width: 100%;
  height: 160px;
  flex-shrink: 0;
  object-fit: contain;
  background: #e4e8ea;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--line);
}

.card .name,
.card .type,
.card .price {
  padding: 0 14px;
}

.card .name {
  min-height: 3.6rem;
}

.card .price {
  margin-top: auto;
}

.name {
  font-size: 1.2rem;
  font-weight: 700;
}

.price {
  color: var(--brass);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.type {
  color: var(--steel);
  font-size: 0.9rem;
}

.popup {
  width: min(420px, calc(100vw - 32px));
  padding: 0 0 20px;
  border: 1px solid var(--line);
  color: var(--ink);
  background: var(--paper);
}

.popup::backdrop {
  background: rgb(24 34 44 / 0.55);
}

.popup-img {
  width: 100%;
  height: 240px;
  object-fit: contain;
  background: #e4e8ea;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--line);
}

.popup h3,
.popup p,
.popup form {
  margin: 0 20px;
}

.popup h3 {
  font-size: 1.5rem;
}

.popup p {
  margin-top: 8px;
}

.popup-close {
  margin-top: 20px;
  padding: 8px 18px;
  border: 1px solid var(--ink);
  background: none;
  font: inherit;
  cursor: pointer;
}

.popup-close:hover {
  background: var(--ink);
  color: var(--paper);
}

.footer {
  margin-top: auto;
  padding: 20px 24px;
  text-align: center;
  background: var(--panel);
  color: var(--panel-text);
}

.footer p {
  margin: 0;
}

.cart-notice {
  color: var(--steel);
  font-size: 0.9rem;
  margin: 12px 0 0;
  min-height: 1.5em;
}

.masthead { padding-top: 32px; }
.catalog-tools {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 16px;
  padding: 18px;
  border: 1px solid var(--line);
  background: #fff;
}
.catalog-tools label, .sort-controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--steel);
}
.search-field { flex: 1; min-width: 180px; }
.catalog-tools input, .catalog-tools select, .sort-buttons button {
  padding: 10px 12px;
  border: 1px solid var(--line);
  background: var(--paper);
  font: inherit;
  color: var(--ink);
  min-height: 44px;
}
.catalog-tools input { width: 100%; }
.sort-buttons { display: flex; gap: 6px; flex-wrap: wrap; }
.sort-buttons button { cursor: pointer; }
.sort-buttons button[aria-pressed='true'] {
  background: var(--ink);
  color: #fff;
  border-color: var(--ink);
}
.direction-btn { min-width: 112px; }
.catalog-summary {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 0 20px;
  font-size: 0.85rem;
  color: var(--steel);
}
.text-btn {
  border: none;
  background: none;
  padding: 0;
  color: var(--steel);
  font: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}
.add-btn {
  border: 1px solid var(--ink);
  background: var(--ink);
  color: #fff;
  padding: 11px 14px;
  font: inherit;
  font-size: 0.85rem;
  cursor: pointer;
}
.card > .add-btn { margin: 0 14px 14px; }
.add-btn:hover { background: #354656; }
.cart-link { display: flex; gap: 8px; align-items: center; }
.cart-badge {
  min-width: 25px;
  padding: 1px 7px;
  border-radius: 20px;
  background: var(--ink);
  color: #fff;
  font-size: 0.8rem;
  font-variant-numeric: tabular-nums;
}
.empty-state {
  border: 1px dashed var(--line);
  text-align: center;
  padding: 32px 20px;
  margin-top: 24px;
  color: var(--steel);
}
.cart-items { list-style: none; padding: 0; margin: 32px 0 0; }
.cart-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid var(--line);
}
.cart-row img { width: 100px; height: 75px; object-fit: contain; background: #e4e8ea; }
.cart-product { flex: 1; min-width: 140px; }
.cart-product h2 { margin: 0; font-size: 1.15rem; }
.cart-product p { color: var(--steel); margin: 4px 0; font-size: 0.85rem; }
.cart-product .text-btn { font-size: 0.8rem; }
.quantity { display: flex; align-items: center; gap: 12px; }
.quantity button {
  width: 44px;
  height: 44px;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--ink);
  font: inherit;
  cursor: pointer;
}
.quantity span { min-width: 2ch; text-align: center; font-variant-numeric: tabular-nums; }
.cart-subtotal { min-width: 90px; text-align: right; }
.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 24px;
  margin: 24px 0;
  background: var(--ink);
  color: #fff;
}
.cart-total strong { font-size: 1.5rem; font-variant-numeric: tabular-nums; }
@media (max-width: 560px) {
  .header { padding: 12px 16px; }
  .nav { gap: 14px; font-size: 0.85rem; }
  .main { padding-inline: 16px; }
  .stock { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .card .name { font-size: 1rem; }
  .card .type { font-size: 0.75rem; }
  .card > .add-btn { font-size: 0.75rem; padding: 10px 6px; margin-inline: 10px; }
  .card-img { height: 130px; }
  .cart-row { gap: 12px; }
  .cart-subtotal { margin-left: auto; }
}
```

**File src/index.css**

```css
:root {
  --paper: #f2f4f5;
  --ink: #18222c;
  --steel: #5a6673;
  --brass: #a67c2e;
  --line: #d9dee2;
  --panel: #1e2a35;
  --panel-text: #e8ecef;

  color-scheme: light;
  font: 17px/1.5 system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  color: var(--ink);
  background: var(--paper);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

h1,
h2,
h3 {
  font-weight: 700;
}

:focus-visible {
  outline: 2px solid var(--brass);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
  }
}
```

Tinggi gambar kartu ditetapkan 160px, dengan object-fit: contain. Pada layar hingga 560px, tinggi area gambar menjadi 130px untuk semua kartu. Dengan demikian rasio asli gambar tidak menentukan tinggi kartu.

## Entry Point dan Dependensi

main.jsx memasang App pada elemen root. index.html menyediakan struktur HTML awal, sedangkan package.json mendefinisikan dependensi dan perintah proyek.

**File src/main.jsx**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**File index.html**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/icon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="A small armory — pistols, rifles, and shotguns." />
    <meta name="theme-color" content="#f2f4f5" />
    <link rel="apple-touch-icon" href="/icon-192.png" />
    <title>Bore &amp; Barrel</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**File package.json**

```json
{
  "name": "gunshop",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "test": "node --test",
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.8",
    "react-dom": "^19.2.8"
  },
  "devDependencies": {
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "oxlint": "^1.81.0",
    "vite": "^8.3.0",
    "vite-plugin-pwa": "^1.3.0"
  }
}
```

Pengujian yang sudah dilakukan meliputi npm test, npm run lint, dan npm run build. Ketiganya berhasil. Perintah npm run dev digunakan untuk menjalankan aplikasi selama pengembangan.

Repository hasil: [JLennon10/PWA1_PrakPPB-Tugas](https://github.com/JLennon10/PWA1_PrakPPB-Tugas).
