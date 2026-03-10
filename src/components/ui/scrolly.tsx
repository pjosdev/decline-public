"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";

interface ScrollyProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  title: string;
  variant?: "default" | "detailed";
  subtitle?: string;
  collectionHref?: string;
  collectionLabel?: string;
}

export function Scrolly({
  children,
  className,
  containerClassName,
  title,
  variant = "default",
  subtitle,
  collectionHref,
  collectionLabel = "See all",
}: ScrollyProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScrollability = React.useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 1);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  React.useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    checkScrollability();
    container.addEventListener("scroll", checkScrollability);
    window.addEventListener("resize", checkScrollability);

    return () => {
      container.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [checkScrollability]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    // Get the first child to calculate scroll amount based on item width + gap
    const firstChild = container.querySelector(
      "[data-scrolly-item]",
    ) as HTMLElement;
    const gap = 32; // gap-4 = 1rem = 16px
    const scrollAmount = firstChild
      ? firstChild.offsetWidth + gap
      : container.clientWidth * 0.8;

    const amount = direction === "left" ? -scrollAmount : scrollAmount;
    container.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 justify-between mb-8">
        <div>
          <Typography variant={"sectionTitle"}>{title}</Typography>
        </div>
        <div className="flex items-center gap-2">
          {collectionHref && (
            <Button variant="outline" size="sm" asChild>
              <Link href={collectionHref}>{collectionLabel}</Link>
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className={cn(
          "flex gap-4 md:gap-6 overflow-x-auto scroll-smooth",
          containerClassName,
        )}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} data-scrolly-item className="shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
