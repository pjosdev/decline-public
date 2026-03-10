import { ProductType } from "@/data/types";
import { Information } from "./information";
import { Reviews } from "./reviews";
import { ShippingAndReturns } from "./shipping-and-returns";

export interface DetailsSectionProps {
  product: ProductType;
  average: number | null;
}

export function DetailsDesktop({ product, average }: DetailsSectionProps) {
  return (
    <div className="hidden py-10 lg:flex flex-col gap-16">
      {/* information */}
      <div>
        <Information product={product} />
      </div>
      {/* reviews */}
      <div className="2xl:col-span-3">
        <Reviews product={product} average={average} />
      </div>
      <ShippingAndReturns />
    </div>
  );
}
