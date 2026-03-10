import { ProductType } from "@/data/types";

// Category detection based on product name keywords
const categoryKeywords: Record<string, string[]> = {
  "Coats": ["coat", "jacket", "puffer"],
  "Tops": ["tee", "t-shirt", "top", "hoodie", "cardigan"],
  "Bottoms": ["jeans", "pants", "trousers"],
  "Shoes": ["boots", "sneakers", "shoes"],
  "Accessories": ["belt", "bag", "necklace", "chain"],
};

export function getProductCategory(productName: string): string {
  const lowerName = productName.toLowerCase();
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => lowerName.includes(keyword))) {
      return category;
    }
  }
  return "Other";
}

export function getCategoriesFromProducts(products: ProductType[]): string[] {
  const categories = new Set<string>(["Show all"]);
  products.forEach(product => {
    categories.add(getProductCategory(product.name));
  });
  return Array.from(categories);
}

export function getPriceRangeFromProducts(products: ProductType[]): { min: number; max: number } {
  if (products.length === 0) return { min: 0, max: 100000 };
  
  const prices = products.map(p => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  
  return {
    min: Math.floor(min / 1000) * 1000,
    max: Math.ceil(max / 1000) * 1000
  };
}

export function filterProducts(
  products: ProductType[],
  searchParams: URLSearchParams
): ProductType[] {
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const categoryParam = searchParams.get("category");
  const selectedCategories = categoryParam ? categoryParam.split(",") : [];
  const minPrice = Number(searchParams.get("minPrice") || "0");
  const maxPrice = Number(searchParams.get("maxPrice") || "Infinity");
  const ratingFilter = Number(searchParams.get("rating") || "0");

  return products.filter((product) => {
    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery)) {
      return false;
    }

    // Category filter
    if (selectedCategories.length > 0) {
      const productCategory = getProductCategory(product.name);
      if (!selectedCategories.includes(productCategory)) return false;
    }

    // Price filter
    if (minPrice > 0 && product.price < minPrice) return false;
    if (maxPrice !== Infinity && product.price > maxPrice) return false;

    // Rating filter
    if (ratingFilter > 0) {
      if (!product.reviews || product.reviews.length === 0) return false;
      const avgRating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;
      if (avgRating < ratingFilter) return false;
    }

    return true;
  });
}
