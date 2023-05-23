/// <reference types="vitest" />

import { resolve } from "path"
import { defineConfig } from "vite"
import { viteStaticCopy } from "vite-plugin-static-copy"
import dts from "vite-plugin-dts"
import minimist from "minimist"
import livereload from "rollup-plugin-livereload"

const args = minimist(process.argv.slice(2))
const isWatch = args.watch || args.w || false
// const devDistDir = "/Users/terwer/Documents/mydocs/siyuan-plugins/siyuan-plugin-publisher/public/libs/zhi-publisher-sdk"
const devDistDir = "/Users/terwer/Documents/mydocs/siyuan-widgets/sy-post-publisher/public/libs/zhi-publisher-sdk/"
const distDir = isWatch ? devDistDir : "./dist"
// const distDir = devDistDir

console.log("isWatch=>", isWatch)
console.log("distDir=>", distDir)

export default defineConfig({
  plugins: [
    dts(),

    viteStaticCopy({
      targets: [
        {
          src: "README.md",
          dest: "./",
        },
        {
          src: "package.json",
          dest: "./",
        },
      ],
    }),
  ],

  // https://github.com/vitejs/vite/issues/1930
  // https://vitejs.dev/guide/env-and-mode.html#env-files
  // https://github.com/vitejs/vite/discussions/3058#discussioncomment-2115319
  // 在这里自定义变量
  define: {
    "process.env.DEV_MODE": `"${isWatch}"`,
  },

  build: {
    // 输出路径
    outDir: distDir,
    emptyOutDir: false,

    // 构建后是否生成 source map 文件
    sourcemap: false,

    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.ts"),
      // the proper extensions will be added
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      plugins: [...(isWatch ? [livereload(devDistDir)] : [])],
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [],
      output: {
        entryFileNames: "[name].js",
      },
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
})
