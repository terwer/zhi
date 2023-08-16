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

import JsonUtil from "./jsonUtil"

class SmartUtil {
  /**
   * 根据给定的查询参数自动生成摘要
   *
   * @param {string} q - 查询参数
   * @returns {Promise<string>} 生成的摘要
   */
  public static async autoSummary(q: string): Promise<any> {
    const url = "http://kms.terwergreen.com:8888/api/summary"
    const headers = {
      "Content-Type": "application/json",
    }
    const data = JSON.stringify({ q })

    const requestOptions: RequestInit = {
      method: "POST",
      headers,
      body: data,
    }

    try {
      const response = await fetch(url, requestOptions)
      if (response.ok) {
        const summary = await response.text()
        return JsonUtil.safeParse<any>(summary, {})
      } else {
        return {
          result: "",
          errMsg: "Request failed",
        }
      }
    } catch (e: any) {
      return {
        result: e.toString(),
        errMsg: e,
      }
    }
  }
}

export default SmartUtil
