import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarDays } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { archiveTimeline, imageById } from '@/data/images';
import type { HistoricalImage } from '@/types';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface ArchiveSectionProps {
  onSelectImage: (image: HistoricalImage) => void;
}

export const ArchiveSection: React.FC<ArchiveSectionProps> = ({ onSelectImage }) => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section id="archive" aria-label="Dòng thời gian tư liệu lịch sử" className="py-20 md:py-28 px-4 md:px-8 border-b border-[var(--color-border-default)] bg-[var(--color-surface-secondary)]/40">
      <div className="max-w-content-xl mx-auto">
        <SectionHeader
          number="03"
          category="HỒ SƠ TƯ LIỆU THEO NGỮ CẢNH"
          title="Dòng Thời Gian Của Các Bằng Chứng"
          subtitle="Các văn kiện và hình ảnh được sắp xếp theo tiến trình lịch sử từ năm 1919 đến năm 1969."
        />

        <div className="relative">
          <motion.div
            aria-hidden="true"
            initial={prefersReducedMotion ? false : { scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[31px] md:left-[119px] top-0 bottom-0 w-px origin-top bg-[var(--color-border-strong)]"
          />
          {archiveTimeline.map((entry, index) => (
            <motion.article
              key={entry.id}
              initial={prefersReducedMotion ? false : { opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.58, delay: prefersReducedMotion ? 0 : Math.min(index * 0.055, 0.22), ease: [0.22, 1, 0.36, 1] }}
              className="relative grid grid-cols-[64px_minmax(0,1fr)] md:grid-cols-[120px_minmax(0,1fr)] gap-5 md:gap-10 pb-14"
            >
              <div className="relative z-10 pt-1">
                <span className="inline-flex min-w-16 md:min-w-24 justify-center rounded-full border border-[var(--color-accent-gold)] bg-[var(--color-bg-primary)] px-2 py-1 text-[10px] md:text-xs font-mono font-bold text-[var(--color-accent-red)]">
                  {entry.year}
                </span>
              </div>

              <div className="rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-5 md:p-7 shadow-[var(--shadow-sm)]">
                <div className="flex items-start gap-3 mb-5">
                  <CalendarDays className="w-5 h-5 text-[var(--color-accent-gold)] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif font-bold">{entry.title}</h3>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">{entry.context}</p>
                  </div>
                </div>

                <div className={`grid gap-4 ${entry.imageIds.length === 1 ? 'grid-cols-1 max-w-2xl' : entry.imageIds.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                  {entry.imageIds.map((imageId, imageIndex) => {
                    const image = imageById[imageId];
                    return (
                      <motion.button
                        key={image.id}
                        type="button"
                        onClick={() => onSelectImage(image)}
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.975 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                        whileTap={prefersReducedMotion ? undefined : { scale: 0.94, rotate: imageIndex % 2 === 0 ? -0.7 : 0.7 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.48, delay: prefersReducedMotion ? 0 : imageIndex * 0.07, ease: [0.22, 1, 0.36, 1] }}
                        className="group text-left overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] hover:border-[var(--color-accent-gold)] transition-colors"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-black/10">
                          <img src={image.src} alt={image.alt} width="800" height="600" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                          {!prefersReducedMotion && (
                            <motion.span
                              aria-hidden="true"
                              initial={{ scaleX: 1 }}
                              whileInView={{ scaleX: 0 }}
                              viewport={{ once: true, amount: 0.45 }}
                              transition={{ duration: 0.72, delay: 0.08 + imageIndex * 0.06, ease: [0.76, 0, 0.24, 1] }}
                              className="documentary-paper-sweep pointer-events-none absolute inset-0 z-10 origin-right"
                            />
                          )}
                          <ArrowUpRight className="absolute top-3 right-3 w-5 h-5 text-white opacity-70 group-hover:opacity-100" />
                        </div>
                        <div className="p-4"><h4 className="font-serif font-bold text-sm">{image.title}</h4><p className="mt-1 text-xs text-[var(--color-text-secondary)] leading-relaxed">{image.caption}</p></div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
