'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/firebase';

export default function Dashboard() {
  const { user } = useUser();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Dashboard</CardTitle>
        <CardDescription>Welcome, {user?.displayName || 'Admin'}!</CardDescription>
      </CardHeader>
      <CardContent>
        <p>You can now manage your site from the links in the sidebar.</p>
        <p className="mt-4 text-sm text-muted-foreground">Select an option from the navigation menu to get started.</p>
      </CardContent>
    </Card>
  );
}
