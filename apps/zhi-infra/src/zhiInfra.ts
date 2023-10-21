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
import { ILogger, simpleLogger } from "zhi-lib-base"
import { SiyuanDevice } from "zhi-device"
import { NpmPackageManager } from "./lib/npmHelper"
import fs from "fs-extra"
import path from "path"
import { createPackageJson } from "./lib/packageHelper"
import pkg from "../package.json"

/**
 * 基础设施
 */
class ZhiInfra {
  private readonly logger: ILogger
  private zhiCoreNpmPath: string
  private zhiCoreNodeModulesPath: string
  private npmManager: NpmPackageManager

  constructor(depsJsonPath: string) {
    this.logger = simpleLogger("zhi-infra", "zhi", true)

    this.zhiCoreNpmPath = SiyuanDevice.appNpmFolder()
    this.zhiCoreNodeModulesPath = SiyuanDevice.joinPath(this.zhiCoreNpmPath, "node_modules")
    this.npmManager = new NpmPackageManager(this.zhiCoreNpmPath, depsJsonPath)
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
    // 设置依赖路径，hack require 保 证require 能使用自定义路径的 node_modules
    this.logger.info("Init zhi core node_modules from => ", this.zhiCoreNodeModulesPath)
    SiyuanDevice.siyuanWindow().require.setExternalDeps(this.zhiCoreNodeModulesPath)

    // 初始化 APP 依赖安装的 package.json
    this.logger.info("Init zhi app node_modules from => ", this.zhiCoreNodeModulesPath)
    const pkgJsonFile = path.join(this.zhiCoreNpmPath, "package.json")
    if (!fs.existsSync(pkgJsonFile)) {
      await fs.mkdirs(this.zhiCoreNpmPath)
      createPackageJson("zhi-app-package", pkg.version, {}, pkgJsonFile)
      this.logger.warn("app package.json not exist, inited")
    }
  }

  public getNpmManager() {
    return this.npmManager
  }
}

export default ZhiInfra
