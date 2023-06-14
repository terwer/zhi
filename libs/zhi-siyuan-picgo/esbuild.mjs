import globby from "globby"
import esbuild from "esbuild"
import fse from "fs-extra"
import fs from "fs"
import minimist from "minimist"
import inlineImportPlugin from "esbuild-plugin-inline-import"

const args = minimist(process.argv.slice(2))
const isWatch = args.watch || args.w
const isTest = args.test || args.t
const isProduction = args.production

// Following the log format of https://github.com/connor4312/esbuild-problem-matchers
const status = (msg) => console.log(`${isWatch ? "[watch] " : ""}${msg}`)

const firstBuildFinished = new Set()
let buildStartTime

/** @type {import('esbuild').Plugin} */
const watchPlugin = (type) => ({
  name: "watcher",
  setup(build) {
    build.onStart(() => {
      buildStartTime = Date.now()
      status(`${type} build started.`)
    })
    build.onEnd((result) => {
      result.errors.forEach((error) =>
        console.error(
          `> ${error.location.file}:${error.location.line}:${error.location.column}: error: ${error.text}`
        )
      )
      firstBuildFinished.add(type)
      status(`${type} build finished in ${Date.now() - buildStartTime} ms.`)
      if (firstBuildFinished.size === 2) {
        // esbuild problem matcher extension is listening for this log, once this is logged, it will open the Extension Host
        // So we have to assure only printing this when both extension and webview have been built
        status(`build finished in ${Date.now() - buildStartTime} ms.`)
      }
    })
  },
})
const resultHandler = async (result) => {
  result.metafile &&
    console.log(
      await esbuild.analyzeMetafile(result.metafile, {
        verbose: true,
      })
    )
}

const outdir = "./dist"

// clean old built files
if (fs.existsSync(outdir)) {
  fse.rmdirSync(outdir, { recursive: true })
}
fse.mkdirpSync(outdir)

/** @type {import('esbuild').BuildOptions} */
const commonOptions = {
  bundle: true,
  sourcemap: isProduction ? false : "inline",
  watch: isWatch,
  loader: {
    ".js": "jsx",
    ".png": "dataurl",
    ".jpg": "dataurl",
    ".svg": "dataurl",
    ".woff": "dataurl",
    ".woff2": "dataurl",
  },
  define: {
    "process.env.NODE_ENV": isProduction ? '"production"' : '"development"',
  },
  minify: isProduction,
  // metafile: true
}

// build extension (node app)
esbuild
  .build({
    ...commonOptions,
    outdir,
    entryPoints: isTest ? globby.sync("test/**/*.ts") : ["src/syPicgo.ts"],
    external: isTest ? ["mocha", "istanbul", "electron"] : ["electron"],
    format: "cjs",
    platform: "node",
    mainFields: ["module", "main"],
    plugins: [watchPlugin("extension"), inlineImportPlugin()],
  })
  .then(resultHandler)
  .catch(() => {
    process.exit(1)
  })
