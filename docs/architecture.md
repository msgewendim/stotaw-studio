# Digital Art Portfolio — Architecture & Design System
## TanStack Start + shadcn/ui Edition

---

## 1. Tech Stack (Updated)

### Frontend: **TanStack Start + React 19**

**Why TanStack Start:**
- File-based routing with type-safe loaders
- SSR/SSG capabilities built-in
- Vite-powered (fast HMR)
- React 19 with server components support
- Excellent data fetching patterns

### UI Components: **shadcn/ui + Tailwind CSS v4**

**Already installed:**
- `class-variance-authority` — variant styling
- `clsx` + `tailwind-merge` — class utilities
- `tw-animate-css` — animation utilities
- `@hugeicons/react` — icon library

### CMS: **Sanity.io** (recommended) or **Payload CMS**

### Video Hosting: **Mux** or **YouTube/Vimeo embeds**

### Deployment: **Vercel** or **Netlify**

---

## 2. Project Structure

```
art-portfolio/
├── app/
│   ├── routes/
│   │   ├── __root.tsx           # Root layout
│   │   ├── index.tsx            # Home page
│   │   ├── work/
│   │   │   ├── index.tsx        # Gallery page
│   │   │   └── $slug.tsx        # Project detail (dynamic)
│   │   ├── about.tsx            # About page
│   │   └── contact.tsx          # Contact page
│   ├── components/
│   │   ├── ui/                  # shadcn components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── page-transition.tsx
│   │   ├── gallery/
│   │   │   ├── project-card.tsx
│   │   │   ├── project-grid.tsx
│   │   │   ├── filter-pills.tsx
│   │   │   └── masonry-grid.tsx
│   │   ├── project/
│   │   │   ├── process-video.tsx
│   │   │   ├── stage-timeline.tsx
│   │   │   ├── image-lightbox.tsx
│   │   │   └── project-nav.tsx
│   │   └── home/
│   │       ├── hero.tsx
│   │       ├── featured-work.tsx
│   │       └── particles.tsx
│   ├── lib/
│   │   ├── sanity.ts            # Sanity client
│   │   ├── queries.ts           # GROQ queries
│   │   └── utils.ts             # cn() helper
│   ├── hooks/
│   │   ├── use-scroll-reveal.ts
│   │   └── use-video-player.ts
│   ├── styles/
│   │   └── globals.css          # Tailwind + custom CSS
│   ├── client.tsx
│   ├── router.tsx
│   └── ssr.tsx
├── public/
├── sanity/                      # Sanity studio (optional)
│   ├── schemas/
│   └── sanity.config.ts
├── components.json              # shadcn config
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

---

## 3. Data Model (Sanity)

```typescript
// sanity/schemas/project.ts
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'description', type: 'text', rows: 3 },
    { name: 'year', type: 'number' },
    { 
      name: 'tags', 
      type: 'array', 
      of: [{ type: 'string' }],
      options: { list: ['portrait', 'landscape', 'digital', 'sketch'] }
    },
    { 
      name: 'projectType', 
      type: 'string', 
      options: { list: ['single', 'process'] }
    },
    
    // Featured image (single projects)
    { name: 'featuredImage', type: 'image', options: { hotspot: true } },
    
    // Process images (sequence)
    {
      name: 'processImages',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'image', type: 'image' },
          { name: 'stage', type: 'string' },
          { name: 'caption', type: 'string' }
        ]
      }]
    },
    
    // Process video
    {
      name: 'processVideo',
      type: 'object',
      fields: [
        { name: 'provider', type: 'string', options: { list: ['mux', 'youtube', 'vimeo'] }},
        { name: 'videoId', type: 'string' },
        { name: 'muxAsset', type: 'mux.video' }, // If using Mux plugin
        { name: 'thumbnail', type: 'image' },
        { name: 'duration', type: 'number' },
        {
          name: 'stages',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'label', type: 'string' },
              { name: 'timestamp', type: 'number' }
            ]
          }]
        }
      ]
    },
    
    // Meta
    { name: 'status', type: 'string', options: { list: ['draft', 'published'] }},
    { name: 'publishedAt', type: 'datetime' },
    { name: 'order', type: 'number' }
  ],
  orderings: [
    { title: 'Manual Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }
  ]
}
```

---

## 4. Core Components

### 4.1 Sanity Client Setup

```typescript
// app/lib/sanity.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanity = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(sanity)
export const urlFor = (source: any) => builder.image(source)
```

### 4.2 GROQ Queries

```typescript
// app/lib/queries.ts
export const projectsQuery = `
  *[_type == "project" && status == "published"] | order(order asc) {
    _id,
    title,
    slug,
    year,
    tags,
    projectType,
    "thumbnail": featuredImage.asset->url,
    "hasVideo": defined(processVideo.videoId)
  }
`

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    year,
    tags,
    projectType,
    featuredImage,
    processImages[] {
      image,
      stage,
      caption
    },
    processVideo {
      provider,
      videoId,
      thumbnail,
      duration,
      stages[] {
        label,
        timestamp
      }
    }
  }
