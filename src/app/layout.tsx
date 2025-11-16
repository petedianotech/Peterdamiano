import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Peter Damiano | Developer, Innovator, Creator, Author',
  description:
    'The official portfolio of Peter Damiano, a multi-talented professional specializing in digital futures, innovation, content creation, and authorship.',
  keywords: ['Peter Damiano', 'Developer', 'Innovator', 'Creator', 'Author', 'Portfolio', 'Full-Stack', 'Malawi'],
  openGraph: {
    title: 'Peter Damiano | Developer, Innovator, Creator, Author',
    description: 'The official portfolio of Peter Damiano, specializing in digital futures, innovation, and content creation.',
    url: siteUrl,
    siteName: 'Peter Damiano',
    images: [
      {
        url: '/og-image.png', // It's good practice to have a specific Open Graph image
        width: 1200,
        height: 630,
        alt: 'Peter Damiano Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peter Damiano | Developer, Innovator, Creator, Author',
    description: 'The official portfolio of Peter Damiano, specializing in digital futures, innovation, and content creation.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Lora:ital@1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased'
        )}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
