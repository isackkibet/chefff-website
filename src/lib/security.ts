import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const DEFAULT_ORIGINS = [
  'https://chefharrizona.co.ke',
  'https://chefff-harriszona.vercel.app',
]

if (process.env.NODE_ENV !== 'production') {
  DEFAULT_ORIGINS.push('http://localhost:3000', 'http://localhost:3001')
}

const allowedOrigins = new Set(
  [...DEFAULT_ORIGINS, ...(process.env.ALLOWED_ORIGINS?.split(',').map((o) => o.trim()).filter(Boolean) ?? [])],
)

interface Bucket {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

export function getClientIp(request: NextRequest | Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}

export function originIsAllowed(request: NextRequest | Request): boolean {
  const origin = request.headers.get('origin')
  if (origin) return allowedOrigins.has(origin)

  const referer = request.headers.get('referer')
  if (referer) {
    try {
      return allowedOrigins.has(new URL(referer).origin)
    } catch {
      return false
    }
  }
  return false
}

export function rateLimit(key: string, limit: number, windowMs: number): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now()

  if (buckets.size > 10_000) {
    for (const [k, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(k)
    }
  }

  const bucket = buckets.get(key)
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, retryAfterSeconds: 0 }
  }

  if (bucket.count >= limit) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) }
  }

  bucket.count += 1
  return { allowed: true, retryAfterSeconds: 0 }
}

export function logSecurityEvent(event: string, meta: Record<string, unknown>): void {
  console.warn(`[security:${event}]`, JSON.stringify({ ...meta, ts: new Date().toISOString() }))
}

export function forbiddenResponse(): NextResponse {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}

export function rateLimitedResponse(retryAfterSeconds: number): NextResponse {
  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } },
  )
}