`
```

### 4.3 Route Loaders

```typescript
// app/routes/work/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { sanity } from '~/lib/sanity'
import { projectsQuery } from '~/lib/queries'

export const Route = createFileRoute('/work/')({
  loader: async () => {
    const projects = await sanity.fetch(projectsQuery)
    return { projects }
  },
  component: WorkPage,
})

function WorkPage() {
  const { projects } = Route.useLoaderData()
  // ... render gallery
}
```

```typescript
// app/routes/work/$slug.tsx
import { createFileRoute } from '@tanstack/react-router'
import { sanity } from '~/lib/sanity'
import { projectBySlugQuery } from '~/lib/queries'

export const Route = createFileRoute('/work/$slug')({
  loader: async ({ params }) => {
    const project = await sanity.fetch(projectBySlugQuery, { slug: params.slug })
    if (!project) throw new Error('Project not found')
    return { project }
  },
  component: ProjectPage,
})
```

---

## 5. shadcn/ui Components to Install

```bash
# Core components
bunx shadcn@latest add button
bunx shadcn@latest add card
bunx shadcn@latest add dialog
bunx shadcn@latest add badge
bunx shadcn@latest add separator
bunx shadcn@latest add skeleton
bunx shadcn@latest add tabs
bunx shadcn@latest add tooltip
bunx shadcn@latest add aspect-ratio
```

---

## 6. Custom Components

### 6.1 Project Card

```typescript
// app/components/gallery/project-card.tsx
import { Link } from '@tanstack/react-router'
import { Card } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { PlayIcon } from '@hugeicons/react'
import { cn } from '~/lib/utils'

interface ProjectCardProps {
  project: {
    slug: { current: string }
    title: string
    year: number
    thumbnail: string
    projectType: 'single' | 'process'
    hasVideo: boolean
  }
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug.current }}
      className="group block"
    >
      <Card className={cn(
        "relative overflow-hidden border-border/50 bg-card/50",
        "transition-all duration-500 ease-out",
        "hover:-translate-y-1 hover:border-accent/30",
        "animate-in fade-in slide-in-from-bottom-4",
      )}
      style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className={cn(
              "h-full w-full object-cover",
              "transition-transform duration-700 ease-out",
              "group-hover:scale-105"
            )}
          />
          
          {/* Hover overlay */}
          <div className={cn(
            "absolute inset-0 bg-background/80 backdrop-blur-sm",
            "flex items-center justify-center",
            "opacity-0 transition-opacity duration-300",
            "group-hover:opacity-100"
          )}>
            {project.hasVideo ? (
              <div className="flex flex-col items-center gap-2 text-foreground">
                <PlayIcon size={32} />
                <span className="text-xs tracking-widest font-mono">
                  WATCH PROCESS
                </span>
              </div>
            ) : (
              <span className="text-xs tracking-widest font-mono text-foreground">
                VIEW PROJECT →
              </span>
            )}
          </div>
          
          {/* Video badge */}
          {project.hasVideo && (
            <Badge 
              variant="default"
              className={cn(
                "absolute top-3 right-3",
                "bg-accent text-accent-foreground",
                "transition-opacity duration-300",
                "group-hover:opacity-0"
              )}
            >
              <PlayIcon size={12} className="mr-1" />
              VIDEO
            </Badge>
          )}
        </div>
        
        {/* Meta */}
        <div className="p-4">
          <h3 className="font-serif text-lg">{project.title}</h3>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-muted-foreground font-mono">
              {project.year}
            </span>
            {project.projectType === 'process' && (
              <Badge variant="outline" className="text-[10px] border-accent text-accent">
                PROCESS
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}
```

### 6.2 Process Video Player

