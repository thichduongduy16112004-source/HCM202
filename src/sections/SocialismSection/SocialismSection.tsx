import React from 'react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ArgumentCard } from '@/components/evidence/ArgumentCard';
import { socialismArguments } from '@/data/arguments';
import { evidenceById } from '@/data/evidence';
import { argumentImageIds, imageById } from '@/data/images';
import type { HistoricalImage } from '@/types';

export interface SocialismSectionProps {
  onOpenSource: (sourceId: string) => void;
  onOpenImage: (image: HistoricalImage) => void;
}

const groups = [
  { title: 'Quan niệm và tính tất yếu', subtitle: 'CNXH được hiểu qua kết quả đối với nhân dân và điều kiện lịch sử cụ thể của Việt Nam.', orders: [1, 2] },
  { title: 'Bốn mục tiêu cụ thể', subtitle: 'Chính trị, kinh tế, văn hóa – xã hội và con người tạo thành một chỉnh thể.', orders: [3, 4, 5, 6] },
  { title: 'Thời kỳ quá độ', subtitle: 'Một quá trình lâu dài, phức tạp, không thể nóng vội hoặc chuyển đổi tức thời.', orders: [7] },
  { title: 'Bốn nguyên tắc xây dựng', subtitle: 'Nền tảng lý luận, giữ vững độc lập, học tập có chọn lọc và xây đi đôi với chống.', orders: [8, 9, 10, 11] },
];

export const SocialismSection: React.FC<SocialismSectionProps> = ({ onOpenSource, onOpenImage }) => (
  <section id="socialism" aria-label="Quan niệm và mục tiêu của chủ nghĩa xã hội" className="py-20 md:py-28 px-4 md:px-8 border-b border-[var(--color-border-default)] bg-[var(--color-bg-primary)]">
    <div className="max-w-content-xl mx-auto">
      <SectionHeader
        number="04"
        category="CON ĐƯỜNG PHÁT TRIỂN"
        title="Quan Niệm Và Mục Tiêu Của Chủ Nghĩa Xã Hội"
        subtitle="Chủ nghĩa xã hội được làm rõ qua quan niệm, mục tiêu, thời kỳ quá độ và những nguyên tắc xây dựng phù hợp với điều kiện Việt Nam."
      />

      <div className="space-y-20">
        {groups.map((group, groupIndex) => (
          <section key={group.title} aria-labelledby={`socialism-group-${groupIndex}`}>
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 mb-8 items-end">
              <div className="font-mono text-xs text-[var(--color-accent-red)]">0{groupIndex + 1} / 04</div>
              <div>
                <h3 id={`socialism-group-${groupIndex}`} className="text-2xl md:text-3xl font-serif font-bold">{group.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)] max-w-3xl">{group.subtitle}</p>
              </div>
            </div>
            <div className="space-y-8">
              {socialismArguments.filter((argument) => group.orders.includes(argument.order)).map((argument) => (
                <ArgumentCard
                  key={argument.id}
                  argument={argument}
                  evidence={argument.evidenceIds.map((id) => evidenceById[id])}
                  images={(argumentImageIds[argument.id] || []).map((id) => imageById[id])}
                  onOpenSource={onOpenSource}
                  onOpenImage={onOpenImage}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  </section>
);
