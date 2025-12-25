import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import type { FilterOption } from '@/types';
import { ProjectCard } from '@/components/gallery/ProjectCard';
import { FilterPills } from '@/components/gallery/FilterPills';
import { MasonryGrid } from '@/components/gallery/MasonryGrid';
import { getFilteredProjects } from '@/data/projects';

export const Route = createFileRoute('/work/')({
  component: WorkPage,
});

function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  const filterOptions = [
    { value: 'all' as FilterOption, label: 'ALL' },
    { value: 'portrait' as FilterOption, label: 'PORTRAIT' },
    { value: 'landscape' as FilterOption, label: 'LANDSCAPE' },
    { value: 'process' as FilterOption, label: 'PROCESS' },
  ];

  const filteredProjects = getFilteredProjects(activeFilter);

  return (
    <div className="container mx-auto px-6 py-32">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-mono tracking-widest text-muted-foreground">
              SELECTED
            </p>
            <h1 className="text-5xl md:text-7xl font-serif font-light">
              WORK
            </h1>
          </div>

          {/* Filters */}
          <FilterPills
            options={filterOptions}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Projects Grid */}
        <MasonryGrid>
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </MasonryGrid>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              No projects found for this filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
