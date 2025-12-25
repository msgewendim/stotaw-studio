// Helper functions for API responses

export function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function errorResponse(message: string, status = 400) {
  return jsonResponse({ error: message }, status)
}

export function unauthorizedResponse() {
  return errorResponse('Unauthorized', 401)
}

export function notFoundResponse() {
  return errorResponse('Not found', 404)
}

export function successResponse(data?: any) {
  return jsonResponse({ success: true, ...data })
}
