import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowLeft, Share2, Bookmark } from 'lucide-react'
import { getArticleBySlug, getArticles } from '@/lib/articles'

// Import highlight.js CSS for code syntax highlighting
import 'highlight.js/styles/github-dark.css'

// Remove the large articles array that was here before

type Params = Promise<{
  slug: string
}>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  
  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: `${article.title} | Ray`,
    description: article.excerpt,
  }
}

export function generateStaticParams() {
  const articles = getArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  const allArticles = getArticles()

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Article Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="text-blue-100 hover:text-white hover:bg-white/10 mb-6">
              <Link href="/articles" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Articles
              </Link>
            </Button>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              {article.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 text-blue-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {new Date(article.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {article.readTime}
                </div>
                <div>By {article.author}</div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-blue-100 hover:text-white hover:bg-white/10">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-blue-100 hover:text-white hover:bg-white/10">
                  <Bookmark className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 prose-pre:text-gray-100">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                code: (props: any) => {
                  const { inline, className, children, ...rest } = props
                  return inline ? (
                    <code
                      className="bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-1 py-0.5 rounded text-sm"
                      {...rest}
                    >
                      {children}
                    </code>
                  ) : (
                    <code className={className} {...rest}>
                      {children}
                    </code>
                  )
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                pre: (props: any) => (
                  <pre
                    className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto border"
                    {...props}
                  >
                    {props.children}
                  </pre>
                ),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                blockquote: (props: any) => (
                  <blockquote
                    className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 my-6"
                    {...props}
                  >
                    {props.children}
                  </blockquote>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">More Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {allArticles
                .filter(a => a.id !== article.id)
                .slice(0, 2)
                .map((relatedArticle) => (
                  <div key={relatedArticle.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {relatedArticle.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      <Link href={`/articles/${relatedArticle.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                        {relatedArticle.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {relatedArticle.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{new Date(relatedArticle.date).toLocaleDateString()}</span>
                      <span>{relatedArticle.readTime}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
