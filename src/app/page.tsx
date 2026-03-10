import HomeHero from "@/app/components/home-hero";
import HomeLatestAdditions from "@/app/components/home-latest-additions";

import { WOMENS_PRODUCTS } from "@/data/womens";
import { MENS_PRODUCTS } from "@/data/mens";
import HomeBlog from "@/app/components/home-blog";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeLatestAdditions
        id="latest"
        sectionTitle="latest womens"
        products={WOMENS_PRODUCTS}
      />
      <HomeLatestAdditions
        id="latest"
        sectionTitle="latest mens"
        products={MENS_PRODUCTS}
      />
      <HomeBlog />
    </>
  );
}
