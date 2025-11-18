'use client';
import { Building, Plane, Users, School } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
}

const iconMap: { [key: string]: JSX.Element } = {
  airport: <Plane className="h-5 w-5 text-primary" />,
  conference: <Users className="h-5 w-5 text-primary" />,
  school: <School className="h-5 w-5 text-primary" />,
  default: <Building className="h-5 w-5 text-primary" />,
};

const getIconForEvent = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('airport')) return iconMap.airport;
  if (lowerTitle.includes('conference')) return iconMap.conference;
  if (lowerTitle.includes('school') || lowerTitle.includes('college')) return iconMap.school;
  return iconMap.default;
};

const formatDate = (isoString: string) => {
    // Check if it is a full date
    const date = new Date(isoString);
    if (!isNaN(date.getTime())) {
        const year = date.getUTCFullYear();
        const month = date.toLocaleString('default', { month: 'long' });

        // If the date is at the beginning of the year, it might just be a year entry
        if (date.getUTCMonth() === 0 && date.getUTCDate() === 1) {
            const dateStr = date.toISOString();
            if (dateStr.endsWith('-01-01T00:00:00.000Z')) {
                return year.toString();
            }
        }
        
        return `${month} ${year}`;
    }
    // Fallback for strings that aren't valid dates but should be displayed
    return isoString;
};


export default function TimelinePage() {
  const firestore = useFirestore();
  const timelineCollection = useMemoFirebase(() => collection(firestore, 'timeline_events'), [firestore]);
  const timelineQuery = useMemoFirebase(() => query(timelineCollection, orderBy('date', 'desc')), [timelineCollection]);
  const { data: events, isLoading, error } = useCollection<TimelineEvent>(timelineQuery);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 pt-24 md:pt-32">
        <section id="timeline" className="py-20 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              My Innovation Journey
            </h2>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute left-1/2 h-full w-0.5 bg-border -translate-x-1/2"></div>
              {isLoading && Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="mb-8 flex justify-between items-center w-full">
                  <div className={`w-2/5 ${index % 2 === 0 ? 'order-1 text-right' : 'order-3 text-left'}`}>
                    <Skeleton className="h-4 w-20 mb-2 ml-auto" />
                    <Skeleton className="h-6 w-3/4 mb-2 ml-auto" />
                    <Skeleton className="h-12 w-full ml-auto" />
                  </div>
                  <div className="order-2 z-10">
                    <Skeleton className="h-12 w-12 rounded-full" />
                  </div>
                </div>
              ))}
               {error && (
                <p className="text-center text-destructive">Failed to load timeline events.</p>
              )}
              {!isLoading && events?.map((event, index) => (
                <div key={event.id} className="mb-8 flex justify-between items-center w-full">
                  <div className={`w-2/5 ${index % 2 === 0 ? 'order-1 text-right' : 'order-3 text-left'}`}>
                     <p className="text-sm font-medium text-primary">{formatDate(event.date)}</p>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>
                  <div className="z-10 order-2">
                    <div className="w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                        {getIconForEvent(event.title)}
                    </div>
                  </div>
                   <div className="w-2/5"></div>
                </div>
              ))}
               {!isLoading && events?.length === 0 && (
                <p className="text-center text-muted-foreground">No timeline events to display yet.</p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
