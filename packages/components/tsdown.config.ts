import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: './src/index.ts'
  },
  outDir: './dist',
  exports: true,
  format: ['es', 'cjs'],
  dts: true,
  target: 'esnext',
  minify: true
})
