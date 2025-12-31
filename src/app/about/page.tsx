import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Rocket,
  Users,
  Clock,
  Lightbulb,
  Code,
  PenTool,
  Book,
  ArrowRight,
  Target,
  Wrench,
  Bot,
} from 'lucide-react';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="bg-card p-6 rounded-xl border border-border/80">
    <div className="flex items-center gap-4">
      <div className="bg-primary/10 p-3 rounded-md">{icon}</div>
      <div>
        <p className="text-muted-foreground">{label}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);

const RoleTag = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className="flex items-center gap-2 bg-secondary py-2 px-4 rounded-full border border-border/80">
    {icon}
    <span className="font-medium">{label}</span>
  </div>
);

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 pt-24 md:pt-32">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
              {/* Left Column */}
              <div className="flex flex-col gap-8">
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-lg border">
                  <Image
                    src="/profile.jpg"
                    alt="Peter Damiano"
                    fill
                    className="object-cover"
                    data-ai-hint="professional headshot"
                  />
                </div>
                <div className="space-y-6">
                  <StatCard
                    icon={<Rocket className="h-6 w-6 text-primary" />}
                    label="Projects Shipped"
                    value="19+"
                  />
                  <StatCard
                    icon={<Users className="h-6 w-6 text-primary" />}
                    label="Active Audience"
                    value="800k+"
                  />
                  <StatCard
                    icon={<Clock className="h-6 w-6 text-primary" />}
                    label="Years Experience"
                    value="2+"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="pt-4">
                <p className="text-primary font-semibold mb-2">ABOUT ME</p>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Impact through <span className="text-accent">Innovation</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  I bridge the gap between technical execution and creative
                  storytelling. My work focuses on building robust software
                  architectures while crafting narratives that make technology
                  accessible and engaging for everyone.
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  <RoleTag
                    icon={<Lightbulb className="h-4 w-4" />}
                    label="Innovator"
                  />
                  <RoleTag
                    icon={<Code className="h-4 w-4" />}
                    label="Developer"
                  />
                  <RoleTag
                    icon={<PenTool className="h-4 w-4" />}
                    label="Creator"
                  />
                  <RoleTag
                    icon={<Book className="h-4 w-4" />}
                    label="Author"
                  />
                </div>

                <Accordion
                  type="single"
                  collapsible
                  defaultValue="item-1"
                  className="w-full mb-10"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-3">
                        <Bot className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-lg">
                          The Philosophy
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-md text-muted-foreground pl-10">
                      I believe that code is merely a tool for human expression.
                      My approach combines rigorous software architecture
                      principles with the fluidity of compelling narrative
                      structures. Every line of code should tell a story of
                      efficiency, and every product should solve a real human
                      problem.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <div className="flex items-center gap-3">
                        <Wrench className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-lg">
                          The Experience
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-md text-muted-foreground pl-10">
                      With years in the industry, I've had the privilege of working on a diverse range of projects, from scalable web applications to leading hardware innovations. This breadth of experience allows me to approach problems with a unique, multi-disciplinary perspective.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      <div className="flex items-center gap-3">
                        <Target className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-lg">The Impact</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-md text-muted-foreground pl-10">
                       My goal is to create work that resonates and endures. Whether it's empowering a student at the Dzenje Science and Innovation Club or helping a reader achieve financial literacy through my book, the true measure of my success is the positive impact my work has on others.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex gap-4 mb-12">
                  <Button size="lg" asChild>
                    <Link href="/projects">
                      View Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/#blog">Read My Blog</Link>
                  </Button>
                </div>

                <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground">
                  "Innovation isn't about the newest technology. It's about
                  finding the most effective way to improve a life."
                  <cite className="block not-italic font-semibold mt-2 text-foreground">
                    — Peter Damiano
                  </cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
