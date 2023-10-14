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

/**
 * 封装一个用于执行 NPM 命令的工具类
 */
class NpmPackageManager {
  private zhiAppNpmPath

  /**
   * 构造函数，用于创建 NpmPackageManager 的实例。
   * @param zhiAppNpmPath - Siyuan App 的 NPM 路径。
   */
  constructor(zhiAppNpmPath: string) {
    this.zhiAppNpmPath = zhiAppNpmPath
  }

  /**
   * 执行 Shell 命令。
   * @param target - 目标命令。
   * @param cmd - 要执行的命令。
   * @param path - 命令执行的路径。
   * @returns 执行结果的 Promise。
   */
  shellCmd(target: string, cmd: string, path: string): Promise<{ code: number; data: string }> {
    const spawn = SiyuanDevice.siyuanWindow().require("cross-spawn")
    return new Promise((resolve, reject) => {
      const args = cmd.split(/\s+/)
      const processer = spawn(target, args, {
        cwd: path,
      })

      let output = ""
      processer.stdout
        .on("data", (data: any) => {
          output += data // 获取输出日志
        })
        .pipe(process.stdout)

      processer.stderr
        .on("data", (data: any) => {
          output += data // 获取报错日志
        })
        .pipe(process.stderr)

      processer.on("close", (code: any) => {
        if (!code) {
          resolve({ code: 0, data: output }) // 如果没有报错就输出正常日志
        } else {
          reject({ code: code, data: output }) // 如果报错就输出报错日志
        }
      })
    })
  }

  /**
   * 执行 NPM 命令。
   * @param cmd - 要执行的 NPM 命令。
   * @returns 执行结果的 Promise。
   */
  npmCmd(cmd: string): Promise<{ code: number; data: string }> {
    return this.shellCmd("npm", cmd, this.zhiAppNpmPath)
  }

  /**
   * 获取 NPM 的版本号。
   * @returns NPM 版本号的 Promise。
   */
  async npmVersion(): Promise<string> {
    return (await this.npmCmd(`-v`)).data
  }

  /**
   * 安装 NPM 依赖。
   * @param moduleName - 可选的模块名，不传默认安装全量。
   */
  async npmInstall(moduleName?: string): Promise<void> {
    if (moduleName) {
      await this.npmCmd(`install ${moduleName}`)
    } else {
      await this.npmCmd(`install`)
    }
  }

  /**
   * 安装依赖并马上导入。
   * @param moduleName - 依赖名称。
   * @returns 导入的模块。
   */
  async requireInstall(moduleName: string): Promise<any> {
    await this.npmCmd(`install ${moduleName}`)
    return SiyuanDevice.siyuanWindow().require(moduleName)
  }
}

export { NpmPackageManager }
