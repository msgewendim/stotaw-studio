import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Search, MoreVertical, FolderOpen } from 'lucide-react'
import { AdminHeader } from '@/components/admin/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const Route = createFileRoute('/admin/_layout/projects/')({
  component: ProjectsListPage,
})

// Sample data - replace with actual API data
const sampleProjects = [
  {
    id: '1',
    title: 'Aurora Study',
    status: 'published' as const,
    type: 'process',
    year: 2024,
    tags: ['portrait', 'digital'],
    updated: '2h ago',
    hasVideo: true,
  },
  {
    id: '2',
    title: 'Mountain Dawn',
    status: 'published' as const,
    type: 'single',
    year: 2024,
    tags: ['landscape'],
    updated: '1d ago',
    hasVideo: false,
  },
  {
    id: '3',
    title: 'Silent Observer',
    status: 'draft' as const,
    type: 'process',
    year: 2024,
    tags: ['portrait', 'sketch'],
    updated: '3d ago',
    hasVideo: false,
  },
  {
    id: '4',
    title: 'Urban Sketches',
    status: 'draft' as const,
    type: 'single',
    year: 2023,
    tags: ['sketch'],
    updated: '5d ago',
    hasVideo: false,
  },
  {
    id: '5',
    title: 'Digital Dreams',
    status: 'published' as const,
    type: 'process',
    year: 2024,
    tags: ['digital', 'study'],
    updated: '1w ago',
    hasVideo: true,
  },
  {
    id: '6',
    title: 'Coastal Views',
    status: 'published' as const,
    type: 'single',
    year: 2023,
    tags: ['landscape'],
    updated: '2w ago',
    hasVideo: false,
  },
]

function ProjectsListPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const filteredProjects = sampleProjects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' || project.status === statusFilter
    const matchesType = typeFilter === 'all' || project.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <>
      <AdminHeader
        title="Projects"
        action={{
          label: 'New Project',
          href: '/admin/projects/new',
        }}
      />

      <div className="p-6 space-y-6">
        {/* Header text */}
        <div>
          <p className="text-sm text-muted-foreground">
            Manage your portfolio projects
          </p>
        </div>

        {/* Filters bar */}
        <div className="flex gap-4">
          {/* Search */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="all">All Types</option>
            <option value="process">Process</option>
            <option value="single">Single</option>
          </select>

          {/* Sort */}
          <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <option>Newest</option>
            <option>Oldest</option>
            <option>A-Z</option>
            <option>Z-A</option>
          </select>
        </div>

        {/* Projects grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden border-border hover:border-accent/30 transition-all hover:-translate-y-0.5"
              >
                {/* Thumbnail */}
                <div className="aspect-[16/10] relative bg-muted">
                  {/* Status badge */}
                  <Badge
                    className={`absolute top-3 left-3 ${
                      project.status === 'published'
                        ? 'bg-green-500/10 text-green-500 border-green-500/20'
                        : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                    }`}
                  >
                    {project.status}
                  </Badge>

                  {/* Video indicator */}
                  {project.hasVideo && (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <CardContent className="p-4">
                  <h3 className="font-medium truncate mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {project.year} • {project.type} • {project.tags.length} tags
                  </p>
                </CardContent>

                {/* Footer */}
                <div className="px-4 pb-4 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    Updated {project.updated}
                  </span>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>
                        {project.status === 'published' ? 'Unpublish' : 'Publish'}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          // Empty state
          <div className="py-20 text-center space-y-4">
            <div className="flex justify-center">
              <FolderOpen className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium mb-1">No projects found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchQuery
                  ? 'Try adjusting your search filters'
                  : 'Create your first project to get started'}
              </p>
              <Link to="/admin/projects/new">
                <Button className="bg-accent hover:bg-accent/90 text-white">
                  Create Project
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
