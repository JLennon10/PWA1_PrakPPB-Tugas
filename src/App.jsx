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
