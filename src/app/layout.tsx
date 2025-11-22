import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseProvider } from '@/firebase/provider';

export const metadata: Metadata = {
  title: 'Peter Damiano',
  description: 'Peter Damiano: Innovator, Author, Content Creator, and Software Engineer. Explore the portfolio of a multi-faceted professional transforming complex problems into elegant digital experiences.',
  keywords: ["Peter Damiano", "innovator", "author", "content creator", "software engineer", "Malawi", "PowerBrain", "Dzenje Science and Innovation Club"],
  creator: "Peter Damiano",
  authors: [{name: "Peter Damiano", url: "https://peterdamiano.vercel.app"}],
  openGraph: {
    title: "Peter Damiano | Innovator, Author, Creator",
    description: "The official portfolio of Peter Damiano, showcasing projects, writings, and innovations.",
    url: "https://peterdamiano.vercel.app",
    siteName: "Peter Damiano",
    locale: 'en_US',
    type: 'website',
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Peter Damiano',
    url: 'https://peterdamiano.vercel.app',
    sameAs: [
      'https://www.youtube.com/@PetedianoAi',
      'https://www.facebook.com/share/1Cw75nxK38/',
      'https://tiktok.com/@petediano'
    ],
    jobTitle: 'Innovator, Author, Content Creator, Software Engineer',
    alumniOf: 'Dzenje Science and Innovation Club',
  };
  
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="icon" href="https://i.ibb.co/8Dgcmbhb/In-Shot-20251122-075515177.jpg" type="image/jpeg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased'
        )}
      >
        <FirebaseProvider>
          {children}
        </FirebaseProvider>
        <Toaster />
      </body>
    </html>
  );
}
