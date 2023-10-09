import spawn from "cross-spawn"
import {
  IResult,
  IProcessEnv,
  IPluginProcessResult,
  IPluginHandler,
  IPluginHandlerOptions,
  Undefinable,
  IPicGo,
  IPluginHandlerResult,
} from "../types"
import { IBuildInEvent } from "../utils/enum"
import { getProcessPluginName, getNormalPluginName } from "../utils/common"
import { ILocalesKey } from "../i18n/zh-CN"

export class PluginHandler implements IPluginHandler {
  // Thanks to feflow -> https://github.com/feflow/feflow/blob/master/lib/internal/install/plugin.js
  private readonly ctx: IPicGo
  constructor(ctx: IPicGo) {
    this.ctx = ctx
  }

  async install(
    plugins: string[],
    options?: IPluginHandlerOptions,
    env?: IProcessEnv
  ): Promise<IPluginHandlerResult<boolean>> {
    if (!options) {
      options = {}
    }
    const installedPlugins: string[] = []
    const processPlugins = plugins
      .map((item: string) => handlePluginNameProcess(this.ctx, item))
      .filter((item) => {
        // detect if has already installed
        // or will cause error
        if (this.ctx.pluginLoader.hasPlugin(item.pkgName)) {
          installedPlugins.push(item.pkgName)
          this.ctx.log.success(`PicGo has already installed ${item.pkgName}`)
          return false
        }
        // if something wrong, filter it out
        if (!item.success) {
          return false
        }
        return true
      })
    const fullNameList = processPlugins.map((item) => item.fullName)
    const pkgNameList = processPlugins.map((item) => item.pkgName)
    if (fullNameList.length > 0) {
      // install plugins must use fullNameList:
      // 1. install remote pacage
      // 2. install local pacage
      const result = await this.execCommand("install", fullNameList, this.ctx.baseDir, options, env)
      console.log("execCommand install result=>", result)
      if (!result.code) {
        pkgNameList.forEach((pluginName: string) => {
          this.ctx.pluginLoader.registerPlugin(pluginName)
        })
        this.ctx.log.success(this.ctx.i18n.translate<ILocalesKey>("PLUGIN_HANDLER_PLUGIN_INSTALL_SUCCESS"))
        this.ctx.emit("installSuccess", {
          title: this.ctx.i18n.translate<ILocalesKey>("PLUGIN_HANDLER_PLUGIN_INSTALL_SUCCESS"),
          body: [...pkgNameList, ...installedPlugins],
        })
        const res: IPluginHandlerResult<true> = {
          success: true,
          body: [...pkgNameList, ...installedPlugins],
        }
        return res
      } else {
        const err = this.ctx.i18n.translate<ILocalesKey>("PLUGIN_HANDLER_PLUGIN_INSTALL_FAILED_REASON", {
          code: `${result.code}`,
          data: result.data,
        })
        this.ctx.log.error(err)
        this.ctx.emit("installFailed", {
          title: this.ctx.i18n.translate<ILocalesKey>("PLUGIN_HANDLER_PLUGIN_INSTALL_FAILED"),
          body: err,
        })
        const res: IPluginHandlerResult<false> = {
          success: false,
          body: err,
        }
        return res
      }
    } else if (installedPlugins.length === 0) {
      const err = this.ctx.i18n.translate<ILocalesKey>("PLUGIN_HANDLER_PLUGIN_UNINSTALL_FAILED_VALID")
      this.ctx.log.error(err)
      this.ctx.emit("installFailed", {
        title: this.ctx.i18n.translate<ILocalesKey>("PLUGIN_HANDLER_PLUGIN_INSTALL_FAILED"),
        body: err,
      })
      const res: IPluginHandlerResult<false> = {
        success: false,
        body: err,
      }
      return res
    } else {
      this.ctx.log.success(this.ctx.i18n.translate<ILocalesKey>("PLUGIN_HANDLER_PLUGIN_INSTALL_SUCCESS"))
      this.ctx.emit("installSuccess", {
        title: this.ctx.i18n.translate<ILocalesKey>("PLUGIN_HANDLER_PLUGIN_INSTALL_SUCCESS"),
        body: [...pkgNameList, ...installedPlugins],
      })
      const res: IPluginHandlerResult<true> = {
        success: true,
        body: [...pkgNameList, ...installedPlugins],
      }
      return res
    }
  }

