/// <reference types="nuxt" />

// https://nuxt.com/docs/api/configuration/nuxt-config
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