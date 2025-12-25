import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Sidebar } from '@/components/admin/sidebar'
import { ProtectedRoute } from '@/components/auth/protected-route'

export const Route = createFileRoute('/admin/_layout')({
  component: AdminLayout,
})

function AdminLayout() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="ml-64">
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  )
}
