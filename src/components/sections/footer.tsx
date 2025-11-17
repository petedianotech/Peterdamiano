import Link from "next/link";
import { Github, Linkedin, Twitter, Rss } from "lucide-react";

const TikTokIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.95-6.43-2.8-1.59-1.87-2.32-4.2-1.86-6.45.54-2.62 2.87-4.63 5.5-5.22.62-.13 1.25-.19 1.88-.18 1.05.02 2.1.13 3.14.33-.02 1.63-.01 3.26-.01 4.88-.33-.03-.66-.07-.99-.08-1.39-.03-2.79.44-3.81 1.43-1.14 1.12-1.61 2.72-1.37 4.25.26 1.69 1.48 3.1 3.1 3.75 1.72.68 3.63.36 5.03-.74.57-.44 1.04-1.01 1.42-1.64.06-.1.12-.21.17-.31V10.2c-1.18.28-2.38.45-3.57.45-1.03 0-2.07-.1-3.09-.38-1.33-.37-2.6-1.02-3.66-1.93C.95 6.7.22 4.41.67 2.13c.48-2.39 2.56-4.22 4.97-4.59.95-.14 1.92-.2 2.88-.21 1.3-.01 2.6-.02 3.9-.02z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
  >
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" />
  </svg>
);

const FacebookIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.028C18.343 21.128 22 16.991 22 12z" />
    </svg>
);

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold">Peter Damiano</h3>
            <p className="text-muted-foreground">Software Engineer & Innovator</p>
          </div>
          <div className="flex space-x-6 mb-6 md:mb-0">
            <Link href="#projects" className="hover:text-primary transition-colors">Projects</Link>
            <Link href="#about" className="hover:text-primary transition-colors">About</Link>
            <Link href="#blog" className="hover:text-primary transition-colors">Blog</Link>
            <Link href="#contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          <div className="flex space-x-4">
            <Link href="https://www.youtube.com/@PetedianoAi" target="_blank" rel="noopener noreferrer" className="bg-background/10 p-3 rounded-full hover:bg-background/20 transition-colors">
              <YouTubeIcon />
            </Link>
            <Link href="https://www.facebook.com/share/1Cw75nxK38/" target="_blank" rel="noopener noreferrer" className="bg-background/10 p-3 rounded-full hover:bg-background/20 transition-colors">
              <FacebookIcon />
            </Link>
            <Link href="https://tiktok.com/@petediano" target="_blank" rel="noopener noreferrer" className="bg-background/10 p-3 rounded-full hover:bg-background/20 transition-colors">
              <TikTokIcon />
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Peter Damiano. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
