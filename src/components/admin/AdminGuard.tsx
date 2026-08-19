'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    fetch('/api/admin/auth')
      .then((response) => {
        if (!response.ok) router.replace('/admin/login')
        else setChecking(false)
      })
      .catch(() => router.replace('/admin/login'))
  }, [router])

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[hsl(0_0%_8%)]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return <>{children}</>
}
