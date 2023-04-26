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
import ZhiServerInfraUtil from "./util/ZhiServerInfraUtil"
import { SiyuanDevice } from "zhi-device"
import { zhiNodeModulesPath } from "./common"
import { requireInstall } from "./lib/npmHelper"

/**
 * 基础设施
 */
class ZhiInfra {
  private readonly logger
  private readonly common

  constructor() {
    this.logger = ZhiServerInfraUtil.zhiLog("zhi-infra")
    this.common = ZhiServerInfraUtil.zhiCommon()
  }

  /**
   * 修复 Mac 和 Linux 下面的 PATH 环境变量问题
   */
  public fixPathEnv() {
    // 修复 Mac 和 Linux 下面的 PATH 环境变量问题
    this.logger.debug("process.env.PATH before => ", (process as any).env.PATH)
    fixPath()
    console.log("process.env.PATH after fix => ", (process as any).env.PATH)
    this.logger.info("Fixed $PATH in Electron apps as GUI apps on macOS and Linux")
  }

  public hackRequire() {
    // 设置依赖路径，hack require保证require能使用自定义路径的node_modules
    this.logger.info("Init zhi node_modules from => ", zhiNodeModulesPath)
    SiyuanDevice.siyuanWindow().require.setExternalDeps(zhiNodeModulesPath)
    this.logger.info("Zhi node_modules inited.")
  }

  public mountNpmCmd() {
    SiyuanDevice.siyuanWindow().requireInstall = requireInstall
    this.logger.info("requireInstall mounted")
  }
}

export default ZhiInfra
