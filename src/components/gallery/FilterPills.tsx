import type { FilterOption } from '@/types';
import { cn } from '@/lib/utils';

interface FilterPillsProps {
  options: Array<{ value: FilterOption; label: string }>;
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
}

export function FilterPills({
  options,
  activeFilter,
  onFilterChange,
}: FilterPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onFilterChange(option.value)}
          className={cn(
            'px-4 py-2 rounded-full text-xs font-mono tracking-wider',
            'border transition-all duration-300',
            'hover:border-accent/50',
            activeFilter === option.value
              ? 'border-accent bg-accent/10 text-accent'
              : 'border-border text-muted-foreground hover:text-foreground'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
