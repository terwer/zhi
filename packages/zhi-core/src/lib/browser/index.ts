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

import { createCoreLogger } from "../utils/index.js"

const logger = createCoreLogger("cmd")

/**
 * 将 css 以动态引入方式加入当前页面
 *
 * @param id - 样式 id
 * @param url - 样式 url
 */
export const addStyles = (id: string, url: string) => {
  if (typeof document === "undefined") {
    logger.error("Not in browser env, ignore add css")
    return
  }

  const head = document.head || document.getElementsByTagName("head")[0]
  const existingLink = document.querySelector('link[href="' + url + '"]')
  if (existingLink) {
    return
  }
  const link = document.createElement("link")
  link.id = id
  link.rel = "stylesheet"
  link.href = url
  head.appendChild(link)
  logger.info(`${id} loaded`)
}

/**
 * 添加 importMap 支持 esm
 *
 * @param importMap - importMap
 * @param type - 类型
 */
export const addImportMaps = (importMap: object, type?: string) => {
  // Create and append the `<script>` tag for the import map
  const importMapScript = document.createElement("script")
  importMapScript.type = type ?? "importmap"
  importMapScript.textContent = JSON.stringify(importMap)
  document.head.appendChild(importMapScript)
  logger.info(`added ${importMapScript.type} importMap to head`)
}

/**
 * 添加脚本到浏览器头部
 *
 * @param src - 路径
 * @param type- 类型，可选
 */
export const addScript = (src: string, type?: string) => {
  const script = document.createElement("script")
  if (type) {
    script.type = type ?? "module"
  }
  script.src = src
  document.head.appendChild(script)
}
