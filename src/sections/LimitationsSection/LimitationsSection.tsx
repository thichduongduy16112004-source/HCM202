import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/common/SectionHeader';
import { limitations } from '@/data/limitations';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const LimitationsSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="limitations" aria-label="Giới hạn khi vận dụng" className="py-20 md:py-28 px-4 md:px-8 border-b border-[var(--color-border-default)] bg-[var(--color-bg-primary)]">
    <div className="max-w-content-xl mx-auto">
      <SectionHeader
        number="08"
        category="PHƯƠNG PHÁP LUẬN"
        title="Bốn Giới Hạn Khi Vận Dụng"
        subtitle="Vận dụng tư tưởng Hồ Chí Minh cần tôn trọng nguyên tắc, hoàn cảnh lịch sử và điều kiện cụ thể của Việt Nam."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {limitations.map((item, index) => {
          const isEmphasized = item.id === 'no-false-modernization';
          return (
            <motion.article
              key={item.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28, scale: 0.99 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-xl p-6 md:p-8 border bg-[var(--color-surface-primary)] ${isEmphasized ? 'border-2 border-[var(--color-accent-red)] shadow-[var(--shadow-md)]' : 'border-[var(--color-border-default)]'}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`font-mono text-3xl font-extrabold ${isEmphasized ? 'text-[var(--color-accent-red)]' : 'text-[var(--color-accent-gold)]'}`}>{String(index + 1).padStart(2, '0')}</span>
                <div className="h-4 w-px bg-[var(--color-border-default)]" />
                <h3 className="font-serif font-bold text-lg md:text-xl text-[var(--color-text-primary)]">{item.title}</h3>
              </div>
              <p className="text-sm text-[var(--color-text-primary)] leading-relaxed mb-5">{item.statement}</p>
              <div className="p-3.5 rounded bg-[var(--color-surface-secondary)] border border-[var(--color-border-default)] text-xs text-[var(--color-text-secondary)] leading-relaxed">
                <span className="font-mono font-semibold text-[var(--color-accent-gold)] uppercase block mb-1">Phân tích</span>
                {item.analysis}
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
    </section>
  );
};
