import React from 'react';
import { Archive, RefreshCw } from 'lucide-react';
import { Button } from '@/components/common/Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Chưa có tư liệu cho phần này',
  description = 'Tư liệu và minh chứng đang được cập nhật từ hồ sơ lưu trữ chính thức.',
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div className={`p-10 rounded-lg border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface-secondary)]/50 text-center max-w-md mx-auto my-8 ${className}`}>
      <div className="w-12 h-12 rounded-full bg-[var(--color-surface-primary)] border border-[var(--color-border-default)] flex items-center justify-center mx-auto mb-4 text-[var(--color-accent-gold)]">
        <Archive className="w-6 h-6" />
      </div>
      <h4 className="text-lg font-serif font-bold text-[var(--color-text-primary)] mb-1">
        {title}
      </h4>
      <p className="text-xs text-[var(--color-text-secondary)] mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction} icon={<RefreshCw className="w-3.5 h-3.5" />}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
