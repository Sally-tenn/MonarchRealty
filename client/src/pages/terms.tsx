
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { FileText } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-dark mb-6 font-['Poppins']">
            Terms of Service
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            These terms govern your use of our services. Please read them carefully.
          </p>
        </div>

        <GlassCard>
          <div className="flex items-center gap-3 mb-8">
            <FileText className="text-primary-blue" size={32} />
            <h2 className="text-2xl font-bold text-slate-dark">Terms & Conditions</h2>
          </div>
          
          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-semibold text-slate-dark mb-4">Acceptance of Terms</h3>
            <p className="text-slate-600 mb-6">
              By accessing and using PropertyHub, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h3 className="text-xl font-semibold text-slate-dark mb-4">Use License</h3>
            <p className="text-slate-600 mb-6">
              Permission is granted to temporarily download one copy of the materials on PropertyHub for personal, non-commercial transitory viewing only.
            </p>

            <h3 className="text-xl font-semibold text-slate-dark mb-4">Disclaimer</h3>
            <p className="text-slate-600 mb-6">
              The materials on PropertyHub are provided on an 'as is' basis. PropertyHub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
            </p>

            <h3 className="text-xl font-semibold text-slate-dark mb-4">Limitations</h3>
            <p className="text-slate-600 mb-6">
              In no event shall PropertyHub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption).
            </p>

            <h3 className="text-xl font-semibold text-slate-dark mb-4">Accuracy of Materials</h3>
            <p className="text-slate-600 mb-6">
              The materials appearing on PropertyHub could include technical, typographical, or photographic errors. PropertyHub does not warrant that any of the materials on its website are accurate, complete, or current.
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
