import { createFileRoute } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  const tools = ['Procreate', 'Photoshop', 'After Effects', 'Illustrator'];

  return (
    <div className="container mx-auto px-6 py-32">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Portrait */}
          <div className="space-y-6">
            <div className="relative aspect-3/4 max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 border border-border rounded-lg overflow-hidden bg-muted">
                <img
                  src="/aurora-study.jpg"
                  alt="Artist portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="text-center p-4 border border-border rounded-lg">
                <p className="text-2xl font-serif text-accent">50+</p>
                <p className="text-xs font-mono text-muted-foreground mt-1">
                  Projects
                </p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <p className="text-2xl font-serif text-accent">3Y</p>
                <p className="text-xs font-mono text-muted-foreground mt-1">
                  Experience
                </p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <p className="text-2xl font-serif text-accent">20+</p>
                <p className="text-xs font-mono text-muted-foreground mt-1">
                  Clients
                </p>
              </div>
            </div>
          </div>

          {/* Right: Bio */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-xs font-mono tracking-widest text-muted-foreground">
                ABOUT
              </p>
              <h1 className="text-5xl md:text-6xl font-serif font-light">
                THE ARTIST
              </h1>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a digital artist specializing in creating evocative
                illustrations that blend reality with imagination. My work
                explores the interplay of light, color, and emotion through
                digital sketches and paintings.
              </p>
              <p>
                With over three years of professional experience, I've worked
                with clients across various industries, bringing their visions
                to life through thoughtful, artistic expression. Each project
                is an opportunity to push creative boundaries and tell
                compelling visual stories.
              </p>
              <p>
                My process is as important as the final piece. I document the
                evolution of each artwork through timelapse videos, offering a
                glimpse into the creative journey from initial sketch to
                polished illustration.
              </p>
            </div>

            {/* Highlight Box */}
            <div className="border border-accent/30 bg-accent/5 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Icon name="play_circle" size={24} className="text-accent mt-1" />
                <div>
                  <h3 className="font-serif text-lg mb-2">Process Videos</h3>
                  <p className="text-sm text-muted-foreground">
                    Watch how each artwork comes to life, from initial concept
                    to final render. Every stage documented.
                  </p>
                </div>
              </div>
            </div>

            {/* Tools */}
            <div className="space-y-3">
              <h3 className="text-sm font-mono tracking-wider text-muted-foreground">
                TOOLS & SOFTWARE
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <Badge
                    key={tool}
                    variant="outline"
                    className="text-xs px-3 py-1"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
