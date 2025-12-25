export interface ProjectStage {
  label: string;
  timestamp: number;
}

export type FilterOption = 'all' | 'portrait' | 'landscape' | 'process';

export type ProjectType = 'single' | 'process';

export type VideoProvider = 'youtube' | 'vimeo' | 'mux';

export interface Project {
  id: number;
  title: string;
  slug: string;
  year: number;
  tag: FilterOption;
  type: ProjectType;
  hasVideo: boolean;
  thumbnail: string;
  description?: string;
  stages?: Array<ProjectStage>;
  videoId?: string;
  videoProvider?: VideoProvider;
  duration?: number;
}
