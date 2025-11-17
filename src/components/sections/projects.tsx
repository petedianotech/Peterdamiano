"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";

const projectsData = [
  {
    category: "Developer",
    title: "AI-Powered Sustainability Platform",
    description: "A machine learning platform for tracking and reducing carbon footprints, helping businesses achieve sustainability goals.",
    tags: ["Full-Stack Dev", "AI Innovation", "Tech Education"],
    image: { src: "", width: 600, height: 400, hint: "sustainability platform" },
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    category: "Author",
    title: `"Code & Creativity" Book & Series`,
    description: "A bestselling book and companion YouTube series exploring the intersection of software development and creative expression.",
    tags: ["Author", "Content Creator", "Technical Writing"],
    image: { src: "", width: 600, height: 400, hint: "creative code" },
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    category: "Innovator",
    title: "Accessibility-First App Suite",
    description: "A suite of mobile applications designed with voice navigation and advanced haptic feedback for visually impaired users.",
    tags: ["Mobile Dev", "UX Innovation", "Tutorial Series"],
    image: { src: "", width: 600, height: 400, hint: "mobile accessibility" },
    liveUrl: "#",
    githubUrl: "#",
  },
];

const categories = ["All", "Developer", "Innovator", "Creator", "Author"];

const tagColors: { [key: string]: string } = {
  "Full-Stack Dev": "bg-blue-100 text-blue-800",
  "AI Innovation": "bg-purple-100 text-purple-800",
  "Tech Education": "bg-green-100 text-green-800",
  "Author": "bg-coral-orange/20 text-coral-orange",
  "Content Creator": "bg-yellow-100 text-yellow-800",
  "Technical Writing": "bg-gray-100 text-gray-800",
  "Mobile Dev": "bg-indigo-100 text-indigo-800",
  "UX Innovation": "bg-pink-100 text-pink-800",
  "Tutorial Series": "bg-teal-100 text-teal-800",
};

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);


  const getCategoryFromFilter = (filter: string) => {
    if (filter === "All") return "projects";
    return `projects-${filter.toLowerCase()}`;
  }

  return (
    <section id="projects" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold text-deep-navy tracking-tight">
            My Work
          </h2>
          <p className="mt-2 text-lg text-charcoal">
            A selection of projects that showcase my skills.
          </p>
        </div>
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              onClick={() => setActiveFilter(category)}
              className="capitalize"
              aria-pressed={activeFilter === category}
            >
              {category}
            </Button>
          ))}
        </div>

        <div id={getCategoryFromFilter(activeFilter)} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.title} className="overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
               <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block overflow-hidden">
                <div className="w-full h-48 bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Image coming soon</span>
                </div>
              </Link>
              <CardHeader className="flex-grow">
                <CardTitle className="text-xl text-deep-navy leading-snug tracking-tight">{project.title}</CardTitle>
                <CardDescription className="pt-2 leading-relaxed">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} className={cn("font-normal", tagColors[tag] || 'variant="secondary"')}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
               <CardFooter className="mt-auto bg-muted/50 px-6 py-4 flex justify-between items-center">
                 <Button asChild variant="link" size="sm" className="p-0 h-auto">
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" >
                      Live Demo <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="icon">
                     <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`}>
                      <Github className="h-5 w-5 text-muted-foreground" />
                    </Link>
                  </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
