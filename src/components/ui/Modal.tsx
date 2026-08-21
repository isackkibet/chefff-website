'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  'aria-label'?: string
}

export default function Modal({ open, onClose, children, className, 'aria-label': ariaLabel }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (open) {
      el.showModal()
      document.body.style.overflow = 'hidden'
    } else {
      el.close()
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    const handler = () => onClose()
    el.addEventListener('cancel', handler)
    return () => el.removeEventListener('cancel', handler)
  }, [onClose])

  if (!open) return null

  return (
    <dialog
      ref={dialogRef}
      aria-label={ariaLabel}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      className={cn(
        'fixed inset-0 z-50 m-auto w-full max-w-2xl rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_22%)] p-6 shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm',
        'open:animate-scale-in',
        className,
      )}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 rounded-full p-1.5 text-[hsl(0_0%_55%)] hover:bg-[hsl(0_0%_100%/0.08)] hover:text-[hsl(42_30%_94%)] transition-colors"
        aria-label="Close"
      >
        <X size={20} />
      </button>
      {children}
    </dialog>
  )
}
