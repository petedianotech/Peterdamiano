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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className={`text-2xl font-bold ${isScrolled ? 'text-deep-navy' : 'text-white'}`}>
            PD
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#projects" className={`hover:text-sky-blue transition-colors ${isScrolled ? 'text-slate-gray' : 'text-white'}`}>Projects</Link>
            <Link href="#about" className={`hover:text-sky-blue transition-colors ${isScrolled ? 'text-slate-gray' : 'text-white'}`}>About</Link>
            <Link href="#skills" className={`hover:text-sky-blue transition-colors ${isScrolled ? 'text-slate-gray' : 'text-white'}`}>Skills</Link>
            <Link href="#blog" className={`hover:text-sky-blue transition-colors ${isScrolled ? 'text-slate-gray' : 'text-white'}`}>Blog</Link>
            <Button asChild>
              <Link href="#contact">Contact Me</Link>
            </Button>
          </nav>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} className={`${isScrolled ? 'text-deep-navy' : 'text-white'}`}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <nav className="md:hidden bg-white text-deep-navy flex flex-col items-center space-y-4 py-4 border-t">
          <Link href="#projects" onClick={() => setIsOpen(false)}>Projects</Link>
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
