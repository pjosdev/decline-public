import { Typography } from "@/components/ui/typography";
import { ProductType } from "@/data/types";

export interface InformationProps {
  product: ProductType;
}

export function Information({ product }: InformationProps) {
  return (
    <>
      <Typography
        variant={"productDetailSectionTitle"}
        className="mb-8"
        as="h2"
      >
        Information
      </Typography>
      <ul className="space-y-2 list-disc list-inside">
        {product.information.map((info, i) => (
          <li key={i}>
            <Typography variant={"body"} as="span">
              {info}
            </Typography>
          </li>
        ))}
      </ul>
    </>
  );
}
