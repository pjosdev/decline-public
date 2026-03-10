import { WOMENS_PRODUCTS } from "@/data/womens";
import { MENS_PRODUCTS } from "@/data/mens";
import { ProductType } from "@/data/types";
import ProductPageClient from "@/app/[gender]/[slug]/page-client";

const ALL_PRODUCTS: Array<ProductType> = [...WOMENS_PRODUCTS, ...MENS_PRODUCTS];

export function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({
    gender: product.gender,
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; gender: string }>;
}) {
  const { slug, gender } = await params;

  const product = ALL_PRODUCTS.find((prod) => prod.slug === slug);

  if (!product)
    return (
      <div>
        {/* nextjs not found page, actually */}
        <p>No product found!</p>
      </div>
    );

  return <ProductPageClient product={product} gender={gender} />;
}
