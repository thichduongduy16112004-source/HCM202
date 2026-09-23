import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, ExternalLink } from 'lucide-react';
import type { HistoricalImage } from '@/types';
import { IconButton } from '@/components/common/IconButton';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface LightboxProps {
  image: HistoricalImage | null;
  images: HistoricalImage[];
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (image: HistoricalImage) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ image, images, isOpen, onClose, onSelectImage }) => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (!image) return;
      const currentIndex = images.findIndex((item) => item.id === image.id);
      if (event.key === 'ArrowRight') onSelectImage(images[(currentIndex + 1) % images.length]);
      if (event.key === 'ArrowLeft') onSelectImage(images[(currentIndex - 1 + images.length) % images.length]);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, image, images, onClose, onSelectImage]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  const currentIndex = image ? images.findIndex((item) => item.id === image.id) : -1;
  const selectRelativeImage = (offset: number) => {
    if (!image || currentIndex < 0) return;
    onSelectImage(images[(currentIndex + offset + images.length) % images.length]);
  };

  return (
    <AnimatePresence>
      {isOpen && image && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-4 md:p-8"
          initial={prefersReducedMotion ? false : 'closed'}
          animate="open"
          exit="closed"
        >
          <motion.button
            type="button"
            aria-label="Đóng cửa sổ tư liệu"
            onClick={onClose}
            variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.34 }}
            className="absolute inset-0 bg-[var(--color-dark-bg)]/95 backdrop-blur-md"
          />

          {!prefersReducedMotion && (
            <>
              <motion.div aria-hidden="true" variants={{ closed: { scaleY: 0, opacity: 0, transition: { duration: 0.18 } }, open: { scaleY: 1, opacity: 0.65, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } } }} className="pointer-events-none absolute inset-y-0 left-[8%] w-px origin-top bg-[var(--color-accent-red)]" />
              <motion.div aria-hidden="true" variants={{ closed: { scaleX: 0, opacity: 0, transition: { duration: 0.18 } }, open: { scaleX: 1, opacity: 0.42, transition: { duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] } } }} className="pointer-events-none absolute inset-x-0 top-[14%] h-px origin-left bg-[var(--color-accent-gold)]" />
            </>
          )}

          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label={image.title}
            variants={{
              closed: { opacity: 0, y: 54, scale: 0.9, rotateX: -6, transition: { duration: prefersReducedMotion ? 0 : 0.28, ease: [0.4, 0, 1, 1] } },
              open: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
            }}
            transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 210, damping: 23, mass: 0.9 }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-6xl flex-col overflow-y-auto overscroll-contain rounded-xl border border-white/15 bg-[var(--color-dark-surface)] shadow-[0_32px_100px_rgba(0,0,0,0.55)] lg:flex-row lg:overflow-hidden"
            style={prefersReducedMotion ? undefined : { transformPerspective: 1200 }}
          >
            <div className="absolute right-4 top-4 z-40">
              <IconButton icon={<X aria-hidden="true" className="h-5 w-5" />} label="Đóng cửa sổ tư liệu" variant="secondary" onClick={onClose} />
            </div>

            <div className="relative flex min-h-[350px] flex-1 items-center justify-center overflow-hidden bg-black/70 p-4 lg:min-h-[580px]">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={image.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 42, scale: 1.14, rotate: 1.2 }}
                  animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, x: -38, scale: 0.94, rotate: -0.8, transition: { duration: 0.26, ease: [0.4, 0, 1, 1] } }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-4 flex items-center justify-center"
                >
                  <img src={image.src} alt={image.alt} width="1600" height="1200" draggable={false} className="max-h-[78vh] max-w-full rounded object-contain shadow-[0_22px_70px_rgba(0,0,0,0.45)]" />
                  {!prefersReducedMotion && <motion.span aria-hidden="true" initial={{ y: '-120%', opacity: 0 }} animate={{ y: '420%', opacity: [0, 0.38, 0] }} transition={{ duration: 1.15, delay: 0.18, ease: 'easeInOut' }} className="pointer-events-none absolute inset-x-[8%] top-0 h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent mix-blend-screen" />}
                </motion.figure>
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <motion.button type="button" onClick={() => selectRelativeImage(-1)} aria-label="Tư liệu trước" whileHover={prefersReducedMotion ? undefined : { x: -5, scale: 1.1 }} whileTap={prefersReducedMotion ? undefined : { scale: 0.88 }} className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/25 bg-black/65 p-3 text-white shadow-lg hover:bg-[var(--color-accent-red)]">
                    <ChevronLeft aria-hidden="true" className="h-6 w-6" />
                  </motion.button>
                  <motion.button type="button" onClick={() => selectRelativeImage(1)} aria-label="Tư liệu kế tiếp" whileHover={prefersReducedMotion ? undefined : { x: 5, scale: 1.1 }} whileTap={prefersReducedMotion ? undefined : { scale: 0.88 }} className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/25 bg-black/65 p-3 text-white shadow-lg hover:bg-[var(--color-accent-red)]">
                    <ChevronRight aria-hidden="true" className="h-6 w-6" />
                  </motion.button>
                </>
              )}

              <motion.div key={`counter-${image.id}`} initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-3 left-3 z-20 rounded-full border border-white/15 bg-black/75 px-3 py-1 font-mono text-xs text-white">
                {currentIndex + 1} / {images.length}
              </motion.div>
            </div>

            <div className="w-full border-t border-white/10 bg-[var(--color-dark-surface)] p-6 text-[var(--color-dark-text)] lg:w-96 lg:border-l lg:border-t-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`metadata-${image.id}`}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 46 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, x: -24, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.42, delay: prefersReducedMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-full flex-col justify-between"
                >
                  <div>
                    <div className="mb-4 flex items-center gap-2">
                      <span className="rounded border border-[var(--color-accent-red)]/50 bg-[var(--color-accent-red)]/20 px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase text-[#ff8f92]">TƯ LIỆU LỊCH SỬ</span>
                      <span className="flex items-center gap-1 font-mono text-xs text-[var(--color-accent-gold)]"><Calendar aria-hidden="true" className="h-3.5 w-3.5" />{image.year}</span>
                    </div>
                    <h3 className="text-balance mb-4 font-serif text-2xl font-bold leading-snug text-[var(--color-dark-text)] md:text-3xl">{image.title}</h3>
                    <motion.div initial={prefersReducedMotion ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: prefersReducedMotion ? 0 : 0.55, delay: prefersReducedMotion ? 0 : 0.18 }} className="mb-5 h-0.5 w-16 origin-left bg-[var(--color-accent-gold)]" />
                    <p className="mb-6 font-serif text-sm leading-relaxed text-[var(--color-dark-text)]/80">{image.caption}</p>
                  </div>
                  <div className="border-t border-white/10 pt-4 font-mono text-xs text-[var(--color-dark-text)]/60">
                    <a href={image.sourceUrl} target="_blank" rel="noreferrer" className="flex items-start gap-2 text-[var(--color-accent-gold)] hover:text-white hover:underline">
                      <ExternalLink aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" /><span>Nguồn: {image.sourceName}</span>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