  async uninstall(
    plugins: string[],
    options?: IPluginHandlerOptions,
    env?: IProcessEnv
  ): Promise<IPluginHandlerResult<boolean>> {
    if (!options) {
      options = {}
    }
    const processPlugins = plugins
      .map((item: string) => handlePluginNameProcess(this.ctx, item))
      .filter((item) => item.success)
    const pkgNameList = processPlugins.map((item) => item.pkgName)
    if (pkgNameList.length > 0) {
      // uninstall plugins must use pkgNameList:
      // npm uninstall will use the package.json's name
      const result = await this.execCommand("uninstall", pkgNameList, this.ctx.baseDir, options, env)
      console.log("execCommand uninstall result=>", result)
      if (!result.code) {
        pkgNameList.forEach((pluginName: string) => {
          this.ctx.pluginLoader.unregisterPlugin(pluginName)
        })
        this.ctx.log.success(this.ctx.i18n.translate<ILocalesKey>("PLUGIN_HANDLER_PLUGIN_UNINSTALL_SUCCESS"))
        this.ctx.emit("uninstallSuccess", {
          title: this.ctx.i18n.translate<ILocalesKey>("PLUGIN_HANDLER_PLUGIN_UNINSTALL_SUCCESS"),
          body: pkgNameList,
        })
        const res: IPluginHandlerResult<true> = {
          success: true,
          body: pkgNameList,
        }
        return res
      } else {
        const err = this.ctx.i18n.translate<ILocalesKey>("PLUGIN_HANDLER_PLUGIN_UNINSTALL_FAILED_REASON", {
          code: `${result.code}`,
          data: result.data,
        })
        this.ctx.log.error(err)
        this.ctx.emit("uninstallFailed", {
          title: this.ctx.i18n.translate<ILocalesKey>("PLUGIN_HANDLER_PLUGIN_UNINSTALL_FAILED"),
          body: err,
        })
        const res: IPluginHandlerResult<false> = {
          success: false,
          body: err,
        }
        return res
      }
    } else {
      const err = this.ctx.i18n.translate<ILocalesKey>("PLUGIN_HANDLER_PLUGIN_UNINSTALL_FAILED_VALID")
      this.ctx.log.error(err)
      this.ctx.emit("uninstallFailed", {
        title: this.ctx.i18n.translate<ILocalesKey>("PLUGIN_HANDLER_PLUGIN_UNINSTALL_FAILED"),
        body: err,
      })
      const res: IPluginHandlerResult<false> = {
        success: false,
        body: err,
      }
      return res
    }
  }

