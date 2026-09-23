import React from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export const ScrollProgress: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <aside aria-label="Tiến trình cuộn trang" className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[var(--color-accent-red)] via-[var(--color-accent-gold)] to-[var(--color-accent-red)] transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </aside>
  );
};
