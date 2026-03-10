import { cn } from "@/lib/utils";
import { ProductSizesType } from "@/data/types";

export interface SizeSelectProps {
  selectedSize: ProductSizesType | null;
  size: ProductSizesType;
  onSelect: (size: ProductSizesType) => void;
}

export function SizeSelect({ selectedSize, size, onSelect }: SizeSelectProps) {
  const isSelected = selectedSize === size;
  return (
    <button
      onClick={() => onSelect(size)}
      className={cn(
        "size-10 flex items-center cursor-pointer justify-center border rounded-md",
        isSelected ? "border-foreground" : "border-foreground/20",
      )}
    >
      <span
        className={cn(
          "size-6 rounded text-sm text-center mt-0.5 uppercase",
          isSelected ? "opacity-100" : "opacity-50",
        )}
      >
        {size}
      </span>
    </button>
  );
}
