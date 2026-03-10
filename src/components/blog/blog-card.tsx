import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";

interface BlogCardProps {
  title: string;
  summary: string;
  coverImage: string;
  slug: string;
  date: string;
  readTime: string;
  className?: string;
}

export function BlogCard({
  title,
  summary,
  coverImage,
  slug,
  date,
  readTime,
  className,
}: BlogCardProps) {
  return (
    <article className={cn("group hover:opacity-70 transition-opacity", className)}>
      <Link href={`/blog/${slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-2/3 w-full overflow-hidden bg-muted mb-3">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <Typography variant={"productCardTitle"}>{title}</Typography>

          <Typography variant="serif" className="line-clamp-3">
            {summary}
          </Typography>
          {/* Meta */}
          <div className="flex items-center gap-3 text-sm font-sans text-muted-foreground uppercase tracking-wide">
            <span>{date}</span>
            <span>•</span>
            <span>{readTime}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
