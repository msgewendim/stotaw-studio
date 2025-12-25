import type { Project } from '@/types';

export const projects: Array<Project> = [
  {
    id: 1,
    title: 'Aurora Study',
    slug: 'aurora-study',
    year: 2024,
    tag: 'portrait',
    type: 'process',
    hasVideo: true,
    thumbnail: '/aurora-study.jpg',
    description: 'A digital portrait exploring ethereal light and color, capturing the mystical essence of aurora borealis through human form.',
    videoId: 'dQw4w9WgXcQ', // Placeholder YouTube ID
    videoProvider: 'youtube',
    duration: 154,
    stages: [
      { label: 'Initial Sketch', timestamp: 0 },
      { label: 'Line Work', timestamp: 38 },
      { label: 'Base Colors', timestamp: 77 },
      { label: 'Final Render', timestamp: 115 },
    ],
  },
  {
    id: 2,
    title: 'Mountain Dawn',
    slug: 'mountain-dawn',
    year: 2024,
    tag: 'landscape',
    type: 'single',
    hasVideo: false,
    thumbnail: '/mountain-dawn.jpg',
    description: 'A serene landscape capturing the first light of dawn breaking over mountain peaks, painted with warm golden tones.',
  },
  {
    id: 3,
    title: 'Silent Observer',
    slug: 'silent-observer',
    year: 2023,
    tag: 'portrait',
    type: 'process',
    hasVideo: true,
    thumbnail: '/silent-observer.jpg',
    description: 'A contemplative portrait study focusing on subtle expressions and the quiet power of observation.',
    videoId: 'jNQXAC9IVRw', // Placeholder YouTube ID
    videoProvider: 'youtube',
    duration: 128,
    stages: [
      { label: 'Rough Sketch', timestamp: 0 },
      { label: 'Refined Lines', timestamp: 43 },
      { label: 'Color Application', timestamp: 85 },
    ],
  },
  {
    id: 4,
    title: 'Winter Solstice',
    slug: 'winter-solstice',
    year: 2024,
    tag: 'landscape',
    type: 'single',
    hasVideo: false,
    thumbnail: '/winter-solstice.jpg',
    description: 'A peaceful winter landscape celebrating the quiet beauty of the longest night of the year.',
  },
  {
    id: 5,
    title: 'Ethereal Light',
    slug: 'ethereal-light',
    year: 2023,
    tag: 'portrait',
    type: 'single',
    hasVideo: false,
    thumbnail: '/ethereal-light.jpg',
    description: 'An abstract exploration of light and form, where reality dissolves into luminous particles.',
  },
  {
    id: 6,
    title: 'Frozen Lake',
    slug: 'frozen-lake',
    year: 2024,
    tag: 'landscape',
    type: 'process',
    hasVideo: true,
    thumbnail: '/frozen-lake.jpg',
    description: 'A detailed study of ice formations and reflections on a frozen lake, exploring texture and atmosphere.',
    videoId: 'M7lc1UVf-VE', // Placeholder YouTube ID
    videoProvider: 'youtube',
    duration: 186,
    stages: [
      { label: 'Composition', timestamp: 0 },
      { label: 'Values', timestamp: 47 },
      { label: 'Color', timestamp: 93 },
      { label: 'Details', timestamp: 140 },
    ],
  },
];

// Helper function to get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

// Helper function to get filtered projects
export function getFilteredProjects(filter: string): Array<Project> {
  if (filter === 'all') return projects;
  if (filter === 'process') return projects.filter((p) => p.type === 'process');
  return projects.filter((p) => p.tag === filter);
}

// Helper function to get next/previous project
export function getAdjacentProjects(currentSlug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1) return { prev: null, next: null };

  return {
    prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null,
  };
}
