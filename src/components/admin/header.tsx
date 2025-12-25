import { Link } from '@tanstack/react-router'
import { Plus, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AdminHeaderProps {
  title: string
  action?: {
    label: string
    href: string
  }
}

export function AdminHeader({ title, action }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left: Page title */}
        <h1 className="font-serif text-xl">{title}</h1>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {action && (
            <Link to={action.href}>
              <Button className="bg-accent hover:bg-accent/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                {action.label}
              </Button>
            </Link>
          )}

          <Button variant="ghost" size="sm" className="h-9 w-9 p-0" title="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
