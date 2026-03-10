import * as React from "react";
import Link from "next/link";
import type { VariantProps } from "class-variance-authority";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LinkProps = React.ComponentProps<typeof Link>;
type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface ButtonLinkProps extends ButtonVariantProps {
  href: LinkProps["href"];
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

function ButtonLink({
  href,
  variant = "default",
  size = "default",
  className,
  children,
  disabled,
  ...props
}: ButtonLinkProps & Omit<LinkProps, "href" | "className" | "children">) {
  return (
    <Button variant={variant} size={size} className={className} asChild disabled={disabled}>
      <Link href={href} className={cn(buttonVariants({ variant, size }))} {...props}>
        {children}
      </Link>
    </Button>
  );
}

export { ButtonLink };
export type { ButtonLinkProps };
