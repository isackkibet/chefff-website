import Image from "next/image";
import {
  CookingPot,
  Croissant,
  GraduationCap,
  Salad,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  meal: Salad,
  classes: GraduationCap,
  pastry: Croissant,
  cooking: CookingPot,
};

const imageIcons: Record<string, string> = {
  chef: "/images/private-chef.jpg",
  wedding: "/images/wedding-catering.jpg",
  corporate: "/images/corporate-catering.jpg",
  party: "/images/private-events.jpg",
};

export default function ServiceIcon({
  name,
  size = 40,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const image = imageIcons[name];
  if (image) {
    return (
      <Image
        src={image}
        alt=""
        width={size}
        height={size}
        className={className}
        style={{
          width: size,
          height: size,
          objectFit: "cover",
          borderRadius: "9999px",
        }}
        aria-hidden="true"
      />
    );
  }
  const Icon = iconMap[name] ?? UtensilsCrossed;
  return <Icon size={size} className={className} aria-hidden="true" />;
}
