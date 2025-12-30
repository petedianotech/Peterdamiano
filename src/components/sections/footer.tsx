
import Link from "next/link";
import { Code2, Github, Linkedin, Twitter, Rss } from "lucide-react";

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 7.184L18.901 1.153zm-1.61 19.99h2.54L7.48 2.5h-2.7l12.553 18.643z" />
    </svg>
);

const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zM9.98 15V9l6 3-6 3z"/>
    </svg>
);

const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-1.39.2-1.61l15.35-5.5c.79-.28 1.4.3 1.15 1.2l-2.72 12.81c-.19.91-1.13 1.14-1.8.62l-4.17-3.21-1.99 1.93c-.23.23-.42.42-.69.42z"/>
    </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.25-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919C8.415 2.175 8.796 2.163 12 2.163zm0 1.441c-3.141 0-3.499.012-4.708.068-2.825.129-4.122 1.425-4.252 4.252-.056 1.21-.067 1.568-.067 4.708s.011 3.498.067 4.708c.13 2.827 1.427 4.123 4.252 4.252 1.21.056 1.567.067 4.708.067s3.498-.011 4.708-.067c2.825-.13 4.123-1.425 4.252-4.252.056-1.21.067-1.568.067-4.708s-.011-3.499-.067-4.708c-.13-2.827-1.427-4.123-4.252-4.252C15.5 3.614 15.142 3.604 12 3.604zm0 4.238c-2.403 0-4.357 1.954-4.357 4.357s1.954 4.357 4.357 4.357 4.357-1.954 4.357-4.357S14.403 7.842 12 7.842zM12 15c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm6.406-7.188c-.718 0-1.299-.581-1.299-1.299s.581-1.299 1.299-1.299 1.299.581 1.299 1.299-.581 1.299-1.299 1.299z"/>
    </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.028C18.343 21.128 22 16.991 22 12z" />
    </svg>
);

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.95-6.43-2.8-1.59-1.87-2.32-4.2-1.86-6.45.54-2.62 2.87-4.63 5.5-5.22.62-.13 1.25-.19 1.88-.18 1.05.02 2.1.13 3.14.33-.02 1.63-.01 3.26-.01 4.88-.33-.03-.66-.07-.99-.08-1.39-.03-2.79.44-3.81 1.43-1.14 1.12-1.61 2.72-1.37 4.25.26 1.69 1.48 3.1 3.1 3.75 1.72.68 3.63.36 5.03-.74.57-.44 1.04-1.01 1.42-1.64.06-.1.12-.21.17-.31V10.2c-1.18.28-2.38.45-3.57.45-1.03 0-2.07-.1-3.09-.38-1.33-.37-2.6-1.02-3.66-1.93-.91-1.01-1.44-2.39-1.38-3.83.06-1.42.53-2.81 1.34-3.95.89-1.28 2.22-2.22 3.7-2.64.9-.26 1.83-.4 2.77-.41.9-.01 1.79 0 2.69-.01z" />
    </svg>
);


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
                 <Link href="https://x.com/petediano" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><XIcon className="h-5 w-5" /></Link>
                 <Link href="https://www.youtube.com/@PetedianoAi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><YouTubeIcon className="h-5 w-5" /></Link>
                 <Link href="https://t.me/Petediano" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><TelegramIcon className="h-5 w-5" /></Link>
                 <Link href="https://www.instagram.com/pete_diano?igsh=MTF0ZGxlb2ZpdGtqaA==" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><InstagramIcon className="h-5 w-5" /></Link>
                 <Link href="https://www.facebook.com/petediano" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><FacebookIcon className="h-5 w-5" /></Link>
                 <Link href="https://tiktok.com/@petediano" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><TikTokIcon className="h-5 w-5" /></Link>
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
