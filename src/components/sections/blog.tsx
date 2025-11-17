import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    slug: "mastering-react-hooks",
    title: "Mastering React Hooks: A Deep Dive",
    summary: "Unlock the full potential of React Hooks and write cleaner, more efficient code.",
    date: "2024-07-20",
  },
  {
    slug: "devops-demystified",
    title: "DevOps Demystified: A Beginner's Guide",
    summary: "Learn the core concepts of DevOps and how to implement CI/CD pipelines.",
    date: "2024-06-15",
  },
  {
    slug: "the-art-of-ui-design",
    title: "The Art of UI Design: Principles and Practices",
    summary: "Discover the principles of creating beautiful and intuitive user interfaces.",
    date: "2024-05-30",
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
          {blogPosts.map((post) => (
            <div key={post.slug} className="bg-accent/50 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 border flex flex-col p-6">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
