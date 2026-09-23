import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.02 },
  },
};

const riseVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
};

const titleVariants = {
  hidden: { opacity: 0, y: 38 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export interface SectionHeaderProps {
  number: string;
  category: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  category,
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const isCenter = align === 'center';
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.header
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.55 }}
      variants={headerVariants}
      className={`mb-12 md:mb-16 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'} ${className}`}
    >
      {/* Category & Roman/Index Tag */}
      <motion.div
        variants={riseVariants}
        className={`flex items-center gap-3 mb-3 ${isCenter ? 'justify-center' : ''}`}
      >
        <span className="font-mono text-xs font-semibold tracking-widest text-[var(--color-accent-gold)] uppercase bg-[var(--color-surface-secondary)] px-2.5 py-1 rounded border border-[var(--color-border-default)]">
          PHÂN ĐOẠN {number}
        </span>
        <span className="text-xs text-[var(--color-text-muted)] font-mono uppercase tracking-wider">
          • {category}
        </span>
      </motion.div>

      {/* Main Section Title */}
      <div className="overflow-hidden pb-1">
        <motion.h2
          variants={titleVariants}
          className="text-balance text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[var(--color-text-primary)] tracking-tight leading-tight"
        >
          {title}
        </motion.h2>
      </div>

      {/* Elegant Separator Line */}
      <motion.div variants={riseVariants} className={`flex items-center gap-3 my-4 ${isCenter ? 'justify-center' : ''}`}>
        <motion.div variants={lineVariants} className="h-[1px] w-12 origin-right bg-[var(--color-accent-gold)]" />
        <motion.div variants={riseVariants} className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-red)]" />
        <motion.div variants={lineVariants} className="h-[1px] w-12 origin-left bg-[var(--color-accent-gold)]" />
      </motion.div>

      {/* Optional Subtitle */}
      {subtitle && (
        <motion.p
          variants={riseVariants}
          className="text-base md:text-lg text-[var(--color-text-secondary)] font-normal leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.header>
  );
};
