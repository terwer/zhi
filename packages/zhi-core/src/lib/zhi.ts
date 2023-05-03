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

import { createCoreLogger, getFile, isElectron, win } from "./utils/index.js"
import { initRequireHacker, shellCmd } from "./node/index.js"

/**
 * 主题通用类（由theme.js动态调用，除了单元测试之外请勿主动调用）
 *
 * @public
 * @author terwer
 * @since 0.1.0
 */
export class Zhi {
  private zhiDeviceModule: any
  private readonly logger
  private runAs

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
   * 主流程加载
   */
  public async init(): Promise<void> {
    this.logger.info("zhi initiating...")

    // 因为后面可能会用到一些依赖，所以这里需要先hack
    if (isElectron()) {
      await initRequireHacker()
      win.shellCmd = shellCmd
      this.logger.info("Electron only modules hacked")
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

    const System = win.System
    if (!System) {
      this.logger.error("SystemJs not work, zhi-core will stop loading!")
      return
    }
    this.zhiDeviceModule = await System.import("@siyuan-community/zhi-device")
    this.logger.info("zhiDeviceModule=>", this.zhiDeviceModule)

    const deviceDetection = this.zhiDeviceModule.DeviceDetection
    // const siyuanDevice = this.zhiDeviceModule.SiyuanDevice

    this.runAs = deviceDetection.getDevice()
    // this.logger.info(`Hello, this is zhi theme You are from ${this.runAs}`)

    const pkgJson = JSON.parse(await getFile("/data/storage/zhi/package.json", "text")) as any
    // this.logger.info("pkgJson=>", pkgJson)
    this.logger.info(
      `Hello, this is zhi theme v${pkgJson.version}, ${pkgJson.description} by ${pkgJson.author}! You are from ${this.runAs}`
    )
  }
}
