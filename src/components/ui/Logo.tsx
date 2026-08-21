import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  rounded?: boolean;
  className?: string;
}

export default function Logo({
  size = 36,
  rounded = true,
  className,
}: LogoProps) {
  return (
    <Image
      src="/logo.jpeg"
      alt="Chef Harrizona logo"
      width={size}
      height={size}
      priority
      className={cn(
        "shrink-0 object-cover",
        rounded ? "rounded-full" : "rounded-2xl",
        className,
      )}
    />
  );
}
