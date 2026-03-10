"use client";

import { Button } from "@/components/ui/button";
import { ProductImageType } from "@/data/types";
import { X } from "lucide-react";
import Image from "next/image";
import { Activity, useEffect, useEffectEvent, useState } from "react";

const GRID_SIZES_DESKTOP =
  "(min-width: 1536px) 530px, (min-width: 1280px) 31vw, (min-width: 1024px) 34vw, 100vw";
const GRID_SIZES_MOBILE = "(min-width: 1024px) 34vw, 100vw";
const EXPANDED_SIZES =
  "(min-width: 1536px) 1120px, (min-width: 1280px) 62vw, (min-width: 1024px) 66vw, 100vw";

interface ProductImagesProps {
  images: Array<ProductImageType>;
  expandable?: boolean;
}

export default function ProductImages({
  images,
  expandable = true,
}: ProductImagesProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hasOpenedExpandedView, setHasOpenedExpandedView] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefetchExpanded, setPrefetchExpanded] = useState(false);

  const handleClose = useEffectEvent(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(null);
    }
  });

  const handleOpenExpanded = (index: number) => {
    if (!expandable) return;
    setHasOpenedExpandedView(true);
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (!expandable) return;

    const handleEscWhenImageSelected = (event: KeyboardEvent) => {
      const key = event.key;

      if (key !== "Escape") return;

      handleClose();
    };

    window.addEventListener("keydown", handleEscWhenImageSelected);

    return () =>
      window.removeEventListener("keydown", handleEscWhenImageSelected);
  }, [expandable]);

  useEffect(() => {
    if (!expandable) return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateIsDesktop = () => {
      setIsDesktop(mediaQuery.matches);
    };

    updateIsDesktop();
    mediaQuery.addEventListener("change", updateIsDesktop);

    return () => {
      mediaQuery.removeEventListener("change", updateIsDesktop);
    };
  }, [expandable]);

  useEffect(() => {
    if (!expandable || !isDesktop) {
      setPrefetchExpanded(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setPrefetchExpanded(true);
    }, 450);

    return () => {
      window.clearTimeout(timer);
    };
  }, [expandable, isDesktop, images]);

  if (!expandable) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 grid-gap">
        {images.map((image) => (
          <ProductImage
            key={image.id}
            image={image}
            mode="grid"
            sizes={GRID_SIZES_MOBILE}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <Activity mode={selectedIndex === null ? "visible" : "hidden"}>
        <div className="grid grid-cols-1 lg:grid-cols-2 grid-gap">
          {images.map((image, i) => (
            <button
              key={image.id}
              className="cursor-zoom-in"
              onClick={() => handleOpenExpanded(i)}
            >
              <ProductImage
                image={image}
                mode="grid"
                sizes={GRID_SIZES_DESKTOP}
              />
            </button>
          ))}
        </div>
      </Activity>

      <Activity mode={selectedIndex !== null ? "visible" : "hidden"}>
        <div
          className="relative cursor-zoom-out"
          role="button"
          onClick={() => setSelectedIndex(null)}
        >
          <Button
            size={"icon"}
            className="absolute top-4 right-4 z-10"
            onClick={() => setSelectedIndex(null)}
          >
            <X />
          </Button>
          {hasOpenedExpandedView && selectedIndex !== null && (
            <ProductImage
              image={images[selectedIndex]}
              mode="expanded"
              sizes={EXPANDED_SIZES}
            />
          )}
        </div>
      </Activity>

      {prefetchExpanded && (
        <div className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0" aria-hidden>
          {images.map((image) => (
            <Image
              key={`prefetch-expanded-${image.id}`}
              src={image.image}
              alt=""
              width={image.image.width}
              height={image.image.height}
              sizes={EXPANDED_SIZES}
              quality={78}
              loading="eager"
              fetchPriority="low"
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface ProductImageProps {
  image: ProductImageType;
  mode: "grid" | "expanded";
  sizes: string;
}

function ProductImage({ image, mode, sizes }: ProductImageProps) {
  return (
    <div className="relative aspect-3/4 bg-card-img-bg w-full">
      <Image
        src={image.image}
        alt={image.alt}
        fill
        sizes={sizes}
        quality={mode === "expanded" ? 78 : 64}
        loading={mode === "expanded" ? "eager" : "lazy"}
        fetchPriority={mode === "expanded" ? "high" : "auto"}
        className="object-cover"
      />
    </div>
  );
}
