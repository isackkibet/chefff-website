import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  Icon: LucideIcon
  trend?: { value: string; positive: boolean }
  accent?: boolean
}

export default function StatCard({ title, value, subtitle, Icon, trend, accent }: StatCardProps) {
  return (
    <div className={cn(
      'rounded-2xl p-5 border',
      accent
        ? 'bg-gradient-to-br from-[hsl(38_85%_38%/0.2)] to-[hsl(45_90%_52%/0.1)] border-[hsl(45_90%_52%/0.3)]'
        : 'bg-[hsl(0_0%_12%)] border-[hsl(0_0%_18%)]',
    )}>
      <div className="flex items-start justify-between mb-4">
        <p className="text-xs font-medium text-[hsl(0_0%_50%)] uppercase tracking-wide">{title}</p>
        <span className={cn(
          'flex size-9 items-center justify-center rounded-xl',
          accent ? 'bg-[hsl(45_90%_52%/0.2)] text-[hsl(45_90%_52%)]' : 'bg-[hsl(0_0%_18%)] text-[hsl(0_0%_55%)]',
        )}>
          <Icon size={18} aria-hidden="true" />
        </span>
      </div>
      <p className={cn('text-3xl font-display font-bold', accent && 'text-gold-gradient')}>{value}</p>
      {subtitle && <p className="mt-1 text-xs text-[hsl(0_0%_45%)]">{subtitle}</p>}
      {trend && (
        <p className={cn('mt-2 text-xs font-medium', trend.positive ? 'text-[hsl(142_71%_45%)]' : 'text-[hsl(0_72%_65%)]')}>
          {trend.positive ? '↑' : '↓'} {trend.value}
        </p>
      )}
    </div>
  )
}
