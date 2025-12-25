# v0 Prompts — Section by Section

Use these prompts individually in v0 to generate each component. Copy one at a time.

---

## Prompt 1: Design System & Global Styles

```
Create a Tailwind CSS v4 design system for a dark, minimal art portfolio.

CSS Variables:
--background: #050505
--foreground: #f5f5f5
--card: #0a0a0a
--card-foreground: #f5f5f5
--muted: #1a1a1a
--muted-foreground: #666666
--accent: #95122c
--accent-foreground: #ffffff
--border: #222222

Fonts:
- Display: "Cormorant Garamond", serif (weights 300, 400, 600)
- Body: "Outfit", system-ui, sans-serif
- Mono: "JetBrains Mono", monospace

Include:
1. Global styles with dark background, smooth scroll
2. Noise texture overlay (fixed, 3% opacity SVG noise filter)
3. Radial gradient background (burgundy 8% top-left, blue 15% bottom-right)
4. Custom animations:
   - fade-up: translateY(30px) → 0, opacity 0 → 1
   - letter-reveal: translateY(20px) rotateX(-40deg) → normal
   - float: translateY(0) → -20px → 0 (4s infinite)
   - scroll-wheel: translateY(0) → 8px → 0 (2s infinite)
5. Utility classes: .animate-fade-up, .animate-float, .animate-letter

Output as a globals.css file with @theme block for Tailwind v4.
```

---

## Prompt 2: Header Component

```
Create a fixed header component using shadcn/ui and Tailwind for a dark portfolio.

Requirements:
- Fixed position, full width, z-50
- Transparent by default, becomes solid (#050505 at 95% opacity) with backdrop-blur on scroll
- Border-bottom appears on scroll (#222222)

Left side:
- Logo text "PORTFOLIO" in uppercase, tracking-widest, font-semibold, text-sm
- Superscript "™" in burgundy (#95122c)

Right side:
- Nav links: "Work", "About", "Contact"
- Links: text-xs, tracking-widest, text-muted-foreground (#a0a0a0)
- Hover: text-foreground with underline animation (scaleX 0 → 1 from left, burgundy color)

Use useState for scroll detection (threshold: 60px).
Transition all changes with duration-300.

Colors: background #050505, accent #95122c, muted #a0a0a0, border #222222
```

---

## Prompt 3: Hero Section

```
Create a hero section for a digital artist portfolio using shadcn/ui and Tailwind.

Layout: Two columns (grid-cols-2), min-height screen, centered vertically, gap-12, padding 120px top.

LEFT COLUMN:
1. Tag line:
   - Small line (40px wide, 1px, burgundy #95122c) + "DIGITAL ARTIST"
   - Font-mono, text-xs, tracking-[0.3em], text-muted-foreground (#666)
   - Animate slide-in from left

2. Title (stacked, no gap):
   - "CRAFTING" — text-6xl, font-serif (Cormorant Garamond), font-light, text-foreground
   - "VISUAL" — same size but font-semibold, color #95122c
   - "STORIES" — same as first line
   - Each letter animates in with letter-reveal animation (staggered 30ms)

3. Subtitle:
   - "Digital sketches exploring the boundaries between reality and imagination"
   - text-base, text-muted-foreground (#666), max-w-md, leading-relaxed
   - Animate fade-up with 0.8s delay

4. CTA Button:
   - shadcn Button, "VIEW WORK" + arrow icon (ArrowUpRight)
   - Background #95122c, hover #b8152f
   - Uppercase, tracking-widest, text-xs
   - Hover: translateY(-2px), box-shadow with burgundy glow

RIGHT COLUMN:
1. Image frame:
   - 400px wide container with border (#1a1a1a), bg-card (#0a0a0a)
   - Placeholder gradient inside (aspect-[4/5])
   
2. Video progress bar below image:
   - Thin bar (3px) with #222 background, #95122c fill at 35%
   
3. Process stages row:
   - 4 dots with labels: "Sketch", "Lines", "Color", "Final"
   - Last dot is burgundy, others are #333
   - Font-mono, text-[9px], tracking-wide

4. Meta info:
   - "2024 • Process Video • 2:34"
   - Font-mono, text-xs, text-muted-foreground
   - Dot separator in burgundy

5. Floating badge (absolute positioned, top-right offset):
   - "▶ TIMELAPSE" 
   - Background #95122c, text-white
   - Font-mono, text-[10px], tracking-widest
   - animate-float (up/down gentle motion)

BOTTOM LEFT (absolute):
- Scroll indicator: Mouse outline (24x40px, rounded, border #333)
- Inside: Small pill (3x8px, burgundy) with scroll-wheel animation
- Below: "SCROLL" text vertical (writing-mode: vertical-rl), font-mono, text-[10px]

Colors: bg #050505, accent #95122c, border #222, muted #666
```

