import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/pages/Auth/style.scss";\n@import "./src/pages/Register/style.scss";\n@import "./src/pages/Messenger/style.scss";\n@import "./src/pages/Profile/style.scss";\n@import "./src/pages/Settings/style.scss";`,
      },
    },
  },
});
