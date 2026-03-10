import { Typography } from "@/components/ui/typography";
import { CheckCircle } from "lucide-react";
import { ProductReviewType } from "@/data/types";

export function ProductReview({
  author,
  reviewDate,
  verified,
  reviewText,
}: Omit<ProductReviewType, "reviewId">) {
  return (
    <article>
      <header className="flex items-center justify-between mb-4">
        <Typography as="h3" className="font-medium">
          {author}
        </Typography>

        {verified ? (
          <div className="flex items-center gap-1">
            <CheckCircle className="size-3 stroke-muted-foreground" />
            <Typography
              variant={"body"}
              as="p"
              className="text-muted-foreground font-medium"
            >
              Verified
            </Typography>
          </div>
        ) : null}
      </header>
      <section>
        {reviewText.map((text, i) => (
          <Typography
            key={i}
            variant={"body"}
            as="p"
            className="mb-1 font-serif"
          >
            {text}
          </Typography>
        ))}
        <Typography
          variant={"body"}
          as="p"
          className="text-muted-foreground mt-4"
        >
          {new Date(reviewDate).toDateString()}
        </Typography>
      </section>
    </article>
  );
}
