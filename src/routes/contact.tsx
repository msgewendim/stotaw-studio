import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contact')({
  component: ContactPage,
});

function ContactPage() {
  const socialLinks = [
    { name: 'INSTAGRAM', url: 'https://instagram.com' },
    { name: 'BEHANCE', url: 'https://behance.net' },
    { name: 'YOUTUBE', url: 'https://youtube.com' },
  ];

  return (
    <div className="container mx-auto px-6 py-32">
      <div className="max-w-3xl mx-auto text-center space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <p className="text-xs font-mono tracking-widest text-muted-foreground">
            GET IN TOUCH
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-light text-muted-foreground">
            For commissions, collaborations, or inquiries
          </h1>
        </div>

        {/* Email */}
        <div>
          <a
            href="mailto:hello@artist.com"
            className="text-4xl md:text-6xl font-serif font-light hover:text-accent transition-colors inline-block"
          >
            hello@artist.com
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 text-sm font-mono tracking-wider">
          {socialLinks.map((link, index) => (
            <div key={link.name} className="flex items-center gap-4">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                {link.name}
              </a>
              {index < socialLinks.length - 1 && (
                <span className="text-border">•</span>
              )}
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="pt-12 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Available for freelance projects and collaborations.
            <br />
            Typical response time: 24-48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
