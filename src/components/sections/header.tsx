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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-2xl font-bold group">
            <span className="animate-gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:animate-gradient-text-hover">
                Peter Damiano
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/#projects" className={`text-sm font-medium transition-colors ${isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-primary-foreground hover:text-primary-foreground/80'}`}>Projects</Link>
            <Link href="/timeline" className={`text-sm font-medium transition-colors ${isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-primary-foreground hover:text-primary-foreground/80'}`}>Timeline</Link>
            <Link href="/books" className={`text-sm font-medium transition-colors ${isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-primary-foreground hover:text-primary-foreground/80'}`}>Books</Link>
            <Link href="/#about" className={`text-sm font-medium transition-colors ${isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-primary-foreground hover:text-primary-foreground/80'}`}>About</Link>
            <Link href="/#skills" className={`text-sm font-medium transition-colors ${isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-primary-foreground hover:text-primary-foreground/80'}`}>Skills</Link>
            <Link href="/#blog" className={`text-sm font-medium transition-colors ${isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-primary-foreground hover:text-primary-foreground/80'}`}>Blog</Link>
            <Button asChild size="sm">
              <Link href="#contact">Contact Me</Link>
            </Button>
          </nav>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition-all duration-300",
                "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-lg hover:scale-105"
              )}
            >
              <span>Tap me</span>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <nav className="md:hidden bg-background text-foreground flex flex-col items-center space-y-4 py-4 border-t shadow-lg">
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
