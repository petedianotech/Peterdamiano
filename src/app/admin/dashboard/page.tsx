'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { ADMIN_EMAILS } from '@/lib/admins';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, User, Paintbrush, Newspaper, Briefcase, MessageSquare, LogOut, Calendar, Book, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    if (!isUserLoading) {
      if (!user) {
        router.push('/admin');
      } else {
        const userIsAdmin = ADMIN_EMAILS.includes(user.email || '');
        if (!userIsAdmin) {
            router.push('/');
        }
        setIsVerifying(false);
      }
    }
  }, [user, isUserLoading, router]);

  if (isVerifying || isUserLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Verifying your access...</p>
        </div>
      </div>
    );
  }
  
  const managementSections = [
    { title: 'Manage Profile', description: 'Update your public profile picture.', href: '/admin/profile', icon: User },
    { title: 'Manage Projects', description: 'Add, edit, or delete portfolio projects.', href: '/admin/projects', icon: Briefcase },
    { title: 'Manage Blog', description: 'Create and manage blog articles.', href: '/admin/blog', icon: Newspaper },
    { title: 'Timeline Events', description: 'Manage your career timeline.', href: '/admin/timeline', icon: Calendar },
    { title: 'Manage Books', description: 'Add and edit your published books.', href: '/admin/books', icon: Book },
    { title: 'Contact Messages', description: 'View messages from your contact form.', href: '/admin/messages', icon: MessageSquare },
  ]

  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl font-bold">Welcome, {user?.displayName || 'Admin'}!</h1>
            <p className="text-muted-foreground">Select a section below to start managing your website content.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {managementSections.map(section => (
                 <Card key={section.href}>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-3'>
                            <section.icon className='h-6 w-6 text-primary' />
                            {section.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">{section.description}</p>
                        <Button asChild>
                            <Link href={section.href}>
                                Go to Section <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
