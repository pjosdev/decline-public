import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allPosts } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Typography } from "@/components/ui/typography";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._meta.path,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = allPosts.find((post) => post._meta.path === slug);

  if (!post || !post.published) {
    return notFound();
  }

  return (
    <>
      <Section spacing={"none"}>
        <Container as="header" className="border-b">
          <div className="col-span-full xl:col-span-6 py-10 flex flex-col justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center w-10 h-10 hover:bg-white/50 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </Link>
            <div className="flex flex-col gap-6 w-11/12 -mt-10">
              <Typography variant={"productTitle"}>{post.title}</Typography>
              <Typography
                variant={"productTitle"}
                className="font-normal! mb-4 text-3xl"
              >
                {post.summary}
              </Typography>
            </div>
            <div className="flex items-center gap-12">
              <Typography variant={"body"} className="uppercase">
                {post.date}
              </Typography>
              <Typography variant={"body"} className="uppercase">
                {post.readTime} read
              </Typography>
            </div>
          </div>
          <div className="col-span-full aspect-square xl:col-span-6 relative">
            <Image src={post.coverImage} alt="" fill className="object-cover" />
          </div>
        </Container>
      </Section>
      <Section>
        <Container className="grid-cols-none!">
          <article
            className="max-w-5xl mx-auto font-serif prose prose-xl prose-stone 
           prose-headings:font-sans prose-headings:font-semibold prose-headings:text-2xl prose-headings:tracking-tight
           prose-p:text-xl prose-p:leading-relaxed prose-p:mb-6 prose-p:text-foreground!
           prose-strong:font-bold
           prose-em:italic
           prose-a:text-foreground prose-a:underline prose-a:underline-offset-4
           prose-blockquote:border-l-2 prose-blockquote:border-foreground prose-blockquote:pl-6 prose-blockquote:italic
           prose-ul:my-6 prose-ol:my-6
           prose-li:mb-2"
          >
            <MDXContent code={post.mdx} />
          </article>
        </Container>
      </Section>
    </>
  );
}

interface AuthorProps {
  author: string;
  authorImage: string;
}

function Author({ author, authorImage }: AuthorProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="size-10 relative">
        <Image
          src={authorImage}
          alt={`${author}'s profile picture`}
          fill
          className="object-cover"
        />
      </div>
      <Typography variant={"body"} className="uppercase">
        {author}
      </Typography>
    </div>
  );
}

/**
 *     /**
    <article className="min-h-screen bg-background">
    //   <div className="fixed top-4 left-4 z-50">
        

    //   <header className="min-h-screen grid lg:grid-cols-2">
    //     <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-24 lg:py-0">
    //       <div className="max-w-xl">
    //         <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase leading-[0.95] tracking-tight mb-6">
    //           {post.title}
    //         </h1>

    //         <p className="font-serif text-lg sm:text-xl lg:text-2xl italic text-foreground/80 leading-relaxed mb-10">
    //           {post.summary}
    //         </p>

    //         <div className="flex items-center gap-4">
    //           <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-border">
    //             <Image
    //               src={post.authorImage}
    //               alt={post.author}
    //               fill
    //               className="object-cover"
    //             />
    //           </div>
    //           <div className="flex items-center gap-6 text-sm font-sans uppercase tracking-wide">
    //             <span className="font-medium">{post.author}</span>
    //             <span className="text-muted-foreground">{post.date}</span>
    //             <span className="text-muted-foreground">{post.readTime}</span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="relative h-[50vh] lg:h-auto">
    //       <Image
    //         src={post.coverImage}
    //         alt={post.title}
    //         fill
    //         className="object-cover"
    //         priority
    //       />
    //     </div>
    //   </header>

    //   <div className="max-w-3xl mx-auto px-6 sm:px-12 lg:px-16 py-16 lg:py-24">
    //     <div className="font-serif prose prose-lg max-w-none 
    //       prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight
    //       prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6
    //       prose-strong:font-bold
    //       prose-em:italic
    //       prose-a:text-foreground prose-a:underline prose-a:underline-offset-4
    //       prose-blockquote:border-l-2 prose-blockquote:border-foreground prose-blockquote:pl-6 prose-blockquote:italic
    //       prose-ul:my-6 prose-ol:my-6
    //       prose-li:mb-2">
    //       <MDXContent code={post.mdx} />
    //     </div>
    //   </div>
    // </article>
 */
