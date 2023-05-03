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

/**
 * 简单的日志接口
 */
interface ILogger {
  debug: (msg: string, obj?: any) => void
  info: (msg: string, obj?: any) => void
  error: (msg: string | Error, obj?: any) => void
}

/**
 * 为了在日志系统加载之前记录一些东西，这里写了一个简单的日志工具，仅在 core 使用
 *
 * @author terwer
 * @version 0.1.0
 * @since 0.1.0
 */
export const createCoreLogger = (name: string): ILogger => {
  const sign = "zhi-core"

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    const seconds = String(date.getSeconds()).padStart(2, "0")

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  const log = (level: string, msg: any, obj?: any) => {
    const time = formatDate(new Date())
    if (obj) {
      console.log(`[${sign}] [${time}] [${level}] [${name}] ${msg}`, obj)
    } else {
      console.log(`[${sign}] [${time}] [${level}] [${name}] ${msg}`)
    }
  }

  return {
    debug: (msg: string, obj?: any) => log("DEBUG", msg, obj),
    info: (msg: string, obj?: any) => log("INFO", msg, obj),
    error: (msg: string | Error, obj?: any) => {
      if (typeof msg == "string") {
        log("ERROR", msg, obj)
      } else {
        console.error(`[${sign}] [${formatDate(new Date())}] [ERROR] [${name}] error occurred`, msg)
      }
    },
  }
}

export const win = (typeof window !== "undefined" ? window : global) as any

export const getFile = async (path: string, type: string) => {
  const response = await fetch("/api/file/getFile", {
    method: "POST",
    headers: {
      Authorization: `Token `,
    },
    body: JSON.stringify({
      path: path,
    }),
  })
  if (response.status === 200) {
    if (type === "text") {
      return await response.text()
    }
    if (type === "json") {
      return (await response.json()).data
    }
  }
  return null
}

export const isFileExists = async (p: string, type: string) => {
  try {
    const res = await getFile(p, type)
    return res !== null
  } catch {
    return false
  }
}

/**
 * 动态加载 SystemJs 模块
 *
 * @param moduleName - 模块名称
 */
export const SystemImport = async (moduleName: string) => {
  const System = win.System
  if (!System) {
    throw new Error("SystemJs not work, zhi-core will stop loading!")
  }

  return await System.import(moduleName)
}
