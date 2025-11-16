"use client";

import * as React from "react";
import Link from "next/link";
import {
  Code,
  Feather,
  Lightbulb,
  Linkedin,
  Menu,
  Mountain,
  Rss,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 transition-all duration-300 md:px-6",
        scrolled ? "bg-card/80 shadow-md backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <Mountain className="h-6 w-6 text-deep-navy" />
        <span className="text-lg font-semibold text-deep-navy font-headline">
          Peter Damiano
        </span>
      </Link>
      <nav className="hidden items-center gap-6 md:flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="link" className="text-foreground/80 hover:text-foreground">
              Work
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Work Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="#projects-developer" className="flex items-center gap-2">
                <Code className="h-4 w-4" /> Developer
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="#projects-innovator" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" /> Innovator
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="#projects-creator" className="flex items-center gap-2">
                <Feather className="h-4 w-4" /> Creator
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="#projects-author" className="flex items-center gap-2">
                <Rss className="h-4 w-4" /> Author
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            prefetch={false}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="grid gap-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}