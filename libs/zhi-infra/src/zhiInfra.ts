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

import fixPath from "fix-path"
import { simpleLogger } from "zhi-lib-base"
import { SiyuanDevice } from "zhi-device"
import { NpmPackageManager } from "./lib/npmHelper"
import fs from "fs-extra"
import path from "path"
import { createPackageJson, updatePackageJson } from "./lib/packageHelper"
import pkg from "../package.json" assert { type: "json" }
import { getCrossPlatformAppDataFolder } from "./common"

/**
 * 基础设施
 */
class ZhiInfra {
  private readonly logger
  private zhiAppNodeModulesPath
  private zhiAppNpmPath
  private zhiNodeModulesPath
  private zhiNpmPath
  private npmManager

  constructor(zhiNpmPath?: string) {
    this.logger = simpleLogger("zhi-infra", "zhi", true)
    this.zhiNpmPath = zhiNpmPath ?? SiyuanDevice.joinPath(SiyuanDevice.zhiThemePath(), "npm")

    this.zhiNodeModulesPath = SiyuanDevice.joinPath(this.zhiNpmPath, "node_modules")
    this.zhiAppNpmPath = SiyuanDevice.joinPath(getCrossPlatformAppDataFolder() ?? this.zhiNpmPath, "siyuancommunity")
    this.zhiAppNodeModulesPath = SiyuanDevice.joinPath(this.zhiAppNpmPath, "node_modules")

    this.npmManager = new NpmPackageManager(this.zhiAppNpmPath)
  }

  /**
   * 修复 Mac 和 Linux 下面的 PATH 环境变量问题
   */
  public fixPathEnv() {
    // 修复 Mac 和 Linux 下面的 PATH 环境变量问题
    this.logger.debug("process.env.PATH before => ", (process as any).env.PATH)
    fixPath()
    this.logger.debug("process.env.PATH after fix => ", (process as any).env.PATH)
    this.logger.info("Fixed $PATH in Electron apps as GUI apps on macOS and Linux")
  }

  public async hackRequire() {
    // 设置依赖路径，hack require保证require能使用自定义路径的node_modules
    this.logger.info("Init zhi core node_modules from => ", this.zhiNodeModulesPath)
    SiyuanDevice.siyuanWindow().require.setExternalDeps(this.zhiNodeModulesPath)

    // 初始化 APP 依赖安装的 package.json
    this.logger.info("Init zhi app node_modules from => ", this.zhiAppNodeModulesPath)
    const pkgJsonFile = path.join(this.zhiAppNpmPath, "package.json")
    if (!fs.existsSync(pkgJsonFile)) {
      await fs.mkdirs(this.zhiAppNpmPath)
      // await FsHelper.copyFolder(zhiNpmPath, zhiAppNpmPath)

      createPackageJson("zhi-app-package", pkg.version, {}, pkgJsonFile)
      // await npmCmd("init", zhiAppNpmPath)
      this.logger.warn("app package.json not exist, inited")
    }

    // 设置依赖路径
    SiyuanDevice.siyuanWindow().require.setExternalDeps(this.zhiAppNodeModulesPath)
    const externalDepPathes = SiyuanDevice.siyuanWindow().ExternalDepPathes
    externalDepPathes.map((path: string, index: number) => {
      this.logger.info(`Available zhi node_modules path${index + 1} => ${path}`)
    })

    // 更新最新定义的依赖
    const depsJsonFile = path.join(this.zhiNpmPath, "deps.json")
    const depsJsonStatus = updatePackageJson(depsJsonFile, pkgJsonFile)

    // 全量安装依赖
    // 内容有更新才去重新安装
    if (depsJsonStatus) {
      this.logger.info("Will install node_module once if needed, please wait...")
      await this.npmManager.npmInstall()
      this.logger.info("All node_module installed successfully")
    }
  }

  public mountNpmCmd() {
    SiyuanDevice.siyuanWindow().npmManager = this.npmManager
    this.logger.info("npmManager mounted")
  }
}

export default ZhiInfra
