import test from 'node:test'
import assert from 'node:assert/strict'
import GUNS from '../src/data/guns.js'
import { selectProducts, changeQuantity, cartTotals } from '../src/data/catalog.js'

test('search is case insensitive, trimmed, and combined with product type', () => {
  assert.deepEqual(selectProducts(GUNS, '  gLoCk ', 'Pistol', 'name', 'asc').map((gun) => gun.name), ['Glock 17'])
  assert.equal(selectProducts(GUNS, 'Glock', 'Rifle', 'name', 'asc').length, 0)
  assert.equal(selectProducts(GUNS, 'unknown', 'All', 'price', 'desc').length, 0)
})

test('name and price sort support both directions without mutating data', () => {
  const original = GUNS.map((gun) => gun.name)
  for (const by of ['name', 'price']) {
    const asc = selectProducts(GUNS, '', 'All', by, 'asc')
    const desc = selectProducts(GUNS, '', 'All', by, 'desc')
    assert.deepEqual(desc, [...asc].reverse())
    for (let i = 1; i < asc.length; i++) {
      assert.ok(by === 'price' ? asc[i - 1].price <= asc[i].price : asc[i - 1].name.localeCompare(asc[i].name) <= 0)
    }
  }
  assert.deepEqual(GUNS.map((gun) => gun.name), original)
})

test('cart combines identical products and updates badge count and price', () => {
  let cart = changeQuantity({}, 'Glock 17', 1)
  cart = changeQuantity(cart, 'Glock 17', 1)
  cart = changeQuantity(cart, 'AK-47', 1)
  assert.deepEqual(cartTotals(GUNS, cart), { count: 3, price: 2097 })
  cart = changeQuantity(cart, 'Glock 17', -1)
  assert.deepEqual(cartTotals(GUNS, cart), { count: 2, price: 1498 })
  cart = changeQuantity(cart, 'Glock 17', -1)
  assert.equal('Glock 17' in cart, false)
  cart = changeQuantity(cart, 'AK-47', -1)
  cart = changeQuantity(cart, 'AK-47', -1)
  assert.deepEqual(cartTotals(GUNS, cart), { count: 0, price: 0 })
})
