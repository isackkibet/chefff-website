import { NextResponse } from "next/server";
import { listVideos } from "@/lib/cloudinary";

// GET /api/media, public list of uploaded videos for the gallery page.
export async function GET() {
  try {
    const videos = await listVideos();
    if (!videos) return NextResponse.json([]);
    return NextResponse.json(
      videos.map((v) => ({
        publicId: v.publicId,
        url: v.url,
        duration: v.duration,
      })),
    );
  } catch (err) {
    console.error("[GET /api/media]", err);
    return NextResponse.json([]);
  }
}
