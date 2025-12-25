import { Code, Bot, Mic, BookOpen } from 'lucide-react';

const roles = [
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: "Development",
    description: "Building scalable web applications and robust software architectures using modern stacks."
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "Innovation",
    description: "Exploring emerging technologies and applying creative problem-solving methodologies."
  },
  {
    icon: <Mic className="h-8 w-8 text-primary" />,
    title: "Content",
    description: "Producing educational videos and engaging digital media to share tech insights."
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: "Author",
    description: "Writing comprehensive guides and books on software development and career growth."
  }
];

const Roles = () => {
  return (
    <section id="roles" className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
            My Roles
            </h2>
            <p className="text-lg text-muted-foreground mt-2">
                Explore the different facets of my professional journey.
            </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {roles.map((role) => (
            <div key={role.title} className="bg-card/50 p-6 rounded-lg border border-border/80 text-left">
              <div className="flex items-center justify-start mb-4">
                <div className="bg-primary/10 p-3 rounded-md">
                    {role.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{role.title}</h3>
              <p className="text-muted-foreground">
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roles;
