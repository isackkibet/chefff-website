"use client";

import { useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastData {
  id: string;
  type: "success" | "error";
  message: string;
}

interface ToastProps extends ToastData {
  onDismiss: (id: string) => void;
}

export default function Toast({ id, type, message, onDismiss }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(id), 5000);
    return () => clearTimeout(t);
  }, [id, onDismiss]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "flex items-start gap-3 rounded-xl px-4 py-3 shadow-xl border animate-fade-up max-w-sm w-full",
        type === "success"
          ? "bg-[hsl(142_71%_45%/0.15)] border-[hsl(142_71%_45%/0.4)] text-[hsl(142_71%_65%)]"
          : "bg-[hsl(0_72%_51%/0.15)] border-[hsl(0_72%_51%/0.4)] text-[hsl(0_72%_70%)]",
      )}
    >
      {type === "success" ? (
        <CheckCircle size={18} className="mt-0.5 shrink-0" />
      ) : (
        <XCircle size={18} className="mt-0.5 shrink-0" />
      )}
      <p className="flex-1 text-sm font-medium text-[hsl(42_30%_94%)]">
        {message}
      </p>
      <button
        onClick={() => onDismiss(id)}
        className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
    </div>
  );
}
