import { useState, useEffect } from "react"

interface BlogPost {
  title: string
  link: string
  pubDate: string
  description: string
  content: string
  author?: string
}

interface RssItem {
  title: string
  link: string
  pubDate: string
  description?: string
  content: string
  author?: string
}

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Replace with your actual Substack publication name
  const SUBSTACK_NAME = "orlandoflores" // e.g., "orlandoflores"
  const RSS_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://${SUBSTACK_NAME}.substack.com/feed`

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = await fetch(RSS_URL)
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        
        const data = await response.json()
        
        if (data.status !== 'ok') {
          throw new Error('RSS feed error')
        }
        
        const formattedPosts = data.items.map((item: RssItem) => ({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          description: item.description?.replace(/<[^>]*>/g, '').substring(0, 280) + '...',
          content: item.content,
          author: item.author || 'Orlando Flores'
        }))
        
        setPosts(formattedPosts)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load posts')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [RSS_URL])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return readingTime
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h1 className="text-5xl font-bold mb-6 tracking-tight">Blog</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Thoughts on design, development, and creative processes
              </p>
            </div>
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                <span className="text-muted-foreground font-medium">Loading latest posts...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h1 className="text-5xl font-bold mb-6 tracking-tight">Blog</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Thoughts on design, development, and creative processes
              </p>
            </div>
            <div className="text-center py-20">
              <div className="bg-muted/30 rounded-2xl p-12 border border-border/50">
                <p className="text-lg text-muted-foreground mb-4">Unable to load blog posts at the moment.</p>
                <p className="text-sm text-muted-foreground/70 mb-6">Error: {error}</p>
                <p className="text-sm text-muted-foreground/70">
                  Please check your Substack configuration or try again later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-16">
            <h1 className="text-5xl font-bold mb-6 tracking-tight">Blog</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Thoughts on design, development, and creative processes
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Published on Substack</span>
              </span>
              <span>•</span>
              <span>{posts.length} posts</span>
            </div>
          </div>
          
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-muted/30 rounded-2xl p-12 border border-border/50">
                <p className="text-lg text-muted-foreground">No posts found.</p>
                <p className="text-sm text-muted-foreground/70 mt-2">
                  Check your Substack publication or try again later.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {posts.map((post, index) => (
                <article 
                  key={index} 
                  className="group border-b border-border/50 pb-12 last:border-b-0 last:pb-0"
                >
                  <div className="space-y-4">
                    {/* Post Meta */}
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="font-medium">{post.author}</span>
                      <span>•</span>
                      <time dateTime={post.pubDate}>{formatDate(post.pubDate)}</time>
                      <span>•</span>
                      <span>{getReadingTime(post.content)} min read</span>
                    </div>
                    
                    {/* Post Title */}
                    <h2 className="text-3xl font-bold leading-tight tracking-tight group-hover:text-primary transition-colors duration-200">
                      <a 
                        href={post.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="no-underline"
                      >
                        {post.title}
                      </a>
                    </h2>
                    
                    {/* Post Description */}
                    <p className="text-lg text-muted-foreground leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                    
                    {/* Read More Link */}
                    <div className="pt-2">
                      <a 
                        href={post.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-semibold transition-colors duration-200 group/link"
                      >
                        <span>Read on Substack</span>
                        <svg 
                          className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
          
          {/* Substack Attribution */}
          <div className="mt-20 pt-12 border-t border-border/50">
            <div className="flex items-center justify-center space-x-3 text-sm text-muted-foreground">
              <span>Powered by</span>
              <a 
                href={`https://${SUBSTACK_NAME}.substack.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Substack
              </a>
              <span>•</span>
              <a 
                href={`https://${SUBSTACK_NAME}.substack.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Subscribe for updates
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
