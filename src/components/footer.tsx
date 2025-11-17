import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12.04 4.5C10.74 4.5 4.5 4.5 4.5 4.5s0 2.94 0 6.02s0 6.02 0 6.02s6.24 0 7.54 0s7.54 0 7.54 0s0-2.94 0-6.02s0-6.02 0-6.02s-6.24 0-7.54 0zM9.87 13.5V7.5l4.5 3l-4.5 3z" />
    </svg>
  );
  
  const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3v9h4v-9z" />
    </svg>
  );
  
  const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.01-1.58-.01-3.16 0-4.75l-.04 1.38c-.44 2.81-2.82 4.97-5.59 5.34-4.51.58-8.41-2.8-8.41-7.59 0-4.44 3.59-8.04 8.04-8.04Z" />
      </svg>
  );

const socialLinks = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/@PetedianoAi",
    icon: <YouTubeIcon className="h-6 w-6" />,
    color: "bg-red-600 hover:bg-red-700",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1Cw75nxK38/",
    icon: <FacebookIcon className="h-6 w-6" />,
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@petediano",
    icon: <TikTokIcon className="h-6 w-6" />,
    color: "bg-black hover:bg-gray-800",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-8 px-4 md:px-6">
       <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-headline font-semibold text-primary-foreground">
                Connect With Me
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">Follow my journey across the web.</p>
        </div>
        <div className="flex justify-center items-center gap-4 flex-wrap">
            {socialLinks.map((link) => (
                <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow on ${link.name}`}
                className="group"
                >
                <div className={`p-3 rounded-full text-white transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-2xl ${link.color}`}>
                  {link.icon}
                </div>
                </Link>
            ))}
        </div>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 mt-16 pt-8 border-t border-muted-foreground/20">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {currentYear} Peter Damiano. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="GitHub" prefetch={false}>
              <Github className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
            <Link href="#" aria-label="LinkedIn" prefetch={false}>
              <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
            <Link href="#" aria-label="Twitter" prefetch={false}>
              <Twitter className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
