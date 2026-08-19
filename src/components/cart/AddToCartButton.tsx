'use client'

import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { useToast } from '@/components/ui/ToastProvider'
import type { MealKit } from '@/lib/data'

export default function AddToCartButton({ kit, size = 'sm' }: { kit: MealKit; size?: 'sm' | 'md' }) {
  const { addItem, getQty, openCart } = useCart()
  const { toast } = useToast()

  const qty = getQty(kit.id)

  function handleClick() {
    addItem(kit)
    toast('success', `${kit.name} added to cart!`)
    openCart()
  }

  const sizeClass = size === 'md' ? 'px-5 py-2.5 text-sm' : 'px-4 py-2 text-sm'

  return (
    <button
      onClick={handleClick}
      className={`flex w-full items-center justify-center gap-1.5 rounded-full bg-[hsl(45_90%_52%)] font-semibold text-[hsl(0_0%_10%)] hover:bg-[hsl(45_90%_58%)] transition-colors ${sizeClass}`}
      aria-label={`Add ${kit.name} to cart`}
    >
      <ShoppingCart size={14} aria-hidden="true" />
      {qty > 0 ? `In Cart (${qty})` : 'Add to Cart'}
    </button>
  )
}