/**
 * Admin authentication helpers.
 *
 * In production this would be backed by a real database with:
 *   - Argon2/bcrypt password hashing
 *   - Secure HTTP-only session cookies (iron-session / next-auth)
 *   - Rate limiting on login attempts
 *   - CSRF protection
 *
 * This implementation demonstrates the full UI flow with a
 * localStorage-based mock session that is safe for development only.
 * Replace with a proper backend before going live.
 */

export const ADMIN_SESSION_KEY = 'chef_admin_session'

export interface AdminSession {
  email: string
  role: 'ADMIN' | 'SUPER_ADMIN'
  loginTime: number
}

/** Write session to localStorage (dev only, use secure HTTP-only cookies in prod) */
export function setAdminSession(session: AdminSession) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session))
  }
}

/** Read session */
export function getAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw) as AdminSession
    // Expire after 8 hours
    if (Date.now() - session.loginTime > 8 * 60 * 60 * 1000) {
      clearAdminSession()
      return null
    }
    return session
  } catch {
    return null
  }
}

/** Clear session */
export function clearAdminSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ADMIN_SESSION_KEY)
  }
}

/** Mock credential check, replace with real DB lookup + bcrypt.compare() in production */
export function checkAdminCredentials(email: string, password: string): boolean {
  // DEMO ONLY, never store credentials in client-side code in production
  return email === 'admin@chefharrizona.co.ke' && password === 'admin123'
}
