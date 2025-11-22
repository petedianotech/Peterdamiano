'use client';
import { useMemo } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookText, Mail } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const firestore = useFirestore();
  
  const inquiriesCollection = useMemo(() => firestore ? collection(firestore, 'contact_inquiries') : null, [firestore]);
  const unreadQuery = useMemo(() => inquiriesCollection ? query(inquiriesCollection, where('isRead', '!=', true)) : null, [inquiriesCollection]);
  
  const { data: unreadMessages } = useCollection(unreadQuery);

  const unreadCount = unreadMessages?.length || 0;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookText className="h-5 w-5" />
            Manage Blog
          </CardTitle>
          <CardDescription>
            Write, edit, and manage your blog posts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/admin/blog">
              Go to Blog <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Manage Messages
          </CardTitle>
          <CardDescription>
            View and reply to messages from your contact form.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
           <Button asChild>
            <Link href="/admin/contact">
              View Messages <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          {unreadCount > 0 && (
            <div className="text-sm font-bold text-primary flex items-center gap-2">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </div>
              {unreadCount} New
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
