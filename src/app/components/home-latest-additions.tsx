import { Scrolly } from "@/components/ui/scrolly";
import ProductCard from "@/components/products/product-card";
import { Section } from "@/components/layout/section";
import { ProductType } from "@/data/types";
import { Container } from "@/components/layout/container";
import Link from "next/link";

interface HomeLatestAdditions {
  sectionTitle: string;
  products: Array<ProductType>;
  id?: string;
}

export default function HomeLatestAdditions({
  sectionTitle,
  products,
  id,
}: HomeLatestAdditions) {
  const latest = products.slice(0, 6);
  return (
    <Section spacing={"xl"} id={id}>
      <Container>
        <div className="col-span-full">
          <Scrolly title={sectionTitle}>
            {latest.map((product, i) => (
              <Link
                key={i}
                href={`/${product.gender}/${product.slug}`}
                prefetch={true}
              >
                <ProductCard
                  key={product.slug}
                  product={product}
                  className="w-[75vw] sm:w-[50vw] md:w-[40vw] lg:w-100 xl:w-110 2xl:w-130"
                />
              </Link>
            ))}
          </Scrolly>
        </div>
      </Container>
    </Section>
  );
}
