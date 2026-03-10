import { Scrolly } from "@/components/ui/scrolly";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { allPosts } from "content-collections";
import { BlogCard } from "@/components/blog/blog-card";
import { Typography } from "@/components/ui/typography";

export default function HomeBlog() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <Section spacing={"xl"} id={"blog"}>
      <Container>
        <div className="col-span-full mb-4">
          <Typography variant={"sectionTitle"}>Latest from blog</Typography>
        </div>
        <div className="col-span-full grid grid-cols-1 lg:grid-cols-3 grid-gap">
          {posts.map((post, i) => (
            <BlogCard
              key={i}
              coverImage={post.coverImage}
              date={post.date}
              readTime={post.readTime}
              slug={post._meta.path}
              summary={post.summary}
              title={post.title}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
