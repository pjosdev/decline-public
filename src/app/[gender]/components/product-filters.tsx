"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductType } from "@/data/types";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getCategoriesFromProducts,
  getPriceRangeFromProducts,
} from "@/lib/filters";
import { formatPrice } from "@/helpers/format";

interface ProductFiltersProps {
  products: ProductType[];
  minPrice: number;
  maxPrice: number;
}

interface FilterDraftState {
  search: string;
  categories: string[];
  minPrice: number;
  maxPrice: number;
  rating: number;
}

const ratingOptions = [
  { label: "Show all", value: 0 },
  { label: "4+ Stars", value: 4 },
  { label: "3+ Stars", value: 3 },
  { label: "2+ Stars", value: 2 },
];

export function ProductFilters({
  products,
  minPrice,
  maxPrice,
}: ProductFiltersProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category");
  const selectedCategories = categoryParam ? categoryParam.split(",") : [];
  const showAllCategories = selectedCategories.length === 0;
  const ratingFilter = Number(searchParams.get("rating") || "0");

  // Get price range from products
  const priceRange = getPriceRangeFromProducts(products);

  // Local state for slider visual feedback - initialized from props
  const [sliderValues, setSliderValues] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [mobileDraft, setMobileDraft] = useState<FilterDraftState>({
    search: searchQuery,
    categories: selectedCategories,
    minPrice,
    maxPrice,
    rating: ratingFilter,
  });

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "Show all" || value === "0") {
      params.delete(name);
    } else {
      params.set(name, value);
    }
    return params.toString();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const query = createQueryString("search", value);
    router.push(`${pathname}?${query}`);
  };

  const handleShowAllChange = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCategoryToggle = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentCategories = selectedCategories;

    if (currentCategories.includes(category)) {
      // Remove category
      const newCategories = currentCategories.filter((c) => c !== category);
      if (newCategories.length === 0) {
        params.delete("category");
      } else {
        params.set("category", newCategories.join(","));
      }
    } else {
      // Add category
      const newCategories = [...currentCategories, category];
      params.set("category", newCategories.join(","));
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  // Update local state during drag (for visual feedback)
  const handlePriceChange = (values: number[]) => {
    setSliderValues(values as [number, number]);
  };

  // Update URL only when user releases the slider (onValueCommit)
  const handlePriceCommit = (values: number[]) => {
    const [min, max] = values;
    const params = new URLSearchParams(searchParams.toString());

    if (min === priceRange.min) {
      params.delete("minPrice");
    } else {
      params.set("minPrice", min.toString());
    }

    if (max === priceRange.max) {
      params.delete("maxPrice");
    } else {
      params.set("maxPrice", max.toString());
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleRatingChange = (rating: number) => {
    const query = createQueryString("rating", rating.toString());
    router.push(`${pathname}?${query}`);
  };

  const clearAllFilters = () => {
    router.push(pathname);
  };

  const resetMobileDraft = () => {
    setMobileDraft({
      search: "",
      categories: [],
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      rating: 0,
    });
    setSliderValues([priceRange.min, priceRange.max]);
  };

  const applyMobileFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (mobileDraft.search.trim()) {
      params.set("search", mobileDraft.search.trim());
    } else {
      params.delete("search");
    }

    if (mobileDraft.categories.length > 0) {
      params.set("category", mobileDraft.categories.join(","));
    } else {
      params.delete("category");
    }

    if (mobileDraft.minPrice === priceRange.min) {
      params.delete("minPrice");
    } else {
      params.set("minPrice", mobileDraft.minPrice.toString());
    }

    if (mobileDraft.maxPrice === priceRange.max) {
      params.delete("maxPrice");
    } else {
      params.set("maxPrice", mobileDraft.maxPrice.toString());
    }

    if (mobileDraft.rating === 0) {
      params.delete("rating");
    } else {
      params.set("rating", mobileDraft.rating.toString());
    }

    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  const handleMobileCategoryToggle = (category: string) => {
    setMobileDraft((prev) => {
      if (prev.categories.includes(category)) {
        return {
          ...prev,
          categories: prev.categories.filter((c) => c !== category),
        };
      }

      return {
        ...prev,
        categories: [...prev.categories, category],
      };
    });
  };

  const handleMobileSliderChange = (values: number[]) => {
    const [nextMin, nextMax] = values as [number, number];
    setSliderValues([nextMin, nextMax]);
    setMobileDraft((prev) => ({
      ...prev,
      minPrice: nextMin,
      maxPrice: nextMax,
    }));
  };

  // Derive categories from products
  const categories = getCategoriesFromProducts(products);

  const desktopFiltersContent = (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <Label htmlFor="search" className="text-sm font-medium mb-2 block">
          Search
        </Label>
        <Input
          id="search"
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full bg-white/50"
        />
      </div>

      {/* Category Filter */}
      <div>
        <p className="text-sm font-medium mb-3">Category</p>
        <div className="space-y-2">
          {/* Show all option */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="category-show-all"
              checked={showAllCategories}
              onCheckedChange={handleShowAllChange}
            />
            <Label
              htmlFor="category-show-all"
              className="text-sm text-muted-foreground cursor-pointer"
            >
              Show all
            </Label>
          </div>
          {/* Individual categories */}
          {categories
            .filter((c) => c !== "Show all")
            .map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                />
                <Label
                  htmlFor={`category-${category}`}
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <p className="text-sm font-medium mb-3">Price</p>
        <div className="px-1">
          <Slider
            value={sliderValues}
            min={priceRange.min}
            max={priceRange.max}
            step={1000}
            onValueChange={handlePriceChange}
            onValueCommit={handlePriceCommit}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatPrice(sliderValues[0])}</span>
            <span>{formatPrice(sliderValues[1])}</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <p className="text-sm font-medium mb-3">Rating</p>
        <div className="space-y-2">
          {ratingOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${option.value}`}
                checked={ratingFilter === option.value}
                onCheckedChange={() => handleRatingChange(option.value)}
              />
              <Label
                htmlFor={`rating-${option.value}`}
                className="text-sm text-muted-foreground cursor-pointer flex items-center"
              >
                {option.label === "Show all" ? (
                  option.label
                ) : (
                  <span className="flex items-center gap-1">
                    {option.value}+{" "}
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  </span>
                )}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <div className="pt-4 border-t">
        <Button
          variant="secondary"
          onClick={clearAllFilters}
          className="w-full"
        >
          Clear filters
        </Button>
      </div>
    </div>
  );

  const mobileFiltersContent = (
    <div className="space-y-6">
      <div>
        <Label htmlFor="search-mobile" className="text-sm font-medium mb-2 block">
          Search
        </Label>
        <Input
          id="search-mobile"
          type="text"
          placeholder="Search products..."
          value={mobileDraft.search}
          onChange={(e) =>
            setMobileDraft((prev) => ({ ...prev, search: e.target.value }))
          }
          className="w-full bg-white/50"
        />
      </div>

      <div>
        <p className="text-sm font-medium mb-3">Category</p>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="category-show-all-mobile"
              checked={mobileDraft.categories.length === 0}
              onCheckedChange={() =>
                setMobileDraft((prev) => ({ ...prev, categories: [] }))
              }
            />
            <Label
              htmlFor="category-show-all-mobile"
              className="text-sm text-muted-foreground cursor-pointer"
            >
              Show all
            </Label>
          </div>
          {categories
            .filter((c) => c !== "Show all")
            .map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-mobile-${category}`}
                  checked={mobileDraft.categories.includes(category)}
                  onCheckedChange={() => handleMobileCategoryToggle(category)}
                />
                <Label
                  htmlFor={`category-mobile-${category}`}
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-3">Price</p>
        <div className="px-1">
          <Slider
            value={[mobileDraft.minPrice, mobileDraft.maxPrice]}
            min={priceRange.min}
            max={priceRange.max}
            step={1000}
            onValueChange={handleMobileSliderChange}
            onValueCommit={handleMobileSliderChange}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatPrice(mobileDraft.minPrice)}</span>
            <span>{formatPrice(mobileDraft.maxPrice)}</span>
          </div>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-3">Rating</p>
        <div className="space-y-2">
          {ratingOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-mobile-${option.value}`}
                checked={mobileDraft.rating === option.value}
                onCheckedChange={() =>
                  setMobileDraft((prev) => ({ ...prev, rating: option.value }))
                }
              />
              <Label
                htmlFor={`rating-mobile-${option.value}`}
                className="text-sm text-muted-foreground cursor-pointer flex items-center"
              >
                {option.label === "Show all" ? (
                  option.label
                ) : (
                  <span className="flex items-center gap-1">
                    {option.value}+{" "}
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  </span>
                )}
              </Label>
            </div>
          ))}
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* Mobile: Sheet with bottom drawer */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="secondary" className="w-full">
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
            <SheetHeader className="border-b pb-4 mb-6">
              <SheetTitle className="flex items-center gap-2">
                Filters
              </SheetTitle>
            </SheetHeader>
            <div className="px-4 pb-24">{mobileFiltersContent}</div>
            <div className="sticky bottom-0 border-t bg-background/95 backdrop-blur px-4 py-3">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" onClick={resetMobileDraft} className="w-full">
                  Clear filters
                </Button>
                <Button onClick={applyMobileFilters} className="w-full">
                  Apply filters
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: Sticky sidebar */}
      <div className="hidden lg:block sticky top-4">{desktopFiltersContent}</div>
    </>
  );
}
