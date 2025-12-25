import { cn } from '@/lib/utils';
import { MaterialSymbolName } from '@/types/materialSymbols';

interface IconProps {
  name: MaterialSymbolName;
  size?: number | string;
  className?: string;
  filled?: boolean;
}

/**
 * Icon component using Google Material Symbols
 * 
 * @param name - The Material Symbol icon name (e.g., 'menu', 'close', 'play_arrow')
 * @param size - Size in pixels or as a string (e.g., 24, '32px', '2rem')
 * @param className - Additional CSS classes
 * @param filled - Whether to use filled variant (default: false for outlined)
 * 
 * @see https://fonts.google.com/icons for available icon names
 */
export function Icon({ name, size = 24, className, filled = false }: IconProps) {
  const sizeValue = typeof size === 'number' ? `${size}px` : size;

  return (
    <span
      className={cn(
        'material-symbols-outlined',
        filled && 'material-symbols-filled',
        className
      )}
      style={{ fontSize: sizeValue }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}


