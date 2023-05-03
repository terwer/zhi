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
 * 主题入口，由思源笔记自动触发
 */

;(async () => {
  const { createCoreLogger } = await import("./lib/utils/index.js")
  const logger = createCoreLogger("theme")

  // 1 加载主题核心文件
  const zhiCore = await import("./index.js")

  // 2 加载web字体
  zhiCore.zhiCore.addStylesheet("zhiThemeFontStyle", "/appearance/themes/zhi/style/common/fonts/webfont.css")

  // 3 加载 importMap 及模块
  // 3.1 加载 importMap
  let customMap = { imports: {} }
  const { isFileExists } = await import("./lib/utils/index.js")
  const fileStatus = await isFileExists("/appearance/themes/zhi/customMap.js")
  if (!fileStatus) {
    logger.info("No customMap.js found, will load default importmap")
  } else {
    const customMapImport = await import("./customMap.js")
    customMap = customMapImport.default
  }
  const defaultImportMap = await import("./config/map.js")
  logger.info("defaultImportMap=>", defaultImportMap)
  const importMap = {
    imports: {
      ...defaultImportMap.default.imports,
      ...customMap.imports,
    },
  }
  logger.info("importmap =>", importMap)
  zhiCore.zhiCore.addImportMapToHead(importMap, "systemjs-importmap")

  // 3.2 加载 importmap 加载器 js
  // https://github.com/systemjs/systemjs/pull/2215
  zhiCore.zhiCore.addScriptToHead("/appearance/themes/zhi/core/npm/node_modules/systemjs/dist/s.js")

  // 3.3 加载主题核心模块 js ，支持 esm
  logger.info("Systemjs module loading, please wait...")
  setTimeout(function () {
    zhiCore.zhiCore.addScriptToHead("/appearance/themes/zhi/main.js", "module")
  }, 500)

  // 4 初始化主题
  // 由于 esm 在浏览器端的限制，需要再上面用 systemjs-import 的方式，使用动态 importmap ，动态加载 main.js
  // 实际执行的逻辑类似
  // await zhiCore.zhiCore.init()
})()
