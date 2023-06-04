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
import { StrUtil } from "zhi-common"

const logger = simpleLogger("middleware-fetch", "zhi-fetch-middleware", false)

export const fetchMiddleware = async (
  appInstance: any,
  apiUrl: string,
  fetchOptions: RequestInit,
  middlewareUrl: string
) => {
  if (StrUtil.isEmptyString(middlewareUrl)) {
    throw new Error("middlewareUrl can not be empty")
  }

  const middleApiUrl = middlewareUrl + "/fetch"
  logger.debug("apiUrl=>", apiUrl)

  logger.debug("fetchOptions=>", fetchOptions)

  const originalFetchParams = {
    apiUrl,
    fetchOptions,
  }

  const data = {
    fetchParams: originalFetchParams,
  }

  const middleFetchOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }

  logger.debug("middleApiUrl=>", middleApiUrl)
  logger.debug("middleFetchOption=>", middleFetchOption)

  return await fetch(middleApiUrl, middleFetchOption)
}
