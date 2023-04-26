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

import { zhiNpmPath } from "../common"
import { SiyuanDevice } from "zhi-device"

export function shellCmd(target: string, cmd: string, path: string) {
  const spawn = SiyuanDevice.siyuanWindow().require("cross-spawn")
  return new Promise((resolve, reject) => {
    const args: any[] = cmd.split(/\s+/)
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
        return output
      } else {
        reject({ code: code, data: output }) // 如果报错就输出报错日志
        return null
      }
    })
  })
}

function npmCmd(cmd: string, path: string) {
  return shellCmd("npm", cmd, path)
}

export async function requireInstall(moduleName: string) {
  await npmCmd(`install ${moduleName}`, zhiNpmPath)
  return SiyuanDevice.siyuanWindow().require(moduleName)
}
