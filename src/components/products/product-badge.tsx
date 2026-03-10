import { ProductBadgeType } from "@/data/types";
import { Badge } from "@/components/ui/badge";

interface ProductBadgeProps {
  kind: ProductBadgeType;
}

export default function ProductBadge({ kind }: ProductBadgeProps) {
  if (kind === "out-of-stock") {
    return <Badge variant={"out-of-stock"}>Out of stock</Badge>;
  }
  if (kind === "stock-low") {
    return <Badge variant={"stock-low"}>Stock low</Badge>;
  }
  return null;
}
