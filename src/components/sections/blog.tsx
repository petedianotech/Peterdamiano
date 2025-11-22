import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedCard } from "../ui/animated-section";

const blogPosts = [
  {
    slug: "making-money-in-malawi",
    title: "Author: How Malawians Can Make Money",
    summary: "An insight into my book, which provides a practical guide for Malawians to achieve financial success through local opportunities.",
    date: "2024-07-25",
  },
  {
    slug: "viral-content-secrets",
    title: "The Secrets to Viral Content on TikTok & YouTube",
    summary: "A look into my process for creating engaging scripts, video ideas, and AI prompts that capture audience attention.",
    date: "2024-07-10",
  },
  {
    slug: "leading-innovation-club",
    title: "My Journey Leading the Dzenje Innovation Club",
    summary: "Reflections on guiding students to build amazing projects and fostering a culture of creativity and problem-solving.",
    date: "2024-06-20",
  }
];


const Blog = () => {
  return (
    <section id="blog" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          From My Blog
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <AnimatedCard key={post.slug} index={index} className="bg-accent/50 rounded-lg shadow-md overflow-hidden border flex flex-col p-6">
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                <h3 className="font-bold text-xl mb-3 flex-grow">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.summary}</p>
                <Button variant="link" asChild className="p-0 self-start">
                  <Link href={`/blog/${post.slug}`}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
