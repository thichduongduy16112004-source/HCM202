import React, { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  disabled,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-[var(--color-accent-red)] text-white hover:bg-[var(--color-accent-red-hover)] active:bg-[var(--color-accent-red-active)] hover:-translate-y-0.5 active:translate-y-0 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]',
    secondary: 'bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border-default)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-primary)] hover:-translate-y-0.5 active:translate-y-0 shadow-[var(--shadow-sm)]',
    outline: 'bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-strong)] hover:border-[var(--color-accent-gold)] hover:bg-[var(--color-surface-primary)] hover:-translate-y-0.5 active:translate-y-0',
    text: 'bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-accent-red)] hover:bg-[var(--color-surface-secondary)]',
  };

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