  async update(
    plugins: string[],
    options?: IPluginHandlerOptions,
    env?: IProcessEnv
  ): Promise<IPluginHandlerResult<boolean>> {
    if (!options) {
      options = {}
    }
    const processPlugins = plugins
      .map((item: string) => handlePluginNameProcess(this.ctx, item))
      .filter((item) => item.success)
    const pkgNameList = processPlugins.map((item) => item.pkgName)
    if (pkgNameList.length > 0) {
      // update plugins must use pkgNameList:
      // npm update will use the package.json's name
      const result = await this.execCommand("update", pkgNameList, this.ctx.baseDir, options, env)
      console.log("execCommand update result=>", result)
      if (!result.code) {
        this.ctx.log.success(this.ctx.i18n.translate<ILocalesKey>("PLUGIN_HANDLER_PLUGIN_UPDATE_SUCCESS"))
        this.ctx.emit("updateSuccess", {
          title: this.ctx.i18n.translate<ILocalesKey>("PLUGIN_HANDLER_PLUGIN_UPDATE_SUCCESS"),
          body: pkgNameList,
        })
        const res: IPluginHandlerResult<true> = {
          success: true,
          body: pkgNameList,
        }
        return res
      } else {
        const err = this.ctx.i18n.translate<ILocalesKey>("PLUGIN_HANDLER_PLUGIN_UPDATE_FAILED_REASON", {
          code: `${result.code}`,
          data: result.data,
        })
        this.ctx.log.error(err)
        this.ctx.emit("updateFailed", {
          title: this.ctx.i18n.translate<ILocalesKey>("PLUGIN_HANDLER_PLUGIN_UPDATE_FAILED"),
          body: err,
        })
        const res: IPluginHandlerResult<false> = {
          success: false,
          body: err,
        }
        return res
      }
    } else {
      const err = this.ctx.i18n.translate<ILocalesKey>("PLUGIN_HANDLER_PLUGIN_UPDATE_FAILED_VALID")
      this.ctx.log.error(err)
      this.ctx.emit("updateFailed", {
        title: this.ctx.i18n.translate<ILocalesKey>("PLUGIN_HANDLER_PLUGIN_UPDATE_FAILED"),
        body: err,
      })
      const res: IPluginHandlerResult<false> = {
        success: false,
        body: err,
      }
      return res
    }
  }

  private async execCommand(
    cmd: string,
    modules: string[],
    where: string,
    options: IPluginHandlerOptions = {},
    env: IProcessEnv = {}
  ): Promise<IResult> {
    // options first
    const registry = options.registry || this.ctx.getConfig<Undefinable<string>>("settings.registry")
    const proxy = options.proxy || this.ctx.getConfig<Undefinable<string>>("settings.proxy")
    return await new Promise((resolve: any): void => {
      let args = [cmd].concat(modules).concat("--color=always").concat("--save")
      if (registry) {
        args = args.concat(`--registry=${registry}`)
      }
      if (proxy) {
        args = args.concat(`--proxy=${proxy}`)
      }
      try {
        const npmOptions = { cwd: where, env: Object.assign({}, process.env, env) }
        console.log("Start run npm, args=>", args)
        console.log("Start run npm, npmOptions=>", npmOptions)
        const npm = spawn("npm", args, npmOptions)

        let output = ""
        npm.stdout
          ?.on("data", (data: string) => {
            output += data
          })
          .pipe(process.stdout)

        npm.stderr
          ?.on("data", (data: string) => {
            output += data
          })
          .pipe(process.stderr)

        npm.on("close", (code: number) => {
          if (!code) {
            resolve({ code: 0, data: output })
          } else {
            resolve({ code: code, data: output })
          }
        })
        // for users who haven't installed node.js
        npm.on("error", (err: Error) => {
          this.ctx.log.error(err)
          this.ctx.log.error("NPM is not installed")
          this.ctx.emit(IBuildInEvent.FAILED, "NPM is not installed")
        })
      } catch (e) {
        this.ctx.log.error(e as Error)
        this.ctx.emit(IBuildInEvent.FAILED, e)
      }
    })
  }
}

/**
 * transform the input plugin name or path string to valid result
 * @param ctx
 * @param nameOrPath
 */
const handlePluginNameProcess = (ctx: IPicGo, nameOrPath: string): IPluginProcessResult => {
  const res = {
    success: false,
    fullName: "",
    pkgName: "",
  }
  const result = getProcessPluginName(nameOrPath, ctx.log)
  if (!result) {
    return res
  }
  // first get result then do this process
  // or some error will log twice
  const pkgName = getNormalPluginName(result, ctx.log)
  if (!pkgName) {
    return res
  }
  return {
    success: true,
    fullName: result,
    pkgName,
  }
}

export default PluginHandler
