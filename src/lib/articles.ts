export interface Article {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  tags: string[]
  slug: string
  author: string
  featured?: boolean
}

// Sample articles data - in a real app, this would come from a CMS or database
export const articles: Article[] = [
  {
    id: 1,
    title: "Building Modern Web Applications with Next.js 14",
    excerpt: "Exploring the latest features of Next.js 14 including the App Router, Server Components, and improved performance optimizations.",
    content: `# Building Modern Web Applications with Next.js 14

Next.js 14 represents a significant leap forward in React framework capabilities, introducing groundbreaking features that reshape how we build web applications. In this comprehensive guide, we'll explore the most impactful additions and learn how to leverage them effectively.

## The App Router Revolution

The App Router isn't just a new routing system—it's a paradigm shift that brings several advantages:

### Server Components by Default
With the App Router, components are Server Components by default, which means:
- **Reduced bundle size**: Server Components don't ship JavaScript to the client
- **Better SEO**: Content is rendered on the server, improving search engine visibility
- **Enhanced performance**: Less JavaScript means faster page loads

\`\`\`tsx
// app/page.tsx - This is a Server Component by default
export default async function HomePage() {
  const data = await fetch('https://api.example.com/data')
  const posts = await data.json()
  
  return (
    <div>
      <h1>Latest Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}
\`\`\`

## Streaming and Loading States

Next.js 14's streaming capabilities allow for progressive page rendering:

\`\`\`tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <div>Loading dashboard...</div>
}

// app/dashboard/page.tsx
export default async function Dashboard() {
  // This will stream in as it loads
  const data = await fetchDashboardData()
  return <DashboardContent data={data} />
}
\`\`\`

## Performance Optimizations

Next.js 14 introduces several performance improvements:

1. **Faster builds**: Up to 53% faster local server startup
2. **Improved bundling**: Better tree-shaking and code splitting
3. **Enhanced caching**: More intelligent caching strategies

## Conclusion

Next.js 14 sets a new standard for React frameworks, offering developers powerful tools to build fast, scalable applications. The App Router, combined with Server Components and streaming, creates opportunities for building better user experiences while maintaining developer productivity.

Whether you're starting a new project or migrating an existing one, Next.js 14's features provide compelling reasons to make the upgrade.`,
    date: "2024-12-15",
    readTime: "8 min read",
    tags: ["Next.js", "React", "Web Development"],
    slug: "building-modern-web-applications-nextjs-14",
    author: "Ray",
    featured: true
  },
  {
    id: 2,
    title: "The Art of TypeScript: Advanced Patterns and Best Practices",
    excerpt: "Deep dive into advanced TypeScript patterns that will make your code more robust, maintainable, and type-safe.",
    content: `# The Art of TypeScript: Advanced Patterns and Best Practices

TypeScript has evolved from a simple type checker to a sophisticated type system that enables powerful programming patterns. Let's explore advanced techniques that will elevate your TypeScript skills.

## Utility Types Mastery

TypeScript's built-in utility types are incredibly powerful:

\`\`\`typescript
// Pick specific properties
type UserPreview = Pick<User, 'id' | 'name' | 'email'>

// Omit properties
type CreateUserRequest = Omit<User, 'id' | 'createdAt'>

// Make all properties optional
type PartialUser = Partial<User>

// Make all properties required
type RequiredUser = Required<User>
\`\`\`

## Conditional Types

Create types that change based on conditions:

\`\`\`typescript
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T }

// Usage
type StringResponse = ApiResponse<string> // { message: string }
type DataResponse = ApiResponse<User[]>   // { data: User[] }
\`\`\`

## Template Literal Types

Build sophisticated string types:

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`
type ButtonEvents = EventName<'click' | 'hover'> // 'onClick' | 'onHover'

// Route building
type Route = '/users' | '/posts' | '/settings'
type ApiRoute<T extends string> = \`/api\${T}\`
type ApiRoutes = ApiRoute<Route> // '/api/users' | '/api/posts' | '/api/settings'
\`\`\`

## Advanced Generic Constraints

\`\`\`typescript
interface Timestamped {
  createdAt: Date
  updatedAt: Date
}

function updateEntity<T extends Timestamped>(
  entity: T, 
  updates: Partial<Omit<T, keyof Timestamped>>
): T {
  return {
    ...entity,
    ...updates,
    updatedAt: new Date()
  }
}
\`\`\`

## Best Practices

1. **Use strict mode**: Enable all strict flags in tsconfig.json
2. **Prefer types over interfaces**: For simple type aliases
3. **Use const assertions**: For immutable data structures
4. **Leverage discriminated unions**: For type-safe state management

\`\`\`typescript
// Discriminated union for loading states
type LoadingState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: any }
  | { status: 'error'; error: string }

function handleState(state: LoadingState) {
  switch (state.status) {
    case 'idle':
      return 'Not started'
    case 'loading':
      return 'Loading...'
    case 'success':
      return state.data // TypeScript knows data exists
    case 'error':
      return state.error // TypeScript knows error exists
  }
}
\`\`\`

## Conclusion

Mastering these advanced TypeScript patterns will make your code more robust, maintainable, and self-documenting. The type system becomes a powerful ally in catching bugs at compile time and improving developer experience.`,
    date: "2024-12-01",
    readTime: "12 min read",
    tags: ["TypeScript", "JavaScript", "Programming"],
    slug: "art-of-typescript-advanced-patterns",
    author: "Ray",
    featured: true
  },
  {
    id: 3,
    title: "Designing Beautiful UIs with Tailwind CSS and shadcn/ui",
    excerpt: "Learn how to create stunning, accessible user interfaces using the power of Tailwind CSS combined with shadcn/ui components.",
    content: `# Designing Beautiful UIs with Tailwind CSS and shadcn/ui

Creating beautiful, consistent, and accessible user interfaces has never been easier with the combination of Tailwind CSS and shadcn/ui. In this guide, we'll explore how to leverage these powerful tools to build stunning interfaces.

## Why Tailwind CSS + shadcn/ui?

The combination offers several advantages:

- **Rapid development**: Pre-built components with utility-first styling
- **Consistency**: Design system approach ensures visual coherence
- **Accessibility**: Built-in accessibility features and best practices
- **Customization**: Easy to customize and extend components

## Getting Started

First, set up Tailwind CSS and shadcn/ui in your project:

\`\`\`bash
# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install shadcn/ui
npx shadcn-ui@latest init
\`\`\`

## Building Components

Here's how to create a modern card component:

\`\`\`tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function ProjectCard({ project }) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="group-hover:text-blue-600 transition-colors">
            {project.title}
          </CardTitle>
          <Badge variant="secondary">{project.status}</Badge>
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="outline">{tech}</Badge>
          ))}
        </div>
        <Button className="w-full">
          View Project
        </Button>
      </CardContent>
    </Card>
  )
}
\`\`\`

## Color System and Theming

shadcn/ui uses CSS variables for theming, making it easy to create dark mode:

\`\`\`css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 84% 4.9%;
}
\`\`\`

## Responsive Design

Tailwind's responsive utilities make it easy to create adaptive layouts:

\`\`\`tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards will be 1 column on mobile, 2 on tablet, 3 on desktop */}
</div>
\`\`\`

## Animation and Micro-interactions

Add smooth animations with Tailwind's transition utilities:

\`\`\`tsx
<Button className="transform hover:scale-105 transition-transform duration-200">
  Hover me
</Button>
\`\`\`

## Best Practices

1. **Use the design system**: Stick to the predefined scales for spacing, colors, etc.
2. **Compose utilities**: Build complex designs by composing simple utilities
3. **Extract components**: Create reusable components for common patterns
4. **Test accessibility**: Use tools like axe-core to ensure accessibility

## Conclusion

Tailwind CSS and shadcn/ui provide a powerful foundation for building beautiful, accessible interfaces quickly. The utility-first approach combined with pre-built components strikes the perfect balance between flexibility and productivity.`,
    date: "2024-11-20",
    readTime: "6 min read",
    tags: ["CSS", "UI/UX", "Design"],
    slug: "designing-beautiful-uis-tailwind-shadcn",
    author: "Ray",
    featured: false
  },
  {
    id: 4,
    title: "Mastering Framer Motion: Creating Smooth Animations",
    excerpt: "From basic transitions to complex orchestrated animations, learn how to bring your React applications to life with Framer Motion.",
    content: `# Mastering Framer Motion: Creating Smooth Animations

Framer Motion is a powerful animation library for React that makes it easy to create smooth, performant animations. In this comprehensive guide, we'll explore everything from basic transitions to complex orchestrated animations.

## Getting Started

First, install Framer Motion in your React project:

\`\`\`bash
npm install framer-motion
\`\`\`

## Basic Animations

Start with simple animations using the \`motion\` component:

\`\`\`tsx
import { motion } from 'framer-motion'

function AnimatedBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-32 h-32 bg-blue-500 rounded-lg"
    />
  )
}
\`\`\`

## Hover and Tap Animations

Create interactive animations that respond to user input:

\`\`\`tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-6 py-3 bg-blue-600 text-white rounded-lg"
>
  Click me
</motion.button>
\`\`\`

## Variants for Complex Animations

Use variants to create consistent, reusable animation sets:

\`\`\`tsx
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  },
  hover: { 
    y: -5,
    transition: { duration: 0.2 }
  }
}

function AnimatedCard() {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="p-6 bg-white rounded-lg shadow-lg"
    >
      <h3>Animated Card</h3>
      <p>This card has smooth entrance and hover animations.</p>
    </motion.div>
  )
}
\`\`\`

## Staggered Animations

Create beautiful staggered animations for lists:

\`\`\`tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

function StaggeredList({ items }) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.li
          key={index}
          variants={itemVariants}
          className="p-4 mb-2 bg-gray-100 rounded"
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  )
}
\`\`\`

## Scroll-triggered Animations

Use \`whileInView\` for scroll-triggered animations:

\`\`\`tsx
<motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true, amount: 0.3 }}
>
  <h2>This animates when scrolled into view</h2>
</motion.section>
\`\`\`

## Page Transitions

Create smooth page transitions in Next.js:

\`\`\`tsx
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

const pageVariants = {
  initial: { opacity: 0, x: -200 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 200 }
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
}

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={router.asPath}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  )
}
\`\`\`

## Performance Tips

1. **Use transform properties**: Animate transform properties (x, y, scale, rotate) for better performance
2. **Avoid animating layout properties**: Don't animate width, height, or position
3. **Use will-change**: Add \`will-change: transform\` for complex animations
4. **Reduce motion for accessibility**: Respect user preferences

\`\`\`tsx
const shouldReduceMotion = useReducedMotion()

<motion.div
  animate={{ x: shouldReduceMotion ? 0 : 100 }}
  transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
>
  Accessible animation
</motion.div>
\`\`\`

## Conclusion

Framer Motion provides a powerful yet intuitive API for creating beautiful animations in React. From simple transitions to complex orchestrated sequences, it gives you the tools to bring your interfaces to life while maintaining good performance and accessibility.

Remember to use animations purposefully—they should enhance the user experience, not distract from it.`,
    date: "2024-11-05",
    readTime: "10 min read",
    tags: ["Animation", "React", "Framer Motion"],
    slug: "mastering-framer-motion-animations",
    author: "Ray",
    featured: false
  }
]

export function getArticles(): Article[] {
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug)
}

export function getFeaturedArticles(): Article[] {
  return articles.filter(article => article.featured)
}

export function getArticlesByTag(tag: string): Article[] {
  return articles.filter(article => 
    article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}
