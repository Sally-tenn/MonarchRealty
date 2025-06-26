
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Clock, Users } from "lucide-react";

export default function Careers() {
  const jobs = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      type: "Full-time"
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Contract"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-dark mb-6 font-['Poppins']">
            Careers
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Join our team and help shape the future of real estate technology.
          </p>
        </div>

        <GlassCard className="mb-12">
          <div className="text-center">
            <Users className="text-primary-blue mx-auto mb-4" size={64} />
            <h2 className="text-2xl font-bold text-slate-dark mb-4">Why Work With Us?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Be part of a dynamic team that's revolutionizing the real estate industry with cutting-edge technology and innovative solutions.
            </p>
          </div>
        </GlassCard>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-dark mb-8 text-center">Open Positions</h2>
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <GlassCard key={index}>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-dark mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-slate-600">
                      <div className="flex items-center gap-1">
                        <Briefcase size={16} />
                        {job.department}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  <Button className="bg-primary-blue hover:bg-blue-700 text-white mt-4 md:mt-0">
                    Apply Now
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <GlassCard className="text-center">
          <h2 className="text-2xl font-bold text-slate-dark mb-4">Don't See Your Role?</h2>
          <p className="text-slate-600 mb-6">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <Button className="bg-primary-blue hover:bg-blue-700 text-white">
            Send Resume
          </Button>
        </GlassCard>
      </main>

      <Footer />
    </div>
  );
}
