'use client';
import AdminHeader from '@/components/admin/admin-header';
import StatsCard from '@/components/admin/stats-card';
import { Eye, Folder, MessageSquare, Users2, Wand } from 'lucide-react';
import ContentPerformanceChart from '@/components/admin/chart';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SeedBlogs from '@/components/admin/seed-blogs';
import SeedProjects from '@/components/admin/seed-projects';


interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  submissionDate: string;
}

interface InProgressProject {
    id: string;
    title: string;
    description: string;
    status: string;
    progress: number;
}

const ActiveProjects = () => {
    const firestore = useFirestore();
    const projectsCollection = useMemoFirebase(() => (firestore ? collection(firestore, 'in_progress_projects') : null), [firestore]);
    const { data: projects, isLoading, error } = useCollection<InProgressProject>(projectsCollection);

    return (
         <div className="bg-card p-6 rounded-xl border">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Active Projects</h3>
                 <Button variant="link" asChild><Link href="#">View All &rarr;</Link></Button>
            </div>
            <div className="space-y-6">
                {isLoading && <p>Loading projects...</p>}
                {error && <p className="text-destructive text-sm">Could not load projects.</p>}
                {projects?.map(project => (
                    <div key={project.id}>
                        <div className='flex items-start gap-4'>
                            <div className='bg-primary/10 p-2 rounded-lg mt-1'>
                                <Wand className="h-4 w-4 text-primary"/>
                            </div>
                            <div>
                                <p className="font-semibold">{project.title}</p>
                                <p className="text-sm text-muted-foreground">{project.status}</p>
                            </div>
                            <p className="ml-auto text-sm font-semibold">{project.progress}%</p>
                        </div>
                        <Progress value={project.progress} className="h-2 mt-2" />
                    </div>
                ))}
                 {!isLoading && projects?.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No active projects.</p>}
            </div>
        </div>
    )
}

const RecentMessages = () => {
    const firestore = useFirestore();
    const inquiriesCollection = useMemoFirebase(() => (firestore ? collection(firestore, 'contact_inquiries') : null), [firestore]);
    const inquiriesQuery = useMemoFirebase(() => (inquiriesCollection ? query(inquiriesCollection, orderBy('submissionDate', 'desc'), limit(5)) : null), [inquiriesCollection]);
    const { data: inquiries, isLoading } = useCollection<ContactInquiry>(inquiriesQuery);

    const timeAgo = (date: string) => {
        const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + "y ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + "mo ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + "d ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + "h ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + "m ago";
        return Math.floor(seconds) + "s ago";
    }

    return (
        <div className="bg-card p-6 rounded-xl border">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Recent Messages</h3>
                 <p className="text-sm text-muted-foreground">You have {inquiries?.length || 0} unread messages</p>
            </div>
            <div className="space-y-4">
                {isLoading && <p>Loading messages...</p>}
                {inquiries?.map((inquiry, index) => (
                    <div key={inquiry.id} className="flex items-start gap-4">
                        <Avatar className='h-10 w-10'>
                            <AvatarImage src={`https://i.pravatar.cc/150?img=${index + 1}`} alt={inquiry.name} />
                            <AvatarFallback>{inquiry.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className='flex-1'>
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-sm">{inquiry.name}</p>
                                <p className="text-xs text-muted-foreground">{timeAgo(inquiry.submissionDate)}</p>
                            </div>
                            <p className="text-sm font-medium">{inquiry.inquiryType}</p>
                            <p className="text-sm text-muted-foreground truncate">{inquiry.message}</p>
                        </div>
                    </div>
                ))}
                 {!isLoading && inquiries?.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No recent messages.</p>}
            </div>
        </div>
    )
}

export default function AdminDashboardPage() {
    const today = format(new Date(), 'MMMM d, yyyy');

    return (
        <>
            <AdminHeader title="Dashboard Overview" />
            <main className="flex-1 p-6 md:p-8 space-y-8 bg-secondary">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-xl border">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">Manage Blog Posts</h3>
                                <p className="text-sm text-muted-foreground">Add initial blog posts to the database.</p>
                            </div>
                            <SeedBlogs />
                        </div>
                    </div>
                     <div className="bg-card p-6 rounded-xl border">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">Manage Projects</h3>
                                <p className="text-sm text-muted-foreground">Add your latest projects to the database.</p>
                            </div>
                            <SeedProjects />
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Welcome back, Peter.</h2>
                        <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
                    </div>
                    <p className='text-muted-foreground font-medium'>{today}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        title="Total Views"
                        value="12.5K"
                        icon={<Eye className="h-5 w-5 text-muted-foreground" />}
                        trend="+12%"
                        trendColor='text-green-500'
                    />
                    <StatsCard
                        title="Active Projects"
                        value="5"
                        icon={<Folder className="h-5 w-5 text-muted-foreground" />}
                    />
                    <StatsCard
                        title="New Subscribers"
                        value="142"
                        icon={<Users2 className="h-5 w-5 text-muted-foreground" />}
                        trend="+5%"
                        trendColor='text-green-500'

                    />
                    <StatsCard
                        title="Unread Messages"
                        value="8"
                        icon={<MessageSquare className="h-5 w-5 text-muted-foreground" />}
                        trend="needs attention"
                        trendColor='text-amber-500'
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-card p-6 rounded-xl border">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="text-lg font-semibold">Content Performance</h3>
                                <p className='text-sm text-muted-foreground'>Traffic analytics for the last 30 days</p>
                            </div>
                            <div className="flex items-center gap-1 bg-secondary p-1 rounded-full">
                                <Button size="sm" variant="ghost" className="rounded-full bg-background shadow-sm h-8 px-3">30 Days</Button>
                                <Button size="sm" variant="ghost" className="rounded-full h-8 px-3">7 Days</Button>
                                <Button size="sm" variant="ghost" className="rounded-full h-8 px-3">24 Hours</Button>
                            </div>
                        </div>
                        <div className="h-[300px]">
                            <ContentPerformanceChart />
                        </div>
                    </div>
                   <RecentMessages />
                </div>

                <ActiveProjects />
            </main>
        </>
    );
}
