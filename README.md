# Men's Devotional Site

A daily devotional site for men wanting to get closer to God.

## Features
- **Daily Devotionals** - Fresh content each day
- **Single Men Section** - Topics relevant to unmarried men
- **Married Men Section** - Topics for husbands and fathers
- **Updatable by Brett or Archie** - Easy content management

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Content:** MDX (Markdown with components)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel (free tier) or GitHub Pages
- **CMS Option:** Notion as headless CMS (optional)

## Structure
```
/app
  /page.tsx              # Homepage with today's devotional
  /daily/[date]/page.tsx # Daily devotional archive
  /single/page.tsx       # Single men section
  /married/page.tsx      # Married men section
  /about/page.tsx        # About the site
/content
  /daily/                # Daily devotional MDX files
  /single/               # Single men articles
  /married/              # Married men articles
/components
  /DevotionalCard.tsx
  /VerseHighlight.tsx
  /Navigation.tsx
```

## Content Format (MDX)
```mdx
---
title: "Building on the Rock"
date: "2026-02-05"
scripture: "Matthew 7:24-27"
category: "foundations"
author: "Brett"
---

# Today's Verse
> "Everyone who hears these words of Mine and acts on them will be like a wise man who built his house on the rock." — Matthew 7:24 (NASB)

## Reflection
[Content here...]

## Prayer
[Prayer here...]

## Action Step
[Practical application...]
```

## Jira
- **Ticket:** MAIN-6
- **Status:** In Progress
