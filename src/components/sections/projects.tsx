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
} from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const projectsData = [
  {
    category: "Developer",
    title: "AI-Powered Sustainability Platform",
    description: "A machine learning platform for tracking and reducing carbon footprints, helping businesses achieve sustainability goals.",
    tags: ["Full-Stack Dev", "AI Innovation", "Tech Education"],
    image: PlaceHolderImages.find(p => p.id === "project-sustainability"),
  },
  {
    category: "Author",
    title: `"Code & Creativity" Book & Series`,
    description: "A bestselling book and companion YouTube series exploring the intersection of software development and creative expression.",
    tags: ["Author", "Content Creator", "Technical Writing"],
    image: PlaceHolderImages.find(p => p.id === "project-book"),
  },
  {
    category: "Innovator",
    title: "Accessibility-First App Suite",
    description: "A suite of mobile applications designed with voice navigation and advanced haptic feedback for visually impaired users.",
    tags: ["Mobile Dev", "UX Innovation", "Tutorial Series"],
    image: PlaceHolderImages.find(p => p.id === "project-accessibility"),
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
      : projectsData.filter((p) => p.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase())));


  const getCategoryFromFilter = (filter: string) => {
    if (filter === "All") return "projects";
    return `projects-${filter.toLowerCase()}`;
  }

  return (
    <section id="projects" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold text-deep-navy">
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
            >
              {category}
            </Button>
          ))}
        </div>

        <div id={getCategoryFromFilter(activeFilter)} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.title} className="overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
              {project.image && (
                <Image
                  src={project.image.imageUrl}
                  alt={project.image.description}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint={project.image.imageHint}
                />
              )}
              <CardHeader>
                <CardTitle className="text-xl text-deep-navy">{project.title}</CardTitle>
                <CardDescription className="pt-2">{project.description}</CardDescription>
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
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
