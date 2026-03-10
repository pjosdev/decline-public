import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StarRatingProps {
  average: number;
}

export function StarRating({ average }: StarRatingProps) {
  const fullStars = Math.floor(average);
  const remainder = average % 1;
  const hasHalfStar = remainder < 0.5;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => {
        const isFull = index < fullStars;
        const isHalf = index === fullStars && hasHalfStar;

        return (
          <StarIcon
            key={index}
            className={cn(
              "stroke-foreground",
              isFull && "fill-foreground",
              isHalf && "fill-[url(#half-star-gradient)]",
              !isFull && !isHalf && "fill-none",
            )}
            size={16}
          />
        );
      })}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="half-star-gradient">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
