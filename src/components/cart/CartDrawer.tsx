'use client'

import { ShoppingCart, Minus, Plus, Trash2, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { useCart } from '@/lib/cart'
import { brand } from '@/lib/data'

export default function CartDrawer() {
  const { items, total, count, updateQty, removeItem, clearCart, isOpen, closeCart } = useCart()

  if (!isOpen) return null

  const orderMessage = [
    `👨‍🍳 *ORDER — ${brand.name}*`,
    '',
    ...items.flatMap((i) => [
      `📦 *${i.name}*`,
      `🖼️ ${i.image}`,
      `  ✖ ${i.qty} × KSh ${i.price.toLocaleString()}`,
      `  = *KSh ${(i.price * i.qty).toLocaleString()}*`,
      '──────────────',
    ]),
    `💰 *TOTAL: KSh ${total.toLocaleString()}*`,
    '',
    '🚚 Free delivery in Nairobi',
    '⚡ Same-day delivery available',
    '',
    '📲 Please confirm my order. Asante!',
  ].join('\n')

  const whatsappHref = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(orderMessage)}`

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside className="absolute top-0 right-0 h-full w-full max-w-md bg-[hsl(0_0%_10%)] border-l border-[hsl(0_0%_18%)] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-[hsl(0_0%_16%)]">
          <h2 className="font-display font-bold text-lg flex items-center gap-2">
            <ShoppingCart size={18} aria-hidden="true" />
            Your Cart
            {count > 0 && (
              <span className="rounded-full bg-[hsl(45_90%_52%)] px-2 py-0.5 text-xs font-bold text-[hsl(0_0%_10%)]">
                {count}
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="size-9 flex items-center justify-center rounded-lg text-[hsl(42_30%_94%)] hover:bg-[hsl(0_0%_100%/0.08)] transition-colors"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-[hsl(0_0%_16%)] text-[hsl(0_0%_40%)]">
              <ShoppingCart size={28} aria-hidden="true" />
            </div>
            <p className="font-semibold text-[hsl(42_30%_94%)]">Your cart is empty</p>
            <p className="text-sm text-[hsl(0_0%_50%)]">Browse our authentic Kenyan meal kits and add your favourites.</p>
            <button
              onClick={closeCart}
              className="mt-2 rounded-full bg-[hsl(45_90%_52%)] px-5 py-2.5 text-sm font-semibold text-[hsl(0_0%_10%)] hover:bg-[hsl(45_90%_58%)] transition-colors"
            >
              Browse Meal Kits
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5 py-4 space-y-4" role="list">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 rounded-xl bg-[hsl(0_0%_13%)] border border-[hsl(0_0%_18%)] p-3">
                  <div className="relative size-16 shrink-0 rounded-lg overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[hsl(42_30%_94%)] leading-snug">{item.name}</p>
                    <p className="text-xs text-[hsl(0_0%_50%)] mb-2">
                      KSh {item.price.toLocaleString()} each
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="size-6 flex items-center justify-center rounded-md bg-[hsl(0_0%_18%)] text-[hsl(42_30%_94%)] hover:bg-[hsl(0_0%_24%)] transition-colors"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus size={12} aria-hidden="true" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="size-6 flex items-center justify-center rounded-md bg-[hsl(0_0%_18%)] text-[hsl(42_30%_94%)] hover:bg-[hsl(0_0%_24%)] transition-colors"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus size={12} aria-hidden="true" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-[hsl(45_90%_52%)]">
                          KSh {(item.price * item.qty).toLocaleString()}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[hsl(0_0%_40%)] hover:text-[hsl(0_72%_65%)] transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={15} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="border-t border-[hsl(0_0%_16%)] px-5 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[hsl(0_0%_55%)]">Total ({count} item{count !== 1 ? 's' : ''})</span>
                <span className="text-xl font-bold text-[hsl(45_90%_52%)]">KSh {total.toLocaleString()}</span>
              </div>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#25D366]/25 hover:brightness-105 transition-all"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Place Order on WhatsApp
              </a>
              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-[hsl(0_0%_40%)] hover:text-[hsl(0_72%_65%)] transition-colors"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
