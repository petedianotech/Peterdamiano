'use client';
import AdminHeader from '@/components/admin/admin-header';
import StatsCard from '@/components/admin/stats-card';
import { BarChart, Eye, MessageSquare, Users } from 'lucide-react';
import TrafficChart from '@/components/admin/chart';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  inquiryType: string;
  submissionDate: string;
}

export default function AdminDashboardPage() {
    const firestore = useFirestore();
    const inquiriesCollection = useMemoFirebase(() => (firestore ? collection(firestore, 'contact_inquiries') : null), [firestore]);
    const inquiriesQuery = useMemoFirebase(() => (inquiriesCollection ? query(inquiriesCollection, orderBy('submissionDate', 'desc'), limit(5)) : null), [inquiriesCollection]);
    const { data: inquiries, isLoading } = useCollection<ContactInquiry>(inquiriesQuery);


  return (
    <>
      <AdminHeader title="Dashboard" />
      <main className="flex-1 p-6 md:p-8 space-y-8 bg-secondary/40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Subscribers"
            value="1,284"
            icon={<Users className="h-5 w-5 text-muted-foreground" />}
            trend="+12.5%"
          />
          <StatsCard
            title="Monthly Visitors"
            value="32,832"
            icon={<Eye className="h-5 w-5 text-muted-foreground" />}
            trend="+8.2%"
          />
          <StatsCard
            title="Engagement Rate"
            value="64.2%"
            icon={<BarChart className="h-5 w-5 text-muted-foreground" />}
            trend="-1.1%"
          />
          <StatsCard
            title="New Inquiries"
            value="17"
            icon={<MessageSquare className="h-5 w-5 text-muted-foreground" />}
            trend="+3 last 7 days"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-card p-6 rounded-xl border">
            <h3 className="text-lg font-semibold mb-4">Site Traffic</h3>
            <div className="h-[300px]">
                <TrafficChart />
            </div>
          </div>
          <div className="bg-card p-6 rounded-xl border">
            <h3 className="text-lg font-semibold mb-4">Recent Inquiries</h3>
            <div className="space-y-4">
                {isLoading && <p>Loading inquiries...</p>}
                {inquiries?.map(inquiry => (
                    <div key={inquiry.id}>
                        <div className="flex justify-between items-center">
                            <p className="font-medium text-sm">{inquiry.name}</p>
                            <p className="text-xs text-muted-foreground">{format(new Date(inquiry.submissionDate), 'dd MMM')}</p>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{inquiry.inquiryType}</p>
                    </div>
                ))}
                 {!isLoading && inquiries?.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No recent inquiries.</p>}
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border">
            <h3 className="text-lg font-semibold mb-4">Quick Draft</h3>
            <Textarea placeholder="Start writing a new post..." className="mb-4" />
            <div className="flex justify-end gap-2">
                <Button variant="outline">Save Draft</Button>
                <Button>Publish</Button>
            </div>
        </div>
      </main>
    </>
  );
}
