import { Mail, Phone, MessageSquare } from "lucide-react";
import { ContactForm } from "../contact-form";
import Link from "next/link";
import { Button } from "../ui/button";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export function Contact() {
  const phoneNumber = "0987066051";
  const email = "peterleodamiano@gmail.com";

  return (
    <section id="contact" className="py-20 md:py-32 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold text-deep-navy">
            Get In Touch
          </h2>
          <p className="mt-2 text-lg text-charcoal">
            Have a project in mind or just want to say hello?
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-charcoal mb-4">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <a
                      href={`mailto:${email}`}
                      className="text-foreground/80 hover:text-primary"
                    >
                      {email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-foreground/80">{phoneNumber}</p>
                    <div className="flex gap-2 mt-2">
                       <Button asChild variant="outline" size="sm">
                        <Link href={`https://wa.me/${phoneNumber.replace(/\s/g, "")}`}>
                          <WhatsAppIcon className="mr-2 h-4 w-4" /> WhatsApp
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`tel:${phoneNumber}`}>
                          <Phone className="mr-2 h-4 w-4" /> Call
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`sms:${phoneNumber}`}>
                          <MessageSquare className="mr-2 h-4 w-4" /> Text
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}