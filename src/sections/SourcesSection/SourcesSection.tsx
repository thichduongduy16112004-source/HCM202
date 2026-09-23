import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { academicSources, sourceCategories } from '@/data/sources';
import { Badge } from '@/components/common/Badge';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface SourcesSectionProps {
  onOpenSource: (sourceId: string) => void;
}

export const SourcesSection: React.FC<SourcesSectionProps> = ({ onOpenSource }) => {
  const [categoryId, setCategoryId] = useState('all');
  const prefersReducedMotion = useReducedMotion();
  const selectedCategory = sourceCategories.find((category) => category.id === categoryId);
  const filteredSources = selectedCategory
    ? academicSources.filter((source) => selectedCategory.sourceIds.includes(source.id))
    : academicSources;

  return (
    <section id="sources" aria-label="Danh mục nguồn" className="py-20 md:py-28 px-4 md:px-8 border-b border-[var(--color-border-default)] bg-[var(--color-bg-primary)]">
      <div className="max-w-content-xl mx-auto">
        <SectionHeader
          number="09"
          category="TÀI LIỆU THAM KHẢO"
          title="Danh Mục Nguồn Học Thuật Và Tư Liệu Lịch Sử"
          subtitle="Các giáo trình, văn kiện và trang tư liệu chính thống được sử dụng trong nội dung trình bày."
        />

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[{ id: 'all', label: 'Tất cả nguồn' }, ...sourceCategories].map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setCategoryId(category.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors ${categoryId === category.id ? 'bg-[var(--color-accent-gold)] text-black font-bold' : 'bg-[var(--color-surface-primary)] border border-[var(--color-border-default)]'}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSources.map((source, index) => (
            <motion.article
              key={source.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={prefersReducedMotion ? undefined : { y: -5 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.46, delay: prefersReducedMotion ? 0 : Math.min((index % 3) * 0.07, 0.14), ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-xl border border-[var(--color-border-default)] hover:border-[var(--color-accent-gold)] bg-[var(--color-surface-primary)] p-6 flex flex-col justify-between shadow-[var(--shadow-sm)]"
            >
              <button
                type="button"
                aria-label={`Xem chi tiết nguồn ${source.title}${source.year ? ` ${source.year}` : ''}`}
                onClick={() => onOpenSource(source.id)}
                className="absolute inset-0 z-10 rounded-xl cursor-pointer"
              />
              <div className="pointer-events-none space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="gold">{source.type === 'textbook' ? 'Giáo trình' : 'Văn kiện lịch sử'}</Badge>
                </div>
                <h3 className="font-serif font-bold text-base text-[var(--color-text-primary)]">{source.title}</h3>
                <div className="text-xs font-mono text-[var(--color-text-muted)] space-y-1">
                  {source.author && <div>Tác giả: {source.author}</div>}
                  {source.year && <div>Năm: {source.year}</div>}
                  {source.publisher && <div>NXB: {source.publisher}</div>}
                  {source.volume && <div>Tập: {source.volume}</div>}
                  {source.pages && <div className="font-semibold text-[var(--color-text-primary)]">Trang: {source.pages}</div>}
                </div>
                {source.note && <p className="text-xs text-[var(--color-text-secondary)] italic pt-2 border-t border-[var(--color-border-default)]">{source.note}</p>}
              </div>
              <div className="pointer-events-none pt-4 flex items-center justify-between text-[11px] font-mono text-[var(--color-accent-gold)]">
                <span>Xem chi tiết</span><ExternalLink className="w-3.5 h-3.5" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
