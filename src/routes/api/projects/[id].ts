import { requireAuth } from '@/middleware/auth'
import { jsonResponse, errorResponse, notFoundResponse, successResponse } from '@/lib/api-response'

// GET /api/projects/:id - Get single project
export const GET = async ({ request, params }: { request: Request; params: { id: string } }) => {
  try {
    await requireAuth(request)

    const { id } = params

    // TODO: Fetch from database
    const project = {
      id,
      title: 'Aurora Study',
      slug: 'aurora-study',
      status: 'published',
      type: 'process',
      year: 2024,
      tags: ['portrait', 'digital'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    if (!project) {
      return notFoundResponse()
    }

    return jsonResponse(project)
  } catch (error) {
    if (error instanceof Response) {
      return error
    }
    return errorResponse('Failed to fetch project', 500)
  }
}

// PUT /api/projects/:id - Update project
export const PUT = async ({ request, params }: { request: Request; params: { id: string } }) => {
  try {
    await requireAuth(request)

    const { id } = params
    const body = await request.json()

    // TODO: Update in database
    const project = {
      id,
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return jsonResponse(project)
  } catch (error) {
    if (error instanceof Response) {
      return error
    }
    return errorResponse('Failed to update project', 500)
  }
}

// DELETE /api/projects/:id - Delete project
export const DELETE = async ({ request, params }: { request: Request; params: { id: string } }) => {
  try {
    await requireAuth(request)

    const { id } = params

    // TODO: Delete from database and remove associated media

    return successResponse()
  } catch (error) {
    if (error instanceof Response) {
      return error
    }
    return errorResponse('Failed to delete project', 500)
  }
}
