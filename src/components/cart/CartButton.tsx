'use client'

import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart'

export default function CartButton({ className = '' }: { className?: string }) {
  const { count, openCart } = useCart()

  return (
    <button
      onClick={openCart}
      className={`relative flex size-10 items-center justify-center rounded-xl border border-[hsl(0_0%_22%)] text-[hsl(42_30%_94%)] hover:bg-[hsl(0_0%_100%/0.08)] transition-colors ${className}`}
      aria-label={`Open cart, ${count} item${count !== 1 ? 's' : ''}`}
    >
      <ShoppingCart size={19} aria-hidden="true" />
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex min-w-5 h-5 items-center justify-center rounded-full bg-[hsl(45_90%_52%)] px-1 text-[11px] font-bold text-[hsl(0_0%_10%)]">
          {count}
        </span>
      )}
    </button>
  )
}
