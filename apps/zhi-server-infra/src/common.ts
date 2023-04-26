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
import path from "path"

export function getCrossPlatformAppDataFolder() {
  let configFilePath
  if (process.platform === "darwin") {
    configFilePath = path.join(process.env.HOME ?? "/Users/terwer", "/Library/Application Support")
  } else if (process.platform === "win32") {
    // Roaming包含在APPDATA中了
    configFilePath = process.env.APPDATA
  } else if (process.platform === "linux") {
    configFilePath = process.env.HOME
  }

  return path.join(configFilePath ?? process.cwd())
}
export const zhiNpmPath = SiyuanDevice.joinPath(SiyuanDevice.zhiThemePath(), "npm")
export const zhiNodeModulesPath = SiyuanDevice.joinPath(zhiNpmPath, "node_modules")
export const zhiAppNpmPath = SiyuanDevice.joinPath(getCrossPlatformAppDataFolder() ?? zhiNpmPath, "siyuancommunity")
export const zhiAppNodeModulesPath = SiyuanDevice.joinPath(zhiAppNpmPath, "node_modules")
