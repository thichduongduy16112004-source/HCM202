import React from 'react';
import { ArrowDown, Compass, Award } from 'lucide-react';
import { HistoricalImage } from '@/types';
import { Button } from '@/components/common/Button';

export interface HeroSectionProps {
  heroImage: HistoricalImage;
  onExplore: () => void;
  onOpenImage: (image: HistoricalImage) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroImage,
  onExplore,
  onOpenImage,
}) => {
  return (
    <section
      id="hero"
      aria-label="Khởi đầu: Độc lập Dân tộc & Chủ nghĩa Xã hội"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 md:px-8 border-b border-[var(--color-border-default)] overflow-hidden"
    >
      <div className="max-w-content-xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

        {/* Left Column: Academic Titles & Central Question */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">

          {/* Heritage Academic Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-secondary)] border border-[var(--color-border-strong)] text-xs font-mono text-[var(--color-accent-gold)]">
            <Award className="w-3.5 h-3.5 text-[var(--color-accent-red)]" />
            <span className="font-semibold tracking-wider uppercase">HỌC PHẦN HCM202 • ĐỀ TÀI SẢN PHẨM SÁNG TẠO</span>
          </div>

          {/* Main Title Banner */}
          <div className="space-y-2">
            <div className="text-xs md:text-sm font-mono tracking-widest uppercase text-[var(--color-text-muted)]">
              TRIỂN LÃM LỊCH SỬ SỐ × BÁO CÁO HỌC THUẬT
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold text-[var(--color-text-primary)] tracking-tight leading-[1.08]">
              ĐỘC LẬP DÂN TỘC <br />
              <span className="text-[var(--color-accent-red)]">&amp; CHỦ NGHĨA XÃ HỘI</span>
            </h1>

            <div className="text-lg md:text-2xl font-serif italic text-[var(--color-accent-gold)] pt-1">
              Mục tiêu – Con đường trong Di sản Tư tưởng Hồ Chí Minh
            </div>
          </div>

          {/* Central Question Box */}
          <div className="p-5 md:p-6 rounded-xl bg-[var(--color-surface-primary)] border-l-4 border-[var(--color-accent-red)] border-y border-r border-[var(--color-border-default)] shadow-[var(--shadow-sm)] space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent-red)] font-semibold flex items-center gap-2">
              <Compass className="w-4 h-4" />
              <span>CÂU HỎI NGHIÊN CỨU TRUNG TÂM</span>
            </div>
            <p className="text-base md:text-xl font-serif font-bold text-[var(--color-text-primary)] leading-snug">
              “Vì sao độc lập dân tộc và chủ nghĩa xã hội được đặt trong quan hệ thống nhất?”
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={onExplore}
              icon={<ArrowDown className="w-4 h-4" />}
            >
              Cuộn để khám phá
            </Button>

          </div>

        </div>

        {/* Right Column: Hero Visual Historical Evidence (40-60% Visual) */}
        <div className="lg:col-span-5">
          <div
            className="group relative rounded-2xl p-3 bg-[var(--color-surface-primary)] border border-[var(--color-border-strong)] shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-transform duration-500"
            title="Nhấn để phóng to hình ảnh tư liệu"
          >
            <button
              type="button"
              aria-label={`Phóng to ảnh ${heroImage.title}`}
              onClick={() => onOpenImage(heroImage)}
              className="absolute inset-0 z-10 rounded-2xl cursor-zoom-in"
            />
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-black/10">
              <img
                src={heroImage.src}
                alt={heroImage.alt}
                width="1200"
                height="900"
                loading="eager"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="px-2 py-0.5 rounded bg-[var(--color-accent-red)] text-white text-[10px] font-mono uppercase font-bold tracking-wider">
                  CHỨNG TÍCH LỊCH SỬ {heroImage.year}
                </span>
                <h3 className="font-serif font-bold text-base md:text-lg mt-1 text-white leading-tight">
                  {heroImage.title}
                </h3>
              </div>
            </div>

            <div className="p-3 text-xs text-[var(--color-text-secondary)] font-serif italic flex items-center justify-between">
              <span>{heroImage.caption}</span>
              <span className="text-[var(--color-accent-gold)] font-mono text-[11px] group-hover:underline shrink-0 ml-2">
                Phóng to ↗
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Bottom Scroll Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
          Cuộn để tiếp tục
        </span>
        <ArrowDown className="w-3.5 h-3.5 text-[var(--color-accent-gold)] animate-bounce" />
      </div>
    </section>
  );
};
