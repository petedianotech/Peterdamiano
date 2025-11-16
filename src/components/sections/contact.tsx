import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "../contact-form";

export function Contact() {
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
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <a
                      href="mailto:peter.damiano@example.com"
                      className="text-foreground/80 hover:text-primary"
                    >
                      peter.damiano@example.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-foreground/80">(123) 456-7890</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-foreground/80">San Francisco, CA</p>
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
