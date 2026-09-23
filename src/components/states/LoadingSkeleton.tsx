import React from 'react';

export interface LoadingSkeletonProps {
  type?: 'hero' | 'card' | 'image' | 'evidence' | 'source' | 'timeline';
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type = 'card',
  className = '',
}) => {
  if (type === 'hero') {
    return (
      <div className={`w-full max-w-content-lg mx-auto p-8 space-y-6 ${className}`}>
        <div className="w-32 h-6 rounded animate-shimmer" />
        <div className="w-3/4 h-16 rounded animate-shimmer" />
        <div className="w-1/2 h-8 rounded animate-shimmer" />
        <div className="w-full h-80 rounded-lg animate-shimmer" />
      </div>
    );
  }

  if (type === 'image') {
    return (
      <div className={`w-full aspect-[4/3] rounded-md animate-shimmer ${className}`} />
    );
  }

  if (type === 'evidence') {
    return (
      <div className={`p-6 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] space-y-4 ${className}`}>
        <div className="flex justify-between items-center">
          <div className="w-24 h-5 rounded animate-shimmer" />
          <div className="w-16 h-5 rounded animate-shimmer" />
        </div>
        <div className="w-full h-12 rounded animate-shimmer" />
        <div className="w-5/6 h-4 rounded animate-shimmer" />
      </div>
    );
  }

  if (type === 'source') {
    return (
      <div className={`p-4 rounded border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] space-y-2 ${className}`}>
        <div className="w-20 h-4 rounded animate-shimmer" />
        <div className="w-3/4 h-5 rounded animate-shimmer" />
        <div className="w-1/2 h-3 rounded animate-shimmer" />
      </div>
    );
  }

  // Default 'card'
  return (
    <div className={`p-6 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] space-y-4 ${className}`}>
      <div className="w-12 h-6 rounded animate-shimmer" />
      <div className="w-3/4 h-7 rounded animate-shimmer" />
      <div className="w-full h-16 rounded animate-shimmer" />
      <div className="flex justify-between items-center pt-2">
        <div className="w-24 h-4 rounded animate-shimmer" />
        <div className="w-20 h-6 rounded animate-shimmer" />
      </div>
    </div>
  );
};
