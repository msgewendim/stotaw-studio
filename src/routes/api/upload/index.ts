import { requireAuth } from '@/middleware/auth'
import { jsonResponse, errorResponse } from '@/lib/api-response'

// POST /api/upload - Upload file
export const POST = async ({ request }: { request: Request }) => {
  try {
    await requireAuth(request)

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return errorResponse('No file provided')
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return errorResponse('Only image files are allowed')
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return errorResponse('File size must be less than 5MB')
    }

    // TODO: Upload to S3/Cloudinary/etc
    // For now, return a mock URL
    const url = `/uploads/${Date.now()}-${file.name}`

    return jsonResponse({
      url,
      filename: file.name,
      size: file.size,
    })
  } catch (error) {
    if (error instanceof Response) {
      return error
    }
    return errorResponse('Failed to upload file', 500)
  }
}

// DELETE /api/upload - Delete file
export const DELETE = async ({ request }: { request: Request }) => {
  try {
    await requireAuth(request)

    const body = await request.json()
    const { url } = body

    if (!url) {
      return errorResponse('No URL provided')
    }

    // TODO: Delete from S3/Cloudinary/etc

    return jsonResponse({ success: true })
  } catch (error) {
    if (error instanceof Response) {
      return error
    }
    return errorResponse('Failed to delete file', 500)
  }
}
