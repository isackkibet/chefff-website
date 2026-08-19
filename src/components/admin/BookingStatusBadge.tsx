import { cn } from '@/lib/utils'
import type { BookingStatus } from '@/lib/admin/store'

const config: Record<BookingStatus, { label: string; classes: string }> = {
  PENDING:    { label: 'Pending',    classes: 'bg-[hsl(38_92%_50%/0.15)] text-[hsl(38_92%_65%)]' },
  REVIEWING:  { label: 'Reviewing', classes: 'bg-[hsl(210_80%_56%/0.15)] text-[hsl(210_80%_70%)]' },
  QUOTED:     { label: 'Quoted',    classes: 'bg-[hsl(270_65%_60%/0.15)] text-[hsl(270_65%_75%)]' },
  CONFIRMED:  { label: 'Confirmed', classes: 'bg-[hsl(142_71%_45%/0.15)] text-[hsl(142_71%_55%)]' },
  CANCELLED:  { label: 'Cancelled', classes: 'bg-[hsl(0_72%_51%/0.15)] text-[hsl(0_72%_65%)]' },
  COMPLETED:  { label: 'Completed', classes: 'bg-[hsl(0_0%_100%/0.06)] text-[hsl(0_0%_55%)]' },
}

export default function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const { label, classes } = config[status]
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', classes)}>
      {label}
    </span>
  )
}