```typescript
// app/components/project/process-video.tsx
import { useRef, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Slider } from '~/components/ui/slider'
import { 
  PlayIcon, 
  PauseIcon, 
  MaximizeIcon 
} from '@hugeicons/react'
import { cn } from '~/lib/utils'

interface Stage {
  label: string
  timestamp: number
}

interface ProcessVideoProps {
  videoId: string
  provider: 'mux' | 'youtube' | 'vimeo'
  stages?: Stage[]
  duration?: number
}

export function ProcessVideo({ videoId, provider, stages, duration }: ProcessVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [activeStage, setActiveStage] = useState(0)

  const togglePlay = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  const jumpToStage = (timestamp: number, index: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp
      setActiveStage(index)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
      // Update active stage
      if (stages) {
        const current = stages.findIndex((s, i) => {
          const next = stages[i + 1]
          return currentTime >= s.timestamp && (!next || currentTime < next.timestamp)
        })
        if (current !== -1) setActiveStage(current)
      }
    }
  }

  const getVideoSrc = () => {
    switch (provider) {
      case 'mux':
        return `https://stream.mux.com/${videoId}.m3u8`
      case 'youtube':
        return `https://www.youtube.com/embed/${videoId}`
      case 'vimeo':
        return `https://player.vimeo.com/video/${videoId}`
      default:
        return ''
    }
  }

  // For YouTube/Vimeo, use iframe
  if (provider === 'youtube' || provider === 'vimeo') {
    return (
      <div className="space-y-4">
        <div className="relative aspect-video bg-card rounded-lg overflow-hidden border border-border">
          <iframe
            src={getVideoSrc()}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
          />
        </div>
        
        {/* Stage buttons */}
        {stages && stages.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {stages.map((stage, i) => (
              <Button
                key={stage.label}
                variant={i === activeStage ? 'default' : 'outline'}
                size="sm"
                className="font-mono text-xs"
              >
                <span className="text-accent mr-2">{String(i + 1).padStart(2, '0')}</span>
                {stage.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    )
  }

  // For Mux/direct video
  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-card rounded-lg overflow-hidden border border-border">
        <video
          ref={videoRef}
          src={getVideoSrc()}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover"
        />
        
        {/* Play button overlay */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              "bg-background/50 transition-opacity hover:bg-background/60"
            )}
          >
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
              <PlayIcon size={24} className="text-accent-foreground ml-1" />
            </div>
          </button>
        )}
      </div>
      
      {/* Controls */}
      <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          className="h-10 w-10 rounded-full bg-accent hover:bg-accent/90"
        >
          {isPlaying ? (
            <PauseIcon size={18} className="text-accent-foreground" />
          ) : (
            <PlayIcon size={18} className="text-accent-foreground ml-0.5" />
          )}
        </Button>
        
        {/* Timeline with stage markers */}
        <div className="flex-1 relative">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={([val]) => {
              if (videoRef.current) videoRef.current.currentTime = val
            }}
            className="w-full"
          />
          
          {/* Stage markers */}
          {stages && duration && (
            <div className="absolute inset-x-0 top-0 h-full pointer-events-none">
              {stages.map((stage, i) => (
                <div
                  key={stage.label}
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent"
                  style={{ left: `${(stage.timestamp / duration) * 100}%` }}
                />
              ))}
            </div>
          )}
        </div>
        
        <span className="text-xs font-mono text-muted-foreground min-w-[80px] text-right">
          {formatTime(currentTime)} / {formatTime(duration || 0)}
        </span>
        
        <Button variant="ghost" size="icon">
          <MaximizeIcon size={18} />
        </Button>
      </div>
      
      {/* Stage buttons */}
      {stages && stages.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {stages.map((stage, i) => (
            <button
              key={stage.label}
              onClick={() => jumpToStage(stage.timestamp, i)}
              className={cn(
                "p-3 rounded-lg border transition-all",
                "text-left",
                i === activeStage
                  ? "border-accent bg-accent/10"
                  : "border-border hover:border-accent/50"
              )}
            >
              <span className="text-xs font-mono text-accent block mb-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-sm">{stage.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}
```

### 6.3 Scroll Reveal Hook

```typescript
// app/hooks/use-scroll-reveal.ts
import { useEffect, useState } from 'react'

export function useScrollReveal(threshold = 0.1) {
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-reveal-id')
            if (id) {
              setVisibleIds((prev) => new Set([...prev, id]))
            }
          }
        })
      },
      { threshold, rootMargin: '50px' }
    )

    document.querySelectorAll('[data-reveal]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [threshold])

  return visibleIds
}
```

---

## 7. Styling (Tailwind v4 + CSS)

### 7.1 Global Styles

```css
/* app/styles/globals.css */
@import "tailwindcss";
@import "tw-animate-css";

/* Custom fonts */
@import "@fontsource-variable/noto-sans";

@theme {
  /* Colors */
  --color-background: #050505;
  --color-foreground: #f5f5f5;
  --color-card: #0a0a0a;
  --color-card-foreground: #f5f5f5;
  --color-muted: #1a1a1a;
  --color-muted-foreground: #666666;
  --color-accent: #95122c;
  --color-accent-foreground: #ffffff;
  --color-border: #222222;
  
  /* Typography */
  --font-sans: "Noto Sans Variable", system-ui, sans-serif;
  --font-serif: "Cormorant Garamond", Georgia, serif;
  --font-mono: "JetBrains Mono", monospace;
  
  /* Animation */
  --animate-duration: 0.5s;
  --animate-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Import Cormorant Garamond from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=JetBrains+Mono:wght@400&display=swap');

/* Base styles */
html {
  scroll-behavior: smooth;
}

body {
  @apply bg-background text-foreground antialiased;
  font-family: var(--font-sans);
}

/* Custom animations */
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes letter-reveal {
  from {
    opacity: 0;
    transform: translateY(20px) rotateX(-40deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

@keyframes particle {
  0%, 100% { 
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  50% { 
    transform: translate(-5px, -40px) scale(0.8);
    opacity: 0.6;
  }
}

@keyframes scroll-wheel {
  0% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(8px); opacity: 0.3; }
  100% { transform: translateY(0); opacity: 1; }
}

/* Animation utilities */
.animate-fade-up {
  animation: fade-up 0.6s var(--animate-timing) forwards;
}

.animate-letter {
  animation: letter-reveal 0.6s var(--animate-timing) forwards;
  opacity: 0;
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.animate-particle {
  animation: particle 20s ease-in-out infinite;
}

.animate-scroll-wheel {
  animation: scroll-wheel 2s ease infinite;
}

/* Noise overlay */
.noise-overlay {
  position: fixed;
  inset: 0;
  opacity: 0.03;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  z-index: 50;
}

/* Gradient background */
.bg-gradient-radial {
  background: 
    radial-gradient(ellipse at 20% 20%, rgba(149, 18, 44, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(20, 30, 60, 0.15) 0%, transparent 50%);
}
```

### 7.2 shadcn Theme Override

```typescript
// components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "~/components",
    "utils": "~/lib/utils"
  }
}
```

---

## 8. Page Layouts

### 8.1 Root Layout

```typescript
// app/routes/__root.tsx
import { createRootRoute, Outlet, ScrollRestoration } from '@tanstack/react-router'
import { Header } from '~/components/layout/header'
import { Footer } from '~/components/layout/footer'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <>
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-radial pointer-events-none" />
      <div className="noise-overlay" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      
      <ScrollRestoration />
    </>
  )
}
```

### 8.2 Home Page

```typescript
// app/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '~/components/home/hero'
import { FeaturedWork } from '~/components/home/featured-work'
import { sanity } from '~/lib/sanity'

export const Route = createFileRoute('/')({
  loader: async () => {
    const featured = await sanity.fetch(`
      *[_type == "project" && status == "published"] | order(order asc)[0...6] {
        _id, title, slug, year, tags, projectType,
        "thumbnail": featuredImage.asset->url,
        "hasVideo": defined(processVideo.videoId)
      }
    `)
    return { featured }
  },
  component: HomePage,
})

function HomePage() {
  const { featured } = Route.useLoaderData()
  
  return (
    <>
      <Hero />
      <FeaturedWork projects={featured} />
    </>
  )
}
```

---

## 9. Dependencies to Add

```bash
# Sanity
bun install @sanity/client @sanity/image-url

# Video (if using Mux)
bun install @mux/mux-player-react

# Animations (optional, for advanced effects)
bun install motion
```

---

## 10. Environment Variables

```env
# .env
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
```

---

## 11. Ship Timeline

| Day | Tasks |
|-----|-------|
| 1 | Sanity setup, schemas, 3 test projects |
| 2 | Root layout, Header, Footer |
| 3 | Home page with Hero + Featured |
| 4 | Gallery page with filters |
| 5 | Project detail + video player |
| 6 | About + Contact pages |
| 7 | Animations, polish, deploy |

**Total: ~1 week to MVP**