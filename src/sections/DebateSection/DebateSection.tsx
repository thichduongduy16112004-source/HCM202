import React, { useEffect, useState } from 'react';
import { AlertCircle, BookCheck, RotateCcw, ShieldAlert, Sparkles } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { SourceBadge } from '@/components/common/SourceBadge';
import { debates } from '@/data/debates';
import { evidenceById } from '@/data/evidence';
import { Button } from '@/components/common/Button';
import { debateImageIds, imageById } from '@/data/images';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface DebateSectionProps {
  onOpenSource: (sourceId: string) => void;
}

export const DebateSection: React.FC<DebateSectionProps> = ({ onOpenSource }) => {
  const [activePanelIndex, setActivePanelIndex] = useState(0);
  const [stage, setStage] = useState(0);
  const currentDebate = debates[activePanelIndex];
  const currentEvidence = currentDebate.evidenceIds.map((id) => evidenceById[id]);
  const currentImages = (debateImageIds[currentDebate.id] || []).map((id) => imageById[id]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setStage(3);
      return;
    }
    setStage(0);
    const timers = [
      setTimeout(() => setStage(1), 600),
      setTimeout(() => setStage(2), 1400),
      setTimeout(() => setStage(3), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [activePanelIndex, prefersReducedMotion]);

  const replay = () => {
    if (prefersReducedMotion) {
      setStage(3);
      return;
    }
    setStage(0);
    setTimeout(() => setStage(1), 600);
    setTimeout(() => setStage(2), 1400);
    setTimeout(() => setStage(3), 2200);
  };

  return (
    <section id="debate" aria-label="Phản biện học thuật" className="py-20 md:py-28 px-4 md:px-8 border-b border-[var(--color-border-default)] bg-[var(--color-surface-secondary)]/40">
      <div className="max-w-content-lg mx-auto">
        <SectionHeader
          number="07"
          category="ĐỐI THOẠI HỌC THUẬT"
          title="Hai Cách Hiểu Cần Được Đối Chiếu"
          subtitle="Hai quan điểm thường gặp được đối chiếu bằng văn kiện lịch sử, cơ sở lý luận và lập luận phản hồi."
        />

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {debates.map((debate, index) => (
            <button
              key={debate.id}
              type="button"
              onClick={() => setActivePanelIndex(index)}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${activePanelIndex === index ? 'bg-[var(--color-accent-red)] text-white font-bold' : 'bg-[var(--color-surface-primary)] border border-[var(--color-border-default)]'}`}
            >
              Phản biện {String(index + 1).padStart(2, '0')}
            </button>
          ))}
        </div>

        <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-strong)] rounded-2xl p-6 md:p-10 shadow-[var(--shadow-md)]">
          <div className="flex items-center justify-between pb-6 border-b border-[var(--color-border-default)] mb-8 gap-4">
            <h3 className="font-serif font-bold text-xl md:text-2xl text-[var(--color-text-primary)]">Hồ sơ phản biện {activePanelIndex + 1}</h3>
            <Button variant="secondary" size="sm" onClick={replay} icon={<RotateCcw className="w-3.5 h-3.5" />}>Phát lại</Button>
          </div>

          <div className="space-y-6">
            <div className="p-5 rounded-xl border border-[var(--color-border-strong)] bg-white">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[var(--color-accent-red)] uppercase"><AlertCircle className="w-4 h-4" />Quan điểm phản biện</div>
              <p className="text-sm text-[var(--color-text-secondary)] font-serif">{currentDebate.counterArgument}</p>
            </div>

            <div className={`p-5 rounded-xl border bg-[var(--color-surface-secondary)] transition-all ${stage >= 1 ? 'opacity-100' : 'opacity-20'}`}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--color-accent-gold)] uppercase"><BookCheck className="w-4 h-4" />Dẫn chứng</div>
                <div className="flex flex-wrap gap-2">
                  {currentEvidence.flatMap((item) => item.sourceIds.slice(0, 1)).map((sourceId) => <SourceBadge key={sourceId} sourceId={sourceId} onClick={onOpenSource} />)}
                </div>
              </div>
              <ul className="space-y-2 text-sm text-[var(--color-text-primary)] font-serif">
                {currentEvidence.map((item) => <li key={item.id}>• {item.summary}</li>)}
              </ul>
              {currentImages.map((image) => (
                <figure key={image.id} className="mt-4 grid grid-cols-[112px_1fr] gap-4 items-center rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-3">
                  <img src={image.src} alt={image.alt} className="h-20 w-28 rounded object-cover" />
                  <figcaption className="text-xs text-[var(--color-text-secondary)]"><strong className="block text-[var(--color-text-primary)]">{image.title}</strong>{image.caption}</figcaption>
                </figure>
              ))}
            </div>

            <div className={`p-5 rounded-xl border bg-white transition-all ${stage >= 2 ? 'opacity-100' : 'opacity-20'}`}>
              <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[var(--color-accent-olive)] uppercase"><ShieldAlert className="w-4 h-4" />Phân tích</div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{currentDebate.analysis}</p>
            </div>

            <div className={`p-6 rounded-xl border-2 bg-[var(--color-accent-red)]/5 border-[var(--color-accent-red)] transition-all ${stage >= 3 ? 'opacity-100' : 'opacity-20'}`}>
              <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[var(--color-accent-red)] uppercase"><Sparkles className="w-4 h-4" />Lập luận phản hồi</div>
              <p className="text-base font-serif font-bold text-[var(--color-text-primary)] leading-relaxed">{currentDebate.rebuttal}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
