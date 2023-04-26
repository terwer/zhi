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
 * 主题通用类（由theme.js动态调用，除了单元测试之外请勿主动调用）
 *
 * @public
 * @author terwer
 * @since 0.1.0
 */
class Zhi {}

function addStylesheet(id, url) {
  if (typeof document === "undefined") {
    console.warn("Not in browser env, ignore add css")
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
  console.log(`${id} loaded`)
}

async function init() {
  console.log(`zhiCore loaded`)
}

export const zhiCore = {
  addStylesheet,
  init,
}
