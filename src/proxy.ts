import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ADMIN_SESSION_COOKIE, getAdminSession } from '@/lib/admin/session'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isLoginRoute = pathname === '/admin/login' || pathname === '/api/admin/auth'
  if (isLoginRoute) return NextResponse.next()

  const session = getAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)
  if (session) return NextResponse.next()

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const loginUrl = new URL('/admin/login', request.url)
  loginUrl.searchParams.set('next', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
