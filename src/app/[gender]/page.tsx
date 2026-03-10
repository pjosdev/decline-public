import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import ProductCard from "@/components/products/product-card";
import Link from "next/link";
import { Suspense } from "react";

import { WOMENS_PRODUCTS } from "@/data/womens";
import { MENS_PRODUCTS } from "@/data/mens";
import { ProductFilters } from "./components/product-filters";
import { EmptyState } from "./components/empty-state";
import { filterProducts, getPriceRangeFromProducts } from "@/lib/filters";

export function generateStaticParams() {
  return [{ gender: "womens" }, { gender: "mens" }];
}

interface GenderPageProps {
  params: Promise<{ gender: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function GenderPage({
  params,
  searchParams,
}: GenderPageProps) {
  const { gender } = await params;
  const resolvedSearchParams = await searchParams;

  if (!gender || (gender !== "womens" && gender !== "mens")) {
    return <div>Not found</div>;
  }

  const products = gender === "mens" ? MENS_PRODUCTS : WOMENS_PRODUCTS;

  // Convert searchParams to URLSearchParams for filtering
  const searchParamsObj = new URLSearchParams();
  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      searchParamsObj.set(key, value);
    }
  });

  const filteredProducts = filterProducts(products, searchParamsObj);

  // Get price range for slider initialization
  const priceRange = getPriceRangeFromProducts(products);
  const minPrice = Number(resolvedSearchParams.minPrice || priceRange.min);
  const maxPrice = Number(resolvedSearchParams.maxPrice || priceRange.max);

  return (
    <main className="py-16">
      <Container className="grid-gap">
        <div className="col-span-full pb-4 mb-8">
          <PageHeader title={gender}></PageHeader>
        </div>

        <aside className="col-span-full lg:col-span-3 xl:col-span-2 flex lg:block items-center justify-between">
          <p className="text-muted-foreground text-sm font-medium lg:mb-10">
            Showing {filteredProducts.length}/{products.length} products
          </p>
          <Suspense fallback={<div>Loading filters...</div>}>
            <ProductFilters 
              key={searchParamsObj.toString()}
              products={products} 
              minPrice={minPrice} 
              maxPrice={maxPrice} 
            />
          </Suspense>
        </aside>

        <div className="col-span-full lg:col-start-4">
          {filteredProducts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-gap">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/${gender}/${product.slug}`}
                  prefetch={true}
                  className="group"
                >
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
