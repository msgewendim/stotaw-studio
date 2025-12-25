# Better Auth Admin Dashboard

This project now includes a complete authentication system and admin dashboard built with Better Auth, TanStack Start, and shadcn/ui.

## Features

### Authentication
- ✅ Email/password authentication
- ✅ Session management (7-day sessions)
- ✅ Protected routes with middleware
- ✅ Secure cookies in production
- ✅ CSRF protection

### Admin Dashboard
- ✅ Dark theme matching portfolio design
- ✅ Responsive sidebar navigation
- ✅ Dashboard with stats cards
- ✅ Projects management (list, create, edit, delete)
- ✅ Media upload components
- ✅ Settings page
- ✅ Toast notifications

### Project Management
- ✅ Single image projects
- ✅ Process projects with multiple stages
- ✅ Video embeds (YouTube, Vimeo, direct URL)
- ✅ Drag & drop stage reordering
- ✅ Tag management
- ✅ Publish/draft status
- ✅ SEO-friendly slugs

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```

   Required variables:
   - `BETTER_AUTH_SECRET`: A secure random string for session encryption
   - `BETTER_AUTH_URL`: Your app's URL (http://localhost:3000 in development)
   - `DATABASE_URL`: Your database connection string (optional for development)

3. **Generate a secure secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Access the admin:**
   - Login page: `http://localhost:3000/admin/login`
   - Dashboard: `http://localhost:3000/admin`

## Production Setup

For production, you MUST:

1. **Use a real database:**
   - Configure Drizzle or Prisma with PostgreSQL/MySQL/SQLite
   - Update `src/lib/auth.ts` to use a database adapter:
     ```typescript
     import { drizzleAdapter } from "better-auth/adapters/drizzle"
     import { db } from "./db"

     export const auth = betterAuth({
       database: drizzleAdapter(db, { provider: "postgresql" }),
       // ... rest of config
     })
     ```

2. **Set secure environment variables:**
   - Generate a strong `BETTER_AUTH_SECRET`
   - Set `BETTER_AUTH_URL` to your production domain
   - Set `NODE_ENV=production`

3. **Configure file uploads:**
   - Set up S3, Cloudinary, or another storage service
   - Update upload API route in `src/routes/api/upload/index.ts`

4. **Enable email verification (recommended):**
   ```typescript
   emailAndPassword: {
     enabled: true,
     requireEmailVerification: true, // Enable this
   }
   ```

## File Structure

```
src/
├── routes/
│   ├── admin/
│   │   ├── _layout.tsx          # Admin layout with sidebar
│   │   ├── _layout/
│   │   │   ├── index.tsx        # Dashboard
│   │   │   ├── projects/
│   │   │   │   ├── index.tsx    # Projects list
│   │   │   │   └── new.tsx      # Create project
│   │   │   └── settings.tsx     # Settings page
│   │   └── login.tsx            # Login page
│   └── api/
│       ├── auth/[...all].ts     # Better Auth handler
│       ├── projects/
│       │   ├── index.ts         # List/create projects
│       │   └── [id].ts          # Get/update/delete project
│       └── upload/
│           └── index.ts         # File upload/delete
├── components/
│   ├── admin/                   # Admin components
│   ├── auth/                    # Auth components
│   ├── dialogs/                 # Dialog components
│   ├── upload/                  # Upload components
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── auth.ts                  # Better Auth server config
│   ├── auth-client.ts           # Better Auth client hooks
│   └── project-schema.ts        # Zod schemas
├── middleware/
│   └── auth.ts                  # Auth middleware
└── providers/
    └── auth-provider.tsx        # Session provider

```

## API Routes

All API routes require authentication except `/api/auth/*`:

- `GET /api/projects` - List projects (with pagination, filters)
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get single project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/upload` - Upload file
- `DELETE /api/upload` - Delete file

## Components

### Upload Components

1. **ImageUploader** - Drag & drop image upload with preview
2. **ProcessStagesEditor** - Sortable list of process stages
3. **VideoEmbedInput** - Video embed with timestamp markers

### Usage:

```tsx
import { ImageUploader } from '@/components/upload/image-uploader'

<ImageUploader
  value={imageUrl}
  onChange={(url) => setImageUrl(url)}
  aspectRatio="3/4"
  maxSize={5 * 1024 * 1024}
/>
```

## Authentication Hooks

```tsx
import { useAuth, useUser, signIn, signOut } from '@/lib/auth-client'

// In components
const { user, isLoading, isAuthenticated } = useAuth()
const { user } = useUser()

// Sign in
await signIn.email({ email, password })

// Sign out
await signOut()
```

## Toast Notifications

```tsx
import { toast } from '@/hooks/use-toast'

toast({
  title: "Success!",
  description: "Your changes have been saved.",
  variant: "success",
})

toast({
  title: "Error",
  description: "Something went wrong.",
  variant: "destructive",
})
```

## Development Notes

- The current implementation uses an **in-memory database** for development
- You'll need to set up a real database for production
- File uploads currently return mock URLs - implement real storage
- API routes have TODO comments for database integration

## Next Steps

1. Set up database (PostgreSQL/MySQL/SQLite)
2. Configure Drizzle or Prisma
3. Implement database schemas for users and projects
4. Set up file upload service (S3/Cloudinary)
5. Add email verification
6. Add password reset functionality
7. Add user roles/permissions if needed

## License

See main project README.