---

## Prompt 4: Featured Work Section (Home)

```
Create a featured work section for a portfolio home page using shadcn/ui Card and Tailwind.

Layout:
- Section padding: py-32 px-12
- Background: #0a0a0a

Header row (flex, justify-between, items-end, mb-16):
- Left: Two-line title
  - "SELECTED" — font-mono, text-xs, tracking-[0.3em], text-muted-foreground (#666)
  - "WORK" — font-serif, text-5xl, font-light, text-foreground
- Right: Link "View All →" — text-sm, text-muted-foreground, hover:text-foreground, underline-offset-4

Grid: 3 columns, gap-6

Project Card (create 6):
- shadcn Card with border-border/50, bg-card/50
- Hover: translateY(-4px), border-accent/30
- Animate on scroll: fade-up with staggered delay (index * 100ms)

Card structure:
1. Image container (aspect-[3/4], overflow-hidden):
   - Placeholder div with gradient background
   - On hover: scale-105 (duration-700)
   
2. Hover overlay:
   - Absolute, inset-0, bg-background/80, backdrop-blur-sm
   - Centered content: "VIEW PROJECT →" or play icon + "WATCH PROCESS"
   - Font-mono, text-xs, tracking-widest
   - Opacity 0 → 1 on hover (duration-300)

3. Video badge (if hasVideo):
   - Absolute top-3 right-3
   - shadcn Badge, bg-accent
   - Play icon (12px) + "VIDEO"
   - Hides on card hover

4. Meta section (p-4):
   - Title: font-serif, text-lg
   - Row: Year (font-mono, text-xs, text-muted) + "PROCESS" badge if applicable
   - Process badge: shadcn Badge variant="outline", border-accent, text-accent, text-[10px]

Sample data:
- Aurora Study, 2024, portrait, process, hasVideo
- Mountain Dawn, 2024, landscape, single
- Silent Observer, 2023, portrait, process, hasVideo
- Winter Solstice, 2024, landscape, single
- Ethereal Light, 2023, portrait, single
- Frozen Lake, 2024, landscape, process, hasVideo

Colors: card #0a0a0a, accent #95122c, border #222, muted #666
```

---

## Prompt 5: Gallery Page with Filters

```
Create a gallery page with filter pills and masonry grid using shadcn/ui and Tailwind.

Page layout:
- Padding: pt-32 pb-20 px-12
- Background: #0a0a0a

HEADER (flex, justify-between, items-end, mb-16):
Left:
- "SELECTED" — font-mono, text-xs, tracking-[0.3em], text-muted-foreground
- "WORK" — font-serif, text-5xl, font-light

Right - Filter Pills (flex, gap-2):
- Options: "ALL", "PORTRAIT", "LANDSCAPE", "PROCESS"
- Each pill: px-4 py-2.5, text-xs, tracking-widest, font-sans
- Default: bg-transparent, border border-border (#222), text-muted-foreground
- Hover: border-muted-foreground, text-foreground
- Active: border-accent (#95122c), bg-accent/10, text-foreground
- Active has animated underline inside (scaleX 0→1)
- Use useState for activeFilter

MASONRY GRID:
- CSS columns: 3 on desktop, 2 on tablet, 1 on mobile
- Column gap: 1.5rem
- Each card has margin-bottom: 1.5rem

Cards vary in aspect ratio:
- Tall: aspect-[3/5]
- Medium: aspect-[3/4]  
- Short: aspect-[4/3]

Card structure (same as Prompt 4 but with IntersectionObserver):
- Use data-animate attribute
- Track visible items in Set
- Apply opacity-0 translate-y-10 initially
- When visible: opacity-100 translate-y-0 with transition and staggered delay

Filter logic:
- "ALL" shows everything
- "PROCESS" filters by type === 'process'
- Others filter by tag

Include 6 sample projects with varying heights.

Colors: bg #0a0a0a, accent #95122c, border #222, muted #666
```

