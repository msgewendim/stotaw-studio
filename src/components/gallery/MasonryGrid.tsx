import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MasonryGridProps {
  children: ReactNode;
  className?: string;
}

export function MasonryGrid({ children, className }: MasonryGridProps) {
  return (
    <div
      className={cn(
        'grid gap-6',
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        'auto-rows-auto',
        className
      )}
    >
      {children}
    </div>
  );
}
