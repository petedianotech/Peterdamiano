'use client';
import { Button } from '@/components/ui/button';
import { Bell, Plus, Search } from 'lucide-react';
import { Input } from '../ui/input';

export default function AdminHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-10 flex h-20 items-center justify-between gap-4 border-b bg-background px-6">
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="w-64 bg-secondary pl-10 rounded-full" />
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
        </Button>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>
    </header>
  );
}
