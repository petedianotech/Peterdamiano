import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";

const projectsData = [
  {
    title: "AI-Powered Project Manager",
    description: "A smart project management tool that uses AI to predict deadlines, allocate resources, and identify potential risks.",
    image: "/placeholder.svg",
    tags: ["React", "Node.js", "Python", "AI/ML"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "E-Commerce Analytics Platform",
    description: "A comprehensive analytics dashboard for e-commerce businesses to track sales, customer behavior, and marketing campaign performance.",
    image: "/placeholder.svg",
    tags: ["Next.js", "TypeScript", "GraphQL", "Data Viz"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Interactive Code Learning App",
    description: "A mobile application that gamifies learning to code with interactive challenges, tutorials, and a supportive community.",
    image: "/placeholder.svg",
    tags: ["React Native", "Firebase", "Gamification"],
    liveUrl: "#",
    githubUrl: "#",
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 md:py-32 bg-light-ivory">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-deep-navy mb-12">
          Featured Projects
        </h2>
        <div className="space-y-16">
          {projectsData.map((project, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className={`relative rounded-lg overflow-hidden shadow-xl ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full object-cover transition-transform duration-500 hover:scale-105"
                  data-ai-hint="abstract tech screenshot"
                />
              </div>
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <h3 className="text-2xl font-bold text-deep-navy mb-3">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-sky-blue/20 text-sky-blue text-sm font-medium px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <p className="text-slate-gray mb-6 leading-relaxed">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
