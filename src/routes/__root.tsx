import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import appCss from '../styles.css?url'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'


export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Digital Art Portfolio',
      },
      {
        name: 'description',
        content: 'Digital sketches exploring the boundaries between reality and imagination',
      },
    ],
    links: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  component: RootLayout,
  shellComponent: RootDocument,
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
    </>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
