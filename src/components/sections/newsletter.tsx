'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';

const Newsletter = () => {
  return (
    <div className="bg-card border border-border/80 rounded-2xl p-6 text-left">
        <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary/10 p-2 rounded-md">
                <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Join my inner circle</h3>
        </div>
        <p className="text-muted-foreground mb-4 text-sm">
          Insights on code, creativity, and innovation sent to your inbox.
        </p>
        <form className="flex items-center gap-2">
          <Input type="email" placeholder="Email address" className="flex-grow" />
          <Button type="submit" variant="outline">Join</Button>
        </form>
    </div>
  );
};

export default Newsletter;
