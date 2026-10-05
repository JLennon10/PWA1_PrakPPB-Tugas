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
