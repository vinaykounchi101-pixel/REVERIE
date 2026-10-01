import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    watch: {
      ignored: ['**/design_reference/**', '**/3D model/**', '**/New folder/**', '**/prompt/**', '**/*.md', '**/.git/**', '**/public/models/**', '**/public/hero-sequence/**', '**/*.glb', '**/*.gltf', '**/*.mp4', '**/*.webm', '**/*.mkv'],
    },
  },
});
