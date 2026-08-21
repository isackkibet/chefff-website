'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  qty: number
}

/** Any item that can be placed in the cart (meal kit, dish, service). */
export type CartableItem = Pick<CartItem, 'id' | 'name' | 'price' | 'image'>

interface CartContextValue {
  items: CartItem[]
  count: number
  total: number
  getQty: (id: string) => number
  addItem: (item: CartableItem, qty?: number) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CART_KEY = 'chef_meal_kit_cart'

const CartContext = createContext<CartContextValue | null>(null)

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Restore the saved cart after mount only, keeps SSR and first client render
  // identical (empty cart), avoiding hydration mismatches.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY)
      if (raw) setItems(JSON.parse(raw) as CartItem[])
    } catch {
      // ignore corrupted storage
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items))
    } catch {
      // storage may be unavailable
    }
  }, [items])

  const addItem = useCallback((item: CartableItem, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, image: item.image, qty }]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) return
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const getQty = useCallback((id: string) => items.find((i) => i.id === id)?.qty ?? 0, [items])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])
  const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items])

  const value = useMemo(
    () => ({ items, count, total, getQty, addItem, removeItem, updateQty, clearCart, isOpen, openCart, closeCart }),
    [items, count, total, getQty, addItem, removeItem, updateQty, clearCart, isOpen, openCart, closeCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
