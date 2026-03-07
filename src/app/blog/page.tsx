import type { Metadata } from "next";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogCard } from "@/components/blog/blog-card";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Orizzonti Educativi AU",
  description:
    "Riflessioni, guide pratiche e approfondimenti sul sistema educativo australiano per educatori italiani.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      {/* Header section */}
      <section className="py-16 md:py-24 px-4">
        <BlogHeader />
      </section>

      {/* Blog grid */}
      <section className="py-8 md:py-12 px-4 pb-20 md:pb-28">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                description={post.description}
                slug={post.slug}
                date={post.date}
                image={post.image}
                tags={post.tags}
                readingTime={post.readingTime}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
