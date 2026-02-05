import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'

interface Devotional {
  slug: string
  title: string
  date: string
  scripture: string
  category: string
}

async function getAllDevotionals(): Promise<Devotional[]> {
  const dailyDir = path.join(process.cwd(), 'content', 'daily')
  
  try {
    const files = fs.readdirSync(dailyDir)
    
    const devotionals = files
      .filter(file => file.endsWith('.mdx'))
      .map(file => {
        const filePath = path.join(dailyDir, file)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContents)
        
        return {
          slug: file.replace('.mdx', ''),
          title: data.title,
          date: data.date,
          scripture: data.scripture,
          category: data.category,
        }
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    return devotionals
  } catch {
    return []
  }
}

export default async function ArchivePage() {
  const devotionals = await getAllDevotionals()
  
  // Group by month
  const groupedByMonth: Record<string, Devotional[]> = {}
  devotionals.forEach(dev => {
    const monthKey = format(parseISO(dev.date), 'MMMM yyyy')
    if (!groupedByMonth[monthKey]) {
      groupedByMonth[monthKey] = []
    }
    groupedByMonth[monthKey].push(dev)
  })
  
  return (
    <div>
      <header className="mb-12">
        <h1 className="text-4xl font-serif font-bold text-primary mb-4">Archive</h1>
        <p className="text-lg text-stone-600">
          Browse all past daily devotionals.
        </p>
      </header>

      {Object.keys(groupedByMonth).length === 0 ? (
        <p className="text-stone-600">No devotionals yet. Check back soon!</p>
      ) : (
        <div className="space-y-12">
          {Object.entries(groupedByMonth).map(([month, devs]) => (
            <section key={month}>
              <h2 className="text-2xl font-serif font-bold text-secondary mb-6 pb-2 border-b border-stone-200">
                {month}
              </h2>
              <div className="grid gap-4">
                {devs.map(dev => (
                  <Link 
                    key={dev.slug} 
                    href={`/daily/${dev.slug}`}
                    className="section-card flex justify-between items-start hover:border-primary border-2 border-transparent transition-colors"
                  >
                    <div>
                      <p className="text-sm text-secondary font-medium mb-1">
                        {format(parseISO(dev.date), 'EEEE, MMMM d')}
                      </p>
                      <h3 className="text-xl font-serif font-bold text-primary">
                        {dev.title}
                      </h3>
                      <p className="text-stone-600 mt-1">📖 {dev.scripture}</p>
                    </div>
                    <span className="text-xs bg-stone-100 px-2 py-1 rounded text-stone-600 capitalize">
                      {dev.category}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
