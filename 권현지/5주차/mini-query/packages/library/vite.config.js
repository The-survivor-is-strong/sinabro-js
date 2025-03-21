import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  test: {
    environment: "jsdom"
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'MiniQuery',
      // the proper extensions will be added
      fileName: 'mini-query',
    },
  },
})