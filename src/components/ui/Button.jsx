import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', size = 'md', className = '', onClick, disabled, type = 'button', ...props }) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer select-none relative overflow-hidden tracking-[-0.01em]';

  const variants = {
    primary: 'bg-surface-900 text-white hover:bg-surface-800 active:scale-[0.98] shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-surface-700 border border-surface-200 hover:border-surface-300 hover:bg-surface-50 active:scale-[0.98] shadow-sm',
    ghost: 'text-surface-600 hover:text-surface-900 hover:bg-surface-100/80',
    gradient: 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600 active:scale-[0.98] shadow-lg hover:shadow-xl',
    outline: 'border-2 border-surface-900 text-surface-900 hover:bg-surface-900 hover:text-white active:scale-[0.98]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[13px] gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-[15px] gap-2.5',
    xl: 'px-9 py-4.5 text-base gap-3',
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
