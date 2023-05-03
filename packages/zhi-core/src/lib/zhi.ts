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

import { createCoreLogger, getFile, isElectron, SystemImport, win } from "./utils/index.js"
import { initRequireHacker, shellCmd } from "./node/index.js"
import DependencyItem from "./common/models/DependencyItem.js"
import Bootstrap from "./core/Bootstrap.js"

/**
 * 主题通用类（由theme.js动态调用，除了单元测试之外请勿主动调用）
 *
 * @public
 * @author terwer
 * @since 0.1.0
 */
export class Zhi {
  private readonly logger

  private deviceDetection: any
  private siyuanDevice: any
  private common: any

  private runAs

  /**
   * 主题样式最低支持版本
   * @private
   */
  private readonly SUPPORTED_THEME_VERSION = "2.7.6"

  /**
   * 内核最低支持版本
   * @private
   */
  private readonly SUPPORTED_KERNEL_VERSION = "2.8.1"

  /**
   * 主题初始化
   *
   * @param runAs - 运行模式
   */
  constructor(runAs?: any) {
    this.logger = createCoreLogger("zhi-main")

    this.runAs = runAs ?? "None"
  }

  /**
   * 初始化
   */
  public async init(): Promise<void> {
    const deviceModule = await SystemImport("@siyuan-community/zhi-device")
    const commonModule = await SystemImport("@siyuan-community/zhi-common")

    this.deviceDetection = deviceModule.DeviceDetection
    this.siyuanDevice = deviceModule.SiyuanDevice
    this.common = new commonModule.ZhiCommon()

    this.logger.info("deviceModule=>", deviceModule)
    this.logger.info("commonModule=>", commonModule)
  }

  /**
   * 生命周期入口
   *
   * @param args - 参数
   * @private
   */
  private async main(args: string[]): Promise<DependencyItem[]> {
    this.logger.info("Parsing args...", args)
    return await Bootstrap.start()
  }

  /**
   * 主流程加载
   */
  public async start(): Promise<void> {
    try {
      this.logger.info("Zhi initiating...")

      if (isElectron()) {
        // require方式已使用时，为了加载自定义目录的类库，需要先hack
        await initRequireHacker()
        // 挂载命令行
        win.shellCmd = shellCmd
        this.logger.info("Electron only core modules hacked")
      }

      // =========================================================================
      // 以下是公共部分，需要同时兼容 Electron 和浏览器，请勿添加不兼容代码
      //
      // 可使用 systemjs 动态加载模块
      // System.import("@siyuan-community/zhi-device").then((m) => this.logger.info(m))
      //
      // @author terwer
      // @version 0.1.0
      // @since 0.1.0
      // =========================================================================
      // 版本信息
      this.runAs = this.deviceDetection.getDevice()
      const pkgJson = JSON.parse(await getFile("/data/storage/zhi/package.json", "text")) as any
      // this.logger.info("pkgJson=>", pkgJson)
      this.logger.info(
        `Hello, this is zhi theme v${pkgJson.version}, ${pkgJson.description} by ${pkgJson.author}! You are from ${this.runAs}`
      )

      // 平台检测
      if (this.runAs !== "Siyuan_MainWindow" && this.runAs !== "Siyuan_Browser") {
        this.logger.error(`Zhi Theme can only run as Siyuan_MainWindow or Siyuan_Browser`)
        return
      }

      // 检测内核版本
      const kernelVersion = this.siyuanDevice.siyuanWindow().siyuan.config.system.kernelVersion
      if (this.common.versionUtil.lesser(kernelVersion, this.SUPPORTED_THEME_VERSION)) {
        const errMsg = this.common.strUtil.f(
          "Your siyuan-note kernel version {0} is not supported by zhi theme, style will look weird, you must install siyuan-note {1}+ to use zhi-theme",
          kernelVersion,
          this.SUPPORTED_THEME_VERSION
        )
        this.logger.error(errMsg)
        // this.kernelApi.pushErrMsg({
        //   msg: errMsg,
        // })
        alert(errMsg)
        return
      }

      if (this.common.versionUtil.lesser(kernelVersion, this.SUPPORTED_KERNEL_VERSION)) {
        const errorMsg = this.common.strUtil.f(
          "Your siyuan-note kernel version {0} is too low, plugin system will not work, you must install siyuan-note {1}+ to use plugin feature",
          kernelVersion,
          this.SUPPORTED_KERNEL_VERSION
        )
        this.logger.error(errorMsg)
        // this.kernelApi.pushMsg({
        //   msg: errorMsg,
        // })
        return
      }

      // 挂载一个日志对象，方便后续动态使用
      if (typeof window !== "undefined") {
        ;(window as any).zhiLog = createCoreLogger("zhi-core")
        this.logger.info("CoreLogger mounted")
      }

      // 初始化第三方依赖
      // import
      //   browser     esm path: "/[libpath]"
      //   electron    esm path: "/[libpath]"
      //   custom-path X
      //
      // require
      //   browser     X
      //   electron    cjs path: "[abspath][libpath]"
      //   custom-path require-hacker
      const dynamicImports = await this.main([])
      for (const item of dynamicImports) {
        // 类型校验
        if (item.format !== "esm" && item.format !== "cjs" && item.format !== "js") {
          this.logger.error("Only esm, cjs supported, skip this lib!", item.libpath)
          continue
        }

        // 运行环境校验
        if (!item.runAs.includes(this.runAs)) {
          this.logger.debug(
            `I'm sorry because current runtime is ${this.runAs}, while lib's define runtime is ${item.runAs}`
          )
          this.logger.error(`This lib can only run at ${item.runAs}, will skip!Lib is=>${item.libpath}`)
          continue
        }

        this.logger.info(`Loading modules form zhi => ${item.libpath}`)
        let lib
        if (item.importType == "import") {
          const importLibPath = this.siyuanDevice.getImportJsPath(item.libpath, item.baseType)
          lib = await import(importLibPath)
          this.logger.debug(`Importing lib ${item.libpath} with basePath of ${item.baseType} ...`)
        } else {
          lib = this.siyuanDevice.requireLib(item.libpath, false, item.baseType)
          this.logger.debug(`Requiring lib ${item.libpath} with basePath of ${item.baseType} ...`)
        }
        // 如果有初始化方法，进行初始化
        if (lib) {
          const libObj = lib
          this.logger.debug(`Current ${item.importType} lib ${item.libpath} Obj=>`, typeof libObj)
          if (typeof libObj == "function") {
            await libObj()
            this.logger.info(`Inited ${item.libpath} with default function`)
          } else {
            if (libObj.init) {
              const res = await libObj.init()
              if (res) {
                this.logger.info(`Detected output from ${item.importType} lib ${item.libpath}=>`, res)
              }
              this.logger.info(`Inited ${item.libpath} with init function`)
            } else {
              if (libObj.default) {
                const res = await libObj.default()
                if (res) {
                  this.logger.info(`Detected output from ${item.importType} lib ${item.libpath}=>`, res)
                }
                this.logger.info(`Inited ${item.libpath} with default function`)
              }
              this.logger.info(`No init method for ${item.importType} ${item.libpath}`)
            }
          }
        } else {
          this.logger.debug(`Lib entry is not a function => ${item.importType} ${item.libpath}`, lib)
        }
        this.logger.info(`Success ${item.importType} ${item.libpath}`)
      }
      this.logger.info("Zhi Theme inited")
    } catch (e) {
      this.logger.error("Zhi Theme load error=>", e)
    }
  }
}
