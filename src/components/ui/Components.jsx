import { motion, AnimatePresence } from 'framer-motion';

export function SectionWrapper({ children, className = '', id }) {
  return (
    <section id={id} className={`py-24 md:py-32 w-full ${className}`}>
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({ badge, title, description, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className={`mb-16 md:mb-20 w-full flex flex-col ${center ? 'items-center text-center max-w-2xl mx-auto' : 'items-start'}`}
    >
      {badge && (
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary-600 text-[11px] font-semibold tracking-widest uppercase mb-5 border border-primary-100/80">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 tracking-tight leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base sm:text-lg text-surface-500 leading-relaxed max-w-xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}

export function Card({ children, className = '', hover = true, onClick }) {
  return (
    <motion.div
      whileHover={hover ? { y: -3, transition: { duration: 0.25, ease: 'easeOut' } } : undefined}
      className={`bg-white rounded-2xl border border-surface-200/70 card-shadow ${hover ? 'hover:card-shadow-hover transition-shadow duration-300' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-surface-100 text-surface-600',
    primary: 'bg-primary-50 text-primary-600 border border-primary-100',
    success: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    warning: 'bg-amber-50 text-amber-600 border border-amber-100',
    danger: 'bg-red-50 text-red-600 border border-red-100',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

export function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse bg-surface-200 rounded-lg ${className}`} />
  );
}

export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
