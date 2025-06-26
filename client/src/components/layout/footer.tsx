
import { Link } from "wouter";

const platformLinks = [
  { href: "/properties", label: "Properties" },
  { href: "/analytics", label: "Analytics" },
  { href: "/dashboard/agent", label: "Agent Dashboard" },
  { href: "/dashboard/manager", label: "Manager Dashboard" },
  { href: "/dashboard/investor", label: "Investor Dashboard" },
  { href: "/dashboard/admin", label: "Admin Dashboard" }
];

const resourceLinks = [
  { href: "/tutorials", label: "Tutorials" },
  { href: "/api-docs", label: "API Docs" },
  { href: "/help", label: "Help Center" },
  { href: "/support", label: "Support" },
  { href: "/integrations", label: "Integrations" }
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Blog" },
  { href: "/community", label: "Community" },
  { href: "/contact", label: "Contact" }
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" }
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold font-['Poppins']">PropertyPro</span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Transform your real estate business with our comprehensive property management platform. 
              Streamline operations, maximize profits, and deliver exceptional tenant experiences.
            </p>
            <div className="flex space-x-4">
              <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">Contact</span>
                📧
              </Link>
              <Link href="/blog" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">Blog</span>
                📝
              </Link>
              <Link href="/community" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">Community</span>
                👥
              </Link>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 font-['Poppins']">Platform</h4>
            <ul className="space-y-3 text-slate-400">
              {platformLinks.map((link, index) => (
                <li key={`platform-${index}`}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-6 font-['Poppins']">Resources</h4>
            <ul className="space-y-3 text-slate-400">
              {resourceLinks.map((link, index) => (
                <li key={`resource-${index}`}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-6 font-['Poppins']">Company</h4>
            <ul className="space-y-3 text-slate-400">
              {companyLinks.map((link, index) => (
                <li key={`company-${index}`}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 text-sm mb-4 md:mb-0">
              © 2024 PropertyPro. All rights reserved.
            </div>
            <div className="flex space-x-6">
              {legalLinks.map((link, index) => (
                <Link 
                  key={`legal-${index}`} 
                  href={link.href} 
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
