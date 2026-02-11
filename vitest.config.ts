import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'packages')
    }
  },
  test: {
    environment: 'happy-dom',
    include: ['packages/**/*.test.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['packages/**/*.ts'],
      exclude: [
        'packages/**/*.test.ts',
        'packages/index.ts',
        'packages/types/**',
        'packages/props.d.ts',
        'packages/component-types.d.ts'
      ]
    }
  }
})
