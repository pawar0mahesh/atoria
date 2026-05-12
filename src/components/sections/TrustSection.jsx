import { motion } from 'framer-motion';
import { SectionWrapper } from '../ui/Components';

const companies = [
  { name: 'MedCore', initials: 'MC' },
  { name: 'StyleVault', initials: 'SV' },
  { name: 'NexaFlow', initials: 'NF' },
  { name: 'PrimeHQ', initials: 'PH' },
  { name: 'ZenithAI', initials: 'ZA' },
  { name: 'CloudServ', initials: 'CS' },
];

const metrics = [
  { value: '98%', label: 'Response Rate', description: 'AI answers within 2 seconds' },
  { value: '24/7', label: 'Availability', description: 'Never miss a business call' },
  { value: '3x', label: 'Lead Conversion', description: 'Higher conversion than voicemail' },
];

export default function TrustSection() {
  return (
    <SectionWrapper className="bg-white border-y border-surface-100">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[11px] font-semibold text-surface-400 uppercase tracking-[0.2em] mb-10"
        >
          Trusted by modern businesses
        </motion.p>

        {/* Company logos */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14 mb-20 w-full"
        >
          {companies.map((company, i) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-2.5 text-surface-300 hover:text-surface-500 transition-colors duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center text-[11px] font-bold text-surface-400">
                {company.initials}
              </div>
              <span className="text-base font-semibold tracking-tight">{company.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-3xl mx-auto">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="text-center p-7 rounded-2xl bg-surface-50/80 border border-surface-100"
            >
              <p className="text-4xl font-bold gradient-text mb-2">{metric.value}</p>
              <p className="text-sm font-semibold text-surface-800 mb-1">{metric.label}</p>
              <p className="text-xs text-surface-400">{metric.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
