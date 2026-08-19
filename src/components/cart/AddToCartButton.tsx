'use client'

import { ShoppingCart } from 'lucide-react'
import { useCart, type CartableItem } from '@/lib/cart'
import { useToast } from '@/components/ui/ToastProvider'

export default function AddToCartButton({ item, size = 'sm' }: { item: CartableItem; size?: 'sm' | 'md' }) {
  const { addItem, getQty, openCart } = useCart()
  const { toast } = useToast()

  const qty = getQty(item.id)

  function handleClick() {
    addItem(item)
    toast('success', `${item.name} added to your order — asante! 🎉`)
    openCart()
  }

  const sizeClass = size === 'md' ? 'px-5 py-2.5 text-sm' : 'px-4 py-2 text-sm'

  return (
    <button
      onClick={handleClick}
      className={`flex w-full items-center justify-center gap-1.5 rounded-full bg-[hsl(45_90%_52%)] font-semibold text-[hsl(0_0%_10%)] hover:bg-[hsl(45_90%_58%)] transition-colors ${sizeClass}`}
      aria-label={`Add ${item.name} to cart`}
    >
      <ShoppingCart size={14} aria-hidden="true" />
      {qty > 0 ? `In Cart (${qty})` : 'Add to Cart'}
    </button>
  )
}