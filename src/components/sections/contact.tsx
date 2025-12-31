'use client';
import { Button } from '../ui/button';
import { Mail, MapPin, Send, Briefcase, Code } from 'lucide-react';
import Link from 'next/link';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { addDocumentNonBlocking, useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import Newsletter from './newsletter';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  inquiryType: z.string().min(5, { message: "Please tell me how I can help."}),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const Contact = () => {
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      inquiryType: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!firestore) {
        toast({
            variant: "destructive",
            title: "Database not ready",
            description: "Please wait a moment and try again.",
        });
        return;
    }
    try {
      const inquiriesCollection = collection(firestore, 'contact_inquiries');
      await addDocumentNonBlocking(inquiriesCollection, {
        ...values,
        submissionDate: new Date().toISOString(),
      });

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you shortly.",
      });
      form.reset();
    } catch (e: any) {
      console.error("Error sending message: ", e);
      const errorToast: {
        variant: "destructive";
        title: string;
        description: string;
      } = {
         variant: "destructive",
         title: "Uh oh! Something went wrong.",
         description: "There was a problem sending your message. Please try again.",
      }
      if (e.message.includes("firestore")) {
         errorToast.description = "Could not connect to the database. Please check your connection and try again."
      }
       toast(errorToast);
    }
  }


  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left Column */}
            <div className="flex flex-col gap-8">
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's build something together.</h2>
                    <p className="text-muted-foreground text-lg">
                        Have a project in mind or just want to say hi? Fill out the form or connect with me through my social channels. I'm always open to discussing new ideas and opportunities.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-md"><Mail className="h-5 w-5 text-primary" /></div>
                        <span className="text-lg">petedianomedia@gmail.com</span>
                    </div>
                     <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-md"><MapPin className="h-5 w-5 text-primary" /></div>
                        <span className="text-lg">Mulanje, Malawi, Dzenje Secondary School</span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="icon"><Briefcase className="h-5 w-5" /></Button>
                    <Button variant="outline" size="icon"><Code className="h-5 w-5" /></Button>
                    <Button variant="outline" size="icon">@</Button>
                </div>
                <Newsletter />
            </div>

            {/* Right Column */}
            <div className="bg-card p-8 rounded-2xl border border-border/80 shadow-sm">
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="name@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="inquiryType"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>How can I help?</FormLabel>
                                <FormControl>
                                    <Input placeholder="Project inquiry, speaking, or just saying hi" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                <Textarea placeholder="Tell me a bit about your project..." className="min-h-32" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <div className="text-left">
                            <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="bg-accent hover:bg-accent/90">
                            {form.formState.isSubmitting ? 'Sending...' : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
