'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ImagePlus, Trash2, UploadCloud } from 'lucide-react'
import Button from '@/components/ui/Button'

interface UploadParams {
  cloudName: string
  apiKey: string
  timestamp: number
  signature: string
  folder: string
  resourceType: string
  maxUploadBytes: number
}

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function ImageUploader({ value, onChange, label = 'Image' }: ImageUploaderProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [maxBytes, setMaxBytes] = useState(0)

  async function handleFile(file: File | undefined) {
    setError(null)
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed.')
      return
    }

    let params: UploadParams
    try {
      const res = await fetch('/api/admin/upload?type=image', { method: 'POST' })
      if (!res.ok) throw new Error()
      params = await res.json()
    } catch {
      setError('Could not prepare upload. Is Cloudinary configured?')
      return
    }

    if (file.size > params.maxUploadBytes) {
      setError(`Image is too large. Maximum is ${formatBytes(params.maxUploadBytes)}.`)
      return
    }

    setMaxBytes(params.maxUploadBytes)
    setUploading(true)
    setProgress(0)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('api_key', params.apiKey)
    formData.append('timestamp', String(params.timestamp))
    formData.append('signature', params.signature)
    formData.append('folder', params.folder)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${params.cloudName}/image/upload`)
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100))
    }
    xhr.onload = () => {
      setUploading(false)
      try {
        const data = JSON.parse(xhr.responseText)
        if (xhr.status >= 200 && xhr.status < 300 && data?.secure_url) {
          onChange(data.secure_url)
          if (fileRef.current) fileRef.current.value = ''
        } else {
          setError(data?.error?.message ?? 'Upload failed.')
        }
      } catch {
        setError('Upload failed.')
      }
    }
    xhr.onerror = () => {
      setUploading(false)
      setError('Upload failed. Check your connection.')
    }
    xhr.send(formData)
  }

  const inputClass = 'w-full rounded-xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_22%)] px-3 py-2.5 text-sm text-[hsl(42_30%_94%)] placeholder:text-[hsl(0_0%_38%)] focus:outline-none focus:border-[hsl(45_90%_52%)] transition-colors'

  return (
    <div>
      <label htmlFor={`upload-${label.replace(/\s+/g, '-').toLowerCase()}`} className="block text-sm font-medium mb-1.5">
        {label} {maxBytes ? <span className="text-[hsl(0_0%_45%)] font-normal">(max {formatBytes(maxBytes)})</span> : null}
      </label>

      <div className="flex items-start gap-3">
        <input
          id={`upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e.target.files?.[0])}
          className={`${inputClass} flex-1 file:mr-3 file:rounded-full file:border-0 file:bg-[hsl(45_90%_52%/0.15)] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[hsl(45_90%_52%)] cursor-pointer disabled:opacity-50`}
        />

        {value && (
          <div className="relative size-12 shrink-0 rounded-xl overflow-hidden border border-[hsl(0_0%_22%)]">
            <Image src={value} alt="Uploaded image" fill className="object-cover" sizes="48px" />
          </div>
        )}
      </div>

      {uploading && (
        <div className="mt-3">
          <div className="flex items-center gap-2 text-sm text-[hsl(0_0%_55%)] mb-2">
            <UploadCloud size={16} aria-hidden="true" /> Uploading… {progress}%
          </div>
          <div className="h-1.5 rounded-full bg-[hsl(0_0%_20%)] overflow-hidden">
            <div className="h-full bg-[hsl(45_90%_52%)] transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {error && <p className="mt-2 text-sm text-[hsl(0_72%_65%)]">{error}</p>}

      <div className="mt-2 flex items-center gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={uploading}>
          <ImagePlus size={14} aria-hidden="true" /> Choose Photo
        </Button>
        {value && (
          <button
            type="button"
            onClick={() => { onChange(''); if (fileRef.current) fileRef.current.value = '' }}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium text-[hsl(0_0%_55%)] hover:bg-[hsl(0_0%_100%/0.06)] hover:text-[hsl(0_72%_65%)] transition-colors"
          >
            <Trash2 size={12} aria-hidden="true" /> Remove
          </button>
        )}
      </div>
    </div>
  )
}