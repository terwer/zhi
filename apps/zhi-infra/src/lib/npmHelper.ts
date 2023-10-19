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
import path from "path"
import { updatePackageJson, updatePackageJsonHash } from "./packageHelper"

/**
 * 封装一个用于执行 NPM 命令的工具类
 */
class NpmPackageManager {
  private logger
  private zhiCoreNpmPath: string
  private customCmd: CustomCmd

  /**
   * 构造函数，用于创建 NpmPackageManager 的实例。
   * @param zhiCoreNpmPath - Siyuan App 的 NPM 路径。
   */
  constructor(zhiCoreNpmPath: string) {
    this.logger = simpleLogger("npm-package-manager", "zhi", false)
    this.zhiCoreNpmPath = zhiCoreNpmPath
    this.customCmd = new CustomCmd()
  }

  /**
   * 执行 NPM 命令
   *
   * @param subCommand - 要执行的 NPM 命令
   * @returns 执行结果的 Promise
   */
  public async npmCmd(subCommand: string): Promise<any> {
    const command = `npm`
    const args = [subCommand, this.zhiCoreNpmPath]
    const options = {
      cwd: this.zhiCoreNpmPath,
      env: {
        PATH: SiyuanDevice.nodeFolder(),
      },
    }
    this.logger.info("npmCmd options =>", options)
    return await this.customCmd.executeCommand(command, args, options)
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

  /**
   * 检测并初始化 Node
   */
  public async checkAndInitNode(): Promise<boolean> {
    let flag = false
    const fs = SiyuanDevice.requireNpm("fs")
    if (!fs.existsSync(SiyuanDevice.nodeFolder())) {
      this.logger.info("Node环境不存在，准备安装Node...")
      // 指向您要运行的.js文件
      const command = `${this.zhiCoreNpmPath}/setup.js`
      const args: string[] = []
      const cwd = undefined
      const result = await this.customCmd.executeCommandWithBundledNodeAsync(command, args, cwd)

      if (result.status) {
        this.logger.info("Node安装成功！😄")
      } else {
        throw new Error("Node安装失败，后续操作将出现异常😭: " + result.msg)
      }
      flag = true
    } else {
      this.logger.info("Node已安装过，忽略")
      flag = true
    }

    // 更新最新定义的依赖
    const pkgJsonFile = path.join(this.zhiCoreNpmPath, "package.json")
    const depsJsonFile = path.join(this.zhiCoreNpmPath, "deps.json")
    const depsJsonStatus = updatePackageJson(depsJsonFile, pkgJsonFile)

    // 全量安装依赖
    // 内容有更新才去重新安装
    if (depsJsonStatus) {
      this.logger.info("Will install node_module once if needed, please wait...")
      await this.npmInstall()
      this.logger.info("All node_module installed successfully")
      updatePackageJsonHash(depsJsonFile, pkgJsonFile)
      this.logger.info("Package hash updated successfully")
    }

    return flag
  }
}

export { NpmPackageManager }
