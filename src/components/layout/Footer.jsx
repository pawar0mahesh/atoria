import { Link } from 'react-router-dom';
import { Zap, ExternalLink, Send, Globe, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  Product: [
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'How it Works', href: '/#how-it-works' },
    { name: 'Dashboard', href: '/#dashboard-preview' },
    { name: 'Integrations', href: '/#features' },
  ],
  Company: [
    { name: 'About Us', href: '/#' },
    { name: 'Careers', href: '/#' },
    { name: 'Blog', href: '/#' },
    { name: 'Press Kit', href: '/#' },
    { name: 'Contact', href: '/#' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '/#' },
    { name: 'Terms of Service', href: '/#' },
    { name: 'Cookie Policy', href: '/#' },
    { name: 'Refund Policy', href: '/#' },
  ],
  Support: [
    { name: 'Help Center', href: '/#' },
    { name: 'Documentation', href: '/#' },
    { name: 'API Reference', href: '/#' },
    { name: 'System Status', href: '/#' },
  ],
};

const socialLinks = [
  { icon: ExternalLink, href: '#', label: 'Twitter' },
  { icon: Send, href: '#', label: 'LinkedIn' },
  { icon: Globe, href: '#', label: 'Website' },
  { icon: Mail, href: '#', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="bg-surface-50/60 border-t border-surface-200/60">
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <div className="relative rounded-2xl bg-surface-900 p-8 md:p-12 lg:p-16 overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
          </div>
          <div className="relative z-10 text-center max-w-xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
              Ready to automate your reception?
            </h3>
            <p className="text-surface-400 text-base mb-8 leading-relaxed">
              Join hundreds of businesses using ATRIO to handle calls, book appointments, and convert leads 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/pricing" className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-surface-900 font-semibold rounded-xl hover:bg-surface-100 transition-all duration-300 shadow-lg hover:shadow-xl text-[15px]">
                Start Free Trial
              </Link>
              <Link to="/pricing" className="inline-flex items-center justify-center px-7 py-3.5 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300 text-[15px]">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-surface-900 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold text-surface-900 tracking-tight">ATRIO</span>
            </Link>
            <p className="text-[13px] text-surface-500 mb-5 max-w-xs leading-relaxed">
              AI Receptionists that never miss a customer. Automate calls, appointments, and lead qualification.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[13px] text-surface-500">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <span>hello@atrio.ai</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-surface-500">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-surface-500">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Bangalore, India</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[13px] font-semibold text-surface-900 mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-[13px] text-surface-500 hover:text-surface-800 transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-surface-200/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-surface-400">
            © {new Date().getFullYear()} ATRIO. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} aria-label={social.label} className="w-8 h-8 rounded-lg flex items-center justify-center text-surface-400 hover:text-surface-800 hover:bg-surface-100 transition-all duration-200">
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