---

## Prompt 6: Project Detail — Video Player

```
Create a process video player component using shadcn/ui Slider, Button, and Tailwind.

Props interface:
- videoId: string
- provider: 'youtube' | 'vimeo' | 'mux'
- stages: Array<{ label: string, timestamp: number }>
- duration: number (seconds)
- thumbnail?: string

LAYOUT:

1. Video Container:
   - aspect-video, bg-card (#0a0a0a), rounded-lg, border border-border, overflow-hidden
   - For YouTube/Vimeo: iframe embed
   - For direct video: <video> element with ref

2. Play Overlay (when paused):
   - Absolute inset-0, bg-background/50
   - Centered: Circle (w-16 h-16, rounded-full, bg-accent #95122c)
   - Inside: Play icon (Lucide), slightly offset right for optical center
   - Hover: bg-background/60
   - Fade out when playing

3. Controls Bar:
   - Flex row, items-center, gap-4
   - Padding p-4, bg-card, border-t border-border
   
   Components:
   a) Play/Pause button:
      - shadcn Button, size="icon", rounded-full
      - bg-accent, hover:bg-accent/90
      - Play or Pause icon (18px)
   
   b) Timeline (flex-1):
      - shadcn Slider
      - Track: bg-muted (#1a1a1a), h-1
      - Fill/Range: bg-accent
      - Thumb: w-3 h-3, bg-white, rounded-full
      - Stage markers: Absolute dots on track at timestamp positions (burgundy dots)
   
   c) Duration text:
      - font-mono, text-xs, text-muted-foreground
      - Format: "0:00 / 2:34"
      - min-w-[80px], text-right
   
   d) Fullscreen button:
      - shadcn Button, variant="ghost", size="icon"
      - Maximize icon

4. Stage Cards Grid (below player):
   - Title: "PROCESS STAGES" — font-mono, text-xs, tracking-widest, text-muted-foreground, mb-4
   - Grid: 4 columns, gap-3
   
   Each stage card:
   - Padding p-3, rounded-lg, border, cursor-pointer
   - Default: border-border, bg-transparent
   - Active: border-accent, bg-accent/10
   - Hover: border-accent/50
   
   Content:
   - Stage number: font-mono, text-xs, text-accent, "01", "02", etc.
   - Preview: aspect-[3/2], bg-gradient placeholder, rounded, my-2
   - Label: text-sm, text-foreground
   
   Click: Jump video to stage.timestamp

Behavior:
- Track currentTime with onTimeUpdate
- Auto-update activeStage based on currentTime vs stage timestamps
- jumpToStage(timestamp, index) function

Colors: bg #0a0a0a, accent #95122c, border #222, muted #666
```

---

## Prompt 7: Project Detail Page Layout

