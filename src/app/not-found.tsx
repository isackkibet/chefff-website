import { ChefHat } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <div className="inline-flex size-20 items-center justify-center rounded-full bg-[hsl(45_90%_52%/0.12)] mb-6">
          <ChefHat size={36} className="text-[hsl(45_90%_52%)]" aria-hidden="true" />
        </div>
        <p className="text-6xl font-display font-bold text-gold-gradient mb-4">404</p>
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">This dish isn't on today's menu.</h1>
        <p className="text-[hsl(0_0%_55%)] mb-10">
          The page you're looking for doesn't exist or may have moved. Let's get you back to something delicious.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <ButtonLink href="/" variant="primary">Back Home</ButtonLink>
          <ButtonLink href="/menu" variant="outline">Browse the Menu</ButtonLink>
        </div>
      </div>
    </div>
  )
}
