import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";

const projectsData = [
  {
    title: "PowerBrain - Education Platform",
    description: "A comprehensive web application for Malawian students and teachers, featuring quiz questions, past paper downloads, a PDF reader, and a Pomodoro timer to enhance learning and productivity.",
    tags: ["Next.js", "Firebase", "EdTech", "Web App"],
    liveUrl: "https://powerbrain.vercel.app/",
    githubUrl: "#",
  },
  {
    title: "Real-Time Chat Application",
    description: "A full-featured chat application built with a modern stack, enabling instant messaging, group chats, and read receipts using WebSocket technology for a seamless, real-time user experience.",
    tags: ["React", "Node.js", "WebSocket", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "AI Content Summarizer",
    description: "An intelligent tool that leverages a large language model (LLM) to summarize long articles, documents, or web pages into concise, easy-to-read summaries, saving users valuable time.",
    tags: ["Python", "Flask", "AI/ML", "REST API"],
    liveUrl: "#",
    githubUrl: "#",
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 md:py-24 bg-background">
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
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      View Live <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
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
