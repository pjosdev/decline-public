import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { ProductType } from "@/data/types";
import { formatPrice } from "@/helpers/format";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProductCardProps {
  product: ProductType;
  imageIndex?: number;
  className?: string;
}

export default function ProductCard({
  product,
  className,
  imageIndex = 0,
}: ProductCardProps) {
  return (
    <article className={cn("w-full pb-4 space-y-4 hover:opacity-90 transition-opacity", className)}>
      <div className="bg-card-img-bg relative w-full aspect-3/4 overflow-hidden">
        <Image
          src={product.images[imageIndex].image}
          alt={product.images[imageIndex].alt}
          fill
          sizes="(min-width: 1536px) 520px, (min-width: 1280px) 440px, (min-width: 1024px) 400px, (min-width: 768px) 40vw, (min-width: 640px) 50vw, 75vw"
          className={cn("object-cover object-top")}
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 justify-between flex-wrap">
          <Typography
            variant={"productCardTitle"}
            as={"h2"}
          >
            {product.name}
          </Typography>
          <Typography variant={"productCardTitle"}>
            {formatPrice(product.price)}
          </Typography>
        </div>
        <Typography
          variant="serif"
          className="line-clamp-3"
        >
          {product.description}
        </Typography>
        <Button variant={"secondary"} className="self-start cursor-pointer text-sm">
          View product
        </Button>
      </div>
    </article>
  );
}
