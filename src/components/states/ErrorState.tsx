import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/common/Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Không thể tải nội dung tư liệu',
  message = 'Đã xảy ra lỗi khi truy xuất dữ liệu lưu trữ. Vui lòng kiểm tra kết nối hoặc thử lại.',
  onRetry,
  className = '',
}) => {
  return (
    <div className={`p-8 rounded-lg border border-[var(--color-accent-red)]/30 bg-[var(--color-surface-primary)] text-center max-w-md mx-auto my-8 shadow-[var(--shadow-sm)] ${className}`}>
      <div className="w-12 h-12 rounded-full bg-[var(--color-accent-red)]/10 text-[var(--color-accent-red)] flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h4 className="text-lg font-serif font-bold text-[var(--color-text-primary)] mb-2">
        {title}
      </h4>
      <p className="text-sm text-[var(--color-text-secondary)] mb-6 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button variant="primary" size="sm" onClick={onRetry} icon={<RefreshCcw className="w-3.5 h-3.5" />}>
          Thử tải lại
        </Button>
      )}
    </div>
  );
};
