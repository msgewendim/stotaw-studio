import { Link, createFileRoute, notFound } from '@tanstack/react-router';
import { ProcessVideo } from '@/components/project/ProcessVideo';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { getAdjacentProjects, getProjectBySlug } from '@/data/projects';

export const Route = createFileRoute('/work/$slug')({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) {
      throw notFound();
    }
    const { prev, next } = getAdjacentProjects(params.slug);
    return { project, prev, next };
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { project, prev, next } = Route.useLoaderData();

  return (
    <div className="container mx-auto px-6 py-32">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif font-light">
            {project.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-mono text-muted-foreground">
              {project.year}
            </span>
            <span className="text-border">•</span>
            <Badge variant="outline" className="text-xs border-accent text-accent uppercase">
              {project.tag}
            </Badge>
            {project.type === 'process' && (
              <>
                <span className="text-border">•</span>
                <Badge variant="outline" className="text-xs">
                  PROCESS
                </Badge>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        {project.type === 'process' && project.hasVideo ? (
          /* Process Video View */
          <ProcessVideo
            videoId={project.videoId}
            provider={project.videoProvider}
            stages={project.stages}
            duration={project.duration}
          />
        ) : (
          /* Single Image View */
          <div className="space-y-6">
            <div className="relative w-full max-h-[85vh] overflow-hidden rounded-lg border border-border">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}

        {/* Description */}
        {project.description && (
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-12 border-t border-border">
          {prev ? (
            <Link
              to="/work/$slug"
              params={{ slug: prev.slug }}
              className="group flex items-center gap-2 text-sm font-mono tracking-wider text-muted-foreground hover:text-accent transition-colors"
            >
              <Icon
                name="arrow_back"
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />
              <span>PREVIOUS</span>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              to="/work/$slug"
              params={{ slug: next.slug }}
              className="group flex items-center gap-2 text-sm font-mono tracking-wider text-muted-foreground hover:text-accent transition-colors"
            >
              <span>NEXT</span>
              <Icon
                name="arrow_forward"
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
