import 'server-only'

import cloudinary from 'cloudinary'

const DEFAULT_FOLDER = 'chef-harrizona/videos'
export const DEFAULT_MAX_IMAGE_BYTES = 10 * 1024 * 1024
export const DEFAULT_MAX_VIDEO_BYTES = 100 * 1024 * 1024

export function getCloudinaryConfig(): { cloudName: string; apiKey: string; apiSecret: string } | null {
  if (process.env.CLOUDINARY_URL) {
    try {
      const url = new URL(process.env.CLOUDINARY_URL)
      const apiKey = decodeURIComponent(url.username)
      const apiSecret = decodeURIComponent(url.password)
      const cloudName = url.hostname
      if (apiKey && apiSecret && cloudName) return { cloudName, apiKey, apiSecret }
    } catch {
      // fall through to individual variables
    }
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  if (!cloudName || !apiKey || !apiSecret) return null
  return { cloudName, apiKey, apiSecret }
}

function configureCloudinary(): boolean {
  const config = getCloudinaryConfig()
  if (!config) return false
  cloudinary.v2.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret,
  })
  return true
}

export function getUploadFolder(): string {
  return process.env.CLOUDINARY_FOLDER?.trim().replace(/\/+$/, '') || DEFAULT_FOLDER
}

export function getMaxUploadBytes(resourceType: 'image' | 'video' = 'video'): number {
  const raw = Number(process.env.CLOUDINARY_MAX_UPLOAD_BYTES)
  if (resourceType === 'image') {
    const cap = Number.isFinite(raw) && raw > 0 ? Math.min(raw, DEFAULT_MAX_IMAGE_BYTES) : DEFAULT_MAX_IMAGE_BYTES
    return cap
  }
  return Number.isFinite(raw) && raw > 0 ? Math.min(raw, DEFAULT_MAX_VIDEO_BYTES) : DEFAULT_MAX_VIDEO_BYTES
}

export function createUploadSignature(resourceType: 'image' | 'video' = 'video'): { cloudName: string; apiKey: string; timestamp: number; signature: string; folder: string; resourceType: string } | null {
  if (!configureCloudinary()) return null

  const config = getCloudinaryConfig()
  if (!config) return null
  const folder = getUploadFolder()
  const timestamp = Math.round(Date.now() / 1000)
  const signature = cloudinary.v2.utils.api_sign_request({ timestamp, folder }, config.apiSecret)

  return { cloudName: config.cloudName, apiKey: config.apiKey, timestamp, signature, folder, resourceType }
}

export interface VideoAsset {
  publicId: string
  url: string
  format: string
  bytes: number
  width: number | null
  height: number | null
  duration: number | null
  createdAt: string
}

export async function listVideos(): Promise<VideoAsset[] | null> {
  const config = getCloudinaryConfig()
  if (!config) return null

  cloudinary.v2.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret,
  })

  const folder = getUploadFolder()
  const prefix = folder ? `${folder}/` : undefined

  const result = await cloudinary.v2.api.resources({
    type: 'upload',
    resource_type: 'video',
    prefix,
    max_results: 100,
  })

  return (result.resources ?? []).map((r: {
    public_id: string
    secure_url: string
    format: string
    bytes: number
    width?: number | null
    height?: number | null
    duration?: number | null
    created_at: string
  }) => ({
    publicId: r.public_id,
    url: r.secure_url,
    format: r.format,
    bytes: r.bytes,
    width: r.width ?? null,
    height: r.height ?? null,
    duration: r.duration ?? null,
    createdAt: r.created_at,
  }))
}

export async function deleteVideo(publicId: string): Promise<boolean> {
  const config = getCloudinaryConfig()
  if (!config) return false

  cloudinary.v2.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret,
  })

  const result = await cloudinary.v2.uploader.destroy(publicId, { resource_type: 'video' })
  return result.result === 'ok'
}