/// <reference types="vitest" />

import { defineConfig } from "vite"
import { join } from "path"
import { viteStaticCopy } from "vite-plugin-static-copy"
// import viteTsConfigPaths from "vite-tsconfig-paths"
import dts from "vite-plugin-dts"
import minimist from "minimist"
import livereload from "rollup-plugin-livereload"

const args = minimist(process.argv.slice(2))
const isWatch = args.watch || args.w || false
const devDistDir = "/Users/terwer/Documents/mydocs/siyuan-plugins/siyuan-plugin-publisher/public/libs/zhi-env"
const distDir = isWatch ? devDistDir : "./dist"

console.log("isWatch=>", isWatch)
console.log("distDir=>", distDir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      entryRoot: "src",
      tsConfigFilePath: join(__dirname, "tsconfig.json"),
      skipDiagnostics: true,
    }),

    // viteTsConfigPaths({
    //   root: "../../",
    // }),

    viteStaticCopy({
      targets: [{ src: "README.md", dest: "./" }],
    }),
  ],

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    // 输出路径
    outDir: distDir,
    emptyOutDir: false,

    // 构建后是否生成 source map 文件
    sourcemap: false,

    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: "src/index.ts",
      fileName: "index",
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ["es"],
    },
    rollupOptions: {
      plugins: [...(isWatch ? [livereload(devDistDir)] : [])],
      // External packages that should not be bundled into your library.
      external: [],
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
})
