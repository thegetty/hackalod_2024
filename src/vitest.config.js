import { defineConfig } from 'vitest/config';
import { mergeConfig } from 'vite';
import viteConfig from './vite.config';

export default defineConfig(
  mergeConfig(viteConfig, {
    test: {
        environment: "jsdom",
        deps: {
            inline: [
                "@thegetty-private/rad-app-utils",
            ],
        },
        globals: true,
        outputDiffLines: 50,
        outputDiffMaxLines: 400,
        outputDiffMaxSize: 50000,
        alias: {
          fs: require.resolve("rollup-plugin-node-builtins"),
        },
    },
  })
);
