import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white py-8 px-4 md:px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400">
          &copy; {currentYear} Peter Damiano. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="#" aria-label="GitHub" prefetch={false}>
            <Github className="h-6 w-6 text-gray-400 transition-colors hover:text-white" />
          </Link>
          <Link href="#" aria-label="LinkedIn" prefetch={false}>
            <Linkedin className="h-6 w-6 text-gray-400 transition-colors hover:text-white" />
          </Link>
          <Link href="#" aria-label="Twitter" prefetch={false}>
            <Twitter className="h-6 w-6 text-gray-400 transition-colors hover:text-white" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
