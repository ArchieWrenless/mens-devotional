import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Men's Daily Devotional",
  description: 'Daily devotionals for men seeking to grow closer to God',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-stone-800 min-h-screen">
        <nav className="bg-primary text-white py-4 px-6">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <a href="/" className="text-xl font-serif font-bold">Men's Devotional</a>
            <div className="space-x-6">
              <a href="/" className="hover:text-accent">Today</a>
              <a href="/single" className="hover:text-accent">Single Men</a>
              <a href="/married" className="hover:text-accent">Married Men</a>
              <a href="/archive" className="hover:text-accent">Archive</a>
              <a href="/about" className="hover:text-accent">About</a>
            </div>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto px-6 py-12">
          {children}
        </main>
        <footer className="bg-stone-200 py-8 mt-12">
          <div className="max-w-4xl mx-auto px-6 text-center text-stone-600">
            <p>Built with faith. Updated daily.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
