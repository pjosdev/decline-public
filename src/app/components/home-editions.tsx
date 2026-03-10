import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import ProductCard from "@/components/products/product-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Typography } from "@/components/ui/typography";
import { ProductType } from "@/data/types";

interface HomeEditionsProps {
  products: Array<ProductType>;
}

export default function HomeEditions({ products }: HomeEditionsProps) {
  return (
    <Section spacing={"xl"}>
      <Container>
        <div className="col-span-full lg:col-span-3">
          <Typography variant={"headline"} className="mb-10">
            <span className="text-muted-foreground block">oni editions</span>
            short run listings
          </Typography>
          <ButtonLink href="/editions">See all</ButtonLink>
        </div>
        <div className="col-span-full md:col-span-3 grid grid-cols-1 lg:grid-cols-2 lg:col-span-8 lg:col-start-5 gap-4">
          {products.map((p, i) => {
            if (i > 1) return null; // limit to two items
            return <ProductCard key={p.slug} product={p} />;
          })}
        </div>
      </Container>
    </Section>
  );
}
