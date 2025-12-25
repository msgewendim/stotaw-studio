import { betterAuth } from "better-auth"

// For production, replace this with a proper database adapter
// Example with Drizzle:
// import { drizzleAdapter } from "better-auth/adapters/drizzle"
// import { db } from "./db"

export const auth = betterAuth({
  database: {
    // Using memory database for development
    // In production, use a proper database adapter:
    // drizzleAdapter(db, { provider: "sqlite" }) or similar
    provider: "memory",
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false,
    },
  },
  secret: process.env.BETTER_AUTH_SECRET || "default-secret-change-in-production",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  trustedOrigins: [
    "http://localhost:3000",
    process.env.BETTER_AUTH_URL || "",
  ].filter(Boolean),
})

// Export types for TypeScript
export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user
