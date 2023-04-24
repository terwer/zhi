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

import path from "path"
import minimist from "minimist"
import stylePlugin from "esbuild-style-plugin"
import vuePlugin from "@terwer/esbuild-plugin-vue3"
import aliasPlugin from "@chialab/esbuild-plugin-alias"
import inlineImage from "esbuild-plugin-inline-image"
import getNormalizedEnvDefines from "esbuild-config-custom/utils.cjs"
import rimraf from "rimraf"

const args = minimist(process.argv.slice(2))
const isProduction = args.production || args.prod
const outDir = args.outDir || args.o

// for outer custom output for dev
const distDir = outDir ?? "../../api"

const defineEnv = {
  NODE_ENV: isProduction ? "production" : "development",
  ...getNormalizedEnvDefines(["NODE", "VITE_"]),
}
const coreDefine = {
  "import.meta.env": JSON.stringify(defineEnv),
  "import.meta.env.SSR": "true",
}

/**
 * 构建配置
 */
export default {
  esbuildConfig: {
    entryPoints: ["src/server/vercel.ts"],
    outfile: path.join(distDir, "index.js"),
    format: "cjs",
    platform: "node",
    define: { ...coreDefine },
    external: ["*.woff", "*.woff2", "*.ttf"],
    plugins: [
      vuePlugin(),
      aliasPlugin({
        vue: "vue/dist/vue.esm-bundler.js",
      }),
      inlineImage({
        limit: 5000,
        extensions: ["png", "jpg", "jpeg", "gif", "svg", "webp"],
      }),
      stylePlugin({ extract: false }),
    ],
  },
  customConfig: {
    distDir: distDir,
    servePort: 3232,
    isServe: true,
    onZhiBuildSuccess: function () {
      if (isProduction) {
        console.log("server build success.do some cleanup.removing server.css ...")
        rimraf.sync(path.join(distDir, "/index.css"))
      }
    },
  },
}