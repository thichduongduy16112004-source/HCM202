import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

export interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: string;
  caption?: string;
  fallbackText?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Tư liệu lịch sử',
  aspectRatio = '4/3',
  caption,
  fallbackText = 'Không thể tải hình ảnh tư liệu',
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`relative overflow-hidden bg-[var(--color-surface-secondary)] border border-[var(--color-border-default)] rounded-md ${containerClassName}`}>
      {/* Aspect Ratio Box */}
      <div
        className="w-full relative overflow-hidden"
        style={{ aspectRatio }}
      >
        {/* Loading shimmer */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 animate-shimmer z-10" />
        )}

        {/* Error Fallback */}
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)]">
            <ImageOff className="w-8 h-8 mb-2 opacity-60 text-[var(--color-accent-red)]" />
            <span className="text-xs font-mono">{fallbackText}</span>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            className={`w-full h-full object-cover transition-transform duration-500 ease-out ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
            {...props}
          />
        )}
      </div>

      {caption && (
        <figcaption className="p-3 text-xs text-[var(--color-text-secondary)] bg-[var(--color-surface-primary)] border-t border-[var(--color-border-default)] font-serif italic line-clamp-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
