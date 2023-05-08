/*
 * Copyright (c) 2023, Terwer . All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Terwer designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Terwer in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
 * or visit www.terwer.space if you need additional information or have any
 * questions.
 */

const getAppBase = (isSiyuanBuild: boolean, isDev: boolean, isVercelBuild: boolean): string => {
  if (isSiyuanBuild) {
    return "/appearance/themes/zhi/blog/"
  } else if (isNodeBuild || isVercelBuild) {
    return "/"
  } else {
    // static
    return "/zhi/apps/zhi-blog/dist/"
  }
}

const isDev = process.env.NODE_ENV === "development"
const isNodeBuild = process.env.BUILD_TYPE === "node"
const isVercelBuild = process.env.BUILD_TYPE === "vercel"
const isStaticBuild = process.env.BUILD_TYPE === "nginx"
const isSiyuanBuild = process.env.BUILD_TYPE === "siyuan"

const appBase = getAppBase(isSiyuanBuild, isDev, isVercelBuild)
const isSsr = isNodeBuild || isVercelBuild
const ssrPreset = isVercelBuild ? "vercel" : isDev ? "node-server" : undefined
const ssrServeStatic = isSiyuanBuild
const staticV = "202304191333"

console.log("isDev=>", isDev)
console.log("BUILD_TYPE=>", process.env.BUILD_TYPE)
console.log("isNodeBuild=>", isNodeBuild)
console.log("isVercelBuild=>", isVercelBuild)
console.log("isStaticBuild=>", isStaticBuild)
console.log("isSiyuanBuild=>", isSiyuanBuild)
console.log("isSsr=>", isSsr)
console.log("ssrPreset=>", ssrPreset)
console.log("ssrServeStatic=>", ssrServeStatic)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // content
  // https://content.nuxtjs.org/guide/writing/content-directory

  // meilisearch
  // https://github.com/xlanex6/nuxt-meilisearch
  // https://docs.meilisearch.com/learn/getting_started/quick_start.html

  modules: ["@nuxt/content", "nuxt-meilisearch"],
  content: {
    // https://content.nuxtjs.org/api/configuration
  },
  app: {
    baseURL: appBase,
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [{ rel: "stylesheet", href: appBase + "lib/webfont/webfont.css?v=" + staticV }],
      // script: [
      //   {
      //     src: appBase + "lib/lute/lute-1.7.5-20230410.min.js?v=" + staticV,
      //     body: true,
      //   },
      // ],
    },
  },
  css: ["~/assets/vdoing/styles/index.styl"],
  runtimeConfig: {
    // default type
    VITE_DEFAULT_TYPE: "siyuan",
    // siyuan
    VITE_SIYUAN_API_URL: "",
    VITE_SIYUAN_AUTH_TOKEN: "",
    // WordPress
    VITE_WORDPRESS_API_URL: "",
    VITE_WORDPRESS_USERNAME: "",
    VITE_WORDPRESS_PASSWORD: "",
    public: {
      VITE_STATIC_VERSION: staticV,
      VITE_APP_BASE: appBase,
      VITE_LOG_LEVEL: "INFO",
      VITE_DEBUG_MODE: false,
      // 保证思源笔记内部在 SPA 的情况下默认可用
      VITE_SIYUAN_API_URL: "",
    },
  },
  ssr: isSsr,
  // https://nuxt.com/docs/guide/going-further/custom-routing#hash-mode-spa
  router: {
    options: {
      hashMode: !isSsr,
    },
  },
  nitro: {
    preset: ssrPreset,
    // 开启之后将进行静态伺服
    serveStatic: ssrServeStatic,
  },
  meilisearch: {
    hostUrl: process.env.MEILISEARCH_ENDPOINT ?? "http://localhost:3000/api/endpoint/meilisearch",
    // /Users/terwer/Documents/code/meilisearch/meilisearch-macos-amd64
    // hostUrl: "http://localhost:7700",
    searchApiKey: "<your_search_key>",
    adminApiKey: "<your_admin_key>",
    instantSearch: true, // default true
    serverSideUsage: true, // default false
    // optional
    clientOptions: {
      placeholderSearch: true, // default
      paginationTotalHits: 50, // default
      finitePagination: true, // default
      primaryKey: undefined, // default
      keepZeroFacets: false, // default
    },
  },
})
