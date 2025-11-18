import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">About Me</h2>
          <p className="mb-6 text-lg leading-relaxed text-center">
            I am a multi-faceted professional with a passion for innovation, content creation, and technology. As a freelance blogger and author, I wrote a book on how Malawians can achieve financial success. My creativity extends to digital media, where I develop scripts and compelling content for YouTube, Facebook, and TikTok, including viral AI video prompts.
            <br/><br/>
            As an innovator and team leader at the Dzenje Science and Innovation Club, I guide students in building impactful projects like a battery-powered gym and remote-controlled cars. I also serve as an administrator at Rock Visuals Studio, blending my technical skills with creative management.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
