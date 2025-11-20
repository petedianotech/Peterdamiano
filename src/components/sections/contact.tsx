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

const WhatsAppIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path d="M16.6 14.2c-.2-.1-1.5-0.7-1.7-0.8-.2-.1-.4-.1-.6 0.1-.2 0.2-.6 0.8-.8 0.9-.1 0.1-.3 0.2-.5 0.1s-1-0.4-1.9-1.2c-0.7-0.6-1.2-1.4-1.3-1.6-.1-.2 0-.4 0.1-.5 0.1-.1 0.2-.2 0.4-.4 0.1-.1 0.2-.2 0.2-.4 0-.1 0-.2-.1-.3-.1-.1-.6-1.3-.8-1.8-.2-.5-.4-.4-.5-.4h-0.5c-.2 0-.4 0.1-.6 0.3-.2 0.2-.8 0.8-.8 1.9s0.8 2.2 0.9 2.4c0.1 0.2 1.5 2.3 3.7 3.2 0.5 0.2 0.9 0.4 1.2 0.5 0.5 0.2 1 0.1 1.3-0.1 0.4-.2 1.2-0.5 1.4-1-.2-.4-.2-.8-.3-0.9-.1-.1-.2-.2-.4-.3z M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
    </svg>
  );

const Contact = () => {
  const { toast } = useToast();
  // The useFirestore hook is now moved inside the onSubmit function
  // const firestore = useFirestore(); 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const firestore = useFirestore; // Store the hook function itself

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const db = firestore(); // Call the hook here, inside the client-side event handler
      const inquiriesCollection = collection(db, 'contact_inquiries');
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
      // This error toast is safe because it only runs if the submission fails
      // which can only happen on the client-side.
      const errorToast = {
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
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Have a project in mind or just want to say hello? Fill out the form below or reach out directly.
          </p>
        </div>
        
        <div className="flex justify-center gap-4 mb-12">
            <Button asChild size="lg" variant="outline">
                <Link href="https://wa.me/255987066051" target="_blank">
                    <WhatsAppIcon />
                    WhatsApp
                </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
                <Link href="tel:+255987066051">
                    <Phone />
                    Call
                </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
                <Link href="sms:+255987066051">
                    <MessageSquare />
                    SMS
                </Link>
            </Button>
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
                <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Sending...' : <>Send Message <Send className="ml-2 h-5 w-5" /></>}
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
