import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Building,
  Cog,
  Video,
  FileText,
  Download,
} from 'lucide-react';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';

const skillsData = [
  {
    icon: <Building className="h-7 w-7 text-primary" />,
    title: 'Software Development',
    description:
      'Building scalable web applications and robust backend systems with modern frameworks. Focusing on clean, maintainable code.',
    tags: ['React', 'Node.js', 'Python', 'TypeScript', 'Next.js'],
  },
  {
    icon: <Cog className="h-7 w-7 text-primary" />,
    title: 'Automation & Systems',
    description:
      'Streamlining workflows and integrating APIs to save time and reduce error. Optimizing processes for efficiency.',
    tags: ['CI/CD', 'Scripting', 'API Integration', 'Docker', 'Zapier'],
  },
  {
    icon: <Video className="h-7 w-7 text-primary" />,
    title: 'Content Creation',
    description:
      'Producing engaging digital content, video editing, and social strategy for tech audiences. Visual storytelling that connects.',
    tags: ['Video Editing', 'Social Strategy', 'Storytelling', 'Adobe Creative Cloud'],
  },
  {
    icon: <FileText className="h-7 w-7 text-primary" />,
    title: 'Writing',
    description:
      'Authoring technical guides, creative narratives, and compelling copy. Translating complex ideas into accessible language.',
    tags: ['Technical Writing', 'Copywriting', 'Blogging', 'Editing'],
  },
];

const SkillCard = ({
  icon,
  title,
  description,
  tags,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
}) => (
  <div className="bg-card p-8 rounded-xl border border-border/80 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md">
    <div className="flex items-start gap-4 mb-4">
      <div className="bg-primary/10 p-3 rounded-lg">{icon}</div>
      <h3 className="text-2xl font-bold pt-2">{title}</h3>
    </div>
    <p className="text-muted-foreground mb-6">{description}</p>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-secondary text-secondary-foreground text-sm font-medium px-3 py-1 rounded-full border border-border/80"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export default function ExpertisePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 pt-24 md:pt-32">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-primary font-semibold mb-2 tracking-wider">
                MY CAPABILITIES
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Expertise & Skills
              </h1>
              <p className="text-lg text-muted-foreground">
                Leveraging a unique blend of technical precision and creative
                storytelling to deliver high-impact results across multiple
                domains.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {skillsData.map((skill) => (
                <SkillCard key={skill.title} {...skill} />
              ))}
            </div>

            <div className="text-center mt-16">
              <Button size="lg" asChild>
                <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-5 w-5" />
                  Download Full Resume
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
