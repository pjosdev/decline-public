import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      none: "py-0",
      sm: "py-8 md:py-12",
      md: "py-12 md:py-16",
      rg: "py-16 md:py-20",
      lg: "py-20 md:py-28",
      xl: "py-28 xl:py-36 2x:py-40"
    },
  },
  defaultVariants: {
    spacing: "md",
  },
});

export interface SectionProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: "section" | "div" | "article" | "aside" | "nav" | "header" | "footer" | "main";
  children: React.ReactNode;
}

export function Section({
  className,
  spacing,
  as: Component = "section",
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(sectionVariants({ spacing }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
