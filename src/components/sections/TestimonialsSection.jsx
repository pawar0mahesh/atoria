import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeader, Card } from '../ui/Components';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Dr. Ananya Gupta',
    role: 'Director, Radiance Dermatology',
    content: 'ATRIO has transformed how we handle patient calls. Our appointment bookings increased by 40% within the first month. The AI handles inquiries so naturally that patients often don\'t realize they\'re speaking with an AI.',
    rating: 5,
    avatar: 'AG',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Vikram Reddy',
    role: 'CEO, StyleVault Salons',
    content: 'We were losing 30% of calls after hours. Since implementing ATRIO, we capture every single lead. The WhatsApp follow-up feature alone has boosted our conversion rate by 3x. Game changer for our 12 locations.',
    rating: 5,
    avatar: 'VR',
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    name: 'Priya Malhotra',
    role: 'Founder, NexaFlow Marketing',
    content: 'As a growing agency, we needed a scalable solution for client intake. ATRIO\'s lead qualification is incredibly accurate — it filters and routes leads exactly as we need. Saved us from hiring 3 receptionists.',
    rating: 5,
    avatar: 'PM',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Rajesh Patel',
    role: 'Operations Head, MedCore Hospitals',
    content: 'Managing calls across 5 hospital branches was a nightmare. ATRIO centralized everything with multi-language support. Hindi, Tamil, English — the AI handles them all flawlessly.',
    rating: 5,
    avatar: 'RP',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Sneha Iyer',
    role: 'Owner, Bloom & Glow Wellness',
    content: 'The setup was incredibly simple. Within 30 minutes, our AI receptionist was live and answering calls. The dashboard gives us insights we never had before. Best investment for our wellness studio.',
    rating: 5,
    avatar: 'SI',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    name: 'Arjun Kapoor',
    role: 'Managing Partner, LegalEdge LLP',
    content: 'Client confidentiality was our top concern. ATRIO\'s enterprise security measures and smart escalation system gave us complete confidence. Our client satisfaction scores have never been higher.',
    rating: 5,
    avatar: 'AK',
    gradient: 'from-cyan-500 to-blue-600',
  },
];

export default function TestimonialsSection() {
  return (
    <SectionWrapper className="bg-white">
      <SectionHeader
        badge="Testimonials"
        title="Loved by businesses everywhere"
        description="See what our clients say about transforming their customer communications with ATRIO."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl mx-auto">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
          >
            <Card className="p-6 h-full flex flex-col">
              {/* Rating */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative flex-1 mb-6">
                <Quote className="w-7 h-7 text-surface-100 absolute -top-0.5 -left-0.5" />
                <p className="text-[13px] text-surface-600 leading-relaxed relative z-10 pl-1.5">
                  {testimonial.content}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-surface-100/80">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0`}>
                  {testimonial.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-surface-900 truncate">{testimonial.name}</p>
                  <p className="text-[11px] text-surface-400 truncate">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
