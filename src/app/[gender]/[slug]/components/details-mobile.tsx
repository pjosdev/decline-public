import ProductImages from "@/components/products/product-images";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductType } from "@/data/types";
import { Information } from "./information";
import { Reviews } from "./reviews";
import { ShippingAndReturns } from "./shipping-and-returns";

export interface DetailsSectionProps {
  product: ProductType;
  average: number | null;
}

export function DetailsMobile({ product, average }: DetailsSectionProps) {
  const galleryImages =
    product.images.length > 1 ? product.images.slice(1) : product.images;

  return (
    <Tabs defaultValue="images" className="w-full lg:hidden mt-6">
      <TabsList className="w-full mb-6 h-auto rounded-none bg-transparent p-0 flex border-b justify-start">
        <TabsTrigger
          value="images"
          className="flex-1 rounded-none bg-transparent px-0 pb-3 pt-0 text-center font-medium transition-colors border-b-2 border-transparent text-muted-foreground hover:text-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Images
        </TabsTrigger>
        <TabsTrigger
          value="information"
          className="flex-1 rounded-none bg-transparent px-0 pb-3 pt-0 text-center font-medium transition-colors border-b-2 border-transparent text-muted-foreground hover:text-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Information and Reviews
        </TabsTrigger>
      </TabsList>
      <TabsContent value="images">
        <ProductImages images={galleryImages} expandable={false} />
      </TabsContent>
      <TabsContent value="information">
        <div className="mb-8">
          <Information product={product} />
        </div>
        <div className="mb-8">
          <Reviews product={product} average={average} />
        </div>
        <ShippingAndReturns />
      </TabsContent>
    </Tabs>
  );
}
