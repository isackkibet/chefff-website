import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  className?: string;
}

export default function StarRating({
  rating,
  max = 5,
  size = 16,
  className,
}: StarRatingProps) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      aria-label={`${rating} out of ${max} stars`}
      role="img"
    >
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < rating
              ? "fill-[hsl(45_90%_52%)] text-[hsl(45_90%_52%)]"
              : "fill-none text-[hsl(0_0%_35%)]"
          }
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
