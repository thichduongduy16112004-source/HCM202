import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Eye, Quote } from 'lucide-react';
import type { Argument, Evidence, HistoricalImage } from '@/types';
import { SourceBadge } from '@/components/common/SourceBadge';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface ArgumentCardProps {
  argument: Argument;
  evidence: Evidence[];
  images?: HistoricalImage[];
  onOpenSource: (sourceId: string) => void;
  onOpenImage: (image: HistoricalImage) => void;
}

export const ArgumentCard: React.FC<ArgumentCardProps> = ({ argument, evidence, images = [], onOpenSource, onOpenImage }) => {
  const prefersReducedMotion = useReducedMotion();
  const sourceIds = [...new Set(evidence.flatMap((item) => item.sourceIds))];

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] shadow-[var(--shadow-sm)]"
    >
      <div className={images.length > 0 ? 'grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px]' : 'grid grid-cols-1'}>
        <div className="p-6 md:p-9">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-3xl font-bold text-[var(--color-accent-gold)]">{String(argument.order).padStart(2, '0')}</span>
              <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Nội dung trọng tâm</span>
            </div>
            <div className="flex flex-wrap gap-2">{sourceIds.map((sourceId) => <SourceBadge key={sourceId} sourceId={sourceId} onClick={onOpenSource} />)}</div>
          </div>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] leading-tight mb-6">{argument.title}</h3>

          <div className="space-y-6">
            <AcademicStep number="01" label="Luận điểm">
              <p>{argument.statement}</p>
            </AcademicStep>

            <AcademicStep number="02" label="Dẫn chứng">
              <div className="space-y-4">
                {evidence.map((item) => {
                  const primarySourceId = item.sourceIds[0];
                  return (
                    <motion.article
                      key={item.id}
                      whileHover={prefersReducedMotion ? undefined : { x: 8, scale: 1.008 }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.975 }}
                      transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 330, damping: 24 }}
                      className="group/evidence relative rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)]/55 p-4 shadow-[var(--shadow-sm)] hover:border-[var(--color-accent-gold)] hover:shadow-[var(--shadow-md)]"
                    >
                      {primarySourceId && <button type="button" aria-label={`Mở nguồn cho minh chứng: ${item.title}`} onClick={() => onOpenSource(primarySourceId)} className="absolute inset-0 z-10 rounded-lg cursor-pointer" />}
                      <div className="pointer-events-none">
                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                          <h4 className="font-serif font-bold text-sm text-[var(--color-text-primary)]">{item.title}</h4>
                          {primarySourceId && <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-accent-red)] opacity-70 group-hover/evidence:opacity-100">Nhấn để mở nguồn ↗</span>}
                        </div>
                        {item.quote && (
                          <blockquote className="my-3 flex items-start gap-2 border-l-2 border-[var(--color-accent-gold)] pl-3 font-serif italic text-[var(--color-text-primary)]">
                            <Quote aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[var(--color-accent-gold)]" />
                            <span>{item.quote}</span>
                          </blockquote>
                        )}
                        <p>{item.summary}</p>
                        {item.details && item.details.length > 0 && (
                          <ul className="mt-3 space-y-2 pl-5 list-disc marker:text-[var(--color-accent-gold)]">
                            {item.details.map((detail) => (
                              <li key={detail} className="pl-1 text-[var(--color-text-secondary)]">{detail}</li>
                            ))}
                          </ul>
                        )}
                        <p className="mt-2 text-[var(--color-text-muted)]"><strong className="text-[var(--color-text-secondary)]">Ý nghĩa của dẫn chứng: </strong>{item.analysis}</p>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </AcademicStep>

            <AcademicStep number="03" label="Phân tích">
              <p>{argument.analysis}</p>
            </AcademicStep>

            {argument.linkBack && (
              <AcademicStep number="04" label="Liên hệ vấn đề" emphasized>
                <p>{argument.linkBack}</p>
              </AcademicStep>
            )}
          </div>
        </div>

        {images.length > 0 && (
          <aside className="bg-[var(--color-dark-bg)] p-4 md:p-5 flex flex-col gap-4" aria-label={`Tư liệu cho ${argument.title}`}>
            <div className="text-[10px] font-mono tracking-[0.18em] uppercase text-[var(--color-accent-gold)]">Hình ảnh liên quan</div>
            {images.map((image, index) => (
              <motion.button
                key={image.id}
                type="button"
                onClick={() => onOpenImage(image)}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.025, rotate: index % 2 === 0 ? -0.7 : 0.7 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
                transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 280, damping: 22 }}
                className={`group relative overflow-hidden rounded-xl border border-white/15 text-left focus-visible:ring-2 focus-visible:ring-[var(--color-accent-gold)] ${images.length === 1 ? 'flex-1 min-h-80' : index === 0 ? 'min-h-64' : 'min-h-48'}`}
              >
                <img src={image.src} alt={image.alt} width="800" height="600" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.09]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                <span aria-hidden="true" className="absolute left-3 top-3 h-9 w-9 border-l-2 border-t-2 border-[var(--color-accent-gold)] opacity-0 transition-[opacity,transform] duration-300 group-hover:scale-110 group-hover:opacity-100" />
                <span aria-hidden="true" className="absolute bottom-3 right-3 h-9 w-9 border-b-2 border-r-2 border-[var(--color-accent-red)] opacity-0 transition-[opacity,transform] duration-300 group-hover:scale-110 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <div className="flex items-center justify-between gap-3">
                    <div><div className="text-[10px] font-mono text-[var(--color-accent-gold)]">{image.year || 'CHƯA XÁC ĐỊNH NĂM'}</div><div className="font-serif font-bold text-sm text-white">{image.title}</div></div>
                    <Eye aria-hidden="true" className="w-4 h-4 shrink-0 opacity-70 group-hover:opacity-100" />
                  </div>
                  {image.caption && <p className="mt-2 text-xs text-white/70 leading-relaxed">{image.caption}</p>}
                </div>
              </motion.button>
            ))}
          </aside>
        )}
      </div>
    </motion.article>
  );
};

interface AcademicStepProps extends React.PropsWithChildren {
  number: string;
  label: string;
  emphasized?: boolean;
}

const AcademicStep: React.FC<AcademicStepProps> = ({ number, label, emphasized = false, children }) => (
  <section className={`grid grid-cols-[64px_minmax(0,1fr)] gap-4 border-t pt-5 ${emphasized ? 'border-[var(--color-accent-red)]' : 'border-[var(--color-border-default)]'}`}>
    <div>
      <span className={`font-mono text-[10px] font-bold ${emphasized ? 'text-[var(--color-accent-red)]' : 'text-[var(--color-accent-gold)]'}`}>{number}</span>
      <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">{label}</div>
    </div>
    <div className={`text-sm md:text-[15px] leading-7 ${emphasized ? 'font-semibold text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
      {children}
      {emphasized && <ArrowUpRight className="inline-block w-4 h-4 ml-2 text-[var(--color-accent-red)]" />}
    </div>
  </section>
);
