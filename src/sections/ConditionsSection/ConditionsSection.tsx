import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Globe2, Shield, Users } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { SourceBadge } from '@/components/common/SourceBadge';
import { guaranteeConclusion, guaranteeConditions } from '@/data/conditions';
import { evidenceById } from '@/data/evidence';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface ConditionsSectionProps {
  onOpenSource: (sourceId: string) => void;
}

const conditionMeta = [
  {
    accent: '#8F1D21',
    Icon: Shield,
  },
  {
    accent: '#A37B3D',
    Icon: Users,
  },
  {
    accent: '#62664A',
    Icon: Globe2,
  },
];

export const ConditionsSection: React.FC<ConditionsSectionProps> = ({ onOpenSource }) => {
  const [activeConditionId, setActiveConditionId] = useState(guaranteeConditions[0].id);
  const [exploredConditionIds, setExploredConditionIds] = useState<Set<string>>(
    () => new Set([guaranteeConditions[0].id]),
  );
  const prefersReducedMotion = useReducedMotion();
  const activeCondition = guaranteeConditions.find((condition) => condition.id === activeConditionId) || guaranteeConditions[0];
  const activeIndex = guaranteeConditions.findIndex((condition) => condition.id === activeConditionId);
  const activeMeta = conditionMeta[activeIndex];
  const ActiveIcon = activeMeta.Icon;
  const activeEvidence = activeCondition.evidenceIds.map((id) => evidenceById[id]);
  const allExplored = exploredConditionIds.size === guaranteeConditions.length;

  const handleSelectCondition = (conditionId: string) => {
    setActiveConditionId(conditionId);
    setExploredConditionIds((current) => {
      const next = new Set(current);
      next.add(conditionId);
      return next;
    });
  };

  return (
    <section
      id="conditions"
      aria-label="Ba điều kiện bảo đảm"
      className="overflow-hidden border-b border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-4 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-content-xl">
        <SectionHeader
          number="06"
          category="ĐIỀU KIỆN BẢO ĐẢM"
          title="Ba Điều Kiện Gắn Bó Trong Một Chỉnh Thể"
          subtitle="Mỗi điều kiện tạo nên một nguồn sức mạnh riêng; chỉ khi cùng được bảo đảm, chúng mới hình thành nền tảng vững chắc để bảo vệ độc lập dân tộc và chủ nghĩa xã hội."
        />

        <div aria-live="polite" className="mx-auto mb-8 flex max-w-2xl items-center gap-4 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] px-4 py-3 shadow-[var(--shadow-sm)]">
          <div className="font-mono text-xs font-bold text-[var(--color-accent-red)]">
            {String(exploredConditionIds.size).padStart(2, '0')}/{String(guaranteeConditions.length).padStart(2, '0')}
          </div>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--color-surface-secondary)]">
            <motion.div
              className="h-full w-full origin-left rounded-full bg-[var(--color-accent-gold)]"
              animate={{ scaleX: exploredConditionIds.size / guaranteeConditions.length }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="hidden font-mono text-[10px] uppercase text-[var(--color-text-muted)] sm:block">
            {allExplored ? 'Đã xem đủ ba điều kiện' : 'Tiến độ khám phá'}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {guaranteeConditions.map((condition, index) => {
            const meta = conditionMeta[index];
            const Icon = meta.Icon;
            const isActive = condition.id === activeConditionId;
            const isExplored = exploredConditionIds.has(condition.id);
            const nextCondition = guaranteeConditions[index + 1];

            return (
              <div key={condition.id} className="relative">
                {nextCondition && (
                  <div aria-hidden="true" className="absolute left-full top-1/2 z-0 hidden h-1 w-6 -translate-y-1/2 overflow-hidden bg-[var(--color-border-strong)] md:block">
                    <motion.span
                      className="block h-full origin-left bg-[var(--color-accent-gold)]"
                      initial={false}
                      animate={{ scaleX: exploredConditionIds.has(nextCondition.id) ? 1 : 0 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                )}

                <motion.button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleSelectCondition(condition.id)}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 28, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={prefersReducedMotion ? undefined : { y: -7, scale: 1.015 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ type: 'spring', stiffness: 185, damping: 23, delay: prefersReducedMotion ? 0 : index * 0.08 }}
                  className={`relative z-10 flex h-full min-h-[260px] w-full flex-col rounded-2xl border-2 p-6 text-left shadow-[var(--shadow-sm)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-gold)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-bg-primary)] ${isActive ? 'text-white shadow-[var(--shadow-lg)]' : 'border-[var(--color-border-default)] bg-[var(--color-surface-primary)] hover:border-[var(--color-border-strong)]'}`}
                  style={isActive ? { backgroundColor: meta.accent, borderColor: meta.accent } : undefined}
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-full border ${isActive ? 'border-white/30 bg-white/10' : 'border-[var(--color-border-default)] bg-[var(--color-surface-secondary)]'}`}>
                      <Icon aria-hidden="true" className={`h-5 w-5 ${isActive ? 'text-white' : 'text-[var(--color-accent-red)]'}`} />
                    </span>
                    <span className={`font-mono text-xl font-bold ${isActive ? 'text-white/80' : 'text-[var(--color-accent-gold)]'}`}>
                      {String(condition.order).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className={`font-serif text-lg font-bold leading-snug ${isActive ? 'text-white' : 'text-[var(--color-text-primary)]'}`}>
                    {condition.title}
                  </h3>
                  <p className={`mt-3 text-sm leading-relaxed ${isActive ? 'text-white/80' : 'text-[var(--color-text-secondary)]'}`}>
                    {condition.summary}
                  </p>
                  <div className={`mt-auto pt-5 font-mono text-[10px] uppercase tracking-wider ${isActive ? 'text-white' : 'text-[var(--color-text-muted)]'}`}>
                    {isActive ? 'Đang mở nội dung' : isExplored ? 'Xem lại điều kiện' : 'Khám phá điều kiện'}
                  </div>
                </motion.button>
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={activeCondition.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28, scale: 0.988 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -14, scale: 0.992 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 overflow-hidden rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface-primary)] shadow-[var(--shadow-md)]"
          >
            <div className="grid lg:grid-cols-[260px_minmax(0,1fr)]">
              <div className="p-6 text-white md:p-8" style={{ backgroundColor: activeMeta.accent }}>
                <div className="font-mono text-xs tracking-[0.15em] text-white/70">ĐIỀU KIỆN {String(activeCondition.order).padStart(2, '0')}</div>
                <ActiveIcon aria-hidden="true" className="my-7 h-12 w-12" />
                <h3 className="text-balance font-serif text-2xl font-bold text-white">{activeCondition.title}</h3>
                <p className="mt-5 border-t border-white/25 pt-4 text-sm leading-relaxed text-white/80">{activeCondition.summary}</p>
              </div>

              <div className="space-y-6 p-6 md:p-9">
                <div>
                  <div className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent-red)]">Luận điểm</div>
                  <p className="leading-7 text-[var(--color-text-secondary)]">{activeCondition.analysis}</p>
                </div>

                {activeEvidence.map((item) => (
                  <div key={item.id} className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] p-5">
                    <div className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent-gold)]">Dẫn chứng</div>
                    <h4 className="font-serif text-lg font-bold text-[var(--color-text-primary)]">{item.title}</h4>
                    {item.quote && (
                      <blockquote className="my-4 border-l-2 border-[var(--color-accent-gold)] pl-4 font-serif italic leading-7 text-[var(--color-text-primary)]">
                        {item.quote}
                      </blockquote>
                    )}
                    <p className="text-sm leading-7 text-[var(--color-text-secondary)]">{item.summary}</p>
                    {item.details && (
                      <ul className="mt-3 space-y-2 pl-4 text-sm leading-7 text-[var(--color-text-secondary)]">
                        {item.details.map((detail) => (
                          <li key={detail} className="relative pl-3 before:absolute before:left-0 before:top-[0.72em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--color-accent-gold)]">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-5 border-t border-[var(--color-border-default)] pt-4">
                      <div className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent-olive)]">Phân tích</div>
                      <p className="text-sm leading-7 text-[var(--color-text-secondary)]">{item.analysis}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.sourceIds.map((sourceId) => (
                        <SourceBadge key={sourceId} sourceId={sourceId} onClick={onOpenSource} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        </AnimatePresence>

        <AnimatePresence>
          {allExplored && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 170, damping: 20 }}
              className="mt-8 flex items-start gap-4 rounded-2xl border border-[var(--color-accent-gold)] bg-[var(--color-dark-bg)] p-6 text-white shadow-[var(--shadow-lg)] md:items-center"
            >
              <motion.div
                animate={prefersReducedMotion ? undefined : { rotate: [0, -8, 8, 0], scale: [1, 1.16, 1] }}
                transition={{ duration: 0.75 }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-gold)] text-black"
              >
                <CheckCircle2 aria-hidden="true" className="h-6 w-6" />
              </motion.div>
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-accent-gold)]">Kết luận ba điều kiện</div>
                <p className="mt-2 font-serif text-lg font-bold leading-relaxed text-white">{guaranteeConclusion}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
