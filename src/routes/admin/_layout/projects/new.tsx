import { createFileRoute } from '@tanstack/react-router'
import { ProjectForm } from '@/components/admin/project-form'
import { AdminHeader } from '@/components/admin/header'

export const Route = createFileRoute('/admin/_layout/projects/new')({
  component: NewProjectPage,
})

function NewProjectPage() {
  const handleSubmit = async (data: any) => {
    console.log('Create project:', data)
    // TODO: Call API to create project
  }

  return (
    <>
      <AdminHeader title="Create Project" />
      <div className="p-6">
        <ProjectForm onSubmit={handleSubmit} />
      </div>
    </>
  )
}
