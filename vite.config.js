import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // порт, якщо хочеш змінити (за замовчуванням 5173)
    open: true, // автоматично відкривати браузер
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";` // якщо хочеш підключати глобальні змінні SCSS
      }
    }
  }
});
