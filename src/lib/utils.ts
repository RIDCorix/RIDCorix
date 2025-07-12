import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAssetPath(path: string): string {
  // Simple detection: if we're on GitHub Pages (ridcorix.github.io), use the base path
  if (typeof window !== 'undefined') {
    // Client-side: check the current URL
    if (window.location.hostname === 'ridcorix.github.io') {
      return `/RIDCorix${path}`
    }
    return path
  } else {
    // Server-side: use environment variables
    const isGithubPages = process.env.GITHUB_PAGES === 'true'
    return isGithubPages ? `/RIDCorix${path}` : path
  }
}
