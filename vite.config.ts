import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import babel from 'vite-plugin-babel';
import svgr from 'vite-plugin-svgr';

/// <reference types="vite/client" />

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE');
  const envWithProcessPrefix = {
    'process.env': JSON.stringify(env),
    __APP_ENV__: process.env.VITE_VERCEL_ENV,
  };

  return {
    resolve: {
      alias: {
        '@root': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@constants': path.resolve(__dirname, './src/constants'),
        '@services': path.resolve(__dirname, './src/services'),
        '@store': path.resolve(__dirname, './src/store'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
      },
    },
    define: envWithProcessPrefix,
    plugins: [
      babel({
        babelConfig: {
          babelrc: false,
          configFile: false,
          plugins: [
            ['react-remove-properties', { attributes: ['data-testid'] }],
          ],
        },
      }),
      react(),
      svgr({
        svgrOptions: {
          exportType: 'named',
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: '**/*.svg',
      }),
    ],
    base: './',
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
  };
});
