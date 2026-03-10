import { Typography } from "@/components/ui/typography";
import { ProductType } from "@/data/types";
import { StarRating } from "./star-rating";
import { ProductReview } from "./product-review";

export interface ReviewsProps {
  product: ProductType;
  average?: number | null;
}

export function Reviews({ product, average }: ReviewsProps) {
  return (
    <>
      <Typography
        variant={"productDetailSectionTitle"}
        className="mb-8"
        as="h2"
      >
        Reviews ({product.reviews ? product.reviews.length : 0})
      </Typography>
      <div className="mb-12">{average && <StarRating average={average} />}</div>
      {product.reviews && product.reviews?.length > 0 ? (
        <div className="flex flex-col gap-10">
          {product.reviews.map((review) => (
            <ProductReview
              author={review.author}
              rating={review.rating}
              reviewText={review.reviewText}
              reviewDate={review.reviewDate}
              key={review.reviewId}
              verified={review.verified}
            />
          ))}
        </div>
      ) : (
        <div>
          <Typography
            variant={"body"}
            className="text-muted-foreground"
          >
            No reviews
          </Typography>
        </div>
      )}
    </>
  );
}
