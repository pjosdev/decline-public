import Image, { StaticImageData } from "next/image";
import { Section } from "@/components/layout/section";

import thisIsFine from "@/assets/decline/thisisfine-sq-hero.webp";
import warzone from "@/assets/decline/warzone-sq-hero.webp";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomeHero() {
  return (
    <Section spacing={"none"} as="header">
      <div className="grid grid-cols-1 lg:grid-cols-2 relative max-h-[90dvh] overflow-hidden">
        <div className="aspect-square relative ">
          <Image src={thisIsFine} fill alt="" className="object-cover" />
        </div>
        <div className="aspect-square relative ">
          <Image src={warzone} fill alt="" className="object-cover" />
        </div>
        <div className="absolute flex flex-col gap-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="uppercase text-white text-5xl text-center ">
            Sartorial curation for the doomed generation
          </h1>
          <div className="flex gap-4 justify-center">
            <Button
              className=" flex-1 max-w-50 h-10"
              variant={"secondary"}
              asChild
            >
              <Link href={"/mens"}>Shop Mens</Link>
            </Button>
            <Button
              className=" flex-1 max-w-50 h-10"
              variant={"secondary"}
              asChild
            >
              <Link href={"/womens"}>Shop Womens</Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
