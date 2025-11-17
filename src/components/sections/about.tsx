import Image from "next/image";
import { Lightbulb, Code, Feather } from 'lucide-react';

const timelineEvents = [
  {
    year: "2018",
    title: "Started as a Full-Stack Developer",
    description: "Began my journey building robust web applications and honing my coding skills.",
    icon: <Code className="w-5 h-5" />,
  },
  {
    year: "2021",
    title: "First Major Innovation Project",
    description: "Led a team to develop an award-winning accessibility tool, sparking my passion for user-centric innovation.",
    icon: <Lightbulb className="w-5 h-5" />,
  },
  {
    year: "2023",
    title: "Published 'Code & Creativity'",
    description: "Authored my first book, merging my technical expertise with my love for storytelling and content creation.",
    icon: <Feather className="w-5 h-5" />,
  },
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold text-deep-navy tracking-tight">
            About Me
          </h2>
          <p className="mt-2 text-lg text-charcoal">
            The story behind my multi-faceted career.
          </p>
        </div>
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <h3 className="text-2xl font-semibold text-charcoal mb-4 tracking-tight">
              Connecting the Dots: From Code to Content
            </h3>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                My career hasn't been a straight line, but a journey of connecting diverse passions. I started in the world of code, building digital experiences from the ground up. But I quickly realized that the best technology is rooted in human stories and accessible design.
              </p>
              <p>
                This led me to explore innovation, where I could use technology not just to build, but to solve real-world problems. My work in accessibility taught me the power of inclusive design.
              </p>
              <p>
                Eventually, I felt compelled to share what I'd learned. That's when I became a creator and author, translating complex technical concepts into engaging content that empowers others. Each role informs the others, creating a unique synergy where development is more creative, innovation is more grounded, and content is more authentic.
              </p>
            </div>
          </div>
          <div className="md:col-span-2 flex justify-center">
             <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full animate-pulse"></div>
                <Image
                    src="" // Add your professional profile picture URL here
                    alt="Peter Damiano"
                    width={400}
                    height={400}
                    className="relative rounded-full shadow-lg border-4 border-card object-cover"
                />
             </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-semibold text-charcoal mb-8 text-center tracking-tight">
            Career Milestones
          </h3>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border"></div>
            {timelineEvents.map((event, index) => (
              <div
                key={event.year}
                className={`relative flex items-center w-full mb-8 ${
                  index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                }`}
              >
                <div className="hidden md:block md:w-5/12"></div>
                 <div className="z-10 absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground ring-8 ring-secondary/20">
                  {event.icon}
                </div>
                <div className="md:w-5/12 w-full p-4 bg-card rounded-lg shadow-md">
                  <p className="text-sm font-semibold text-primary">{event.year}</p>
                  <h4 className="font-bold text-lg text-deep-navy mt-1">{event.title}</h4>
                  <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
