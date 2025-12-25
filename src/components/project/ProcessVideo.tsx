import type { ProjectStage, VideoProvider } from '@/types';
import { cn } from '@/lib/utils';

interface ProcessVideoProps {
  videoId?: string;
  provider?: VideoProvider;
  stages?: Array<ProjectStage>;
  duration?: number;
  onStageChange?: (index: number) => void;
}

export function ProcessVideo({
  videoId,
  provider,
  stages = [],
  duration = 0,
}: ProcessVideoProps) {
  // Early return if required props are missing
  if (!videoId || !provider) {
    return (
      <div className="aspect-video bg-muted rounded-lg border border-border flex items-center justify-center">
        <p className="text-muted-foreground">Video not available</p>
      </div>
    );
  }

  const getEmbedUrl = () => {
    switch (provider) {
      case 'youtube':
        return `https://www.youtube.com/embed/${videoId}?rel=0`;
      case 'vimeo':
        return `https://player.vimeo.com/video/${videoId}`;
      case 'mux':
        return `https://stream.mux.com/${videoId}.m3u8`;
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <div className="relative aspect-video bg-card rounded-lg overflow-hidden border border-border group">
        <iframe
          src={getEmbedUrl()}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Process video"
        />
      </div>

      {/* Stage Navigation */}
      {stages.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-mono tracking-wider text-muted-foreground">
            PROCESS STAGES
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stages.map((stage, index) => (
              <button
                key={stage.label}
                className={cn(
                  'p-4 rounded-lg border transition-all text-left',
                  'hover:border-accent/50 hover:bg-accent/5',
                  'border-border'
                )}
              >
                <span className="text-xs font-mono text-accent block mb-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm">{stage.label}</span>
                <span className="text-xs text-muted-foreground block mt-1">
                  {formatTime(stage.timestamp)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Video Info */}
      {duration > 0 && (
        <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
          <span>DURATION: {formatTime(duration)}</span>
          <span className="text-border">•</span>
          <span>{stages.length} STAGES</span>
        </div>
      )}
    </div>
  );
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
