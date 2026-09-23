import React, { useState } from 'react';
import { Play, BookOpen, Layers, Menu, X } from 'lucide-react';
import { SectionId } from '@/types';
import { presentationSections } from '@/data/presentation';
import { Button } from './Button';

export interface NavbarProps {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  onOpenSources: () => void;
  onTogglePresenter: () => void;
  isPresenterActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onSelectSection,
  onOpenSources,
  onTogglePresenter,
  isPresenterActive,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[var(--color-bg-primary)]/90 backdrop-blur-md border-b border-[var(--color-border-default)] z-40 transition-colors duration-300">
      <div className="max-w-content-xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        {/* Branding */}
        <button
          type="button"
          onClick={() => onSelectSection('hero')}
          aria-label="Về phần mở đầu"
          className="flex items-center gap-3 cursor-pointer group text-left"
        >
          <div className="w-8 h-8 rounded bg-[var(--color-accent-red)] text-white flex items-center justify-center font-serif font-bold text-base shadow-[var(--shadow-sm)] group-hover:bg-[var(--color-accent-red-hover)] transition-colors">
            H
          </div>
          <div>
            <div className="text-xs font-mono text-[var(--color-accent-gold)] uppercase tracking-wider font-semibold">
              HCM202 • SPST
            </div>
            <div className="text-sm font-serif font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-red)] transition-colors">
              Mục Tiêu – Con Đường
            </div>
          </div>
        </button>

        {/* Desktop Quick Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {presentationSections.slice(0, 7).map((sec) => {
            const isCurrent = sec.id === activeSection;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors duration-200 cursor-pointer ${
                  isCurrent
                    ? 'bg-[var(--color-surface-secondary)] text-[var(--color-accent-red)] border border-[var(--color-border-strong)] font-semibold'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-primary)]'
                }`}
              >
                {String(sec.order).padStart(2, '0')}. {sec.title}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Source Catalog Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenSources}
            icon={<BookOpen className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />}
            className="hidden sm:inline-flex"
            title="Tra cứu danh mục nguồn học thuật"
          >
            Nguồn học thuật
          </Button>

          {/* Presenter Mode Button */}
          <Button
            variant={isPresenterActive ? 'primary' : 'outline'}
            size="sm"
            onClick={onTogglePresenter}
            icon={<Play className="w-3.5 h-3.5" />}
            className={isPresenterActive ? 'ring-2 ring-[var(--color-accent-gold)]' : ''}
            title="Bật/Tắt chế độ thuyết trình trước lớp"
          >
            {isPresenterActive ? 'Đang thuyết trình' : 'Presenter Mode'}
          </Button>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Menu"
            className="lg:hidden p-2 rounded text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--color-surface-primary)] border-b border-[var(--color-border-default)] px-4 py-4 max-h-[70vh] overflow-y-auto">
          <div className="text-xs font-mono uppercase text-[var(--color-text-muted)] mb-2 px-2">
            Mục lục phân đoạn
          </div>
          <div className="flex flex-col gap-1">
            {presentationSections.map(sec => (
              <button
                key={sec.id}
                onClick={() => {
                  onSelectSection(sec.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between p-2.5 rounded text-left text-sm ${
                  sec.id === activeSection
                    ? 'bg-[var(--color-surface-secondary)] text-[var(--color-accent-red)] font-semibold'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-primary)]'
                }`}
              >
                <span>{String(sec.order).padStart(2, '0')}. {sec.title}</span>
                <span className="text-xs font-mono text-[var(--color-text-muted)]">{sec.presentationDuration}s</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
