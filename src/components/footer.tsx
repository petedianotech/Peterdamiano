import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      icon: <YouTubeIcon className="h-8 w-8 text-red-600" />,
      handle: "@PetedianoAi",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/share/1Cw75nxK38/",
      icon: <FacebookIcon className="h-8 w-8 text-blue-600" />,
      handle: "Peter Damiano",
    },
    {
      name: "TikTok",
      href: "https://tiktok.com/@petediano",
      icon: <TikTokIcon className="h-8 w-8 text-black dark:text-white" />,
      handle: "@petediano",
    },
  ];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-16 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card shadow-lg border-2 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl font-headline text-deep-navy">Connect With Me</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                {socialLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-lg p-4 transition-all duration-300 hover:bg-primary/10 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="flex justify-center items-center mb-3">
                      {link.icon}
                    </div>
                    <p className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      {link.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {link.handle}
                    </p>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-8">
          &copy; {currentYear} Peter Damiano. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
