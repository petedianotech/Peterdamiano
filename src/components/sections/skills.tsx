import { Code, Cloud, BrainCircuit } from 'lucide-react';

const skills = [
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: "Software Development",
    description: "Expert in building robust and scalable applications with modern frameworks like React, Next.js, and Node.js."
  },
  {
    icon: <Cloud className="h-10 w-10 text-primary" />,
    title: "Cloud & DevOps",
    description: "Skilled in deploying and managing applications on cloud platforms like AWS and Google Cloud, with a focus on CI/CD."
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    title: "AI Integration",
    description: "Passionate about leveraging AI and machine learning to create intelligent features and solve complex problems."
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
