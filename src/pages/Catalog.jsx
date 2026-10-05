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
