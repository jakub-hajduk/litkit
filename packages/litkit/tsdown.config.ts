import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: './src/index.ts',
    'event-listener': './src/mechanisms/event-listener/index.ts',
    'generic-event-emitters': './src/mechanisms/generic-event-emitters/index.ts',
    'internals': './src/mechanisms/internals/index.ts',
    'options': './src/mechanisms/options/index.ts',
    'roving-tabindex': './src/mechanisms/roving-tabindex/index.ts',
    'css-state': './src/mechanisms/css-state/index.ts',
    'slots': './src/mechanisms/slots/index.ts',
    'update': './src/mechanisms/update/index.ts'
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
