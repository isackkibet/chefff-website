import { NextRequest, NextResponse } from 'next/server'
import { deleteVideo, listVideos } from '@/lib/cloudinary'
import { getClientIp, logSecurityEvent } from '@/lib/security'

export async function GET() {
  try {
    const videos = await listVideos()
    if (!videos) {
      return NextResponse.json({ error: 'Cloudinary is not configured.' }, { status: 503 })
    }
    return NextResponse.json(videos)
  } catch (err) {
    console.error('[GET /api/admin/media]', err)
    return NextResponse.json({ error: 'Failed to list videos.' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const ip = getClientIp(req)
  const publicId = req.nextUrl.searchParams.get('id')?.trim()

  if (!publicId) {
    return NextResponse.json({ error: 'Missing video id.' }, { status: 422 })
  }

  try {
    const deleted = await deleteVideo(publicId)
    if (!deleted) {
      return NextResponse.json({ error: 'Video not found.' }, { status: 404 })
    }
    logSecurityEvent('video-deleted', { ip, route: '/api/admin/media', publicId })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[DELETE /api/admin/media]', err)
    return NextResponse.json({ error: 'Failed to delete video.' }, { status: 500 })
  }
}