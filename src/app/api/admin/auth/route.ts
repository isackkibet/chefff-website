import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSession,
  credentialsAreValid,
  getAdminSession,
  getSessionCookieOptions,
} from "@/lib/admin/session";

const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const { email, password } = credentialsSchema.parse(await request.json());
    if (!credentialsAreValid(email, password)) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ email: email.trim().toLowerCase() });
    response.cookies.set(
      ADMIN_SESSION_COOKIE,
      createAdminSession(email.trim().toLowerCase()),
      getSessionCookieOptions(),
    );
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Enter a valid email and password." },
        { status: 422 },
      );
    }
    console.error("[POST /api/admin/auth]", error);
    return NextResponse.json(
      { error: "Admin login is not configured." },
      { status: 500 },
    );
  }
}

export function GET(request: NextRequest) {
  const session = getAdminSession(
    request.cookies.get(ADMIN_SESSION_COOKIE)?.value,
  );
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ email: session.email });
}

export function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    ...getSessionCookieOptions(),
    maxAge: 0,
  });
  return response;
}
