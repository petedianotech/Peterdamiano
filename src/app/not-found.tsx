import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-6xl md:text-9xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-3xl md:text-4xl font-headline font-semibold text-deep-navy">
        Page Not Found
      </h2>
      <p className="mt-2 text-lg text-charcoal">
        Sorry, the page you are looking for does not exist.
      </p>
      <div className="mt-8">
        <Button asChild size="lg">
          <Link href="/">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go back home
          </Link>
        </Button>
      </div>
    </div>
  );
}
