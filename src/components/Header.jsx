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
