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

import { simpleLogger } from "zhi-lib-base"

const logger = simpleLogger("node-fetch", "zhi-fetch-middleware")

/**
 * 原生的 fetch
 *
 * @param appInstance - 应用实例
 * @param apiUrl - 请求地址
 * @param fetchOptions - 请求参数
 * @param formJson - form请求数据
 */
export const fetchNode = async (
  appInstance: any,
  apiUrl: string,
  fetchOptions: RequestInit,
  formJson?: any[]
): Promise<any> => {
  try {
    logger.debug("fetchNode开始")
    logger.debug("apiUrl=>", apiUrl)
    logger.debug("fetchOptions=>", fetchOptions)

    const ret = await appInstance.fetch(apiUrl, fetchOptions)
    logger.debug("fetchNode结束，ret=>", ret)
    return ret
  } catch (e: any) {
    logger.error(e)
    throw new Error("请求处理异常 => " + e.toString())
  }
}
