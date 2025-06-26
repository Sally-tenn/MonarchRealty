import { useState } from "react";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import AIChatbot from "@/components/ai/chatbot";
import PricingCard from "@/components/pricing/pricing-card";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Star, Check, Phone, Calendar } from "lucide-react";
import type { SubscriptionPlan } from "@/types";

export default function Pricing() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans: SubscriptionPlan[] = [
    {
      name: "Starter",
      price: billingCycle === 'monthly' ? 29 : 290,
      features: [
        "Up to 50 property listings",
        "Basic CRM and lead tracking",
        "Email support",
        "Mobile app access",
        "Basic analytics",
        "Property search and filtering",
        "Tenant portal access"
      ]
    },
    {
      name: "Professional",
      price: billingCycle === 'monthly' ? 89 : 890,
      popular: true,
      features: [
        "Unlimited property listings",
        "Advanced CRM with automation",
        "Priority support",
        "Team collaboration tools",
        "Advanced analytics & reporting",
        "MLS integration",
        "AI assistant access",
        "Custom branding",
        "Lead scoring and nurturing",
        "Document management",
        "Financial reporting"
      ]
    },
    {
      name: "Enterprise",
      price: billingCycle === 'monthly' ? 249 : 2490,
      features: [
        "Everything in Professional",
        "Custom integrations",
        "White-label options",
        "Dedicated account manager",
        "Advanced security & compliance",
        "Multi-location support",
        "API access",
        "Custom training sessions",
        "Priority feature requests",
        "24/7 phone support",
        "Advanced workflow automation"
      ]
    }
  ];

  const handleSelectPlan = (planName: string) => {
    if (!isAuthenticated) {
      window.location.href = '/api/login';
      return;
    }

    if (planName === 'Enterprise') {
      toast({
        title: "Contact Sales",
        description: "Our sales team will get in touch with you shortly.",
      });
    } else {
      toast({
        title: "Starting Free Trial",
        description: `Starting your free trial of ${planName} plan.`,
      });
    }
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Real Estate Agent",
      company: "Century 21",
      content: "Monarch Property has transformed how I manage my listings. The AI assistant is incredibly helpful for market insights.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Property Manager",
      company: "Metro Properties",
      content: "The dashboard analytics have given us insights we never had before. Our occupancy rates improved by 15% this quarter.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Real Estate Investor",
      company: "Rodriguez Holdings",
      content: "The comprehensive analytics and market data help me make informed investment decisions. ROI tracking is exceptional.",
      rating: 5
    }
  ];

  const faqItems = [
    {
      question: "Can I change my plan at any time?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 14-day free trial for all plans. No credit card required to start your trial."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We provide email support for Starter plans, priority support for Professional plans, and 24/7 phone support for Enterprise plans."
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer: "Yes, annual billing provides approximately 2 months free compared to monthly billing."
    },
    {
      question: "Can I integrate with my existing tools?",
      answer: "Professional and Enterprise plans include various integrations. Enterprise plans also offer custom integrations."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-20 gradient-bg">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-['Poppins']">
              Choose Your Plan
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Flexible pricing options designed to scale with your real estate business
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-12">
              <div className="bg-white/20 backdrop-blur-lg rounded-xl p-2 inline-flex border border-white/30">
                <Button
                  variant="ghost"
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    billingCycle === 'monthly'
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-white hover:bg-white/20"
                  }`}
                  onClick={() => setBillingCycle('monthly')}
                >
                  Monthly
                </Button>
                <Button
                  variant="ghost"
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    billingCycle === 'yearly'
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-white hover:bg-white/20"
                  }`}
                  onClick={() => setBillingCycle('yearly')}
                >
                  Yearly
                  <Badge className="ml-2 bg-green-500 text-white">Save 17%</Badge>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 -mt-24 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <PricingCard
                  key={plan.name}
                  name={plan.name}
                  price={plan.price}
                  features={plan.features}
                  popular={plan.popular}
                  onSelect={() => handleSelectPlan(plan.name)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-dark mb-4 font-['Poppins']">
                Feature Comparison
              </h2>
              <p className="text-xl text-slate-600">
                Compare all features across our pricing plans
              </p>
            </div>

            <GlassCard className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-glass-border">
                    <th className="text-left py-4 px-6 font-semibold text-slate-dark">Feature</th>
                    <th className="text-center py-4 px-6 font-semibold text-slate-dark">Starter</th>
                    <th className="text-center py-4 px-6 font-semibold text-slate-dark">Professional</th>
                    <th className="text-center py-4 px-6 font-semibold text-slate-dark">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Property Listings", starter: "50", professional: "Unlimited", enterprise: "Unlimited" },
                    { feature: "CRM & Lead Tracking", starter: "Basic", professional: "Advanced", enterprise: "Advanced" },
                    { feature: "Analytics & Reporting", starter: "Basic", professional: "Advanced", enterprise: "Custom" },
                    { feature: "MLS Integration", starter: false, professional: true, enterprise: true },
                    { feature: "AI Assistant", starter: false, professional: true, enterprise: true },
                    { feature: "Team Collaboration", starter: false, professional: true, enterprise: true },
                    { feature: "API Access", starter: false, professional: false, enterprise: true },
                    { feature: "Custom Integrations", starter: false, professional: false, enterprise: true },
                    { feature: "White-label Options", starter: false, professional: false, enterprise: true },
                    { feature: "Dedicated Support", starter: false, professional: false, enterprise: true },
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-glass-border hover:bg-slate-50/50">
                      <td className="py-4 px-6 font-medium text-slate-dark">{row.feature}</td>
                      <td className="py-4 px-6 text-center">
                        {typeof row.starter === 'boolean' ? (
                          row.starter ? <Check className="mx-auto text-green-500" size={20} /> : <span className="text-slate-400">—</span>
                        ) : (
                          <span className="text-slate-dark">{row.starter}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {typeof row.professional === 'boolean' ? (
                          row.professional ? <Check className="mx-auto text-green-500" size={20} /> : <span className="text-slate-400">—</span>
                        ) : (
                          <span className="text-slate-dark">{row.professional}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {typeof row.enterprise === 'boolean' ? (
                          row.enterprise ? <Check className="mx-auto text-green-500" size={20} /> : <span className="text-slate-400">—</span>
                        ) : (
                          <span className="text-slate-dark">{row.enterprise}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-dark mb-4 font-['Poppins']">
                What Our Clients Say
              </h2>
              <p className="text-xl text-slate-600">
                Trusted by thousands of real estate professionals worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <GlassCard key={index}>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-4 text-white font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-dark">{testimonial.name}</h4>
                      <p className="text-slate-500 text-sm">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={16} />
                    ))}
                  </div>
                  <p className="text-slate-600">{testimonial.content}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-dark mb-4 font-['Poppins']">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-slate-600">
                Get answers to common questions about our pricing and features
              </p>
            </div>

            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <GlassCard key={index}>
                  <h3 className="text-lg font-semibold text-slate-dark mb-3">
                    {item.question}
                  </h3>
                  <p className="text-slate-600">
                    {item.answer}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 gradient-bg">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <GlassCard>
              <h2 className="text-3xl font-bold text-white mb-6 font-['Poppins']">
                Ready to Transform Your Real Estate Business?
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of agents, property managers, and investors who trust Monarch Property Management to grow their portfolio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button 
                  onClick={() => handleSelectPlan('Professional')}
                  className="bg-white text-primary-blue px-8 py-4 text-lg font-semibold hover:bg-blue-50 transition-colors font-['Poppins']"
                >
                  Start Your Free Trial
                </Button>
                <Button
                  variant="ghost"
                  className="glass-card px-8 py-4 text-white text-lg font-semibold hover:bg-white/20 transition-colors font-['Poppins']"
                  onClick={() => {
                    toast({
                      title: "Schedule Demo",
                      description: "Demo scheduling form would open here.",
                    });
                  }}
                >
                  <Calendar className="mr-2" size={20} />
                  Schedule a Demo
                </Button>
              </div>
              <p className="text-blue-200 text-sm">
                No credit card required • Cancel anytime • Full support included
              </p>
            </GlassCard>
          </div>
        </section>
      </main>

      <AIChatbot />
      <Footer />
    </div>
  );
}