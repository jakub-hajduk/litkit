import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: './src/index.ts',
    aria: './src/mechanisms/aria/index.ts',
    events: './src/mechanisms/custom-event-emitter/index.ts',
    internals: './src/mechanisms/internals/index.ts',
    listeners: './src/mechanisms/event-listener/index.ts',
    state: './src/mechanisms/state/index.ts',
    update: './src/mechanisms/update/index.ts',
  },
  outDir: './dist',
  exports: true,
  format: ['es', 'cjs'],
  dts: {
    sourcemap: true
  },
  target: 'esnext',
  external: ['lit'],
})
