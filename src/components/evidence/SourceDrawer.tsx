import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, ExternalLink, X } from 'lucide-react';
import type { SourceReference } from '@/types';
import { academicSources } from '@/data/sources';
import { IconButton } from '@/components/common/IconButton';
import { Badge } from '@/components/common/Badge';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface SourceDrawerProps {
  sourceId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SourceDrawer: React.FC<SourceDrawerProps> = ({ sourceId, isOpen, onClose }) => {
  const prefersReducedMotion = useReducedMotion();
  const currentSource: SourceReference | undefined = academicSources.find((source) => source.id === sourceId);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 overflow-hidden" initial={prefersReducedMotion ? false : 'closed'} animate="open" exit="closed">
          <motion.button
            type="button"
            aria-label="Đóng bảng nguồn"
            onClick={onClose}
            variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.32 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {!prefersReducedMotion && (
            <motion.div aria-hidden="true" variants={{ closed: { scaleX: 0, opacity: 0, transition: { duration: 0.18 } }, open: { scaleX: 1, opacity: 0.55, transition: { duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] } } }} className="pointer-events-none absolute inset-x-0 top-[18%] h-px origin-right bg-[var(--color-accent-gold)]" />
          )}

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Chi tiết nguồn học thuật"
            variants={{ closed: { opacity: 0, x: '108%', scale: 0.97, rotateY: 4, transition: { duration: prefersReducedMotion ? 0 : 0.28, ease: [0.4, 0, 1, 1] } }, open: { opacity: 1, x: 0, scale: 1, rotateY: 0 } }}
            transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 235, damping: 27, mass: 0.92 }}
            className="absolute inset-y-0 right-0 w-full max-w-lg overflow-y-auto overscroll-contain border-l border-[var(--color-border-strong)] bg-[var(--color-surface-primary)] p-6 shadow-[-28px_0_80px_rgba(0,0,0,0.28)] md:p-8"
            style={prefersReducedMotion ? undefined : { transformPerspective: 1200 }}
          >
            <motion.div initial={prefersReducedMotion ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: prefersReducedMotion ? 0 : 0.62, delay: prefersReducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-x-0 top-0 h-1 origin-right bg-gradient-to-l from-[var(--color-accent-red)] via-[var(--color-accent-gold)] to-transparent" />

            <div className="mb-7 flex items-center justify-between border-b border-[var(--color-border-default)] pb-5">
              <div className="flex items-center gap-2"><BookOpen aria-hidden="true" className="h-5 w-5 text-[var(--color-accent-gold)]" /><span className="font-serif text-lg font-bold">Nguồn học thuật</span></div>
              <IconButton icon={<X aria-hidden="true" className="h-4 w-4" />} label="Đóng bảng nguồn" variant="ghost" size="sm" onClick={onClose} />
            </div>

            <AnimatePresence mode="wait">
              {currentSource ? (
                <motion.div
                  key={currentSource.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 44 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, x: -24, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.44, delay: prefersReducedMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-7"
                >
                  <div>
                    <Badge variant="gold" className="mb-3">{currentSource.type === 'textbook' ? 'Giáo trình' : 'Văn kiện lịch sử'}</Badge>
                    <h3 className="text-balance font-serif text-2xl font-bold leading-tight">{currentSource.title}</h3>
                    <motion.div initial={prefersReducedMotion ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.26 }} className="mt-4 h-0.5 w-20 origin-left bg-[var(--color-accent-red)]" />
                  </div>

                  <motion.dl initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.42, delay: prefersReducedMotion ? 0 : 0.22 }} className="space-y-3 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-secondary)] p-5 font-mono text-xs shadow-[var(--shadow-sm)]">
                    {currentSource.author && <div className="flex justify-between gap-4"><dt>Tác giả</dt><dd className="text-right">{currentSource.author}</dd></div>}
                    {currentSource.publisher && <div className="flex justify-between gap-4"><dt>Nhà xuất bản</dt><dd className="text-right">{currentSource.publisher}</dd></div>}
                    {currentSource.volume && <div className="flex justify-between gap-4"><dt>Tập</dt><dd>{currentSource.volume}</dd></div>}
                    {currentSource.pages && <div className="flex justify-between gap-4"><dt>Trang</dt><dd>{currentSource.pages}</dd></div>}
                    {currentSource.year && <div className="flex justify-between gap-4"><dt>Năm</dt><dd>{currentSource.year}</dd></div>}
                  </motion.dl>

                  {currentSource.note && <motion.p initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.3 }} className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{currentSource.note}</motion.p>}

                  {currentSource.url && (
                    <motion.a href={currentSource.url} target="_blank" rel="noreferrer" whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.025 }} whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }} className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent-red)] px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-md)] hover:bg-[var(--color-accent-red-hover)]">
                      <ExternalLink aria-hidden="true" className="h-4 w-4" /> Mở tài liệu gốc
                    </motion.a>
                  )}
                </motion.div>
              ) : (
                <motion.div key="source-list" initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.44, delay: prefersReducedMotion ? 0 : 0.12 }} className="space-y-3">
                  {academicSources.map((source, index) => (
                    <motion.div key={source.id} initial={prefersReducedMotion ? false : { opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.35, delay: prefersReducedMotion ? 0 : 0.16 + Math.min(index * 0.035, 0.3) }} className="rounded border border-[var(--color-border-default)] p-3">
                      <div className="font-serif text-sm font-bold">{source.title}</div>
                      <div className="font-mono text-xs text-[var(--color-text-muted)]">{source.year || source.id}</div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
