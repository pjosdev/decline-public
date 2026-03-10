import { StaticImageData } from "next/image";

export type ProductBadgeType = "out-of-stock" | "stock-low";

export const sizes = ["xs", "sm", "md", "lg", "xl", "xxl"] as const;
export type ProductSizesType = (typeof sizes)[number];

export type ProductReviewType = {
  reviewId: string;
  reviewText: Array<string>;
  author: string;
  reviewDate: Date;
  rating: number; // out of 5
  verified?: boolean;
};

export type ProductImageType = {
  id: string;
  image: StaticImageData;
  alt: string;
};

type GenderType = "mens" | "womens";

export type ProductType = {
  id: string;
  slug: string; // based on name
  gender: GenderType;
  images: Array<ProductImageType>;
  cartImage?: StaticImageData;
  name: string;
  price: number; // cents
  description: string;
  availableSizes: Array<ProductSizesType>;
  reviews?: Array<ProductReviewType>;
  information: Array<string>;
};
