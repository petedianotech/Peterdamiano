'use client';
import { Button } from '../ui/button';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const WhatsAppIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path d="M16.6 14.2c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.5-1.5-1.8-.1-.3 0-.5.1-.6.1-.1.2-.3.4-.4.1-.1.2-.2.3-.3.1-.1.2-.3.1-.4-.1-.1-.6-1.5-.8-2.1-.2-.5-.4-.5-.5-.5h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2 1 2.4c.1.1 1.5 2.3 3.6 3.2.5.2.9.4 1.2.5.5.2 1 .1 1.3-.1.4-.2.6-.4.8-.8.2-.3.2-.6.1-.7l-.1-.1z M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 18.2a8.2 8.2 0 1 1 8.2-8.2 8.2 8.2 0 0 1-8.2 8.2z" />
    </svg>
  );

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Have a project in mind or just want to say hello? Reach out directly.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button asChild size="lg" variant="outline">
              <Link href="mailto:peterleodamiano@gmail.com">
                <Mail className="mr-2" /> Email
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="tel:0987066051">
                <Phone className="mr-2" /> Call
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="sms:0987066051">
                <MessageSquare className="mr-2" /> Text
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="https://wa.me/0987066051" target="_blank">
                <WhatsAppIcon /> WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
