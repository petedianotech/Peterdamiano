'use client';
import { useMemo } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Mail, Inbox } from 'lucide-react';

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  submissionDate: string;
  isRead?: boolean;
}

export default function AdminContactPage() {
  const firestore = useFirestore();
  const inquiriesCollection = useMemo(() => collection(firestore, 'contact_inquiries'), [firestore]);
  const inquiriesQuery = useMemo(() => query(inquiriesCollection, orderBy('submissionDate', 'desc')), [inquiriesCollection]);
  const { data: inquiries, isLoading } = useCollection<ContactInquiry>(inquiriesQuery);

  const markAsRead = async (id: string) => {
    if (!firestore) return;
    const inquiryRef = doc(firestore, 'contact_inquiries', id);
    try {
      await updateDoc(inquiryRef, { isRead: true });
    } catch (error) {
      console.error("Error updating document: ", error);
      // Optionally show a toast notification on error
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Messages</CardTitle>
        <CardDescription>Review messages submitted through your contact form.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading messages...</p>
        ) : inquiries && inquiries.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {inquiries.map((inquiry) => (
              <AccordionItem value={inquiry.id} key={inquiry.id}>
                <AccordionTrigger onClick={() => !inquiry.isRead && markAsRead(inquiry.id)} className={!inquiry.isRead ? 'font-bold' : ''}>
                  <div className="flex items-center gap-4">
                    {!inquiry.isRead && <Badge>New</Badge>}
                    <span className="flex-1 text-left">{inquiry.name} - <span className="text-muted-foreground">{inquiry.inquiryType}</span></span>
                    <span className="text-sm text-muted-foreground">{new Date(inquiry.submissionDate).toLocaleDateString()}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 pl-6">
                  <p><strong>From:</strong> {inquiry.email}</p>
                  <p className="whitespace-pre-wrap bg-muted/50 p-4 rounded-md">{inquiry.message}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <Inbox className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No Messages</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your inbox is currently empty.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
