import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image
              src="https://picsum.photos/seed/about/600/400"
              alt="About Me"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
              data-ai-hint="professional portrait"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="mb-6 text-lg leading-relaxed">
              I am a passionate software engineer with a knack for creating elegant and efficient solutions. With a background in computer science and years of hands-on experience, I've honed my skills in full-stack development, cloud architecture, and user experience design. My goal is to build products that are not only powerful and scalable but also intuitive and enjoyable to use.
            </p>
            <Button asChild size="lg">
              <Link href="/about-me">
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
