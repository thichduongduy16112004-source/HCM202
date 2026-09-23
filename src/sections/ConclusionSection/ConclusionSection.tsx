import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightLeft, BookOpen, Puzzle } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { SourceBadge } from '@/components/common/SourceBadge';
import { centralArguments, centralConclusion } from '@/data/arguments';
import { evidenceById } from '@/data/evidence';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface ConclusionSectionProps {
  onOpenSource: (sourceId: string) => void;
}

const pieceColors = ['#8F1D21', '#A37B3D', '#62664A'];

export const ConclusionSection: React.FC<ConclusionSectionProps> = ({ onOpenSource }) => {
  const [activeArgumentId, setActiveArgumentId] = useState(centralArguments[0].id);
  const prefersReducedMotion = useReducedMotion();
  const activeArgument = centralArguments.find((argument) => argument.id === activeArgumentId) || centralArguments[0];
  const activeArgumentIndex = centralArguments.findIndex((argument) => argument.id === activeArgumentId);
  const activeEvidence = activeArgument.evidenceIds.map((id) => evidenceById[id]);

  return (
    <section id="conclusion" aria-label="Ba mảnh ghép trả lời câu hỏi trung tâm" className="py-20 md:py-28 px-4 md:px-8 border-b border-[var(--color-border-default)] bg-[var(--color-bg-primary)] overflow-hidden">
      <div className="max-w-content-lg mx-auto">
        <SectionHeader
          number="05"
          category="TRẢ LỜI CÂU HỎI TRUNG TÂM"
          title={centralConclusion}
          subtitle="Ba luận điểm là ba mảnh ghép của cùng một lập luận. Chọn từng mảnh để khám phá mối quan hệ hai chiều giữa hai mục tiêu."
        />

        <div className="relative mb-10 md:mb-14">
          <div className="absolute left-[12%] right-[12%] top-1/2 h-px bg-[var(--color-border-strong)]" aria-hidden="true" />
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 md:px-8">
            {centralArguments.map((argument, index) => {
              const isActive = argument.id === activeArgumentId;
              const pieceColor = pieceColors[index];
              const magneticOffset = index < activeArgumentIndex ? 6 : index > activeArgumentIndex ? -6 : 0;
              return (
                <motion.div
                  key={argument.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: index === 0 ? -52 : index === 2 ? 52 : 0, y: index === 1 ? 24 : 0 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ type: prefersReducedMotion ? 'tween' : 'spring', duration: prefersReducedMotion ? 0 : undefined, stiffness: 150, damping: 20, delay: prefersReducedMotion ? 0 : index * 0.07 }}
                >
                  <motion.button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveArgumentId(argument.id)}
                    whileHover={prefersReducedMotion ? undefined : { y: -7 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                    animate={prefersReducedMotion ? undefined : { x: magneticOffset, y: isActive ? -5 : 0, scale: isActive ? 1.035 : 1 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 280, damping: 24, mass: 0.75 }}
                    className={`relative h-full min-h-48 w-full p-6 md:p-7 text-left border-2 transition-colors focus-visible:z-20 ${index === 0 ? 'md:rounded-l-2xl' : ''} ${index === 2 ? 'md:rounded-r-2xl' : ''} ${isActive ? 'text-white shadow-[var(--shadow-lg)] z-10' : 'bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] border-[var(--color-border-strong)] hover:bg-[var(--color-surface-secondary)]'}`}
                    style={isActive ? { backgroundColor: pieceColor, borderColor: pieceColor } : undefined}
                  >
                    {index < centralArguments.length - 1 && (
                      <span aria-hidden="true" className="hidden md:block absolute -right-[18px] top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full border-y-2 border-r-2" style={{ backgroundColor: isActive ? pieceColor : 'var(--color-surface-primary)', borderColor: isActive ? pieceColor : 'var(--color-border-strong)' }} />
                    )}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <span className={`font-mono text-xs font-bold ${isActive ? 'text-white/75' : 'text-[var(--color-accent-red)]'}`}>MẢNH GHÉP 0{index + 1}</span>
                      <motion.span animate={prefersReducedMotion ? undefined : { rotate: isActive ? -6 : 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}><Puzzle className={`w-6 h-6 ${isActive ? 'text-white' : 'text-[var(--color-accent-gold)]'}`} /></motion.span>
                    </div>
                    <h3 className={`font-serif font-bold text-lg md:text-xl leading-snug ${isActive ? 'text-white' : 'text-[var(--color-text-primary)]'}`}>{argument.title}</h3>
                    <p className={`mt-3 text-xs leading-relaxed ${isActive ? 'text-white/80' : 'text-[var(--color-text-secondary)]'}`}>{argument.displayStatement}</p>
                    <div className={`mt-5 text-[10px] font-mono uppercase tracking-wider ${isActive ? 'text-white' : 'text-[var(--color-text-muted)]'}`}>{isActive ? 'Đang mở nội dung' : 'Nhấn để khám phá'}</div>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={activeArgument.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.988 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12, scale: 0.992 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface-primary)] shadow-[var(--shadow-md)] overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)]">
              <div className="p-6 md:p-8 text-white" style={{ backgroundColor: pieceColors[activeArgument.order - 1] }}>
                <div className="font-mono text-xs text-white/70">MẢNH GHÉP 0{activeArgument.order}</div>
                <Puzzle className="w-12 h-12 my-6" />
                <h3 className="font-serif font-bold text-2xl text-white">{activeArgument.title}</h3>
              </div>

              <div className="p-6 md:p-9 space-y-7">
                <PuzzleDetail number="01" label="Luận điểm"><p>{activeArgument.statement}</p></PuzzleDetail>
                <PuzzleDetail number="02" label="Dẫn chứng">
                  <div className="space-y-4">
                    {activeEvidence.map((item) => (
                      <div key={item.id} className="rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border-default)] p-4">
                        <div className="flex flex-wrap justify-between gap-2 mb-2"><strong className="font-serif text-[var(--color-text-primary)]">{item.title}</strong></div>
                        {item.quote && <blockquote className="my-3 pl-3 border-l-2 border-[var(--color-accent-gold)] font-serif italic">{item.quote}</blockquote>}
                        <p>{item.summary}</p>
                        <div className="flex flex-wrap gap-2 mt-3">{item.sourceIds.map((sourceId) => <SourceBadge key={sourceId} sourceId={sourceId} onClick={onOpenSource} />)}</div>
                      </div>
                    ))}
                  </div>
                </PuzzleDetail>
                <PuzzleDetail number="03" label="Phân tích"><p>{activeArgument.analysis}</p></PuzzleDetail>
                <PuzzleDetail number="04" label="Liên hệ"><p className="font-semibold text-[var(--color-text-primary)]">{activeArgument.linkBack}</p></PuzzleDetail>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          className="mt-10 flex flex-col md:flex-row items-center justify-center gap-3 rounded-xl bg-[var(--color-dark-bg)] px-6 py-5 text-center text-white"
        >
          <BookOpen className="w-5 h-5 text-[var(--color-accent-gold)]" />
          <span className="font-serif font-bold">Ba mảnh ghép cùng tạo thành một quan hệ hai chiều</span>
          <ArrowRightLeft className="w-5 h-5 text-[var(--color-accent-red)]" />
          <span className="font-serif font-bold text-white">{centralConclusion}</span>
        </motion.div>
      </div>
    </section>
  );
};

interface PuzzleDetailProps extends React.PropsWithChildren {
  number: string;
  label: string;
}

const PuzzleDetail: React.FC<PuzzleDetailProps> = ({ number, label, children }) => (
  <section className="grid grid-cols-[64px_minmax(0,1fr)] gap-4 border-b border-[var(--color-border-default)] pb-6 last:border-0 last:pb-0">
    <div><div className="font-mono text-xs font-bold text-[var(--color-accent-red)]">{number}</div><div className="font-mono text-[10px] uppercase text-[var(--color-text-muted)]">{label}</div></div>
    <div className="text-sm md:text-[15px] leading-7 text-[var(--color-text-secondary)]">{children}</div>
  </section>
);
