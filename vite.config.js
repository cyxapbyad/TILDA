import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib'

  if (isLib) {
    return {
      plugins: [react()],
      define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
      },
      build: {
        lib: {
          entry: 'src/teacher-slider-entry.jsx',
          name: 'TeacherSlider',
          fileName: 'teacher-slider',
          formats: ['umd'],
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
            assetFileNames: (assetInfo) =>
              assetInfo.name && assetInfo.name.endsWith('.css')
                ? 'teacher-slider.css'
                : assetInfo.name,
          },
        },
        outDir: 'dist',
        emptyOutDir: true,
        cssCodeSplit: false,
      },
    }
  }

  return {
    plugins: [react()],
  }
})
