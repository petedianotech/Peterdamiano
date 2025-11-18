'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className={`text-2xl font-bold group transition-colors duration-300 ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}>
            {'Peter Damiano'.split('').map((char, i) => (
              <span key={i} className="group-hover:text-primary transition-colors duration-200" style={{ transitionDelay: `${i * 25}ms` }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#projects" className={`hover:text-primary transition-colors ${isScrolled ? 'text-muted-foreground' : 'text-primary-foreground'}`}>Projects</Link>
            <Link href="/timeline" className={`hover:text-primary transition-colors ${isScrolled ? 'text-muted-foreground' : 'text-primary-foreground'}`}>Timeline</Link>
            <Link href="#about" className={`hover:text-primary transition-colors ${isScrolled ? 'text-muted-foreground' : 'text-primary-foreground'}`}>About</Link>
            <Link href="#skills" className={`hover:text-primary transition-colors ${isScrolled ? 'text-muted-foreground' : 'text-primary-foreground'}`}>Skills</Link>
            <Link href="#blog" className={`hover:text-primary transition-colors ${isScrolled ? 'text-muted-foreground' : 'text-primary-foreground'}`}>Blog</Link>
            <Button asChild>
              <Link href="#contact">Contact Me</Link>
            </Button>
          </nav>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} className={`${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <nav className="md:hidden bg-background text-foreground flex flex-col items-center space-y-4 py-4 border-t">
          <Link href="#projects" onClick={() => setIsOpen(false)}>Projects</Link>
          <Link href="/timeline" onClick={() => setIsOpen(false)}>Timeline</Link>
          <Link href="#about" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="#skills" onClick={() => setIsOpen(false)}>Skills</Link>
          <Link href="#blog" onClick={() => setIsOpen(false)}>Blog</Link>
          <Button asChild>
            <Link href="#contact" onClick={() => setIsOpen(false)}>Contact Me</Link>
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Header;
