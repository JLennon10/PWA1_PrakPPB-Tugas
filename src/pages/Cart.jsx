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
