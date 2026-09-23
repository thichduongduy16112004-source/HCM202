import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'red' | 'olive' | 'neutral' | 'dark';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
}) => {
  const variantStyles = {
    gold: 'bg-[var(--color-surface-secondary)] text-[var(--color-accent-gold)] border border-[var(--color-accent-gold)]/40',
    red: 'bg-[var(--color-accent-red)]/10 text-[var(--color-accent-red)] border border-[var(--color-accent-red)]/30',
    olive: 'bg-[var(--color-accent-olive)]/15 text-[var(--color-accent-olive)] border border-[var(--color-accent-olive)]/40',
    neutral: 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border-default)]',
    dark: 'bg-[var(--color-dark-surface)] text-[var(--color-dark-text)] border border-white/20',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium tracking-wide uppercase select-none ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
