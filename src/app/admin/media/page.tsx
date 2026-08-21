"use client";

import { useEffect, useRef, useState } from "react";
import {
  Clapperboard,
  Copy,
  Plus,
  Trash2,
  Video,
  UploadCloud,
} from "lucide-react";
import AdminNav from "@/components/admin/AdminNav";
import AdminGuard from "@/components/admin/AdminGuard";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";

interface VideoAsset {
  publicId: string;
  url: string;
  format: string;
  bytes: number;
  width: number | null;
  height: number | null;
  duration: number | null;
  createdAt: string;
}

interface UploadParams {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
  resourceType: string;
  maxUploadBytes: number;
}

const inputClass =
  "w-full rounded-xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_22%)] px-3 py-2.5 text-sm text-[hsl(42_30%_94%)] placeholder:text-[hsl(0_0%_38%)] focus:outline-none focus:border-[hsl(45_90%_52%)] transition-colors";

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdminMediaPage() {
  const { toast } = useToast();
  const [videos, setVideos] = useState<VideoAsset[]>([]);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [maxBytes, setMaxBytes] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  async function loadVideos() {
    try {
      const res = await fetch("/api/admin/media");
      if (!res.ok) {
        toast(
          "error",
          res.status === 503
            ? "Cloudinary is not configured."
            : "Failed to load videos.",
        );
        return;
      }
      setVideos(await res.json());
    } catch {
      toast("error", "Failed to load videos.");
    }
  }

  useEffect(() => {
    loadVideos();
  }, []);

  async function handleUpload() {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      toast("error", "Choose a video file first.");
      return;
    }

    if (!file.type.startsWith("video/")) {
      toast("error", "Only video files are allowed.");
      return;
    }

    let params: UploadParams;
    try {
      const res = await fetch("/api/admin/upload", { method: "POST" });
      if (!res.ok) throw new Error();
      params = await res.json();
    } catch {
      toast("error", "Could not prepare upload. Is Cloudinary configured?");
      return;
    }

    if (file.size > params.maxUploadBytes) {
      toast(
        "error",
        `Video is too large. Maximum is ${formatBytes(params.maxUploadBytes)}.`,
      );
      return;
    }

    setMaxBytes(params.maxUploadBytes);
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", params.apiKey);
    formData.append("timestamp", String(params.timestamp));
    formData.append("signature", params.signature);
    formData.append("folder", params.folder);

    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${params.cloudName}/video/upload`,
    );
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable)
        setProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = async () => {
      setUploading(false);
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && data?.secure_url) {
          setUploadOpen(false);
          if (fileRef.current) fileRef.current.value = "";
          toast("success", "Video uploaded");
          await loadVideos();
        } else {
          toast("error", data?.error?.message ?? "Upload failed.");
        }
      } catch {
        toast("error", "Upload failed.");
      }
    };
    xhr.onerror = () => {
      setUploading(false);
      toast("error", "Upload failed. Check your connection.");
    };
    xhr.send(formData);
  }

  async function handleDelete(publicId: string) {
    try {
      const res = await fetch(
        `/api/admin/media?id=${encodeURIComponent(publicId)}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error();
      setDeleteId(null);
      toast("success", "Video deleted");
      await loadVideos();
    } catch {
      toast("error", "Failed to delete video.");
    }
  }

  async function copyUrl(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      toast("success", "URL copied");
    } catch {
      toast("error", "Could not copy URL.");
    }
  }

  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminNav />
        <main className="flex-1 pt-14 lg:pt-0 overflow-x-hidden">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-display font-bold mb-1">
                  Video Library
                </h1>
                <p className="text-sm text-[hsl(0_0%_50%)]">
                  {videos.length} videos
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setUploadOpen(true)}
              >
                <Plus size={16} aria-hidden="true" /> Upload Video
              </Button>
            </div>

            {videos.length > 0 ? (
              <div
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                role="list"
              >
                {videos.map((video) => (
                  <div
                    key={video.publicId}
                    role="listitem"
                    className="group rounded-2xl overflow-hidden bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)]"
                  >
                    <div className="relative bg-black">
                      <video
                        src={video.url}
                        controls
                        preload="metadata"
                        playsInline
                        className="w-full aspect-video object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p
                        className="text-xs font-medium text-[hsl(42_30%_94%)] leading-snug truncate"
                        title={video.publicId}
                      >
                        {video.publicId.split("/").pop()}
                      </p>
                      <p className="text-xs text-[hsl(0_0%_40%)] mb-3">
                        {formatBytes(video.bytes)}
                        {video.duration
                          ? ` · ${Math.round(video.duration)}s`
                          : ""}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 !px-2 text-xs"
                          onClick={() => copyUrl(video.url)}
                        >
                          <Copy size={12} aria-hidden="true" /> Copy URL
                        </Button>
                        <button
                          onClick={() => setDeleteId(video.publicId)}
                          className="flex items-center gap-1.5 rounded-full bg-[hsl(0_72%_51%)] text-white px-3 py-2 text-xs font-medium hover:bg-[hsl(0_72%_44%)]"
                          aria-label={`Delete ${video.publicId}`}
                        >
                          <Trash2 size={12} aria-hidden="true" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center">
                <Clapperboard
                  size={40}
                  className="text-[hsl(0_0%_30%)] mx-auto mb-3"
                  aria-hidden="true"
                />
                <p className="text-[hsl(0_0%_40%)]">
                  No videos yet. Upload one to get started.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Upload modal */}
      <Modal
        open={uploadOpen}
        onClose={() => {
          if (!uploading) setUploadOpen(false);
        }}
        aria-label="Upload video"
        className="max-w-md"
      >
        <h2 className="font-display text-xl font-bold mb-1 pr-8">
          Upload Video
        </h2>
        <p className="text-sm text-[hsl(0_0%_50%)] mb-5">
          {maxBytes
            ? `Max size: ${formatBytes(maxBytes)}. Video files only.`
            : "Video files only."}
        </p>

        <label
          htmlFor="video-file"
          className="block text-sm font-medium mb-1.5"
        >
          Video file *
        </label>
        <input
          id="video-file"
          ref={fileRef}
          type="file"
          accept="video/*"
          disabled={uploading}
          className={`${inputClass} file:mr-3 file:rounded-full file:border-0 file:bg-[hsl(45_90%_52%/0.15)] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[hsl(45_90%_52%)] cursor-pointer disabled:opacity-50`}
        />

        {uploading && (
          <div className="mt-5">
            <div className="flex items-center gap-2 text-sm text-[hsl(0_0%_55%)] mb-2">
              <UploadCloud size={16} aria-hidden="true" /> Uploading… {progress}
              %
            </div>
            <div className="h-2 rounded-full bg-[hsl(0_0%_20%)] overflow-hidden">
              <div
                className="h-full bg-[hsl(45_90%_52%)] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-5">
          <Button
            variant="primary"
            onClick={handleUpload}
            loading={uploading}
            className="flex-1"
          >
            {!uploading && <Video size={16} aria-hidden="true" />} Upload
          </Button>
          <Button
            variant="outline"
            onClick={() => setUploadOpen(false)}
            disabled={uploading}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </Modal>

      {/* Delete confirm */}
      <Modal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        aria-label="Confirm delete"
        className="max-w-sm"
      >
        <div className="text-center py-2">
          <Trash2
            size={36}
            className="text-[hsl(0_72%_65%)] mx-auto mb-4"
            aria-hidden="true"
          />
          <h2 className="font-semibold text-lg mb-2">Delete this video?</h2>
          <p className="text-sm text-[hsl(0_0%_50%)] mb-6">
            This will remove it from Cloudinary. This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => setDeleteId(null)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => deleteId && handleDelete(deleteId)}
              className="flex-1 bg-[hsl(0_72%_51%)] text-white hover:bg-[hsl(0_72%_44%)]"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </AdminGuard>
  );
}
