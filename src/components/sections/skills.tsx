import { Code, BrainCircuit, PenSquare } from 'lucide-react';

const skills = [
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: "Software & Innovation",
    description: "Expert in building robust applications and leading innovative hardware projects, from educational platforms to electricity-generating gyms."
  },
  {
    icon: <PenSquare className="h-10 w-10 text-primary" />,
    title: "Digital Content & Media",
    description: "Skilled in creating engaging content for YouTube, TikTok, and Facebook, including scriptwriting and generating viral AI video prompts."
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    title: "Authorship & Entrepreneurship",
    description: "Authored a book on financial success in Malawi and possess a strong entrepreneurial spirit as a freelance blogger and creative administrator."
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Skills & Expertise
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {skills.map((skill) => (
            <div key={skill.title} className="bg-background p-8 rounded-lg shadow-md border">
              <div className="flex justify-center mb-4">
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
              <p className="text-muted-foreground">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
