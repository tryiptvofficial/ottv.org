
export interface OnPageChecklistItem {
  category: string
  item: string
  status: 'pass' | 'fail' | 'warning' | 'na'
  priority: 'critical' | 'high' | 'medium' | 'low'
  details?: string
}

export const onPageChecklist: OnPageChecklistItem[] = [
  // Title Tag
  { category: 'Title Tag', item: 'Title exists', status: 'na', priority: 'critical' },
  { category: 'Title Tag', item: 'Title length 50-60 chars', status: 'na', priority: 'high' },
  { category: 'Title Tag', item: 'Primary keyword in title', status: 'na', priority: 'critical' },
  { category: 'Title Tag', item: 'Keyword near beginning', status: 'na', priority: 'high' },
  { category: 'Title Tag', item: 'Title is unique', status: 'na', priority: 'high' },
  { category: 'Title Tag', item: 'Brand included', status: 'na', priority: 'medium' },
  
  // Meta Description
  { category: 'Meta Description', item: 'Description exists', status: 'na', priority: 'critical' },
  { category: 'Meta Description', item: 'Length 150-160 chars', status: 'na', priority: 'high' },
  { category: 'Meta Description', item: 'Keyword in description', status: 'na', priority: 'high' },
  { category: 'Meta Description', item: 'Contains CTA', status: 'na', priority: 'medium' },
  { category: 'Meta Description', item: 'Unique per page', status: 'na', priority: 'high' },
  
  // URL
  { category: 'URL', item: 'URL is lowercase', status: 'na', priority: 'high' },
  { category: 'URL', item: 'Uses hyphens not underscores', status: 'na', priority: 'high' },
  { category: 'URL', item: 'Contains keyword', status: 'na', priority: 'medium' },
  { category: 'URL', item: 'Under 75 characters', status: 'na', priority: 'medium' },
  { category: 'URL', item: 'Canonical tag set', status: 'na', priority: 'critical' },
  
  // Headings
  { category: 'Headings', item: 'Single H1 tag', status: 'na', priority: 'critical' },
  { category: 'Headings', item: 'H1 contains keyword', status: 'na', priority: 'critical' },
  { category: 'Headings', item: 'Proper hierarchy (no skips)', status: 'na', priority: 'high' },
  { category: 'Headings', item: 'H2s structure content', status: 'na', priority: 'high' },
  { category: 'Headings', item: 'Keywords in subheadings', status: 'na', priority: 'medium' },
  
  // Content
  { category: 'Content', item: 'Adequate word count', status: 'na', priority: 'high' },
  { category: 'Content', item: 'Keyword in first 100 words', status: 'na', priority: 'high' },
  { category: 'Content', item: 'Keyword density 1-2%', status: 'na', priority: 'medium' },
  { category: 'Content', item: 'LSI keywords present', status: 'na', priority: 'medium' },
  { category: 'Content', item: 'Readable (8th grade level)', status: 'na', priority: 'medium' },
  { category: 'Content', item: 'Short paragraphs', status: 'na', priority: 'low' },
  { category: 'Content', item: 'Uses lists/bullets', status: 'na', priority: 'low' },
  
  // Internal Linking
  { category: 'Internal Links', item: 'Has internal links', status: 'na', priority: 'high' },
  { category: 'Internal Links', item: 'Descriptive anchor text', status: 'na', priority: 'high' },
  { category: 'Internal Links', item: 'Links to related content', status: 'na', priority: 'medium' },
  { category: 'Internal Links', item: 'Breadcrumbs present', status: 'na', priority: 'medium' },
  
  // Images
  { category: 'Images', item: 'All images have alt text', status: 'na', priority: 'critical' },
  { category: 'Images', item: 'Descriptive file names', status: 'na', priority: 'medium' },
  { category: 'Images', item: 'Proper dimensions set', status: 'na', priority: 'high' },
  { category: 'Images', item: 'Using next/image', status: 'na', priority: 'high' },
  { category: 'Images', item: 'LCP image prioritized', status: 'na', priority: 'high' },
  
  // Schema
  { category: 'Schema', item: 'Appropriate schema type', status: 'na', priority: 'high' },
  { category: 'Schema', item: 'Schema validates', status: 'na', priority: 'high' },
  { category: 'Schema', item: 'Breadcrumb schema', status: 'na', priority: 'medium' },
  
  // UX
  { category: 'UX', item: 'Mobile responsive', status: 'na', priority: 'critical' },
  { category: 'UX', item: 'Fast loading (LCP < 2.5s)', status: 'na', priority: 'critical' },
  { category: 'UX', item: 'No layout shift (CLS < 0.1)', status: 'na', priority: 'high' },
  { category: 'UX', item: 'Clear CTA above fold', status: 'na', priority: 'medium' },
]
