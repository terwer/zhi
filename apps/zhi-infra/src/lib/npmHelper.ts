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
import { StrUtil } from "zhi-common"

/**
 * 封装一个用于执行 NPM 命令的工具类
 */
class NpmPackageManager {
  private logger
  private zhiCoreNpmPath: string
  private depsJsonPath: string
  private customCmd: CustomCmd

  /**
   * 构造函数，用于创建 NpmPackageManager 的实例
   *
   * @param zhiCoreNpmPath - Siyuan App 的 NPM 路径
   * @param depsJsonPath - deps.json 路径
   */
  constructor(zhiCoreNpmPath: string, depsJsonPath: string) {
    this.logger = simpleLogger("npm-package-manager", "zhi", false)
    this.zhiCoreNpmPath = zhiCoreNpmPath
    this.depsJsonPath = depsJsonPath
    this.customCmd = new CustomCmd()
  }

  /**
   * 执行 Node 命令
   *
   * @param subCommand - 要执行的 NPM 命令
   * @param oargs - 其它参数
   * @param cwd 当前路径
   * @param env 环境变量
   * @returns 执行结果的 Promise
   */
  public async nodeCmd(subCommand: string, oargs?: any[], cwd?: string, env?: Record<string, any>): Promise<any> {
    // return await this.localNodeCmd("node", subCommand, oargs, cwd, env)
    return await this.localNodeExecCmd("node", subCommand, undefined, oargs, cwd, env)
  }

  /**
   * 执行 NPM 命令
   *
   * @param subCommand - 要执行的 NPM 命令
   * @param path 命令路径
   * @param oargs - 其它参数
   * @param cwd 当前路径
   * @param env 环境变量
   * @returns 执行结果的 Promise
   */
  public async npmCmd(
    subCommand: string,
    path?: string,
    oargs?: any[],
    cwd?: string,
    env?: Record<string, any>
  ): Promise<any> {
    return await this.localNodeExecCmd("npm", subCommand, path ?? this.zhiCoreNpmPath, oargs, cwd, env)
  }

  /**
   * 获取 Node 的版本号
   *
   * @returns Node 版本号的 Promise
   */
  public async nodeVersion(): Promise<string> {
    return await this.nodeCmd(`-v`)
  }

  /**
   * 获取 NPM 的版本号
   *
   * @returns NPM 版本号的 Promise
   */
  public async npmVersion(): Promise<string> {
    return await this.npmCmd(`-v`)
  }

  /**
   * 获取 Electron的 NPM 的版本号
   *
   * @returns NPM 版本号的 Promise
   */
  public async electronNpmVersion(): Promise<string> {
    return await this.customCmd.getElectronNodeVersion()
  }

  /**
   * 获取系统 NPM 的版本号
   *
   * @returns NPM 版本号的 Promise
   */
  public async systemNpmVersion() {
    return await this.customCmd.getSystemNodeVersion()
  }

  /**
   * 安装 NPM 依赖
   *
   * @param moduleName - 可选的模块名，不传默认安装全量
   * @param path 命令路径
   */
  public async npmInstall(moduleName?: string, path?: string): Promise<void> {
    if (!StrUtil.isEmptyString(moduleName)) {
      await this.npmCmd(`install ${moduleName}`, path)
    } else {
      await this.npmCmd(`install`, path)
    }
  }

  /**
   * 安装依赖并马上导入
   *
   * @param moduleName - 依赖名称
   * @param path 命令路径
   * @returns 导入的模块
   */
  public async requireInstall(moduleName: string, path?: string): Promise<any> {
    try {
      const result = SiyuanDevice.requireNpm(moduleName)
      this.logger.info(`${moduleName} already cached`)
      return result
    } catch (e: any) {
      if (e && e.message && e.message.includes(`Cannot find module '${moduleName}'`)) {
        this.logger.info(`${moduleName} not found, will install once...`)
        await this.npmCmd(`install ${moduleName}`, path)
        this.logger.info(`${moduleName} installed`)
        return SiyuanDevice.requireNpm(moduleName)
      }
      throw e
    }
  }

