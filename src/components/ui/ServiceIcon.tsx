import {
  Building2, ChefHat, CookingPot, Croissant, Gem, GraduationCap,
  PartyPopper, Salad, UtensilsCrossed, type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  chef: ChefHat,
  wedding: Gem,
  corporate: Building2,
  party: PartyPopper,
  meal: Salad,
  classes: GraduationCap,
  pastry: Croissant,
  cooking: CookingPot,
}

export default function ServiceIcon({ name, size = 40, className }: { name: string; size?: number; className?: string }) {
  const Icon = iconMap[name] ?? UtensilsCrossed
  return <Icon size={size} className={className} aria-hidden="true" />
}