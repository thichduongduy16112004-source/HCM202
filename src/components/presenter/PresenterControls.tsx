import React from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, X, Clock, Monitor } from 'lucide-react';
import { SectionId } from '@/types';
import { presentationSections } from '@/data/presentation';

export interface PresenterControlsProps {
  isActive: boolean;
  isPlaying: boolean;
  activeSection: SectionId;
  timeRemaining: number;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onExit: () => void;
  onSelectSection: (id: SectionId) => void;
}

export const PresenterControls: React.FC<PresenterControlsProps> = ({
  isActive,
  isPlaying,
  activeSection,
  timeRemaining,
  onTogglePlay,
  onNext,
  onPrev,
  onExit,
  onSelectSection,
}) => {
  if (!isActive) return null;

  const currentSection = presentationSections.find(s => s.id === activeSection) || presentationSections[0];
  const currentIndex = presentationSections.findIndex(s => s.id === activeSection);
  const total = presentationSections.length;
  const progressPercent = Math.max(0, Math.min(100, ((currentSection.presentationDuration - timeRemaining) / currentSection.presentationDuration) * 100));

  return (
    <aside aria-label="Bảng điều khiển thuyết trình" className="presenter-controls fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-[92vw] bg-[var(--color-dark-surface)]/95 backdrop-blur-md text-[var(--color-dark-text)] border border-white/20 rounded-2xl shadow-[var(--shadow-lg)] p-3 md:px-5 md:py-3.5 flex flex-col gap-2 transition-colors duration-300">

      {/* Top row: Section meta & countdown timer */}
      <div className="flex items-center justify-between text-xs font-mono pb-1 border-b border-white/10">
        <div className="flex items-center gap-2 truncate">
          <Monitor className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
          <span className="text-[var(--color-accent-gold)] font-bold">PRESENTER MODE:</span>
          <span className="truncate text-white/90">[{String(currentSection.order).padStart(2, '0')}] {currentSection.title}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Clock className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
          <span className="font-bold text-white tabular-nums">{timeRemaining}s</span>
          <span className="text-white/40">({currentIndex + 1}/{total})</span>
        </div>
      </div>

      {/* Section progress mini bar */}
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full origin-left bg-[var(--color-accent-gold)] transition-transform duration-1000 ease-linear"
          style={{ transform: `scaleX(${progressPercent / 100})` }}
        />
      </div>

      {/* Bottom row: Control buttons */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5">
          {/* Previous button */}
          <button
            type="button"
            onClick={onPrev}
            aria-label="Phần trước (Phím mũi tên trái)"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
            title="Phần trước [←]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Play / Pause button */}
          <button
            type="button"
            onClick={onTogglePlay}
            aria-label={isPlaying ? 'Tạm dừng (Phím Space)' : 'Tiếp tục tự động (Phím Space)'}
            className="px-4 py-2 rounded-lg bg-[var(--color-accent-red)] hover:bg-[var(--color-accent-red-hover)] text-white font-medium text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            title="Tạm dừng / Tiếp tục [Space]"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Tạm dừng</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Phát tự động</span>
              </>
            )}
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={onNext}
            aria-label="Phần kế tiếp (Phím mũi tên phải)"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
            title="Phần kế tiếp [→]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Scene Quick Switcher dropdown */}
        <div className="hidden sm:block">
          <select
            value={activeSection}
            onChange={(e) => onSelectSection(e.target.value as SectionId)}
            className="bg-black/50 text-white text-xs rounded border border-white/20 px-2 py-1.5 font-mono focus:border-[var(--color-accent-gold)]"
          >
            {presentationSections.map(s => (
              <option key={s.id} value={s.id}>
                {String(s.order).padStart(2, '0')}. {s.title} ({s.presentationDuration}s)
              </option>
            ))}
          </select>
        </div>

        {/* Exit Button */}
        <button
          type="button"
          onClick={onExit}
          aria-label="Thoát chế độ thuyết trình (Phím Esc)"
          className="p-2 rounded-lg bg-white/5 hover:bg-white/20 text-white/80 hover:text-white transition-colors flex items-center gap-1 text-xs font-mono"
          title="Thoát [Esc]"
        >
          <X className="w-4 h-4" />
          <span className="hidden md:inline">Thoát</span>
        </button>
      </div>
    </aside>
  );
};
