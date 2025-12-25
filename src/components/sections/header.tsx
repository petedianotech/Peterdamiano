'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Menu, X, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-sm border-b border-white/10" : "bg-transparent border-b border-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold group">
            <div className="bg-white/10 p-2 rounded-md">
                <Code2 className="h-5 w-5 text-primary" />
            </div>
            <span>
                Peter Damiano
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link href="#home" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
            <Link href="#roles" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</Link>
            <Link href="#blog" className="text-muted-foreground hover:text-primary transition-colors">Content</Link>
            <Link href="/books" className="text-muted-foreground hover:text-primary transition-colors">Books</Link>
            <Button asChild size="sm">
              <Link href="#contact">Contact</Link>
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
        <nav className="md:hidden bg-background/95 backdrop-blur-md text-foreground flex flex-col items-center space-y-4 py-4 border-t border-white/10 shadow-lg">
          <Link href="#home" className="block w-full text-center py-2 hover:bg-accent" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="#roles" className="block w-full text-center py-2 hover:bg-accent" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="#projects" className="block w-full text-center py-2 hover:bg-accent" onClick={() => setIsOpen(false)}>Projects</Link>
          <Link href="#blog" className="block w-full text-center py-2 hover:bg-accent" onClick={() => setIsOpen(false)}>Content</Link>
          <Link href="/books" className="block w-full text-center py-2 hover:bg-accent" onClick={() => setIsOpen(false)}>Books</Link>
          <Button asChild className="w-4/5 mt-2">
            <Link href="#contact" onClick={() => setIsOpen(false)}>Contact</Link>
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Header;
