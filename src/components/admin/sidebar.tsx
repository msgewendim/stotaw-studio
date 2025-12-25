import { Link, useRouterState } from '@tanstack/react-router'
import { LayoutDashboard, FolderOpen, Image, Settings, LogOut } from 'lucide-react'
import { signOut, useUser } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'

const navItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin',
  },
  {
    label: 'Projects',
    icon: FolderOpen,
    href: '/admin/projects',
  },
  {
    label: 'Media',
    icon: Image,
    href: '/admin/media',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/admin/settings',
  },
]

export function Sidebar() {
  const { user } = useUser()
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/admin/login'
  }

  return (
    <aside className="w-64 fixed left-0 top-0 h-screen bg-card border-r border-border flex flex-col">
      {/* Logo area */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-1">
          <span className="font-serif text-xl tracking-wider">PORTFOLIO</span>
          <span className="text-accent text-xs">™</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPath === item.href || (item.href !== '/admin' && currentPath.startsWith(item.href))

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                ${
                  isActive
                    ? 'bg-accent/10 text-accent border-l-2 border-accent'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }
              `}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
            {user?.email?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.email || 'Admin'}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  )
}
