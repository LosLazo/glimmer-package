# Glimmer Package

A Vue 3 design system component library.

## Installation

```bash
npm install @loslazo/glimmer-package
```

## Usage

### Basic Usage

```vue
<script setup>
import { Button } from '@loslazo/glimmer-package/components/Button'
import '@loslazo/glimmer-package/styles'
</script>

<template>
  <Button>Click me</Button>
</template>
```

### Nuxt.js Integration

Add the following configuration to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  // Enable Vue compiler
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.includes('-')
    }
  },
  
  // Configure Vite
  vite: {
    optimizeDeps: {
      include: ['@loslazo/glimmer-package']
    },
    resolve: {
      dedupe: ['vue']
    }
  },

  // Configure build
  build: {
    transpile: ['@loslazo/glimmer-package']
  }
})
```

### Vite Integration

Add the following configuration to your `vite.config.ts`:

```ts
export default defineConfig({
  optimizeDeps: {
    include: ['@loslazo/glimmer-package']
  },
  build: {
    transpile: ['@loslazo/glimmer-package']
  }
})
```

## Features

- Vue 3 components with TypeScript support
- SFC (Single File Component) support
- SCSS styling with variables
- Tree-shakeable components
- ESM and CommonJS support
- Full TypeScript declarations

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build package
npm run build

# Run Storybook
npm run storybook
```

## Building

The package uses Vite for building and includes:
- TypeScript compilation
- Vue SFC processing
- SCSS compilation
- Type declarations generation
- CSS bundling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Component Documentation

This library includes an automatic documentation generator that extracts component API information from the source code.

### Generating Documentation

Run the following command to generate documentation:

```bash
npm run generate-docs
```

This will analyze all components and create a `component-docs.json` file in the `docs` directory.

### CLI Options

The documentation generator supports several command-line options:

```bash
npm run generate-docs -- [options]

Options:
  -i, --input <path>     Path to components directory (default: src/components)
  -o, --output <path>    Output directory for generated docs (default: docs)
  -f, --filename <name>  Name of the output file (default: component-docs.json)
  -h, --help             Show this help message
```

### Documentation Format

The documentation is generated in JSON format following the ComponentAPI structure defined in `api/types/component-api.ts`. For each component, it extracts:

- Component name and description
- Props with types, default values, and descriptions
- Events with parameter information
- Methods with parameter and return type information
- Computed properties
- Design tokens (if defined)

### Improving Documentation

To improve the documentation quality, consider adding JSDoc comments to your components:

```vue
<script setup lang="ts">
/**
 * A button component with various styles and states.
 */
interface Props {
  /** The variant style of the button */
  variant?: 'primary' | 'secondary' | 'tertiary';
  
  /** Whether the button is in a loading state */
  loading?: boolean;
}

defineProps<Props>();

/** Emitted when the button is clicked */
const emit = defineEmits<{
  (e: 'click', value: string): void
}>();
</script>
```
