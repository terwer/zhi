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

import { createCoreLogger } from "../../utils/index.js"

const logger = createCoreLogger("require-hacker")

const hackRequire = async () => {
  const syWin = window as any
  const path = syWin.require("path")
  const zhiNodeModulesPath = path.join(
    syWin.siyuan.config.system.workspaceDir,
    "conf",
    "appearance",
    "themes",
    "zhi",
    "core",
    "npm",
    "node_modules"
  )
  // 设置依赖路径，hack require保证require能使用自定义路径的node_modules
  logger.info("Init zhi core node_modules from => ", zhiNodeModulesPath)
  syWin.require.setExternalDeps(zhiNodeModulesPath)
  const externalDepPathes = syWin.ExternalDepPathes
  externalDepPathes.map((path: string, index: number) => {
    logger.info(`Available zhi node_modules path${index + 1} => ${path}`)
  })
}

export const initRequireHacker = async () => {
  await import("./requireHacker.js")
  await hackRequire()
  logger.info("require hacker inited")
}
