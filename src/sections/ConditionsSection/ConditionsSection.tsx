import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Shield, Users } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { SourceBadge } from '@/components/common/SourceBadge';
import { guaranteeConditions } from '@/data/conditions';
import { evidenceById } from '@/data/evidence';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface ConditionsSectionProps {
  onOpenSource: (sourceId: string) => void;
}

const icons = [
  <Shield className="w-6 h-6 text-[var(--color-accent-red)]" />,
  <Users className="w-6 h-6 text-[var(--color-accent-gold)]" />,
  <Globe2 className="w-6 h-6 text-[var(--color-accent-olive)]" />,
];

export const ConditionsSection: React.FC<ConditionsSectionProps> = ({ onOpenSource }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
    id="conditions"
    aria-label="Ba điều kiện bảo đảm"
    className="py-20 md:py-28 px-4 md:px-8 border-b border-[var(--color-border-default)] bg-[var(--color-bg-primary)]"
  >
    <div className="max-w-content-xl mx-auto">
      <SectionHeader
        number="06"
        category="ĐIỀU KIỆN BẢO ĐẢM"
        title="Ba Điều Kiện Để Giữ Vững Quan Hệ Thống Nhất"
        subtitle="Sự lãnh đạo của Đảng, khối đại đoàn kết toàn dân tộc và đoàn kết quốc tế là ba điều kiện gắn bó chặt chẽ với nhau."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {guaranteeConditions.map((condition, index) => {
          const itemEvidence = evidenceById[condition.evidenceIds[0]];
          const sourceId = itemEvidence.sourceIds[0];

          return (
            <motion.article
              key={condition.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={prefersReducedMotion ? undefined : { y: -6 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-6 md:p-8 flex flex-col justify-between shadow-[var(--shadow-sm)]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-surface-secondary)] border border-[var(--color-border-default)] flex items-center justify-center">
                    {icons[index]}
                  </div>
                  <span className="font-mono text-2xl font-bold text-[var(--color-accent-gold)]">
                    {String(condition.order).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg md:text-xl text-[var(--color-text-primary)] mb-2 leading-snug">
                  {condition.title}
                </h3>
                <p className="text-xs font-mono text-[var(--color-accent-red)] font-semibold mb-4">{condition.summary}</p>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{condition.analysis}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--color-border-default)] flex justify-end">
                {sourceId && <SourceBadge sourceId={sourceId} onClick={onOpenSource} />}
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
    </section>
  );
};
