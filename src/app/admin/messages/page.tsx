'use client';
import { useMemo } from 'react';
import { collection } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from '@/components/ui/skeleton';

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  submissionDate: string; // Assuming ISO string date format
  inquiryType: string;
}

export default function Messages() {
  const firestore = useFirestore();
  const inquiriesCollection = useMemoFirebase(() => collection(firestore, 'contact_inquiries'), [firestore]);
  const { data: messages, isLoading, error } = useCollection<ContactInquiry>(inquiriesCollection);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
        <CardDescription>A list of messages from your contact form.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sender</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="text-right">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <>
                <TableRow>
                  <TableCell>
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-32 mt-1" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-6 w-16 ml-auto" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-32 mt-1" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-6 w-16 ml-auto" />
                  </TableCell>
                </TableRow>
              </>
            )}
            {error && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-destructive">
                  Failed to load messages. Please try again later.
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !error && messages?.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  You have no messages yet.
                </TableCell>
              </TableRow>
            )}
            {!isLoading && messages?.map((message) => (
              <TableRow key={message.id}>
                <TableCell>
                  <div className="font-medium">{message.name}</div>
                  <div className="text-sm text-muted-foreground">{message.email}</div>
                </TableCell>
                <TableCell>
                  <p className="max-w-md truncate">{message.message}</p>
                  <time className="text-xs text-muted-foreground">{new Date(message.submissionDate).toLocaleDateString()}</time>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline">
                    {message.inquiryType}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
