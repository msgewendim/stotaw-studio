import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:3000",
})

// Export commonly used auth functions
export const {
  useSession,
  signIn,
  signUp,
  signOut,
  $fetch,
} = authClient

// Custom hook for user data
export function useUser() {
  const session = useSession()
  return {
    user: session.data?.user ?? null,
    isLoading: session.isPending,
    isAuthenticated: !!session.data?.user,
  }
}

// Custom hook for auth state
export function useAuth() {
  const session = useSession()

  return {
    user: session.data?.user ?? null,
    session: session.data?.session ?? null,
    isLoading: session.isPending,
    isAuthenticated: !!session.data?.user,
    signIn,
    signUp,
    signOut,
  }
}
