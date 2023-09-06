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

import fetch, { Headers } from "node-fetch"
import { simpleLogger } from "zhi-lib-base"

// https://github.com/node-fetch/node-fetch/issues/1582#issuecomment-1154842272
// @ts-expect-error Typings are not perfect
ReadableStream.prototype[Symbol.asyncIterator] ??= async function* () {
  // @ts-expect-error Typings are not perfect
  const reader = this.getReader()
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) return
      yield value
    }
  } finally {
    reader.releaseLock()
  }
}

class FormdataFetch {
  private logger: any

  constructor(isDev?: boolean) {
    this.logger = simpleLogger("form-data-fetch", "zhi-formdata-fetch", isDev)
  }

  /**
   * 执行网络请求并返回数据
   *
   * @param url - 请求的URL地址
   * @param headers - 请求头信息
   * @param formData - 可选的FormData对象，用于发送表单数据
   * @returns 包含响应数据的Promise
   */
  public async doFetch(url: string, headers: Record<string, any>, formData?: FormData) {
    const myHeaders = new Headers()
    // 将headers中的键值对追加到myHeaders中
    for (const key in headers) {
      // eslint-disable-next-line no-prototype-builtins
      if (headers.hasOwnProperty(key)) {
        myHeaders.append(key, headers[key])
      }
    }
    this.logger.debug("headers =>", myHeaders)

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
    }

    const response = await fetch(url, requestOptions)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const resText = await response.text()
    return resText
  }
}

export default FormdataFetch
