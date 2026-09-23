import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { academicSources } from '@/data/sources';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface SourceBadgeProps {
  sourceId: string;
  onClick?: (sourceId: string) => void;
  className?: string;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({
  sourceId,
  onClick,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const source = academicSources.find(s => s.id === sourceId);
  const sourceLabel = source?.type === 'textbook'
    ? `${source.title} ${source.year}`
    : source?.title || sourceId;
  const locator = source?.pages ? `${sourceLabel} · tr. ${source.pages}` : sourceLabel;

  return (
    <motion.button
      type="button"
      onClick={() => onClick && onClick(sourceId)}
      whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.035 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.91, rotate: -1.2 }}
      transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 22 }}
      className={`group relative inline-flex items-center gap-1.5 overflow-hidden rounded border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] px-2.5 py-1 font-mono text-xs text-[var(--color-text-secondary)] shadow-[var(--shadow-sm)] transition-colors duration-200 hover:border-[var(--color-accent-gold)] hover:text-[var(--color-accent-red)] hover:shadow-[var(--shadow-md)] ${className}`}
      title={source ? `${source.title}${source.pages ? `, trang ${source.pages}` : source.year ? `, ${source.year}` : ''}` : 'Xem chi tiết nguồn học thuật'}
    >
      {!prefersReducedMotion && <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/65 transition-transform duration-500 group-hover:translate-x-[520%]" />}
      <BookOpen aria-hidden="true" className="relative z-10 w-3.5 h-3.5 text-[var(--color-accent-gold)] shrink-0" />
      <span className="relative z-10">{locator}</span>
    </motion.button>
  );
};
