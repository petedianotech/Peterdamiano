'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-sm border-b" : "bg-transparent border-b border-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-2xl font-bold group">
            <span className="bg-gradient-to-r from-primary via-blue-400 to-blue-500 bg-clip-text text-transparent group-hover:animate-gradient-text-hover">
                Peter Damiano
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/#projects" className="text-foreground hover:text-primary transition-colors">Projects</Link>
            <Link href="/timeline" className="text-foreground hover:text-primary transition-colors">Timeline</Link>
            <Link href="/books" className="text-foreground hover:text-primary transition-colors">Books</Link>
            <Link href="/#about" className="text-foreground hover:text-primary transition-colors">About</Link>
            <Link href="/#skills" className="text-foreground hover:text-primary transition-colors">Skills</Link>
            <Link href="/#blog" className="text-foreground hover:text-primary transition-colors">Blog</Link>
            <Button asChild size="sm">
              <Link href="#contact">Contact Me</Link>
            </Button>
          </nav>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-foreground hover:bg-accent transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <nav className="md:hidden bg-background/95 backdrop-blur-md text-foreground flex flex-col items-center space-y-4 py-4 border-t shadow-lg">
          <Link href="/#projects" className="block w-full text-center py-2 hover:bg-accent" onClick={() => setIsOpen(false)}>Projects</Link>
          <Link href="/timeline" className="block w-full text-center py-2 hover:bg-accent" onClick={() => setIsOpen(false)}>Timeline</Link>
          <Link href="/books" className="block w-full text-center py-2 hover:bg-accent" onClick={() => setIsOpen(false)}>Books</Link>
          <Link href="/#about" className="block w-full text-center py-2 hover:bg-accent" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/#skills" className="block w-full text-center py-2 hover:bg-accent" onClick={() => setIsOpen(false)}>Skills</Link>
          <Link href="/#blog" className="block w-full text-center py-2 hover:bg-accent" onClick={() => setIsOpen(false)}>Blog</Link>
          <Button asChild className="w-4/5 mt-2">
            <Link href="#contact" onClick={() => setIsOpen(false)}>Contact Me</Link>
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Header;
