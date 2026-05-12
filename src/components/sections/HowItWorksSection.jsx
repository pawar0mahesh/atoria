import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeader } from '../ui/Components';
import { Phone, Brain, Headphones, BarChart3, ArrowDown } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Phone,
    title: 'Connect Your Number',
    description: 'Forward your business phone to ATRIO or get a new dedicated AI number in minutes.',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    badgeColor: 'bg-blue-600',
  },
  {
    step: '02',
    icon: Brain,
    title: 'Train Your AI',
    description: 'Upload your scripts, FAQs, and workflows. Our AI learns your business in hours.',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    badgeColor: 'bg-purple-600',
  },
  {
    step: '03',
    icon: Headphones,
    title: 'AI Handles Calls',
    description: 'Your AI receptionist answers calls, books appointments, qualifies leads, and routes inquiries.',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    badgeColor: 'bg-emerald-600',
  },
  {
    step: '04',
    icon: BarChart3,
    title: 'Track Analytics',
    description: 'Monitor performance, listen to recordings, and optimize AI responses from your dashboard.',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
    badgeColor: 'bg-amber-600',
  },
];

export default function HowItWorksSection() {
  return (
    <SectionWrapper id="how-it-works" className="bg-white">
      <SectionHeader
        badge="How It Works"
        title="Go live in 4 simple steps"
        description="Setting up your AI receptionist takes less than an hour. No technical expertise required."
      />

      <div className="relative w-full max-w-4xl mx-auto">
        {/* Connection line */}
        <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+32px)] right-[calc(12.5%+32px)] h-[2px] bg-surface-100 z-0">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-blue-300 via-purple-300 to-emerald-300 origin-left"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="relative text-center"
            >
              {/* Step icon */}
              <div className="relative inline-flex mb-6">
                <div className={`w-16 h-16 rounded-2xl ${step.bgColor} flex items-center justify-center relative z-10`}>
                  <step.icon className={`w-7 h-7 ${step.iconColor}`} />
                </div>
                <div className={`absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full ${step.badgeColor} flex items-center justify-center z-20`}>
                  <span className="text-[10px] font-bold text-white">{step.step}</span>
                </div>
              </div>

              <h3 className="text-sm font-semibold text-surface-900 mb-2">{step.title}</h3>
              <p className="text-[13px] text-surface-500 leading-relaxed">{step.description}</p>

              {/* Arrow connector for mobile */}
              {i < steps.length - 1 && (
                <div className="lg:hidden flex justify-center mt-6">
                  <ArrowDown className="w-4 h-4 text-surface-300" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
