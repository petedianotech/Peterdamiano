'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminMessagesPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Received Messages</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Contact message viewing functionality will be implemented here.</p>
        </CardContent>
    </Card>
  );
}
