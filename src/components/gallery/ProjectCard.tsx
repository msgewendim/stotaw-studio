import { Link } from '@tanstack/react-router';
import type { Project } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      className="group block"
    >
      <Card
        className={cn(
          'relative overflow-hidden border-border/50 bg-card/50',
          'transition-all duration-500 ease-out',
          'hover:-translate-y-1 hover:border-accent/30',
          'animate-fade-up'
        )}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Image */}
        <div className="relative aspect-3/4 overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className={cn(
              'h-full w-full object-cover',
              'transition-transform duration-700 ease-out',
              'group-hover:scale-105'
            )}
          />

          {/* Hover overlay */}
          <div
            className={cn(
              'absolute inset-0 bg-background/80 backdrop-blur-sm',
              'flex items-center justify-center',
              'opacity-0 transition-opacity duration-300',
              'group-hover:opacity-100'
            )}
          >
            {project.hasVideo ? (
              <div className="flex flex-col items-center gap-2 text-foreground">
                <Icon name="play_circle" size={32} />
                <span className="text-xs tracking-widest font-mono">
                  WATCH PROCESS
                </span>
              </div>
            ) : (
              <span className="text-xs tracking-widest font-mono text-foreground">
                VIEW PROJECT →
              </span>
            )}
          </div>

          {/* Video badge */}
          {project.hasVideo && (
            <Badge
              variant="default"
              className={cn(
                'absolute top-3 right-3',
                'bg-accent text-accent-foreground',
                'transition-opacity duration-300',
                'group-hover:opacity-0'
              )}
            >
              <Icon name="play_arrow" size={12} className="mr-1" />
              VIDEO
            </Badge>
          )}
        </div>

        {/* Meta */}
        <div className="p-4">
          <h3 className="font-serif text-lg">{project.title}</h3>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-muted-foreground font-mono">
              {project.year}
            </span>
            {project.type === 'process' && (
              <Badge
                variant="outline"
                className="text-[10px] border-accent text-accent"
              >
                PROCESS
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
