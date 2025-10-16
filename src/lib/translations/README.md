# Translations Structure

This folder contains all translation files for the application, organized by language.

## File Structure

```
translations/
├── index.ts    # Main export file that combines all translations
├── zh.ts       # Traditional Chinese (繁體中文) translations
├── en.ts       # English translations
└── README.md   # This file
```

## Usage

Import translations from the main file:

```typescript
import { translations } from '@/lib/translations'

// Access Chinese translations
const zhText = translations.zh.nav.home // '首頁'

// Access English translations
const enText = translations.en.nav.home // 'Home'
```

Or use the re-export from the parent directory:

```typescript
import { translations } from '@/lib/translations'
```

## Adding a New Language

1. Create a new file in this directory (e.g., `ja.ts` for Japanese)
2. Copy the structure from `zh.ts` or `en.ts`
3. Translate all strings to the new language
4. Add the import and export to `index.ts`:

```typescript
import { ja } from './ja'

export const translations = {
  zh,
  en,
  ja  // Add your new language here
} as const
```

## Type Safety

The translations are typed using TypeScript's `as const` assertion, providing:
- Autocomplete for all translation keys
- Type checking to ensure all languages have the same structure
- Compile-time errors if keys are missing or misspelled

## Best Practices

1. **Keep structure consistent**: All language files should have the same keys
2. **Use meaningful keys**: Group related translations together (e.g., `nav.*`, `hero.*`)
3. **Add comments**: Use comments to organize sections (e.g., `// Navigation`, `// Hero Section`)
4. **Test translations**: Verify translations display correctly in the UI after adding/modifying
5. **Use proper punctuation**: Maintain language-specific punctuation rules (e.g., 中文逗號、英文 comma)
