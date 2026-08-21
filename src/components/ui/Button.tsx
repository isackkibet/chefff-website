"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
  forwardRef,
} from "react";

// ─── Style maps ──────────────────────────────────────────────────────────────
const variantClasses = {
  primary:
    "bg-[hsl(45_90%_52%)] text-[hsl(0_0%_10%)] hover:bg-[hsl(45_85%_58%)] active:scale-95",
  outline:
    "border-2 border-[hsl(45_90%_52%)] text-[hsl(45_90%_52%)] hover:bg-[hsl(45_90%_52%/0.1)] active:scale-95",
  ghost:
    "text-[hsl(42_30%_94%)] hover:bg-[hsl(0_0%_100%/0.08)] active:scale-95",
  gold: "bg-[hsl(45_90%_52%)] text-[hsl(0_0%_10%)] hover:bg-[hsl(45_95%_60%)] active:scale-95 shadow-md",
};
const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};
const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

type Variant = keyof typeof variantClasses;
type Size = keyof typeof sizeClasses;

// ─── <Button>, plain <button> ───────────────────────────────────────────────
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      disabled,
      children,
      ...rest
    },
    ref,
  ) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading}
      className={cn(
        baseClass,
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      {loading && (
        <span
          className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  ),
);
Button.displayName = "Button";
export default Button;

// ─── <ButtonLink>, Next.js Link or <a> with button styles ───────────────────
export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  external,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(
    baseClass,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
