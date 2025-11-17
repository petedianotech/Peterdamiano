import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import placeholderImages from '@/lib/placeholder-images.json';

const blogPosts = [
  {
    title: "The Ethics of Generative AI",
    date: "July 15, 2024",
    description: "A deep dive into the moral and ethical implications of advanced AI systems.",
    image: placeholderImages.aiEthics,
  },
  {
    title: "Building Accessible Web Applications",
    date: "June 28, 2024",
    description: "Practical tips and techniques for creating web experiences that are inclusive for all users.",
    image: placeholderImages.webAccessibility,
  },
  {
    title: "From Code to Content: My Writing Process",
    date: "May 10, 2024",
    description: "A behind-the-scenes look at how I approach technical writing and content creation.",
    image: placeholderImages.writingProcess,
  },
];

export function Blog() {
  return (
    <section id="blog" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold text-deep-navy">
            Blog & Insights
          </h2>
          <p className="mt-2 text-lg text-charcoal">
            Sharing my thoughts on technology, creativity, and more.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.title} className="overflow-hidden flex flex-col group transition-all hover:shadow-xl hover:-translate-y-1">
              <Link href="#" className="block" aria-label={`Read more about ${post.title}`}>
                 <Image
                    src={post.image.src}
                    alt={post.title}
                    width={post.image.width}
                    height={post.image.height}
                    className="w-full h-48 object-cover"
                    data-ai-hint={post.image.hint}
                  />
              </Link>
              <CardHeader className="flex-grow">
                <p className="text-sm text-muted-foreground">{post.date}</p>
                <CardTitle className="text-xl text-deep-navy mt-1 group-hover:text-primary transition-colors">
                  <Link href="#">{post.title}</Link>
                </CardTitle>
                <CardDescription className="mt-2 text-foreground/80">{post.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="#" className="font-semibold text-primary flex items-center gap-2">
                  Read More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
