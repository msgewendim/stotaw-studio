import { createFileRoute } from '@tanstack/react-router';
import { Hero } from '@/components/home/Hero';
import { ProjectCard } from '@/components/gallery/ProjectCard';
import { MasonryGrid } from '@/components/gallery/MasonryGrid';
import { projects } from '@/data/projects';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  // Get first 6 projects for featured section
  const featuredProjects = projects.slice(0, 6);

  return (
    <>
      <Hero />

      {/* Selected Works Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="space-y-2">
            <p className="text-xs font-mono tracking-widest text-muted-foreground">
              SELECTED
            </p>
            <h2 className="text-5xl md:text-6xl font-serif font-light">
              WORK
            </h2>
          </div>

          {/* Projects Grid */}
          <MasonryGrid>
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </MasonryGrid>

          {/* View All Link */}
          <div className="flex justify-center pt-8">
            <a
              href="/work"
              className="text-sm font-mono tracking-wider text-muted-foreground hover:text-accent transition-colors group"
            >
              VIEW ALL WORK
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}