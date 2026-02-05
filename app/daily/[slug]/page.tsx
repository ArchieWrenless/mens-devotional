import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: { slug: string }
}

async function getDevotional(slug: string) {
  const filePath = path.join(process.cwd(), 'content', 'daily', `${slug}.mdx`)
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    return { data, content, found: true }
  } catch {
    return { data: null, content: null, found: false }
  }
}

async function getAdjacentDevotionals(currentSlug: string) {
  const dailyDir = path.join(process.cwd(), 'content', 'daily')
  const files = fs.readdirSync(dailyDir).sort()
  const currentIndex = files.findIndex(f => f.replace('.mdx', '') === currentSlug)
  
  const prev = currentIndex > 0 ? files[currentIndex - 1].replace('.mdx', '') : null
  const next = currentIndex < files.length - 1 ? files[currentIndex + 1].replace('.mdx', '') : null
  
  return { prev, next }
}

export default async function DevotionalPage({ params }: Props) {
  const { data, content, found } = await getDevotional(params.slug)
  
  if (!found) {
    notFound()
  }
  
  const { prev, next } = await getAdjacentDevotionals(params.slug)
  
  return (
    <article className="devotional-content">
      <Link href="/archive" className="text-secondary hover:text-primary mb-6 inline-block">
        ← Back to Archive
      </Link>
      
      <header className="mb-8 pb-8 border-b border-stone-200">
        <p className="text-secondary font-medium mb-2">
          {format(parseISO(data.date), 'EEEE, MMMM d, yyyy')}
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
      
      <nav className="mt-12 pt-8 border-t border-stone-200 flex justify-between">
        {prev ? (
          <Link href={`/daily/${prev}`} className="text-secondary hover:text-primary">
            ← Previous Day
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/daily/${next}`} className="text-secondary hover:text-primary">
            Next Day →
          </Link>
        ) : <span />}
      </nav>
    </article>
  )
}

export async function generateStaticParams() {
  const dailyDir = path.join(process.cwd(), 'content', 'daily')
  
  try {
    const files = fs.readdirSync(dailyDir)
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => ({
        slug: file.replace('.mdx', ''),
      }))
  } catch {
    return []
  }
}
