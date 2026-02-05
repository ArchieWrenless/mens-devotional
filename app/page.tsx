import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format } from 'date-fns'

async function getTodayDevotional() {
  const today = format(new Date(), 'yyyy-MM-dd')
  const filePath = path.join(process.cwd(), 'content', 'daily', `${today}.mdx`)
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    return { data, content, found: true }
  } catch {
    // If today's devotional doesn't exist, get the most recent one
    const dailyDir = path.join(process.cwd(), 'content', 'daily')
    const files = fs.readdirSync(dailyDir).sort().reverse()
    if (files.length > 0) {
      const fileContents = fs.readFileSync(path.join(dailyDir, files[0]), 'utf8')
      const { data, content } = matter(fileContents)
      return { data, content, found: true }
    }
    return { data: null, content: null, found: false }
  }
}

export default async function Home() {
  const { data, content, found } = await getTodayDevotional()
  
  if (!found) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-serif mb-4">Welcome</h1>
        <p className="text-stone-600">No devotional available yet. Check back soon!</p>
      </div>
    )
  }
  
  return (
    <article className="devotional-content">
      <header className="mb-8 pb-8 border-b border-stone-200">
        <p className="text-secondary font-medium mb-2">
          {format(new Date(data.date), 'EEEE, MMMM d, yyyy')}
        </p>
        <h1 className="text-4xl font-serif font-bold text-primary mb-4">
          {data.title}
        </h1>
        <p className="text-lg text-stone-600">
          📖 {data.scripture}
        </p>
      </header>
      
      <div 
        className="prose prose-stone prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      <footer className="mt-12 pt-8 border-t border-stone-200">
        <div className="grid md:grid-cols-2 gap-6">
          <a href="/single" className="section-card">
            <h3 className="text-xl font-serif font-bold text-primary mb-2">For Single Men</h3>
            <p className="text-stone-600">Devotionals and articles for unmarried men walking with God.</p>
          </a>
          <a href="/married" className="section-card">
            <h3 className="text-xl font-serif font-bold text-primary mb-2">For Married Men</h3>
            <p className="text-stone-600">Wisdom for husbands and fathers leading their families.</p>
          </a>
        </div>
      </footer>
    </article>
  )
}
