import { resolve } from 'path';

// vite.config.js
export default {
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, 'main.js'),
      name: 'index',
      fileName: 'index',
    },
  },
};
