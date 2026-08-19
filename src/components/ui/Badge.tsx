import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'green' | 'muted' | 'outline' | 'error'
  className?: string
}

export default function Badge({ children, variant = 'muted', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-wide',
        {
          'bg-[hsl(45_90%_52%/0.18)] text-[hsl(45_90%_52%)]': variant === 'gold',
          'bg-[hsl(142_71%_45%/0.18)] text-[hsl(142_71%_45%)]': variant === 'green',
          'bg-[hsl(0_0%_100%/0.08)] text-[hsl(0_0%_65%)]': variant === 'muted',
          'border border-[hsl(0_0%_30%)] text-[hsl(42_30%_94%)]': variant === 'outline',
          'bg-[hsl(0_72%_51%/0.18)] text-[hsl(0_72%_65%)]': variant === 'error',
        },
        className,
      )}
    >
      {children}
    </span>
  )
}