  /**
   * 检测并初始化 Node
   *
   * @param nodeVersion node版本，例如：v18.18.2
   * @param nodeInstallDir 安装路径
   */
  public async checkAndInitNode(nodeVersion?: string, nodeInstallDir?: string): Promise<boolean> {
    let flag = false
    const fs = SiyuanDevice.requireNpm("fs")
    const nodeFolder = SiyuanDevice.nodeFolder()
    const nodeCurrentBinFolder = SiyuanDevice.nodeCurrentBinFolder()
    if (!fs.existsSync(nodeCurrentBinFolder)) {
      this.logger.info("Node环境不存在，准备安装Node...")
      // 指向您要运行的.js文件
      const command = `${this.depsJsonPath}/setup.cjs`
      const args: string[] = []
      args.push(nodeVersion ?? "v18.18.2")
      args.push(nodeInstallDir ?? nodeFolder)
      const cwd = nodeFolder
      if (!fs.existsSync(cwd)) {
        fs.mkdirSync(cwd, { recursive: true })
      }
      const result = await this.customCmd.executeCommandWithBundledNodeAsync(command, args, cwd)

      if (result.status) {
        this.logger.info("Node安装成功！😄")
      } else {
        throw new Error("Node安装失败，后续操作将出现异常😭: " + result.msg)
      }
      flag = true
    } else {
      this.logger.info("Node already installed, ignore")
      flag = true
    }

    // 更新最新定义的依赖
    const pkgJsonFile = path.join(this.zhiCoreNpmPath, "package.json")
    const depsJsonFile = path.join(this.depsJsonPath, "deps.json")
    const depsJsonStatus = updatePackageJson(depsJsonFile, pkgJsonFile)

    // 全量安装依赖
    // 内容有更新才去重新安装
    if (depsJsonStatus) {
      this.logger.info("Detected deps.json change.Will install node_module once if needed, please wait...")
      await this.npmInstall()
      this.logger.info("All node_module installed successfully")
      updatePackageJsonHash(depsJsonFile, pkgJsonFile)
      this.logger.info("Package hash updated successfully")
    }

    return flag
  }

  /**
   * 本地服务的 Node 命令
   *
   * @param command 主命令
   * @param subCommand 子命令
   * @param oargs 其它参数
   * @param cwd 当前路径
   * @param env 环境变量
   * @private
   */
  public async localNodeCmd(
    command: string,
    subCommand: string,
    oargs?: any[],
    cwd?: string,
    env?: Record<string, any>
  ): Promise<any> {
    // 使用 spawn
    const args = [subCommand, this.zhiCoreNpmPath].concat(oargs ?? [])
    // 设置全局环境变量
    const process = SiyuanDevice.siyuanWindow().process
    const NODE_PATH = SiyuanDevice.nodeCurrentBinFolder()
    let ENV_PATH = process.env.PATH
    if (NODE_PATH !== "") {
      ENV_PATH = NODE_PATH + ":" + process.env.PATH
    }
    const options = {
      cwd: cwd ?? this.zhiCoreNpmPath,
      env: {
        PATH: ENV_PATH,
        ...{ env },
      },
    }
    this.logger.info("localNodeCmd spawn command =>", command)
    this.logger.info("localNodeCmd spawn args =>", args)
    this.logger.info("localNodeCmd spawn options =>", options)
    return await this.customCmd.executeCommandWithSpawn(command, args, options)
  }

  /**
   * 本地服务的 Node exec 命令
   *
   * @param command 主命令
   * @param subCommand 子命令
   * @param path 命令路径
   * @param oargs 其它参数
   * @param cwd 当前路径
   * @param env 环境变量
   * @private
   */
  public async localNodeExecCmd(
    command: string,
    subCommand: string,
    path?: string,
    oargs?: any[],
    cwd?: string,
    env?: Record<string, any>
  ): Promise<any> {
    const args: any[] = path
      ? [`"${subCommand}"`, `"${path}"`, ...(oargs ?? [])]
      : [`"${subCommand}"`, ...(oargs ?? [])]

    // 设置全局环境变量
    const process = SiyuanDevice.siyuanWindow().process
    const NODE_PATH = SiyuanDevice.nodeCurrentBinFolder()
    let ENV_PATH = process.env.PATH
    if (NODE_PATH !== "") {
      ENV_PATH = NODE_PATH + ":" + process.env.PATH
    }
    const options = {
      cwd: cwd ?? this.zhiCoreNpmPath,
      env: {
        PATH: ENV_PATH,
        ...{ env },
      },
    }

    this.logger.info("localNodeExecCmd exec command =>", command)
    this.logger.info("localNodeExecCmd exec args =>", args)
    this.logger.info("localNodeExecCmd exec options =>", options)

    return await this.customCmd.executeCommand(command, args, options)
  }
}

export { NpmPackageManager }
