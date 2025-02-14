import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //base: './',
  //config for relative absolute import path
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  }
})
