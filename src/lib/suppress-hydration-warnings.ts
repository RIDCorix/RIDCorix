// Suppress hydration warnings caused by browser extensions
// This is a temporary solution for hydration mismatches caused by browser extensions
// that inject attributes into the DOM after server-side rendering

if (typeof window !== 'undefined') {
  // Suppress hydration warnings in development
  const originalError = console.error
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Hydration failed') &&
      (args[0].includes('bis_skin_checked') || 
       args[0].includes('bis_register') ||
       args[0].includes('__processed_'))
    ) {
      // Suppress hydration errors caused by browser extensions
      return
    }
    originalError.apply(console, args)
  }
}

export {}
