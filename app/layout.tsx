import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mohammed Gouse | Full Stack Developer',
  description: 'Explore the portfolio of Mohammed Gouse, a full stack developer specializing in MERN stack applications.',
  keywords: ['Full Stack Developer', 'Next.js', 'React', 'Node.js', 'Portfolio', 'Mohammed Gouse'],
  openGraph: {
    title: 'Mohammed Gouse | Full Stack Developer',
    description: 'Showcasing MERN stack projects and web development skills.',
    url: 'https://mhdgouse-dev.vercel.app',
    siteName: 'Gouse Dev Portfolio',
    images: [
      {
        url: 'https://mhdgouse-dev.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio of Mohammed Gouse',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammed Gouse | Full Stack Developer',
    description: 'Personal website showcasing MERN stack development work.',
    creator: '@yourTwitterHandle',
    images: ['https://yourdomain.com/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Liberation+Mono&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mohammed Gouse",
              "url": "https://mhdgouse-dev.vercel.app",
              "sameAs": [
                "https://github.com/MHDGouse",
                "https://www.linkedin.com/in/mhdgouse"
              ],
              "jobTitle": "Full Stack Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Accura Tequipment"
              }
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
