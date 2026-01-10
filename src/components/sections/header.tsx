
'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Menu, X, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    // Close mobile menu on route change
    if (isOpen) {
      setIsOpen(false);
    }
  }, [pathname]);
  
  const navLinks = [
    { href: '/', text: 'Home'},
    { href: '/about', text: 'About' },
    { href: '/projects', text: 'Portfolio' },
    { href: '/blog', text: 'Blog' },
  ];

  return (
    <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-sm border-b"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold group">
            <div className="bg-primary/10 p-2 rounded-md">
                <Code2 className="h-5 w-5 text-primary" />
            </div>
            <span className='text-foreground'>
                Peter Damiano
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(link => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={cn(
                  "text-muted-foreground hover:text-primary transition-colors",
                  pathname === link.href && "text-primary font-semibold"
                )}
              >
                {link.text}
              </Link>
            ))}
            <Button asChild size="sm">
              <Link href="/#contact">Contact</Link>
            </Button>
          </nav>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-foreground"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md absolute top-20 left-0 w-full">
            <nav className="flex flex-col items-center divide-y divide-border">
                {navLinks.map(link => (
                    <Link 
                        key={link.href} 
                        href={link.href} 
                        className="block w-full text-center py-4 text-muted-foreground hover:text-primary hover:bg-muted transition-colors" 
                        onClick={() => setIsOpen(false)}
                    >
                        {link.text}
                    </Link>
                    ))}
                <div className="w-full p-4">
                     <Button asChild className="w-full">
                        <Link href="/#contact" onClick={() => setIsOpen(false)}>Contact</Link>
                    </Button>
                </div>
            </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
