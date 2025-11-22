import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 pt-24 md:pt-32">
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make an inquiry through peterdamiano.vercel.app (the “Site”).
                </p>

                <h2 className="text-xl font-semibold text-foreground pt-4">PERSONAL INFORMATION WE COLLECT</h2>
                <p>
                  When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
                </p>
                <p>
                  Additionally, when you submit an inquiry through the contact form, we collect certain information from you, including your name, email address, inquiry type, and the message content. We refer to this information as “Inquiry Information.”
                </p>

                <h2 className="text-xl font-semibold text-foreground pt-4">HOW DO WE USE YOUR PERSONAL INFORMATION?</h2>
                <p>
                  We use the Inquiry Information that we collect generally to respond to your inquiries and communicate with you.
                </p>
                
                <h2 className="text-xl font-semibold text-foreground pt-4">SHARING YOUR PERSONAL INFORMATION</h2>
                <p>
                    We do not share your Personal Information with third parties, except as required to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
                </p>

                <h2 className="text-xl font-semibold text-foreground pt-4">YOUR RIGHTS</h2>
                <p>
                  If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.
                </p>

                <h2 className="text-xl font-semibold text-foreground pt-4">DATA RETENTION</h2>
                <p>
                  When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
                </p>

                <h2 className="text-xl font-semibold text-foreground pt-4">CHANGES</h2>
                <p>
                  We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
                </p>

                <h2 className="text-xl font-semibold text-foreground pt-4">CONTACT US</h2>
                <p>
                  For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at petedianotech@gmail.com or by using the contact form on the Site.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
