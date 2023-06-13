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
  warn: (msg: string, obj?: any) => void
  error: (msg: string | Error, obj?: any) => void
}

/**
 * 一个简单轻量级的日志记录器
 *
 * @author terwer
 * @version 1.0.0
 * @since 1.0.0
 */
const simpleLogger = (name: string, customSign?: string, isDev?: boolean): ILogger => {
  const sign = customSign ?? "zhi"

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    const seconds = String(date.getSeconds()).padStart(2, "0")

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  const log = (msg: any, obj?: any) => {
    const time = formatDate(new Date())
    const formattedMsg = obj && typeof obj === "boolean" ? String(obj) : obj

    console.info(`[${sign}] [${time}] [INFO] [${name}] ${msg}`, formattedMsg)
  }

  const infoLog = (msg: any, obj?: any) => {
    const time = formatDate(new Date())
    const formattedMsg = obj && typeof obj === "boolean" ? String(obj) : obj

    console.info(`[${sign}] [${time}] [INFO] [${name}] ${msg}`, formattedMsg)
  }

  const warnLog = (msg: any, obj?: any) => {
    const time = formatDate(new Date())
    const formattedMsg = obj && typeof obj === "boolean" ? String(obj) : obj
    console.warn(`[${sign}] [${time}] [WARN] [${name}] ${msg}`, formattedMsg)
  }

  const errorLog = (msg: string | Error, obj?: any) => {
    const time = formatDate(new Date())
    const message = msg instanceof Error ? "an error occurred =>" : `${msg}`
    const formattedMsg = obj && typeof obj === "boolean" ? String(obj) : obj || `${msg}`

    console.error(`[${sign}] [${time}] [ERROR] [${name}] ${message}`, formattedMsg)
  }

  return {
    debug: (msg: string, obj?: any) => {
      if (isDev) {
        log(msg, obj)
      }
    },
    info: (msg: string, obj?: any) => {
      infoLog(msg, obj)
    },
    warn: (msg: string, obj?: any) => {
      warnLog(msg, obj)
    },
    error: (msg: string | Error, obj?: any) => {
      errorLog(msg, obj)
    },
  }
}

export default simpleLogger
