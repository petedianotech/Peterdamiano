import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-8 px-4 md:px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
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
    </footer>
  );
}
