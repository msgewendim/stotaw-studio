export function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-3 animate-fade-up">
      {/* Mouse Icon */}
      <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
        <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-scroll-wheel" />
      </div>

      {/* Vertical Text */}
      <div className="flex flex-col gap-1">
        {['S', 'C', 'R', 'O', 'L', 'L'].map((letter, index) => (
          <span
            key={index}
            className="text-xs font-mono text-muted-foreground tracking-widest"
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
