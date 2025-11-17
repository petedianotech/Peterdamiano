'use client';
import { Button } from '../ui/button';
import { Mail, Phone, MessageSquare, Send } from 'lucide-react';
import Link from 'next/link';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { addDocumentNonBlocking } from '@/firebase';
import { useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  inquiryType: z.string({ required_error: "Please select an inquiry type." }),
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
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem sending your message. Please try again.",
      });
    }
  }


  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Have a project in mind or just want to say hello? Fill out the form below or reach out directly.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Peter Damiano" {...field} />
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
                        <Input placeholder="peter@example.com" {...field} />
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
                    <FormLabel>Inquiry Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a reason for contacting" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="collaboration">Collaboration Offer</SelectItem>
                        <SelectItem value="speaking">Speaking Engagement</SelectItem>
                        <SelectItem value="project">Project Inquiry</SelectItem>
                        <SelectItem value="general">General Question</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Textarea placeholder="Tell me a little about your project..." className="min-h-32" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center">
                <Button type="submit" size="lg">
                  Send Message <Send className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </form>
          </Form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
