
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-dark mb-6 font-['Poppins']">
            Contact Us
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <GlassCard>
            <h2 className="text-2xl font-bold text-slate-dark mb-6">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                  <Input placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <Input type="email" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                <Input placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <Textarea placeholder="Tell us more about your inquiry..." rows={5} />
              </div>
              <Button className="w-full bg-primary-blue hover:bg-blue-700 text-white">
                <Send className="mr-2" size={16} />
                Send Message
              </Button>
            </form>
          </GlassCard>

          {/* Contact Information */}
          <div className="space-y-8">
            <GlassCard>
              <Mail className="text-primary-blue mb-4" size={32} />
              <h3 className="text-xl font-semibold text-slate-dark mb-2">Email</h3>
              <p className="text-slate-600">support@propertyhub.com</p>
              <p className="text-slate-600">hello@propertyhub.com</p>
            </GlassCard>

            <GlassCard>
              <Phone className="text-primary-blue mb-4" size={32} />
              <h3 className="text-xl font-semibold text-slate-dark mb-2">Phone</h3>
              <p className="text-slate-600">+1 (555) 123-4567</p>
              <p className="text-slate-600">+1 (555) 987-6543</p>
            </GlassCard>

            <GlassCard>
              <MapPin className="text-primary-blue mb-4" size={32} />
              <h3 className="text-xl font-semibold text-slate-dark mb-2">Address</h3>
              <p className="text-slate-600">
                123 Property Street<br />
                Suite 456<br />
                Business City, BC 12345
              </p>
            </GlassCard>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
