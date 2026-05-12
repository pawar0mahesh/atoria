import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeader, Card } from '../ui/Components';
import {
  Phone, Calendar, Database, MessageCircle, UserCheck, Globe,
  BarChart3, Mic, ArrowUpRight, Users, Palette, CalendarSync,
} from 'lucide-react';

const features = [
  {
    icon: Phone,
    title: 'AI Call Answering',
    description: 'Intelligent voice agents answer every call with natural, human-like conversations.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Calendar,
    title: 'Appointment Scheduling',
    description: 'Automatically book, reschedule, and manage appointments across your calendar.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Database,
    title: 'CRM Integration',
    description: 'Seamlessly sync with your existing CRM to keep customer data up to date.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Followups',
    description: 'Automated follow-up messages via WhatsApp to keep leads engaged.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: UserCheck,
    title: 'Lead Qualification',
    description: 'AI qualifies leads based on your criteria before passing to sales teams.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Globe,
    title: 'Multi-language Support',
    description: 'Communicate with customers in 12+ languages with native-level fluency.',
    color: 'bg-pink-50 text-pink-600',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Track call volumes, conversion rates, and AI performance in real time.',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: Mic,
    title: 'Call Recording',
    description: 'Every conversation is recorded and transcribed for quality assurance.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: ArrowUpRight,
    title: 'Smart Escalation',
    description: 'Complex queries automatically escalated to the right team member.',
    color: 'bg-teal-50 text-teal-600',
  },
  {
    icon: Users,
    title: 'Human Transfer',
    description: 'Seamless handoff to human agents when personal attention is needed.',
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    icon: Palette,
    title: 'Voice Customization',
    description: 'Customize your AI voice to match your brand personality and tone.',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: CalendarSync,
    title: 'Calendar Sync',
    description: 'Two-way sync with Google Calendar, Outlook, and other scheduling tools.',
    color: 'bg-orange-50 text-orange-600',
  },
];

export default function FeaturesSection() {
  return (
    <SectionWrapper id="features" className="gradient-bg relative">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="relative z-10">
        <SectionHeader
          badge="Features"
          title="Everything you need to automate your front desk"
          description="Powerful AI capabilities designed to handle every aspect of customer communication."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
            >
              <Card className="p-5 h-full group">
                <div className={`w-10 h-10 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-[13px] font-semibold text-surface-900 mb-1.5">{feature.title}</h3>
                <p className="text-xs text-surface-500 leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
