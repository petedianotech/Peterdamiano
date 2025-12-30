'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

const Newsletter = () => {
  return (
    <div className="bg-card border border-border/80 rounded-2xl p-8 md:p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-lg">
                <Mail className="h-6 w-6 text-primary" />
            </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Stay in the loop</h2>
        <p className="text-muted-foreground mb-6">
          Get notified when I publish new essays or release new resources. No spam, ever.
        </p>
        <form className="flex flex-col sm:flex-row gap-3">
          <Input type="email" placeholder="peter@example.com" className="flex-grow" />
          <Button type="submit" size="lg">Subscribe</Button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
