
'use client';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const messages = [
  {
    name: 'Sophia Davis',
    email: 'sophia@example.com',
    inquiryType: 'Collaboration Offer',
    date: '2024-07-30',
    isNew: true,
  },
  {
    name: 'Liam Wilson',
    email: 'liam@example.com',
    inquiryType: 'Speaking Engagement',
    date: '2024-07-29',
    isNew: true,
  },
  {
    name: 'Ava Johnson',
    email: 'ava@example.com',
    inquiryType: 'Development Project',
    date: '2024-07-29',
    isNew: false,
  },
  {
    name: 'Noah Martinez',
    email: 'noah@example.com',
    inquiryType: 'General Greeting',
    date: '2024-07-28',
    isNew: false,
  },
    {
    name: 'Isabella Brown',
    email: 'isabella@example.com',
    inquiryType: 'Book-Related Question',
    date: '2024-07-27',
    isNew: false,
  },
];

export default function MessagesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inbox</CardTitle>
        <CardDescription>
          Here are the latest messages from your contact form.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.email} className="cursor-pointer hover:bg-muted/50">
                <TableCell>
                  <div className="font-medium">{message.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {message.email}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={message.isNew ? 'default' : 'secondary'}>
                    {message.inquiryType}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{message.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
