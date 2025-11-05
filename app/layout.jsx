import './globals.css'
import ClientLayout from '@/components/ClientLayout'

export const metadata = {
  title: 'Rylee\'s portfolio',
  description: 'Animated, high-impact landing page for an online learning platform.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0b0e14" />
      </head>
      <body>
        {/* Global smooth scrolling provider */}
        <ClientLayout>
          {/* Ambient animated canvas background with graceful fallback */}
          {/* Placed here to run across the entire page */}
          <div id="ambient-root" aria-hidden>
            {/* Canvas injected at runtime by AmbientCanvas component on pages that import it */}
          </div>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
