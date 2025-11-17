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
    <path d="M12.525 2.017c1.387 0 2.57.854 3.014 2.126h-3.014v4.46h4.46v-3.014c.854.444 1.299 1.387 1.299 2.57v11.85c0 .445-.355.8-.8.8h-11.85c-.445 0-.8-.355-.8-.8V3.197c0-1.18.96-2.14 2.14-2.14h5.55zM12.525 10.998H8.065v3.014a3.37 3.37 0 0 0 3.37 3.37c1.855 0 3.37-1.515 3.37-3.37v-3.014h-2.28z" />
  </svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-8 px-4 md:px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Peter Damiano. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="https://www.youtube.com/@PetedianoAi" aria-label="YouTube" prefetch={false} target="_blank" rel="noopener noreferrer">
            <YouTubeIcon className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
          </Link>
          <Link href="https://www.facebook.com/share/1Cw75nxK38/" aria-label="Facebook" prefetch={false} target="_blank" rel="noopener noreferrer">
            <FacebookIcon className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
          </Link>
          <Link href="https://tiktok.com/@petediano" aria-label="TikTok" prefetch={false} target="_blank" rel="noopener noreferrer">
            <TikTokIcon className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
          </Link>
        </div>
      </div>
    </footer>
  );
}