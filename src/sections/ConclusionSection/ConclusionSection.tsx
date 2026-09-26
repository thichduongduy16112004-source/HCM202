import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowRightLeft, BookOpen, Route, ShieldCheck, Workflow } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { SourceBadge } from '@/components/common/SourceBadge';
import { centralArguments, centralConclusion } from '@/data/arguments';
import { evidenceById } from '@/data/evidence';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface ConclusionSectionProps {
  onOpenSource: (sourceId: string) => void;
}

const argumentMeta = [
  {
    eyebrow: 'CHIỀU MỞ ĐƯỜNG',
    direction: 'Độc lập dân tộc → Chủ nghĩa xã hội',
    color: '#8F1D21',
    Icon: Route,
  },
  {
    eyebrow: 'CHIỀU BẢO ĐẢM',
    direction: 'Chủ nghĩa xã hội → Độc lập dân tộc',
    color: '#A37B3D',
    Icon: ShieldCheck,
  },
  {
    eyebrow: 'MỐI QUAN HỆ THỐNG NHẤT',
    direction: 'Hai mục tiêu tác động qua lại',
    color: '#62664A',
    Icon: Workflow,
  },
];

export const ConclusionSection: React.FC<ConclusionSectionProps> = ({ onOpenSource }) => {
  const [activeArgumentId, setActiveArgumentId] = useState(centralArguments[0].id);
  const prefersReducedMotion = useReducedMotion();
  const activeArgument = centralArguments.find((argument) => argument.id === activeArgumentId) || centralArguments[0];
  const activeArgumentIndex = centralArguments.findIndex((argument) => argument.id === activeArgumentId);
  const activeEvidence = activeArgument.evidenceIds.map((id) => evidenceById[id]);
  const activeMeta = argumentMeta[activeArgumentIndex];
  const ActiveIcon = activeMeta.Icon;

  return (
    <section
      id="conclusion"
      aria-label="Ba chiều lập luận trả lời câu hỏi trung tâm"
      className="overflow-hidden border-b border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-4 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-content-lg">
        <SectionHeader
          number="05"
          category="TRẢ LỜI CÂU HỎI TRUNG TÂM"
          title={centralConclusion}
          subtitle="Đi theo từng chiều của lập luận để thấy độc lập dân tộc mở đường cho chủ nghĩa xã hội, còn chủ nghĩa xã hội làm cho nền độc lập vững chắc và có ý nghĩa thực chất."
        />

        <div className="relative mb-10 md:mb-14">
          <div
            className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-[var(--color-border-strong)] md:block"
            aria-hidden="true"
          >
            <motion.span
              className="absolute -top-1 h-2 w-2 rounded-full bg-[var(--color-accent-gold)] shadow-[0_0_16px_rgba(163,123,61,0.8)]"
              animate={prefersReducedMotion ? undefined : { left: ['0%', '100%', '0%'] }}
              transition={{ duration: 2.4, repeat: 1, ease: 'easeInOut' }}
            />
          </div>

          <div className="relative grid grid-cols-1 gap-4 md:grid-cols-3">
            {centralArguments.map((argument, index) => {
              const isActive = argument.id === activeArgumentId;
              const meta = argumentMeta[index];
              const Icon = meta.Icon;

              return (
                <motion.button
                  key={argument.id}
                  type="button"
                  aria-pressed={isActive}
                  aria-label={`Mở nội dung ${meta.eyebrow.toLowerCase()}`}
                  onClick={() => setActiveArgumentId(argument.id)}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 34, rotateX: 8 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  whileHover={prefersReducedMotion ? undefined : { y: -9, scale: 1.012 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 22, delay: prefersReducedMotion ? 0 : index * 0.08 }}
                  className={`group relative min-h-60 overflow-hidden rounded-2xl border-2 p-6 text-left transition-colors md:p-7 ${isActive ? 'z-10 text-white shadow-[var(--shadow-lg)]' : 'border-[var(--color-border-strong)] bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]'}`}
                  style={isActive ? { backgroundColor: meta.color, borderColor: meta.color } : undefined}
                >
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <span className={`font-mono text-[11px] font-bold tracking-[0.16em] ${isActive ? 'text-white/75' : 'text-[var(--color-accent-red)]'}`}>
                      {meta.eyebrow}
                    </span>
                    <motion.span
                      animate={prefersReducedMotion ? undefined : { rotate: isActive ? [0, -8, 0] : 0, scale: isActive ? [1, 1.15, 1] : 1 }}
                      transition={{ duration: 0.55 }}
                      className={`flex h-11 w-11 items-center justify-center rounded-full border ${isActive ? 'border-white/30 bg-white/10' : 'border-[var(--color-border-default)] bg-[var(--color-surface-secondary)]'}`}
                    >
                      <Icon aria-hidden="true" className={`h-5 w-5 ${isActive ? 'text-white' : 'text-[var(--color-accent-gold)]'}`} />
                    </motion.span>
                  </div>

                  <h3 className={`font-serif text-lg font-bold leading-snug md:text-xl ${isActive ? 'text-white' : 'text-[var(--color-text-primary)]'}`}>
                    {argument.title}
                  </h3>
                  <p className={`mt-3 text-sm leading-relaxed ${isActive ? 'text-white/80' : 'text-[var(--color-text-secondary)]'}`}>
                    {argument.displayStatement}
                  </p>
                  <div className={`mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider ${isActive ? 'text-white' : 'text-[var(--color-text-muted)]'}`}>
                    <span>{isActive ? 'Đang làm rõ luận điểm' : 'Mở chiều lập luận'}</span>
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="active-argument-edge"
                      className="absolute inset-x-6 bottom-0 h-1 rounded-full bg-white"
                      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={activeArgument.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -16, scale: 0.99 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface-primary)] shadow-[var(--shadow-md)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[270px_minmax(0,1fr)]">
              <div className="relative overflow-hidden p-6 text-white md:p-8" style={{ backgroundColor: activeMeta.color }}>
                <motion.div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 h-44 w-44 rounded-full border border-white/20"
                  animate={prefersReducedMotion ? undefined : { scale: [1, 1.14, 1], opacity: [0.3, 0.55, 0.3] }}
                  transition={{ duration: 2.2, repeat: 1, ease: 'easeInOut' }}
                />
                <div className="relative">
                  <div className="font-mono text-xs tracking-[0.15em] text-white/70">{activeMeta.eyebrow}</div>
                  <ActiveIcon aria-hidden="true" className="my-7 h-12 w-12" />
                  <h3 className="text-balance font-serif text-2xl font-bold text-white">{activeArgument.title}</h3>
                  <div className="mt-6 border-t border-white/25 pt-4 font-mono text-xs leading-relaxed text-white/80">
                    {activeMeta.direction}
                  </div>
                </div>
              </div>

              <div className="space-y-7 p-6 md:p-9">
                <ArgumentDetail number="01" label="Luận điểm">
                  <p>{activeArgument.statement}</p>
                </ArgumentDetail>

                <ArgumentDetail number="02" label="Dẫn chứng">
                  <div className="space-y-4">
                    {activeEvidence.map((item) => (
                      <div key={item.id} className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] p-4 md:p-5">
                        <strong className="font-serif text-[var(--color-text-primary)]">{item.title}</strong>
                        {item.quote && (
                          <blockquote className="my-4 border-l-2 border-[var(--color-accent-gold)] pl-4 font-serif italic leading-7 text-[var(--color-text-primary)]">
                            {item.quote}
                          </blockquote>
                        )}
                        <p>{item.summary}</p>
                        {item.details && (
                          <ul className="mt-3 space-y-2 pl-4">
                            {item.details.map((detail) => (
                              <li key={detail} className="relative pl-3 before:absolute before:left-0 before:top-[0.72em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--color-accent-gold)]">
                                {detail}
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.sourceIds.map((sourceId) => (
                            <SourceBadge key={sourceId} sourceId={sourceId} onClick={onOpenSource} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ArgumentDetail>

                <ArgumentDetail number="03" label="Phân tích">
                  <p>{activeArgument.analysis}</p>
                </ArgumentDetail>

                <ArgumentDetail number="04" label="Kết luận">
                  <p className="font-semibold text-[var(--color-text-primary)]">{activeArgument.linkBack}</p>
                </ArgumentDetail>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.65 }}
          className="mt-10 overflow-hidden rounded-2xl bg-[var(--color-dark-bg)] px-5 py-6 text-white md:px-8"
        >
          <div className="grid items-center gap-5 md:grid-cols-[1fr_auto_1fr]">
            <div className="text-center md:text-right">
              <div className="font-mono text-[10px] tracking-[0.15em] text-white/55">TIỀN ĐỀ</div>
              <div className="mt-1 font-serif text-lg font-bold">Độc lập dân tộc</div>
            </div>
            <div className="flex flex-col items-center gap-1" aria-hidden="true">
              <motion.span
                animate={prefersReducedMotion ? undefined : { x: [-8, 8, -8] }}
                transition={{ duration: 2.2, repeat: 1, ease: 'easeInOut' }}
              >
                <ArrowRight className="h-5 w-8 text-[var(--color-accent-gold)]" />
              </motion.span>
              <motion.span
                animate={prefersReducedMotion ? undefined : { x: [8, -8, 8] }}
                transition={{ duration: 2.2, repeat: 1, ease: 'easeInOut' }}
              >
                <ArrowRight className="h-5 w-8 rotate-180 text-[var(--color-accent-red)]" />
              </motion.span>
            </div>
            <div className="text-center md:text-left">
              <div className="font-mono text-[10px] tracking-[0.15em] text-white/55">CƠ SỞ BẢO ĐẢM</div>
              <div className="mt-1 font-serif text-lg font-bold">Chủ nghĩa xã hội</div>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-center gap-3 border-t border-white/10 pt-5 text-center">
            <BookOpen aria-hidden="true" className="h-5 w-5 shrink-0 text-[var(--color-accent-gold)]" />
            <span className="font-serif font-bold">Thống nhất không có nghĩa là đồng nhất</span>
            <ArrowRightLeft aria-hidden="true" className="hidden h-5 w-5 shrink-0 text-[var(--color-accent-red)] sm:block" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface ArgumentDetailProps extends React.PropsWithChildren {
  number: string;
  label: string;
}

const ArgumentDetail: React.FC<ArgumentDetailProps> = ({ number, label, children }) => (
  <section className="grid grid-cols-[64px_minmax(0,1fr)] gap-4 border-b border-[var(--color-border-default)] pb-6 last:border-0 last:pb-0">
    <div>
      <div className="font-mono text-xs font-bold text-[var(--color-accent-red)]">{number}</div>
      <div className="font-mono text-[10px] uppercase text-[var(--color-text-muted)]">{label}</div>
    </div>
    <div className="text-sm leading-7 text-[var(--color-text-secondary)] md:text-[15px]">{children}</div>
  </section>
);
