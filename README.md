This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions:

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Push to main branch:**
   - The workflow will automatically trigger on every push to the `main` branch
   - You can also manually trigger the deployment from the Actions tab

3. **Access your site:**
   - Once deployed, your site will be available at: `https://[username].github.io/[repository-name]`
   - The deployment URL will be shown in the Actions log

### GitHub Actions Workflow:

The deployment uses the `.github/workflows/nextjs.yml` workflow which:
- Builds the Next.js app with static export
- Optimizes images and assets for static hosting
- Deploys to GitHub Pages automatically
- Supports both npm and yarn package managers

### Configuration:

The project includes the following GitHub Pages optimizations:
- Static export enabled (`output: 'export'`)
- Image optimization disabled for static hosting
- Trailing slashes enabled for better compatibility
