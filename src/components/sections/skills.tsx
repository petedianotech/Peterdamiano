import { Code, Lightbulb, Feather, Server, SwatchBook, Bot } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const skillCategories = [
    {
        title: "Development",
        icon: <Code className="h-8 w-8 text-primary" />,
        skills: ["React & Next.js", "TypeScript", "Node.js", "Python", "Full-Stack Architecture"],
    },
    {
        title: "Innovation",
        icon: <Lightbulb className="h-8 w-8 text-primary" />,
        skills: ["Product Strategy", "User-Centric Design", "Rapid Prototyping", "Agile Methodologies", "AI Integration"],
    },
    {
        title: "Content Creation",
        icon: <Feather className="h-8 w-8 text-primary" />,
        skills: ["Technical Writing", "Video Production", "Blogging & SEO", "Public Speaking", "Curriculum Development"],
    },
];

export function Skills() {
    return (
        <section id="skills" className="py-20 md:py-32 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-semibold text-deep-navy tracking-tight">
                        Skills & Expertise
                    </h2>
                    <p className="mt-2 text-lg text-charcoal">
                        The tools and methodologies I use to bring ideas to life.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category) => (
                        <Card key={category.title} className="text-center group transition-all hover:shadow-xl hover:-translate-y-1">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/10 rounded-full mb-4">
                                    {category.icon}
                                </div>
                                <CardTitle className="text-xl text-deep-navy tracking-tight">{category.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-foreground/80">
                                    {category.skills.map((skill) => (
                                        <li key={skill}>{skill}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
