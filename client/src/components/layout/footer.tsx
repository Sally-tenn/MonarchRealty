import { Link } from "wouter";
import { Crown, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const platformLinks = [
    { href: "/properties", label: "Properties" },
    { href: "/dashboard/agent", label: "Dashboard" },
    { href: "/tutorials", label: "Tutorials" },
    { href: "/pricing", label: "Pricing" },
  ];

  const resourceLinks = [
    { href: "#", label: "Help Center" },
    { href: "#", label: "API Documentation" },
    { href: "#", label: "Integrations" },
    { href: "#", label: "Blog" },
    { href: "#", label: "Community" },
  ];

  const companyLinks = [
    { href: "#", label: "About Us" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Contact" },
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
  ];

  const socialLinks = [
    { href: "#", icon: Facebook, label: "Facebook" },
    { href: "#", icon: Twitter, label: "Twitter" },
    { href: "#", icon: Linkedin, label: "LinkedIn" },
    { href: "#", icon: Instagram, label: "Instagram" },
  ];

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <Crown className="text-white text-lg" size={20} />
              </div>
              <h3 className="text-xl font-bold font-['Poppins']">Monarch Property</h3>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Comprehensive real estate management platform trusted by thousands of professionals worldwide.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary-blue transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 font-['Poppins']">Platform</h4>
            <ul className="space-y-3 text-slate-400">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 font-['Poppins']">Resources</h4>
            <ul className="space-y-3 text-slate-400">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 font-['Poppins']">Company</h4>
            <ul className="space-y-3 text-slate-400">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 mb-4 md:mb-0">
              &copy; 2024 Monarch Property Management. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-slate-400">
              <span>Built with ❤️ for real estate professionals</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
