import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ScrollIndicator } from './ScrollIndicator';
import { Icon } from '@/components/ui/icon';

export function Hero() {
  const [lettersRevealed, setLettersRevealed] = useState(0);
  const title = ['CRAFTING', 'VISUAL', 'STORIES'];

  useEffect(() => {
    // Trigger letter reveal animation
    const totalLetters = title.join('').length;
    const interval = setInterval(() => {
      setLettersRevealed((prev) => {
        if (prev >= totalLetters) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const renderAnimatedWord = (word: string, wordIndex: number) => {
    const previousLetters = title
      .slice(0, wordIndex)
      .join('').length;

    return (
      <div key={wordIndex} className="flex">
        {word.split('').map((letter, letterIndex) => {
          const globalIndex = previousLetters + letterIndex;
          const isRevealed = globalIndex < lettersRevealed;

          return (
            <span
              key={letterIndex}
              className={`inline-block animate-letter ${wordIndex === 1 ? 'text-accent' : ''
                }`}
              style={{
                animationDelay: `${globalIndex * 50}ms`,
                opacity: isRevealed ? 1 : 0,
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side */}
          <div className="space-y-8">
            {/* Tag */}
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-accent" />
              <span className="text-xs font-mono tracking-widest text-muted-foreground">
                DIGITAL ARTIST
              </span>
            </div>

            {/* Animated Title */}
            <div className="space-y-2">
              {title.map((word, index) => (
                <h1
                  key={index}
                  className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-none"
                >
                  {renderAnimatedWord(word, index)}
                </h1>
              ))}
            </div>

            {/* Subtitle */}
            <p className="text-lg text-muted-foreground max-w-md">
              Digital sketches exploring the boundaries between reality and
              imagination
            </p>

            {/* CTA Button */}
            <Link
              to="/work"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-accent-foreground px-6 py-3 rounded-full transition-colors group"
            >
              <span className="font-mono text-sm tracking-wider">VIEW WORK</span>
              <Icon
                name="arrow_forward"
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Right Side */}
          <div className="relative">
            {/* Featured Artwork Frame */}
            <div className="relative aspect-4/5 max-w-md mx-auto">
              <div className="absolute inset-0 border border-border rounded-lg overflow-hidden">
                <img
                  src="/aurora-study.jpg"
                  alt="Featured artwork"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full flex items-center gap-2 animate-float shadow-lg">
                <Icon name="play_arrow" size={16} />
                <span className="text-xs font-mono tracking-wider">
                  TIMELAPSE
                </span>
              </div>
            </div>

            {/* Video Progress Bar */}
            <div className="mt-6 space-y-3">
              {/* Stage Indicators */}
              <div className="flex items-center gap-2">
                {['Sketch', 'Lines', 'Color', 'Final'].map((stage, index) => (
                  <div key={stage} className="flex-1">
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-1000"
                        style={{ width: index === 0 ? '100%' : '0%' }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground mt-1 block">
                      {stage}
                    </span>
                  </div>
                ))}
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                <span>2024</span>
                <span className="text-border">•</span>
                <span>Process Video</span>
                <span className="text-border">•</span>
                <span>2:34</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-6 hidden lg:block">
        <ScrollIndicator />
      </div>
    </section>
  );
}
