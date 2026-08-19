// TEMPORARY DEBUG ROUTE — DELETE AFTER FIXING LOGIN
import { NextResponse } from 'next/server'

export async function GET() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const secret = process.env.ADMIN_SESSION_SECRET

  return NextResponse.json({
    ADMIN_EMAIL_set: !!email,
    ADMIN_EMAIL_length: email?.length ?? 0,
    ADMIN_EMAIL_value: email ? `${email.slice(0, 3)}***${email.slice(-8)}` : 'NOT SET',
    ADMIN_PASSWORD_set: !!password,
    ADMIN_PASSWORD_length: password?.length ?? 0,
    ADMIN_PASSWORD_first3: password ? password.slice(0, 3) : 'NOT SET',
    ADMIN_PASSWORD_last3: password ? password.slice(-3) : 'NOT SET',
    ADMIN_SESSION_SECRET_set: !!secret,
    ADMIN_SESSION_SECRET_length: secret?.length ?? 0,
  })
}
