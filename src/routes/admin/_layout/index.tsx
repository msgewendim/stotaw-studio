import { createFileRoute, Link } from '@tanstack/react-router'
import { FolderOpen, Eye, FileEdit, BarChart, Pencil, Trash, ExternalLink } from 'lucide-react'
import { AdminHeader } from '@/components/admin/header'
import { StatsCard } from '@/components/admin/stats-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const Route = createFileRoute('/admin/_layout/')({
  component: AdminDashboard,
})

// Sample data - replace with actual data from API
const stats = {
  totalProjects: 24,
  published: 18,
  drafts: 6,
  totalViews: '12.4k',
}

const recentProjects = [
  {
    id: '1',
    title: 'Aurora Study',
    status: 'published' as const,
    type: 'process',
    updated: '2 hours ago',
    thumbnail: null,
  },
  {
    id: '2',
    title: 'Mountain Dawn',
    status: 'published' as const,
    type: 'single',
    updated: '1 day ago',
    thumbnail: null,
  },
  {
    id: '3',
    title: 'Silent Observer',
    status: 'draft' as const,
    type: 'process',
    updated: '3 days ago',
    thumbnail: null,
  },
  {
    id: '4',
    title: 'Urban Sketches',
    status: 'draft' as const,
    type: 'single',
    updated: '5 days ago',
    thumbnail: null,
  },
  {
    id: '5',
    title: 'Digital Dreams',
    status: 'published' as const,
    type: 'process',
    updated: '1 week ago',
    thumbnail: null,
  },
]

function AdminDashboard() {
  return (
    <>
      <AdminHeader
        title="Dashboard"
        action={{
          label: 'New Project',
          href: '/admin/projects/new',
        }}
      />

      <div className="p-6 space-y-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Projects"
            value={stats.totalProjects}
            icon={FolderOpen}
            trend={{ value: '12%', positive: true }}
          />
          <StatsCard title="Published" value={stats.published} icon={Eye} />
          <StatsCard title="Drafts" value={stats.drafts} icon={FileEdit} />
          <StatsCard title="Total Views" value={stats.totalViews} icon={BarChart} />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4">
          <Link to="/admin/projects/new">
            <Button className="bg-accent hover:bg-accent/90 text-white">
              Create New Project
            </Button>
          </Link>
          <Button variant="outline">Upload Media</Button>
          <Button variant="ghost">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Site
          </Button>
        </div>

        {/* Recent Projects Table */}
        <div>
          <h2 className="font-serif text-lg mb-4">Recent Projects</h2>

          <div className="rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Thumbnail</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentProjects.map((project) => (
                  <TableRow
                    key={project.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell>
                      <div className="w-12 h-12 rounded bg-muted" />
                    </TableCell>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          project.status === 'published' ? 'default' : 'secondary'
                        }
                        className={
                          project.status === 'published'
                            ? 'bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20'
                            : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20'
                        }
                      >
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground capitalize">
                      {project.type}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {project.updated}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:text-red-500"
                          title="Delete"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          title="View"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}
