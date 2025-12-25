import { auth } from '@/lib/auth'

export async function requireAuth(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  if (!session) {
    throw new Response('Unauthorized', {
      status: 302,
      headers: {
        Location: '/admin/login',
      },
    })
  }

  return { user: session.user, session: session.session }
}

export async function getOptionalAuth(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    return { user: session?.user ?? null, session: session?.session ?? null }
  } catch {
    return { user: null, session: null }
  }
}
