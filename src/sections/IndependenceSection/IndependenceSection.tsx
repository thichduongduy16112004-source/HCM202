import React from 'react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ArgumentCard } from '@/components/evidence/ArgumentCard';
import { independenceArguments } from '@/data/arguments';
import { evidenceById } from '@/data/evidence';
import { argumentImageIds, imageById } from '@/data/images';
import { HistoricalImage } from '@/types';

export interface IndependenceSectionProps {
  onOpenSource: (sourceId: string) => void;
  onOpenImage: (image: HistoricalImage) => void;
}

export const IndependenceSection: React.FC<IndependenceSectionProps> = ({
  onOpenSource,
  onOpenImage,
}) => {
  return (
    <section
      id="independence"
      aria-label="Nội hàm Tư tưởng về Độc lập Dân tộc"
      className="py-20 md:py-28 px-4 md:px-8 border-b border-[var(--color-border-default)] bg-[var(--color-bg-primary)]"
    >
      <div className="max-w-content-lg mx-auto">
        <SectionHeader
          number="02"
          category="CƠ SỞ LÝ LUẬN &amp; LỊCH SỬ"
          title="Nội hàm Tư tưởng về Độc lập Dân tộc"
          subtitle="Bốn nội dung cốt lõi làm rõ giá trị, ý nghĩa và yêu cầu toàn diện của độc lập dân tộc trong tư tưởng Hồ Chí Minh."
        />

        {/* Editorial Timeline Cards Stack */}
        <div className="space-y-8 md:space-y-12">
          {independenceArguments.map((arg) => {
            return (
              <ArgumentCard
                key={arg.id}
                argument={arg}
                evidence={arg.evidenceIds.map((id) => evidenceById[id])}
                images={(argumentImageIds[arg.id] || []).map((id) => imageById[id])}
                onOpenSource={onOpenSource}
                onOpenImage={onOpenImage}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
