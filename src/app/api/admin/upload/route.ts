import { NextRequest, NextResponse } from "next/server";
import { createUploadSignature, getMaxUploadBytes } from "@/lib/cloudinary";
import {
  getClientIp,
  logSecurityEvent,
  rateLimit,
  rateLimitedResponse,
} from "@/lib/security";

const SIGNING_LIMIT = 60;
const SIGNING_WINDOW_MS = 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  const { allowed, retryAfterSeconds } = rateLimit(
    `upload-signing:${ip}`,
    SIGNING_LIMIT,
    SIGNING_WINDOW_MS,
  );
  if (!allowed) {
    logSecurityEvent("rate-limited", { ip, route: "/api/admin/upload" });
    return rateLimitedResponse(retryAfterSeconds);
  }

  const type = req.nextUrl.searchParams.get("type");
  const resourceType = type === "image" ? "image" : "video";

  const params = createUploadSignature(resourceType);
  if (!params) {
    logSecurityEvent("cloudinary-not-configured", {
      ip,
      route: "/api/admin/upload",
    });
    return NextResponse.json(
      { error: "Cloudinary is not configured." },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ...params,
    maxUploadBytes: getMaxUploadBytes(resourceType),
  });
}
