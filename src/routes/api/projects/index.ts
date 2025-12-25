import { requireAuth } from '@/middleware/auth'
import { jsonResponse, errorResponse } from '@/lib/api-response'

// GET /api/projects - List all projects
export const GET = async ({ request }: { request: Request }) => {
  try {
    await requireAuth(request)

    // Parse query params
    const url = new URL(request.url)
    const status = url.searchParams.get('status')
    const type = url.searchParams.get('type')
    const search = url.searchParams.get('search')
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')

    // TODO: Fetch projects from database
    // For now, return mock data
    const projects = [
      {
        id: '1',
        title: 'Aurora Study',
        slug: 'aurora-study',
        status: 'published',
        type: 'process',
        year: 2024,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]

    return jsonResponse({
      projects,
      total: projects.length,
      page,
      totalPages: Math.ceil(projects.length / limit),
    })
  } catch (error) {
    if (error instanceof Response) {
      return error
    }
    return errorResponse('Failed to fetch projects', 500)
  }
}

// POST /api/projects - Create new project
export const POST = async ({ request }: { request: Request }) => {
  try {
    await requireAuth(request)

    const body = await request.json()

    // TODO: Validate and save to database
    const project = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return jsonResponse(project, 201)
  } catch (error) {
    if (error instanceof Response) {
      return error
    }
    return errorResponse('Failed to create project', 500)
  }
}
