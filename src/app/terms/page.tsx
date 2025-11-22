import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 pt-24 md:pt-32">
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>
              <div className="space-y-4 text-muted-foreground">
                <h2 className="text-xl font-semibold text-foreground pt-4">1. Terms</h2>
                <p>
                  By accessing this Website, accessible from peterdamiano.vercel.app, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.
                </p>

                <h2 className="text-xl font-semibold text-foreground pt-4">2. Use License</h2>
                <p>
                  Permission is granted to temporarily download one copy of the materials on Peter Damiano's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>modify or copy the materials;</li>
                  <li>use the materials for any commercial purpose or for any public display;</li>
                  <li>attempt to reverse engineer any software contained on Peter Damiano's Website;</li>
                  <li>remove any copyright or other proprietary notations from the materials; or</li>
                  <li>transferring the materials to another person or "mirror" the materials on any other server.</li>
                </ul>
                <p>
                  This will let Peter Damiano to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format.
                </p>

                <h2 className="text-xl font-semibold text-foreground pt-4">3. Disclaimer</h2>
                <p>
                  All the materials on Peter Damiano’s Website are provided "as is". Peter Damiano makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, Peter Damiano does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.
                </p>

                <h2 className="text-xl font-semibold text-foreground pt-4">4. Limitations</h2>
                <p>
                  Peter Damiano or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on Peter Damiano’s Website, even if Peter Damiano or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.
                </p>

                <h2 className="text-xl font-semibold text-foreground pt-4">5. Governing Law</h2>
                <p>
                  Any claim related to Peter Damiano's Website shall be governed by the laws of Malawi without regards to its conflict of law provisions.
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
