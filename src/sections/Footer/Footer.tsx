import React from 'react';
export const Footer: React.FC = () => (
  <footer className="bg-[var(--color-dark-bg)] text-[var(--color-dark-text)] border-t border-white/10 py-16 px-4 md:px-8">
    <div className="max-w-content-xl mx-auto flex flex-col md:flex-row justify-between gap-6 items-start md:items-end">
      <div className="space-y-4">
        <div className="text-xs font-mono text-[var(--color-accent-gold)] uppercase tracking-wider font-semibold">HCM202 • MKT1802 • NHÓM 04</div>
        <div className="text-lg font-serif font-bold text-white">Độc Lập Dân Tộc &amp; Chủ Nghĩa Xã Hội</div>
      </div>
      <div className="text-xs font-mono text-white/55">Mục tiêu – Con đường trong di sản tư tưởng Hồ Chí Minh</div>
    </div>
  </footer>
);
