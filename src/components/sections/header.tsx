
'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Menu, X, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { href: '/about', text: 'About' },
    { href: '/projects', text: 'Portfolio' },
    { href: '/blog', text: 'Blog' },
    { href: '/#contact', text: 'Contact' },
  ];

  return (
    <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-sm border-b"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold group">
            <div className="bg-primary/10 p-2 rounded-md">
                <Monitor className="h-5 w-5 text-primary" />
            </div>
            <span className='text-foreground'>
                Peter Damiano
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navLinks.map(link => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={cn(
                  "text-muted-foreground hover:text-primary transition-colors",
                  pathname === link.href && "text-primary"
                )}
              >
                {link.text}
              </Link>
            ))}
            <Button asChild size="sm">
              <Link href="/#contact">Get in Touch</Link>
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
           {navLinks.map(link => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="block w-full text-center py-2 hover:bg-accent" 
                onClick={() => setIsOpen(false)}
              >
                {link.text}
              </Link>
            ))}
          <Button asChild className="w-4/5 mt-2">
            <Link href="/#contact" onClick={() => setIsOpen(false)}>Get in Touch</Link>
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Header;
