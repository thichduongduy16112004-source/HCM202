import React, { ButtonHTMLAttributes, forwardRef } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({
  icon,
  label,
  size = 'md',
  variant = 'secondary',
  className = '',
  disabled,
  ...props
}, ref) => {
  const sizeMap = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  const variantMap = {
    primary: 'bg-[var(--color-accent-red)] text-white hover:bg-[var(--color-accent-red-hover)] hover:shadow-[var(--shadow-md)]',
    secondary: 'bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] border border-[var(--color-border-default)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-secondary)] shadow-[var(--shadow-sm)]',
    ghost: 'bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]',
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 ${sizeMap[size]} ${variantMap[variant]} ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
});

IconButton.displayName = 'IconButton';
