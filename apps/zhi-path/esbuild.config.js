/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2023-2026 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import path from "path"
import minimist from "minimist"
import { dtsPlugin } from "esbuild-plugin-d.ts"
import { copy } from "esbuild-plugin-copy"
// import inlineImage from "esbuild-plugin-inline-image"

const args = minimist(process.argv.slice(2))
// const isProduction = args.production || args.prod
const outDir = args.outDir || args.o

// for outer custom output for dev
const baseDir = outDir ?? "./"
const distDir = outDir ? baseDir : path.join(baseDir, "dist")

// const defineEnv = {
//   NODE_ENV: isProduction ? "production" : "development",
//   ...getNormalizedEnvDefines(["NODE", "VITE_"]),
// }
// const coreDefine = {
//   "import.meta.env": JSON.stringify(defineEnv),
// }

/**
 * 构建配置
 */
export default {
  esbuildConfig: {
    entryPoints: ["src/index.ts"],
    outfile: path.join(distDir, "index.cjs"),
    bundle: true,
    format: "cjs",
    platform: "node",
    // define: { ...coreDefine },
    plugins: [
      dtsPlugin(),
      copy({
        // this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
        // if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
        resolveFrom: "cwd",
        assets: [
          // copy folder
          // {
          //   from: "./public/**/*",
          //   to: [distDir],
          // },
          // copy one file
          {
            from: ["./README.md"],
            to: [path.join(distDir, "/README.md")],
          },
        ],
        watch: true,
      }),
      // inlineImage({
      //   limit: 5000,
      //   extensions: ["png", "jpg", "jpeg", "gif", "svg", "webp"],
      // }),
    ],
  },
  customConfig: {},
}
