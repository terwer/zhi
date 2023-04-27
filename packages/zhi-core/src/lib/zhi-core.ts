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

import { addImportMaps, addScript, addStyles } from "./browser/index.js"
import { Zhi } from "./zhi.js"

/**
 * 添加样式到当前页面
 *
 * @param id - 样式ID
 * @param url - 样式 url
 */
const addStylesheet = (id: string, url: string) => {
  addStyles(id, url)
}

const addImportMapToHead = (importMap: object, type?: string) => {
  addImportMaps(importMap, type)
}

const addScriptToHead = (script: string, type?: string) => {
  addScript(script, type)
}

/**
 * 加载主题
 */
const loadTheme = async (): Promise<void> => {
  const zhi = new Zhi()
  await zhi.init()
}

/**
 * 主题初始化核心入口
 *
 * @author terwer
 * @version 0.1.0
 * @since 0.1.0
 */
const init = async () => {
  await loadTheme()
}

export const zhiCore = {
  addStylesheet,
  addImportMapToHead,
  addScriptToHead,
  init,
}
