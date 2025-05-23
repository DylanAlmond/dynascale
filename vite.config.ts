import { defineConfig } from 'vite';
import { peerDependencies } from './package.json';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'dynascale',
      fileName: 'dynascale'
    },
    rollupOptions: {
      // Exclude all peer dependencies from being bundled
      external: [...Object.keys(peerDependencies), 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJsxRuntime'
        }
      }
    }
  },
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json'
    }),
    cssInjectedByJsPlugin()
  ]
});

