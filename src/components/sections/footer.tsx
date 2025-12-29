
import Link from "next/link";
import { Code2, Github, Linkedin, Twitter, Rss } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-accent-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="md:w-1/3">
             <Link href="/" className="flex items-center gap-2 text-xl font-bold group mb-4">
                <div className="bg-primary/10 p-2 rounded-md">
                    <Code2 className="h-5 w-5 text-primary" />
                </div>
                <span>
                    Peter Damiano
                </span>
            </Link>
            <p className="text-muted-foreground pr-8">
                Bridging the gap between technical execution and creative storytelling. Innovating one line of code at a time.
            </p>
            <div className="flex space-x-4 mt-6">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github size={20} /></Link>
                <Link href="https://x.com/petediano" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div>
                <h4 className="font-semibold mb-4">NAVIGATION</h4>
                <nav className="flex flex-col space-y-3">
                    <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
                    <Link href="/#about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
                    <Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</Link>
                </nav>
            </div>
             <div>
                <h4 className="font-semibold mb-4">RESOURCES</h4>
                <nav className="flex flex-col space-y-3">
                    <Link href="/#blog" className="text-muted-foreground hover:text-primary transition-colors">Content</Link>
                    <Link href="/books" className="text-muted-foreground hover:text-primary transition-colors">Books & Publications</Link>
                    <Link href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Me</Link>
                </nav>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-sm text-muted-foreground flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; {currentYear} Peter Damiano. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
