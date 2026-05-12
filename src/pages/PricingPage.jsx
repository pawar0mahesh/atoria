import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Star, ArrowRight, Shield, Headphones, Building2, Sparkles } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

const plans = [
  {
    name: 'Starter',
    price: '31,249',
    description: 'Perfect for small businesses just getting started with AI.',
    popular: false,
    features: [
      '100 AI Calls per month',
      'Basic AI Receptionist',
      'Call Summaries & Transcripts',
      'Basic Analytics Dashboard',
      'Business Hours Coverage',
    ],
    cta: 'Start Free Trial',
    slug: 'starter',
  },
  {
    name: 'Growth',
    price: '39,999',
    description: 'For growing businesses that need advanced AI capabilities.',
    popular: true,
    features: [
      '500 AI Calls per month',
      'Advanced AI Receptionist',
      'Appointment Booking',
      'WhatsApp Integration',
      'CRM Sync (HubSpot, Zoho)',
      '24/7 Coverage & Multi-language',
    ],
    cta: 'Start Free Trial',
    slug: 'growth',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations requiring unlimited scale.',
    popular: false,
    features: [
      'Unlimited AI Calls',
      'Dedicated AI Flows',
      'Multi-location Support',
      'Custom Voice & Personality',
      'SLA Guarantee (99.9%)',
      'HIPAA Compliance',
    ],
    cta: 'Contact Sales',
    slug: 'enterprise',
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-[#fafbfc] selection:bg-primary-100 font-sans text-surface-800">
      <Navbar />
      
      <main className="pt-28 pb-24 overflow-hidden relative">
        {/* Stunning Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-400/40 to-transparent blur-[100px] rounded-full mix-blend-multiply" />
          <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-purple-400/30 blur-[120px] rounded-full mix-blend-multiply animate-float-slow" />
          <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-blue-400/30 blur-[120px] rounded-full mix-blend-multiply animate-float" />
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          
          {/* Header Section (Centered perfectly) */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-surface-200 shadow-sm mb-6">
                <Sparkles className="w-4 h-4 text-primary-500" />
                <span className="text-[13px] font-semibold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent uppercase tracking-wider">
                  Simple Pricing
                </span>
              </div>
              
              <h1 className="text-[2.75rem] md:text-6xl font-extrabold text-surface-900 tracking-tight leading-[1.1] mb-6">
                Pricing that scales <br className="hidden md:block" /> with your business
              </h1>
              
              <p className="text-lg text-surface-500 max-w-2xl mx-auto mb-10">
                Start for free, no credit card required. Upgrade when you need more power.
              </p>

              {/* Billing Toggle */}
              <div className="flex items-center gap-4 bg-white p-1.5 rounded-2xl border border-surface-200 shadow-sm">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${!isAnnual ? 'bg-surface-900 text-white shadow-md' : 'text-surface-500 hover:text-surface-900'}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${isAnnual ? 'bg-surface-900 text-white shadow-md' : 'text-surface-500 hover:text-surface-900'}`}
                >
                  Annually
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${isAnnual ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                    Save 20%
                  </span>
                </button>
              </div>
            </motion.div>
          </div>



          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                className="relative h-full flex"
              >
                <div className={`w-full relative bg-white rounded-[2rem] p-8 sm:p-10 flex flex-col transition-all duration-500 ${
                  plan.popular 
                    ? 'ring-2 ring-primary-500 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.3)] md:-translate-y-4' 
                    : 'border border-surface-200 shadow-xl shadow-surface-200/40 hover:shadow-2xl hover:shadow-surface-200/50 hover:-translate-y-1'
                }`}>
                  
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center z-20">
                      <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 fill-white" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Card Header (Centered) */}
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-surface-900 mb-2">{plan.name}</h3>
                    <p className="text-sm text-surface-500 h-10">{plan.description}</p>
                  </div>

                  {/* Price (Centered) */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-1">
                      {plan.price !== 'Custom' && <span className="text-2xl font-semibold text-surface-400">₹</span>}
                      <span className="text-[3.5rem] font-extrabold text-surface-900 tracking-tighter leading-none">
                        {plan.price !== 'Custom' && isAnnual ? (parseInt(plan.price.replace(',', '')) * 0.8).toLocaleString('en-IN', {maximumFractionDigits: 0}) : plan.price}
                      </span>
                    </div>
                    {plan.price !== 'Custom' && (
                      <p className="text-sm font-medium text-surface-400 mt-2">
                        per month{isAnnual && ', billed annually'}
                      </p>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-surface-200 to-transparent mb-8" />

                  {/* Features */}
                  <div className="flex-1">
                    <p className="text-xs font-bold text-surface-900 uppercase tracking-widest mb-6 text-center">
                      What's included
                    </p>
                    <ul className="space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 justify-center sm:justify-start">
                          <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-primary-100' : 'bg-surface-100'}`}>
                            <Check className={`w-3 h-3 ${plan.popular ? 'text-primary-600' : 'text-surface-600'}`} strokeWidth={3} />
                          </div>
                          <span className="text-[14px] text-surface-600 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="mt-10">
                    <Link to={`/checkout/${plan.slug}`} className="block w-full">
                      <button className={`w-full py-4 px-6 rounded-2xl font-bold text-[15px] transition-all duration-300 flex items-center justify-center gap-2 group ${
                        plan.popular
                          ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-primary-500/25'
                          : 'bg-surface-100 text-surface-900 hover:bg-surface-200'
                      }`}>
                        {plan.cta}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </main>

      {/* Feature Comparison Highlights */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-surface-900">Enterprise-grade features</h2>
            <p className="mt-4 text-surface-500 text-lg">Included out of the box with every plan.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
            {[
              { icon: Shield, title: 'Bank-level Security', desc: 'SOC 2 compliant, end-to-end encryption, and fully HIPAA-ready.' },
              { icon: Headphones, title: '24/7 Premium Support', desc: 'Get priority assistance whenever you need it from our dedicated experts.' },
              { icon: Building2, title: '99.9% Uptime Guarantee', desc: 'Built on robust infrastructure so your AI never misses a beat.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-3xl bg-surface-50/50 hover:bg-surface-50 transition-colors duration-300 border border-surface-100/50"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-surface-100 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-surface-900 mb-3">{item.title}</h3>
                <p className="text-sm text-surface-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
