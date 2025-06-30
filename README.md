# RIDCorix - Modern Portfolio Website

A modern, responsive personal portfolio website built with Next.js 14+ and shadcn/ui components.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14+, TypeScript, Tailwind CSS, shadcn/ui
- **Responsive Design**: Mobile-first approach with beautiful UI components
- **Dark/Light Theme**: Theme switching with persistent preferences
- **Smooth Animations**: Framer Motion animations and micro-interactions
- **Interactive Elements**: Hover effects, progress bars, and engaging animations
- **Contact Form**: React Hook Form with Zod validation
- **Static Export**: Optimized for GitHub Pages deployment
- **SEO Optimized**: Next.js metadata API with proper meta tags
- **Accessibility**: Full keyboard navigation and screen reader support

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+, React 18+, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Theme**: next-themes with CSS variables
- **Icons**: Lucide React
- **Deployment**: Static export for GitHub Pages

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/RIDCorix/RIDCorix.git
cd RIDCorix
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build and Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Static Export (for GitHub Pages)
```bash
npm run build
```

The exported files will be in the `out/` directory, ready for deployment to GitHub Pages.

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles and Tailwind imports
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── sections/           # Page sections (Hero, About, Skills, etc.)
│   ├── layout/             # Layout components (Header, Footer)
│   └── theme/              # Theme provider and toggle
├── lib/
│   ├── utils.ts            # Utility functions
│   └── validations.ts      # Form validation schemas
├── public/                 # Static assets
├── backup/                 # Original HTML/CSS/JS files
└── Configuration files     # Next.js, TypeScript, Tailwind configs
```

## 🎨 Sections

1. **Hero Section**: Animated introduction with rotating roles
2. **About Section**: Personal introduction with achievement stats and timeline
3. **Skills Section**: Technical skills with animated progress bars and technology tags
4. **Projects Section**: Portfolio showcase with filter functionality
5. **Contact Section**: Contact form with validation and contact information

## 🚀 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Bundle Size**: Optimized with Next.js automatic code splitting
- **Images**: Next.js Image component for optimal loading

## 🔧 Customization

### Colors
Customize the color scheme by modifying the CSS variables in `app/globals.css`.

### Content
Update personal information, projects, and skills in the respective section components.

### Components
Add or modify sections by creating new components in `components/sections/`.

## 📱 Mobile Support

Fully responsive design with:
- Mobile-first approach
- Touch-friendly interactions
- Optimized animations for mobile devices
- Accessible navigation

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**RIDCorix**
- GitHub: [@RIDCorix](https://github.com/RIDCorix)
- Email: contact@ridcorix.dev

---

Built with ❤️ using Next.js, TypeScript, and shadcn/ui