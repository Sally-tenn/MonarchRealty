
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Shield } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-dark mb-6 font-['Poppins']">
            Privacy Policy
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
        </div>

        <GlassCard>
          <div className="flex items-center gap-3 mb-8">
            <Shield className="text-primary-blue" size={32} />
            <h2 className="text-2xl font-bold text-slate-dark">Data Protection</h2>
          </div>
          
          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-semibold text-slate-dark mb-4">Information We Collect</h3>
            <p className="text-slate-600 mb-6">
              We collect information you provide directly to us, information we collect automatically when you use our services, and information from third parties.
            </p>

            <h3 className="text-xl font-semibold text-slate-dark mb-4">How We Use Your Information</h3>
            <p className="text-slate-600 mb-6">
              We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
            </p>

            <h3 className="text-xl font-semibold text-slate-dark mb-4">Information Sharing</h3>
            <p className="text-slate-600 mb-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
            </p>

            <h3 className="text-xl font-semibold text-slate-dark mb-4">Data Security</h3>
            <p className="text-slate-600 mb-6">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h3 className="text-xl font-semibold text-slate-dark mb-4">Contact Us</h3>
            <p className="text-slate-600 mb-6">
              If you have any questions about this Privacy Policy, please contact us at privacy@propertyhub.com.
            </p>

            <p className="text-slate-500 text-sm">
              Last updated: March 2024
            </p>
          </div>
        </GlassCard>
      </main>

      <Footer />
    </div>
  );
}
