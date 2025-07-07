import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAssetPath(path: string): string {
  const isGithubPages = process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES === 'true'
  const basePath = isGithubPages ? '/RIDCorix' : ''
  return `${basePath}${path}`
}
