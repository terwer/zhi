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

import { SiyuanDevice } from "zhi-device"
import { CustomCmd } from "zhi-cmd"
import { simpleLogger } from "zhi-lib-base"

/**
 * 封装一个用于执行 NPM 命令的工具类
 */
class NpmPackageManager {
  private logger
  private zhiAppNpmPath: string
  private customCmd: CustomCmd

  /**
   * 构造函数，用于创建 NpmPackageManager 的实例。
   * @param zhiAppNpmPath - Siyuan App 的 NPM 路径。
   */
  constructor(zhiAppNpmPath: string) {
    this.logger = simpleLogger("npm-package-manager", "zhi", false)
    this.zhiAppNpmPath = zhiAppNpmPath
    this.customCmd = new CustomCmd()
  }

  /**
   * 执行 NPM 命令
   *
   * @param subCommand - 要执行的 NPM 命令
   * @returns 执行结果的 Promise
   */
  public async npmCmd(subCommand: string): Promise<any> {
    // 检测Node，如果没有先下载
    await this.checkNodeInstalled()

    const command = `npm`
    const args = [subCommand, this.zhiAppNpmPath]
    const options = {
      cwd: this.zhiAppNpmPath,
      env: {
        PATH: SiyuanDevice.nodeFolder(),
      },
    }
    this.logger.info("npmCmd options =>", options)
    return await this.customCmd.executeCommand("node", [`${command}`], options)
  }

  /**
   * 获取 NPM 的版本号。
   * @returns NPM 版本号的 Promise。
   */
  public async npmVersion(): Promise<string> {
    return await this.npmCmd(`-v`)
  }

  /**
   * 安装 NPM 依赖
   *
   * @param moduleName - 可选的模块名，不传默认安装全量
   */
  public async npmInstall(moduleName?: string): Promise<void> {
    if (moduleName) {
      await this.npmCmd(`install ${moduleName}`)
    } else {
      await this.npmCmd(`install`)
    }
  }

  /**
   * 安装依赖并马上导入
   *
   * @param moduleName - 依赖名称
   * @returns 导入的模块
   */
  public async requireInstall(moduleName: string): Promise<any> {
    await this.npmCmd(`install ${moduleName}`)
    return SiyuanDevice.requireNpm(moduleName)
  }

  //==================
  // private function
  //==================
  private async checkNodeInstalled(): Promise<void> {}
}

export { NpmPackageManager }
