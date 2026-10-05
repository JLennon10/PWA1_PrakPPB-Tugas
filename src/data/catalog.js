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
