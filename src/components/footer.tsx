import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
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

const socialLinks = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/@PetedianoAi",
    icon: <YouTubeIcon className="h-8 w-8" />,
    handle: "@PetedianoAi",
    color: "bg-red-600 hover:bg-red-700",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1Cw75nxK38/",
    icon: <FacebookIcon className="h-8 w-8" />,
    handle: "Peter Damiano",
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@petediano",
    icon: <TikTokIcon className="h-8 w-8" />,
    handle: "@petediano",
    color: "bg-black hover:bg-gray-800",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-16 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-headline font-semibold text-primary-foreground">
                Connect With Me
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">Follow my journey across the web.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {socialLinks.map((link) => (
                <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                >
                <Card className={`text-white transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-2xl ${link.color}`}>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-full">
                            {link.icon}
                        </div>
                        <div>
                            <p className="font-bold text-lg">{link.name}</p>
                            <p className="text-sm opacity-80">{link.handle}</p>
                        </div>
                    </CardContent>
                </Card>
                </Link>
            ))}
        </div>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 mt-16 pt-8 border-t border-muted-foreground/20">
          <p className="text-sm text-muted-foreground">
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
