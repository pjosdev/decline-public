import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";

export interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, children, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between w-full",
        className
      )}
    >
      <Typography as="h1" variant={'pageTitle'}>
        {title} Collection
      </Typography>
      {children && <div className="flex items-center">{children}</div>}
    </div>
  );
}
