import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, SectionHeader } from '../ui/Components';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How does ATRIO's AI receptionist work?",
    answer: "ATRIO uses advanced LLMs and speech synthesis for natural phone conversations. The AI understands intent, responds appropriately, and performs actions like booking appointments or qualifying leads — all in real time.",
  },
  {
    question: 'How long does it take to set up?',
    answer: 'Most businesses are up and running within 30 minutes. Forward your number, upload business info, and the AI starts handling calls immediately. No coding required.',
  },
  {
    question: 'Can the AI handle multiple languages?',
    answer: 'Yes! ATRIO supports 12+ languages including Hindi, English, Tamil, Telugu, and more. The AI auto-detects language and responds with native-level fluency.',
  },
  {
    question: "What happens when the AI can't handle a request?",
    answer: "ATRIO seamlessly transfers complex queries to your team with full conversation context. The caller never experiences a disruption.",
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. Enterprise-grade security with end-to-end encryption, SOC 2 compliance, and HIPAA-ready infrastructure. All data stored securely with role-based access.',
  },
  {
    question: 'Can I customize the AI voice?',
    answer: 'Yes — choose from multiple voice profiles, adjust tone, pace, and personality. Create custom scripts for specific scenarios.',
  },
  {
    question: 'Do you offer a free trial?',
    answer: 'Yes! 14-day free trial on Starter and Growth plans. No credit card required.',
  },
  {
    question: 'What integrations are available?',
    answer: 'Google Calendar, Outlook, Zoho CRM, HubSpot, Salesforce, WhatsApp Business, Slack, and more. REST API available for custom integrations.',
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-surface-100/80 last:border-0">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-5 text-left group cursor-pointer">
        <span className={`text-[14px] font-medium pr-4 transition-colors duration-200 ${isOpen ? 'text-surface-900' : 'text-surface-700 group-hover:text-surface-900'}`}>
          {faq.question}
        </span>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-surface-900 text-white' : 'bg-surface-100 text-surface-500'}`}>
          {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
            <p className="pb-5 text-[13px] text-surface-500 leading-relaxed max-w-2xl">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <SectionWrapper id="faq" className="gradient-bg relative">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="relative z-10">
        <SectionHeader badge="FAQ" title="Frequently asked questions" description="Everything you need to know about ATRIO." />
        <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl card-shadow border border-surface-200/60 p-6 md:p-8">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