```
Create a project detail page layout using shadcn/ui and Tailwind.

Page structure:
- Padding: pt-32 pb-20 px-12
- Max-width: 1200px, mx-auto

HEADER (mb-8):
- Flex row, justify-between, items-center
- Title: font-serif, text-4xl, font-light
- Year: font-mono, text-sm, text-muted-foreground

CONDITIONAL CONTENT:

If project.type === 'process' && project.hasVideo:
- Render ProcessVideo component (from Prompt 6)
- Below: Description paragraph (text-muted-foreground, max-w-2xl, mt-8)
- Tags row: flex gap-2, shadcn Badge variant="outline" for each tag

If project.type === 'single':
- Full-width image container:
  - max-h-[85vh], w-full
  - Object-contain
  - Rounded-lg, border border-border
  - Placeholder gradient until image loads
  
- Below image (mt-8):
  - Description: text-muted-foreground, max-w-2xl, leading-relaxed
  - Tags row: mt-4, flex gap-2

NAVIGATION (mt-16, pt-8, border-t border-border):
- Flex row, justify-between
- Previous link (if exists):
  - "← Previous"
  - font-mono, text-sm, text-muted-foreground
  - Hover: text-foreground
- Next link (if exists):
  - "Next →"
  - Same styling

Use sample project:
{
  title: "Aurora Study",
  year: 2024,
  type: "process",
  hasVideo: true,
  description: "A portrait study exploring light and shadow through digital brushwork.",
  tags: ["portrait", "digital"],
  stages: [
    { label: "Initial Sketch", timestamp: 0 },
    { label: "Line Work", timestamp: 45 },
    { label: "Base Colors", timestamp: 90 },
    { label: "Final Render", timestamp: 135 }
  ],
  duration: 180
}

Colors: bg #050505, accent #95122c, border #222, muted #666
```

---

## Prompt 8: About Page

```
Create an about page for a digital artist using shadcn/ui and Tailwind.

Layout:
- Padding: pt-32 pb-20 px-12
- Max-width: 1200px, mx-auto
- Two-column grid: grid-cols-[400px_1fr], gap-20, items-start

LEFT COLUMN:

1. Portrait Frame:
   - aspect-[3/4], w-full
   - bg-card (#0a0a0a), border border-border, rounded-lg
   - Placeholder gradient inside

2. Stats Row (mt-6):
   - Grid: 3 columns, gap-4
   - Each stat card:
     - bg-card, border border-border, p-5, text-center
     - Value: font-serif, text-3xl, text-foreground ("50+", "3Y", "20+")
     - Label: font-mono, text-[10px], tracking-widest, text-muted-foreground, mt-1
   - Stats: "Projects", "Experience", "Clients"

RIGHT COLUMN:

1. Title:
   - "ABOUT" — font-mono, text-xs, tracking-[0.3em], text-muted-foreground
   - "THE ARTIST" — font-serif, text-4xl, font-light, mt-1
   - Margin-bottom: mb-8

2. Bio paragraphs (space-y-5):
   - text-base, text-muted-foreground (#999), leading-relaxed
   - Paragraph 1: "Creating digital sketches that explore the intersection of light, form, and emotion. Each piece begins as a rough study and evolves through careful iteration into its final form."
   - Paragraph 2: "I document my entire creative process through timelapse videos, offering a window into how ideas transform from initial concepts to polished artworks."

3. Process Highlight Box (mt-8):
   - Flex row, items-center, gap-4
   - Padding p-5, rounded-lg
   - Border: border-accent/20, bg-accent/5
   - Icon: Circle with play triangle inside, stroke-accent
   - Text column:
     - Title: "Process Videos" — text-sm, font-medium, text-foreground
     - Subtitle: "Watch how each artwork comes to life" — text-sm, text-muted-foreground

4. Tools Section (mt-10, pt-6, border-t border-border):
   - Label: "TOOLS" — font-mono, text-[10px], tracking-widest, text-muted-foreground, mb-3
   - Flex row, gap-2
   - Each tool: shadcn Badge or pill
     - px-4 py-2, bg-card, border border-border, text-sm, text-muted-foreground
   - Tools: "Procreate", "Photoshop", "After Effects"

Animations:
- Left column: fade-up on mount
- Right column: fade-up with 200ms delay
- Stats: staggered fade-up (100ms each)

Colors: bg #050505, card #0a0a0a, accent #95122c, border #222, muted #666
```

---

## Prompt 9: Contact Page

