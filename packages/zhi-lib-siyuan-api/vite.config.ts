/// <reference types="vitest" />
import { defineConfig } from "vite"

import viteTsConfigPaths from "vite-tsconfig-paths"
import dts from "vite-plugin-dts"
import { join } from "path"
import noBundlePlugin from "vite-plugin-no-bundle"
import { viteStaticCopy } from "vite-plugin-static-copy"

const isTest = process.env["npm_command"] === "test"
console.log("isTest=>", isTest)
export default defineConfig({
  cacheDir: "../../node_modules/.vite/zhi-lib-siyuan-api",

  plugins: [
    dts({
      entryRoot: "src",
      tsConfigFilePath: join(__dirname, "tsconfig.lib.json"),
      skipDiagnostics: true,
    }),

    !isTest &&
      viteTsConfigPaths({
        root: "../../",
      }),

    !isTest && noBundlePlugin(),

    viteStaticCopy({
      targets: [
        {
          src: "README.md",
          dest: ".",
        },
      ],
    }),
  ],

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: "src/index.ts",
      name: "zhi-lib-siyuan-api",
      fileName: "index",
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ["es"],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [],
    },
  },

  test: {
    globals: true,
    cache: {
      dir: "../../node_modules/.vitest",
    },
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
})
