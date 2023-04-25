import { defineConfig } from "astro/config"
import node from "@astrojs/node"
import vercel from "@astrojs/vercel/serverless"
import path from "path"
import vue from "@astrojs/vue"

const isDev = process.env.NODE_ENV === "development"
const isVercelBuild = process.env.BUILD_TYPE === "vercel"
const isSiyuanBuild = process.env.BUILD_TYPE === "siyuan"

const zhiThemeAbsPath = "/Users/terwer/Documents/mydocs/SiYuanWorkspace/public/conf/appearance/themes/zhi"
const zhiBuildpath = path.join(zhiThemeAbsPath, "server", "blog")
const distDir = isSiyuanBuild ? zhiBuildpath : isVercelBuild ? ".vercel" : "./dist/node"

console.log("isDev=>", isDev)
if (!isDev) {
  console.log("isSiyuanBuild=>", isSiyuanBuild)
  console.log("isVercelBuild=>", isVercelBuild)
}

// 生产构建需要加上externals，否则无法运行
const externals = isDev
  ? []
  : [
      "undici",
      "server-destroy",
      "vue",
      "busboy",
      "html-escaper",
      "kleur",
      "slash",
      "string-width",
      "path-to-regexp",
      "streamsearch",
      "strip-ansi",
      "eastasianwidth",
      "ansi-regex",
      "emoji-regex",
      "send",
      "http-errors",
      "depd",
      "setprototypeof",
      "statuses",
    ]

// https://astro.build/config
export default defineConfig({
  outDir: distDir,
  integrations: [
    vue({
      appEntrypoint: "/src/pages/_app",
    }),
  ],
  // 注释掉 output 可以构建成纯静态页面
  output: "server",
  vite: {
    ssr: {
      noExternal: externals,
    },
  },
  // https://docs.astro.build/en/guides/integrations-guide/vercel/
  // https://docs.astro.build/en/guides/integrations-guide/node/#standalone
  adapter: isVercelBuild
    ? vercel()
    : node({
        mode: "standalone",
        // middleware 可配合express
        // mode: "middleware"
      }),
})
