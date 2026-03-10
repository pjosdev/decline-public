import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: "div" | "nav" | "aside" | "section" | "header" | "footer" | "main";
}

export function Container({
  children,
  className,
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn("mx-auto max-w-640 grid grid-cols-12 px-4 lg:px-10 2xl:px-16 grid-gap", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
