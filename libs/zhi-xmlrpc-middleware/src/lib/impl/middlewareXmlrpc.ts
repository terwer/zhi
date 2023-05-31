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
import { JsonUtil } from "zhi-common"

const logger = simpleLogger("fetch-middleware")

/**
 * 请求中转支持浏览器跨域
 *
 * @param appInstance - 应用实例
 * @param apiUrl - 端点
 * @param reqMethod - 方法
 * @param reqParams - 参数
 * @param middlewareUrl - 代理地址
 */
export async function fetchMiddleware(
  appInstance: any,
  apiUrl: string,
  reqMethod: string,
  reqParams: string[],
  middlewareUrl?: string
): Promise<any> {
  const middleApiUrl = middlewareUrl + "/xmlrpc"
  logger.debug("apiUrl=>", apiUrl)
  const fetchCORSParams = {
    reqMethod,
    reqParams,
  }
  logger.debug("fetchCORSParams=>", fetchCORSParams)

  const data = {
    fetchParams: {
      apiUrl,
      fetchCORSParams,
    },
  }

  const middleFetchOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }

  logger.info("middleApiUrl=>", middleApiUrl)
  logger.info("middleFetchOption=>", middleFetchOption)

  const response: Response = await appInstance.fetch(middleApiUrl, middleFetchOption)
  const resText = await response.text()
  logger.info(`fetchMiddleware结束，resStatus=>${response.status}，resText`, resText)

  const ret = JsonUtil.safeParse<any>(resText, [])
  logger.info("fetchMiddleware结束，resJson", ret)
  if (ret.faultCode) {
    logger.error("代理请求异常，错误信息如下：", ret.faultString)
    throw new Error(ret.faultString)
  }
  return ret
}
