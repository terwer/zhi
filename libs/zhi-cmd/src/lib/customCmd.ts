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
 * 执行命令
 */
class CustomCmd {
  /**
   * 使用 Electron 自带的 node 运行命令
   *
   * https://github.com/UniBO-PRISMLab/wam/issues/26#issuecomment-1456204046
   * https://github.com/nodejs/help/issues/3885
   * https://github.com/npm/pacote
   *
   * 示例：
   * ```
   * await customCmd.executeCommandWithBundledNode("./node_modules/.bin/next", ["-v"], "/Users/terwer/Downloads/n")
   *
   * const command = "/Users/terwer/Documents/mydocs/zhi-framework/zhi/libs/zhi-cmd/public/setup.js"
   * const args = []
   * const cwd = undefined
   * const result = await zhiCmd.executeCommandWithBundledNodeAsync(command, args, cwd)
   * if (result.status) {
   *   console.log("命令执行成功！😄")
   * } else {
   *   console.error("命令执行失败😭: ", result.msg)
   * }
   * ```
   *
   * @param command - 命令
   * @param args - 参数
   * @param cwd - 运行目录，默认 process.cwd
   */
  public async executeCommandWithBundledNodeAsync(
    command: string,
    args: string[] = [],
    cwd?: string
  ): Promise<{ status: boolean; code: number; msg: string }> {
    const siyuanRequire = SiyuanDevice.siyuanWindow()?.require ?? require
    const process = SiyuanDevice.siyuanWindow()?.process ?? global.process

    const { fork } = siyuanRequire("child_process")
    const fs = siyuanRequire("fs")
    const path = siyuanRequire("path")

    return new Promise((resolve) => {
      const options = {
        cwd: cwd ?? process.cwd(),
        silent: true,
      }
      console.log(`正在执行命令：${command},args=>${args}, options=>`, options)

      const child = fork(command, args, options)
      // 用户目录的 Download/log.txt
      const logFilePath = path.join(
        process.env?.HOME ?? process.env?.USERPROFILE ?? process.env?.Temp ?? cwd,
        "electron-command-log.txt"
      )
      console.log(`命令执行日志已保存到文件 => ${logFilePath}`)
      const logStream = fs.createWriteStream(logFilePath, { flags: "a" })

      child.stdout.pipe(logStream)
      child.stderr.pipe(logStream)

      child.on("error", (err: any) => {
        resolve({
          status: false,
          code: -1,
          msg: err.message,
        })
      })

      child.on("exit", (code: any) => {
        if (code === 0) {
          resolve({
            status: true,
            code,
            msg: "子进程运行成功",
          })
        } else {
          const errorMessage = `子进程异常退出😒，退出码: ${code}`
          resolve({
            status: false,
            code,
            msg: errorMessage,
          })
        }
      })
    })
  }

  /**
   * 自定义执行系统命令
   *
   * 示例：
   * ```
   * await customCmd.executeCommand("./node_modules/.bin/nuxt", ["preview"], { shell: true, cwd: '/Users/terwer/Downloads/nu' })
   *
   * await customCmd.executeCommand("node", ["./server/index.mjs"], { cwd: '/Users/terwer/Downloads/nu' })
   *
   * const command = `--version`
   * const args = []
   * const options = {
   *   env: {
   *     PATH:"/Users/terwer/Downloads/node/node-v18.18.2-darwin-x64/bin"
   *   }
   * }
   * await zhiCmd.executeCommand("node", [`${command}`], options)
   * ```
   *
   * @param command - 命令
   * @param args - 参数
   * @param options - 选项
   */
  public async executeCommand(command: string, args: string[], options = {}) {
    const { exec } = SiyuanDevice.requireLib("child_process")
    const fullCommand = `${command} ${args.join(" ")}`
    return new Promise((resolve, reject) => {
      exec(fullCommand, options, (err: any, stdout: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(stdout.trim())
        }
      })
    })
  }

  /**
   * 自定义执行系统命令
   *
   * 示例：
   * ```
   * await customCmd.executeCommandWithSpawn("./node_modules/.bin/nuxt", ["preview"], { shell: true, cwd: '/Users/terwer/Downloads/nu' })
   * await customCmd.executeCommandWithSpawn("node", ["./server/index.mjs"], { cwd: '/Users/terwer/Downloads/nu' })
   * ```
   *
   * @param command - 命令
   * @param args - 参数
   * @param options - 选项
   */
  public async executeCommandWithSpawn(command: string, args?: string[], options = {}) {
    const { spawn } = SiyuanDevice.requireLib("child_process")
    return new Promise((resolve, reject) => {
      const child = spawn(command, args, options)
      let output = "" // 保存输出结果的变量
      let error = "" // 保存错误信息的变量

      // 监听子进程的 stdout、stderr 输出
      child.stdout.on("data", (data: any) => {
        output += data.toString()
      })
      child.stderr.on("data", (data: any) => {
        error += data.toString()
      })

      // 监听子进程的退出事件
      child.on("close", (code: number) => {
        if (code === 0) {
          resolve(output)
        } else {
          const errorMsg = `Command "${command}" failed with exit code ${code}. ${error}`
          reject(new Error(errorMsg))
        }
      })
    })
  }

  /**
   * 获取 Electron 的 Node 版本
   */
  public async getElectronNodeVersion() {
    return SiyuanDevice.siyuanWindow().process.versions.node
  }
}

export { CustomCmd }
