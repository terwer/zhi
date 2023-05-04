#!/usr/bin/env node

const { loadConfigFile } = require("rollup/loadConfigFile")
const path = require("node:path")
const rollup = require("rollup")
const minimist = require("minimist")

/**
 *  zhi 主题构建
 *
 *  https://rollupjs.org/javascript-api/#programmatically-loading-a-config-file
 */
class ZhiBuild {
  /**
   * 构建过程
   */
  static async processBuild() {
    // 处理参数
    const args = minimist(process.argv.slice(2))
    const cfg = args.c ?? "rollup.config.js"
    const isWatch = args.watch ?? false

    // 读取用户定义的配置文件
    let userRollupConfig = {}
    let customConfig = {}
    const rollupConfigFile = path.join(process.cwd(), cfg)
    console.log("Reading user defined rollup config from =>", rollupConfigFile)

    // load the config file next to the current script;
    // the provided config object has the same effect as passing "--format es"
    // on the command line and will override the format of all outputs
    loadConfigFile(rollupConfigFile, {
      format: "es",
    }).then(async ({ options, warnings }) => {
      // "warnings" wraps the default `onwarn` handler passed by the CLI.
      // This prints all warnings up to this point:
      console.log(`We currently have ${warnings.count} warnings`)

      // This prints all deferred warnings
      warnings.flush()

      // options is an array of "inputOptions" objects with an additional
      // "output" property that contains an array of "outputOptions".
      // The following will generate all outputs for all inputs, and write
      // them to disk the same way the CLI does it:
      for (const optionsObj of options) {
        const bundle = await rollup.rollup(optionsObj)
        await Promise.all(optionsObj.output.map(bundle.write))
      }

      // You can also pass this directly to "rollup.watch"
      if (isWatch) {
        console.log("Rollup is watching...")
        const watcher = rollup.watch(options)

        // Additionally, you can hook into the following. Again, return a Promise to
        // make Rollup wait at that stage:
        watcher.on("change", (id, { event }) => {
          /* a file was modified */
          console.log("Hot reloaded file =>", id)
        })
      } else {
        console.log("ZhiBuild process finished")
      }
    })
  }
}

/**
 * 构建入口
 */
;(async () => {
  try {
    console.log("ZhiBuild is starting...")
    await ZhiBuild.processBuild()
  } catch (e) {
    console.error(`ZhiBuild process failed: ${e}`)
    process.exit(1)
  }
})()

module.exports = ZhiBuild
