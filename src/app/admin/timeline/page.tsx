'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { collection } from 'firebase/firestore';
import { useFirestore, addDocumentNonBlocking } from '@/firebase';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  date: z.string().min(4, { message: "Please enter a valid date or year." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
});


export default function TimelineEditor() {
  const firestore = useFirestore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      date: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
     try {
      const timelineCollection = collection(firestore, 'timeline_events');
      // The date from the form is a string, but Firestore needs a Timestamp or ISO string.
      // We will save it as an ISO string. We'll try to parse it, but fall back to using the string directly.
      let eventDate: Date;
      try {
        eventDate = new Date(values.date);
        if (isNaN(eventDate.getTime())) { // Invalid date string
            // If it's just a year, create a date for it
             if(/^\d{4}$/.test(values.date)) {
                eventDate = new Date(parseInt(values.date), 0, 1);
             } else {
               throw new Error('Invalid date format');
             }
        }
      } catch (e) {
        eventDate = new Date(); // fallback
      }

      await addDocumentNonBlocking(timelineCollection, {
        title: values.title,
        description: values.description,
        date: eventDate.toISOString(), // Store as ISO string
      });

      toast({
        title: "Timeline Event Added!",
        description: "The new event has been saved to your timeline.",
      });
      form.reset();
    } catch (e: any) {
      console.error("Error saving timeline event: ", e);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem saving your timeline event. Please try again.",
      });
    }
  }


  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="mx-auto grid w-full max-w-2xl gap-2">
          <h1 className="text-3xl font-semibold">Timeline</h1>
        </div>
        <div className="mx-auto grid w-full max-w-2xl items-start gap-6">
          <Card>
            <CardHeader>
              <CardTitle>New Timeline Event</CardTitle>
              <CardDescription>
                Add a new story or trip to your public timeline.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Trip to Chileka Airport" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date (e.g., 2023 or July 2024)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter date of the event" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the event or story..."
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Saving..." : "Save Event"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
