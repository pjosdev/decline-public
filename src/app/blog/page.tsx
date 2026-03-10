import { allPosts } from "content-collections";
import { BlogCard } from "@/components/blog/blog-card";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Typography } from "@/components/ui/typography";
import { EmptyState } from "@/app/[gender]/components/empty-state";

export default function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Section as="main" className="min-h-screen bg-background">
      <Container className="grid-gap">
        <aside className="col-span-full lg:col-span-3 xl:col-span-2 flex lg:block items-center justify-between">
          <Typography as="h1" variant={"pageTitle"}>
            Blog
          </Typography>
        </aside>
      <div className="col-span-full lg:col-start-4">
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-gap">
            {posts.map((post) => (
              <BlogCard
                key={post._meta.path}
                title={post.title}
                summary={post.summary}
                coverImage={post.coverImage}
                slug={post._meta.path}
                date={post.date}
                readTime={post.readTime}
              />
            ))}
          </div>
        )}
      </div>
      </Container>
    </Section>
  );
}
