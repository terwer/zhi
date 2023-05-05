/// <reference types="vitest" />
import { defineConfig } from "vite"

import viteTsConfigPaths from "vite-tsconfig-paths"

const isTest = process.env["npm_command"] === "test"
console.log("isTest=>", isTest)

export default defineConfig({
  cacheDir: "../../node_modules/.vite/zhi-core",

  plugins: [
    !isTest &&
      viteTsConfigPaths({
        root: "../../",
      }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },

  test: {
    globals: true,
    cache: {
      dir: "../../node_modules/.vitest",
    },
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
})
