import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("text-primary", {
  variants: {
    variant: {
      body: "font-sans",
      serif: "font-serif",
      headline: "",
      sectionTitle: "font-medium text-2xl capitalize",
      pageTitle: "text-3xl font-medium leading-[0.9] capitalize",
      productCardTitle: "capitalize font-semibold text-lg leading-[1.3]",
      productTitle: "text-4xl font-medium",
      productDetailSectionTitle: "text-muted-foreground font-medium",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export interface TypographyProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export function Typography({
  className,
  variant,
  as: Component = "p",
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  );
}