```
Create a minimal contact page using shadcn/ui and Tailwind.

Layout:
- Min-height: calc(100vh - 200px) to account for header/footer
- Flex column, items-center, justify-center
- Text-center
- Padding: py-20 px-12

Content stack (max-w-lg, space-y-6):

1. Title:
   - "GET IN TOUCH"
   - font-mono, text-xs, tracking-[0.3em], text-muted-foreground

2. Subtitle:
   - "For commissions, collaborations, or inquiries"
   - text-base, text-muted-foreground

3. Email link:
   - "hello@artist.com"
   - font-serif, text-4xl, font-light
   - text-foreground
   - Hover: text-accent (#95122c)
   - Transition duration-300
   - Underline on hover (underline-offset-8)
   - href="mailto:hello@artist.com"

4. Social links row (mt-12):
   - Flex row, items-center, justify-center, gap-4
   - Links: "INSTAGRAM", "BEHANCE", "YOUTUBE"
   - Each link:
     - font-mono, text-xs, tracking-widest
     - text-muted-foreground
     - Hover: text-foreground
   - Dot separators between:
     - "●" character
     - text-[4px], text-border (#333)

Animations:
- Title: fade-in
- Subtitle: fade-up 100ms delay
- Email: fade-up 200ms delay
- Socials: fade-up 300ms delay

Background: Add subtle radial gradient circle behind email (accent color at 5% opacity, blurred)

Colors: bg #050505, accent #95122c, muted #666, border #333
```

---

## Prompt 10: Footer Component

```
Create a minimal footer component using Tailwind.

Layout:
- Padding: py-8 px-12
- Border-top: 1px solid #1a1a1a
- Flex row, justify-between, items-center
- Background: #050505

Left side:
- "© 2024 PORTFOLIO"
- font-mono, text-xs, tracking-wide, text-muted-foreground (#444)

Right side:
- "CRAFTED WITH PASSION"
- font-sans, text-xs, tracking-widest, text-border (#333)

Mobile (below 640px):
- Flex-col, gap-4, text-center

No animations needed — static component.

Colors: bg #050505, text #444 and #333, border #1a1a1a
```

---

## Prompt 11: Scroll Reveal Hook

```
Create a React hook for scroll-triggered animations using IntersectionObserver.

Hook: useScrollReveal

Parameters:
- threshold?: number (default 0.1)
- rootMargin?: string (default "50px")

Returns:
- visibleIds: Set<string> — IDs of elements currently visible

Usage:
1. Add data-reveal-id="unique-id" to elements
2. Add data-reveal attribute to mark as observable
3. Hook returns which IDs are visible
4. Apply animation classes conditionally

Implementation:
- Create IntersectionObserver in useEffect
- Query all [data-reveal] elements
- On intersect, add element's data-reveal-id to Set
- Clean up observer on unmount
- Use useCallback for stable observer reference

Example usage in component:
const visibleIds = useScrollReveal()

return (
  <div 
    data-reveal 
    data-reveal-id="card-1"
    className={cn(
      "transition-all duration-500",
      visibleIds.has("card-1") 
        ? "opacity-100 translate-y-0" 
        : "opacity-0 translate-y-8"
    )}
  >
    Content
  </div>
)

TypeScript with proper typing.
```

---

## Prompt 12: Page Transitions Wrapper

```
Create a page transition wrapper component using Tailwind animations.

Component: PageTransition

Props:
- children: React.ReactNode
- className?: string

Behavior:
- Wrap page content
- On mount: Fade in + slide up slightly
- Content staggers in naturally

Implementation:
- Wrapper div with animate-in fade-in slide-in-from-bottom-4 duration-500
- Use tw-animate-css classes if available, or custom @keyframes

CSS:
@keyframes page-enter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-transition {
  animation: page-enter 0.5s ease-out forwards;
}

For route transitions (if using React Router or TanStack Router):
- Could use AnimatePresence pattern
- Or simpler: just animate on mount

Usage:
<PageTransition>
  <HeroSection />
  <FeaturedWork />
</PageTransition>
```

---

# Usage Tips

1. **Generate in order**: Start with Prompt 1 (design system), then Header, then pages
2. **Combine when needed**: You can merge prompts (e.g., Header + Footer together)
3. **Iterate**: If v0 misses something, follow up with specifics
4. **Copy components**: After generating, copy into your `/components` folder
5. **Adjust colors**: All use CSS variables, easy to tweak later

Each prompt is self-contained with exact colors, spacing, and animation specs.