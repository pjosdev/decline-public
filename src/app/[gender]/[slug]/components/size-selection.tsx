import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { ProductSizesType, ProductType } from "@/data/types";
import { SizeSelect } from "./size-select";

export interface SizeSelectionProps {
  selectedSize: ProductSizesType | null;
  product: ProductType;
  onUpdateSelectedSize: (size: ProductSizesType) => void;
  itemInCart: boolean;
}

export function SizeSelection({
  selectedSize,
  product,
  onUpdateSelectedSize,
  itemInCart,
}: SizeSelectionProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-10",
        itemInCart && "pointer-events-none opacity-30",
      )}
    >
      <div className="flex flex-col xl:flex-row 2xl:items-center justify-between flex-wrap gap-2">
        <div className="flex items-start flex-col lg:flex-row lg:items-center gap-1">
          <Typography
            variant={"body"}
            className="text-muted-foreground"
          >
            {selectedSize ? "Selected size:" : "Select a size"}
          </Typography>
          <Typography
            variant={"body"}
            className={cn(selectedSize ? "uppercase" : "capitalize")}
          >
            {selectedSize ? selectedSize : ""}
          </Typography>
        </div>
        <div className="flex gap-1">
          {product.availableSizes.map((size, i) => (
            <SizeSelect
              selectedSize={selectedSize}
              size={size}
              key={i}
              onSelect={onUpdateSelectedSize}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
