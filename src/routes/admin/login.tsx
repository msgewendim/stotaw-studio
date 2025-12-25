import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { signIn } from '@/lib/auth-client'

export const Route = createFileRoute('/admin/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn.email({
        email,
        password,
      })

      if (result.error) {
        setError(result.error.message || 'Invalid email or password')
      } else {
        // Redirect to admin dashboard on success
        navigate({ to: '/admin' })
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-radial pointer-events-none opacity-50" />
      <div className="noise-overlay" />

      {/* Login card */}
      <Card className="w-full max-w-md relative z-10 border-border bg-card/95 backdrop-blur animate-fade-in">
        <CardHeader className="space-y-2 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-1 mb-2">
            <span className="font-serif text-2xl tracking-wider">PORTFOLIO</span>
            <span className="text-accent text-sm">™</span>
          </div>

          <CardTitle className="text-2xl font-serif">Admin Login</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Sign in to manage your portfolio
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="hello@artist.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-card border-border focus:border-accent"
                disabled={isLoading}
              />
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-card border-border focus:border-accent pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="text-sm text-red-500 animate-shake">
                {error}
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-white transition-all hover:-translate-y-0.5"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </CardContent>

          <CardFooter className="justify-center">
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to site
            </a>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
