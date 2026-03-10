import { Typography } from "@/components/ui/typography";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowLeft } from "lucide-react";
import { ProductType } from "@/data/types";
import { formatPrice } from "@/helpers/format";
import Image from "next/image";
import { Share } from "./share";

export interface DetailsDescriptionProps {
  product: ProductType;
  gender: string;
}

export function DetailsDescription({ product, gender }: DetailsDescriptionProps) {
  const firstImage = product.images[0];

  return (
    <>
      <div className="flex flex-col justify-between flex-wrap gap-2 mb-10">
        <ButtonLink
          href={`/${gender}`}
          variant="ghost"
          className="px-0! text-base mb-6 hover:bg-transparent hover:opacity-70 self-start"
        >
          <ArrowLeft /> Back to {gender === "mens" ? "Mens" : "Womens"}
        </ButtonLink>
        <Typography
          variant={"productTitle"}
          as="h1"
        >
          {product.name}
        </Typography>
        <Typography variant={"productTitle"} className="font-normal! mb-4">
          {formatPrice(product.price)}
        </Typography>
        <Share title={product.name} description={product.description} />
        {firstImage && (
          <div className="relative mt-4 aspect-3/4 w-full lg:hidden">
            <Image
              src={firstImage.image}
              alt={firstImage.alt}
              fill
              sizes="100vw"
              quality={64}
              loading="eager"
              fetchPriority="high"
              className="object-cover"
            />
          </div>
        )}
      </div>
      <Typography variant={"body"} className="mb-10 font-serif text-balance">
        {product.description}
      </Typography>
    </>
  );
}
