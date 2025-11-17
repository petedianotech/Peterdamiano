import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";

const projectsData = [
  {
    title: "AI-Powered Project Manager",
    description: "A smart project management tool that uses AI to predict deadlines, allocate resources, and identify potential risks.",
    tags: ["React", "Node.js", "Python", "AI/ML"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "E-Commerce Analytics Platform",
    description: "A comprehensive analytics dashboard for e-commerce businesses to track sales, customer behavior, and marketing campaign performance.",
    tags: ["Next.js", "TypeScript", "GraphQL", "Data Viz"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Interactive Code Learning App",
    description: "A mobile application that gamifies learning to code with interactive challenges, tutorials, and a supportive community.",
    tags: ["React Native", "Firebase", "Gamification"],
    liveUrl: "#",
    githubUrl: "#",
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <div key={index} className="bg-accent/50 p-8 rounded-lg shadow-md flex flex-col">
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-primary/20 text-primary text-sm font-medium px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                  {project.description}
                </p>
                <div className="flex items-center gap-4">
                  <Button asChild>
                    <Link href={project.liveUrl}>
                      View Live <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={project.githubUrl}>
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
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

export default Projects;
