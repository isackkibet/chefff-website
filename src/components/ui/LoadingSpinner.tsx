import { cn } from '@/lib/utils'

export default function LoadingSpinner({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const s = { sm: 'size-5', md: 'size-8', lg: 'size-12' }[size]
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn('rounded-full border-2 border-[hsl(0_0%_25%)] border-t-[hsl(45_90%_52%)] animate-spin', s, className)}
    />
  )
}
