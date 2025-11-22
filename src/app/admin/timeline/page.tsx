'use client';
import { useState, useEffect } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { ADMIN_EMAILS } from '@/lib/admins';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Calendar, ArrowLeft, Plus, Trash2, Edit } from 'lucide-react';
import Link from 'next/link';
import { collection, doc, addDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface TimelineEvent {
    id: string;
    date: string;
    title: string;
    description: string;
    imageUrl?: string;
}

export default function AdminTimelinePage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  
  const timelineCollection = useMemoFirebase(() => firestore ? collection(firestore, 'timeline_events') : null, [firestore]);
  const { data: events, isLoading: eventsLoading, error } = useCollection<TimelineEvent>(timelineCollection);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<TimelineEvent> | null>(null);
  const [formState, setFormState] = useState({ date: '', title: '', description: '', imageUrl: '' });
  const [isSaving, setIsSaving] = useState(false);


  useEffect(() => {
    if (!isUserLoading) {
      if (!user) {
        router.push('/admin');
      } else {
        const userIsAdmin = ADMIN_EMAILS.includes(user.email || '');
        setIsAuthorized(userIsAdmin);
        setIsVerifying(false);
        if (!userIsAdmin) {
            router.push('/admin/dashboard');
        }
      }
    }
  }, [user, isUserLoading, router]);
  
  const openNewEditor = () => {
    setCurrentEvent(null);
    setFormState({ date: '', title: '', description: '', imageUrl: '' });
    setIsEditorOpen(true);
  };

  const openEditEditor = (event: TimelineEvent) => {
    setCurrentEvent(event);
    setFormState({ ...event, imageUrl: event.imageUrl || '' });
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
    setCurrentEvent(null);
    setFormState({ date: '', title: '', description: '', imageUrl: '' });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormState(prev => ({ ...prev, [name]: value }));
  }

  const handleSave = async () => {
    if (!firestore) return;
    if (!formState.date.trim() || !formState.title.trim() || !formState.description.trim()) {
        toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Date, title, and description are required."
        });
        return;
    }

    setIsSaving(true);
    
    const eventData = {
        date: formState.date,
        title: formState.title,
        description: formState.description,
        imageUrl: formState.imageUrl.trim() || null,
    };

    try {
        if (currentEvent && currentEvent.id) {
            const eventRef = doc(firestore, 'timeline_events', currentEvent.id);
            await setDoc(eventRef, eventData, { merge: true });
            toast({ title: "Success", description: "Timeline event updated." });
        } else {
            await addDoc(collection(firestore, 'timeline_events'), eventData);
            toast({ title: "Success", description: "Timeline event created." });
        }
        closeEditor();
    } catch (error) {
        console.error("Error saving timeline event:", error);
        toast({ variant: "destructive", title: "Error", description: "Failed to save event." });
    } finally {
        setIsSaving(false);
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!firestore) return;
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
        await deleteDoc(doc(firestore, 'timeline_events', eventId));
        toast({ title: "Success", description: "Event deleted." });
    } catch (error) {
        console.error("Error deleting event:", error);
        toast({ variant: "destructive", title: "Error", description: "Failed to delete event." });
    }
  };

  if (isVerifying || isUserLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 p-4">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6 mb-4 rounded-lg">
            <h1 className="text-xl font-semibold flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                Manage Timeline
            </h1>
            <Button asChild variant="outline">
                <Link href="/admin/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Link>
            </Button>
        </header>

        {isEditorOpen ? (
            <Card>
                <CardHeader>
                    <CardTitle>{currentEvent ? 'Edit Event' : 'Add New Event'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-foreground mb-1">Date</label>
                        <Input id="date" name="date" value={formState.date} onChange={handleChange} placeholder="e.g., 2024-08-15 or August 2024"/>
                    </div>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">Title</label>
                        <Input id="title" name="title" value={formState.title} onChange={handleChange} placeholder="Event Title"/>
                    </div>
                     <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-foreground mb-1">Image URL (Optional)</label>
                        <Input id="imageUrl" name="imageUrl" value={formState.imageUrl} onChange={handleChange} placeholder="https://example.com/event.jpg"/>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">Description</label>
                        <Textarea id="description" name="description" value={formState.description} onChange={handleChange} placeholder="A short description of the event."/>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={closeEditor} disabled={isSaving}>Cancel</Button>
                        <Button onClick={handleSave} disabled={isSaving}>
                            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {isSaving ? 'Saving...' : 'Save Event'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        ) : (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle>Timeline Events</CardTitle>
                        <CardDescription>Add, edit, or delete timeline events.</CardDescription>
                    </div>
                    <Button onClick={openNewEditor}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Event
                    </Button>
                </CardHeader>
                <CardContent>
                   {eventsLoading && <div className="flex justify-center p-4"><Loader2 className="h-6 w-6 animate-spin" /></div>}
                   {error && <p className="text-destructive text-center">Failed to load events.</p>}
                   <div className="space-y-4">
                        {events && events.map(event => (
                            <div key={event.id} className="flex items-center justify-between rounded-lg border p-3">
                                <div>
                                    <p className="font-medium">{event.title}</p>
                                    <p className="text-sm text-muted-foreground">{event.date}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon" onClick={() => openEditEditor(event)}><Edit className="h-4 w-4" /></Button>
                                    <Button variant="destructive" size="icon" onClick={() => handleDelete(event.id)}><Trash2 className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        ))}
                        {!eventsLoading && events?.length === 0 && (
                            <p className="text-center text-muted-foreground py-4">No events yet. Click "New Event" to get started.</p>
                        )}
                   </div>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
