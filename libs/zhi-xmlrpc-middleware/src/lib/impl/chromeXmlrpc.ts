/*
 * Copyright (c) 2022-2023, Terwer . All rights reserved.
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

const logger = simpleLogger("fetch-chrome", "xmlrpc-middleware", true)

/**
 * 向Chrome发送消息
 * @param message 消息
 */
async function sendChromeMessage(message: any) {
  return await new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // chrome.runtime.sendMessage(message, resolve)
    chrome.runtime.sendMessage(message, (response) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (chrome.runtime.lastError) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        reject(chrome.runtime.lastError)
      } else {
        resolve(response)
      }
    })
  })
}

/**
 * 自定义xmlrpc的请求与解析，通过Chrome发送事件交互
 *
 * @param appInstance
 * @param apiUrl
 * @param reqMethod
 * @param reqParams
 */
async function doChromeFetch(appInstance: any, apiUrl: string, reqMethod: string, reqParams: string[]): Promise<any> {
  try {
    logger.debug("doChromeFetch appInstance=>", appInstance)
    logger.debug("doChromeFetch apiUrl=>", apiUrl)
    const serializer = new appInstance.simpleXmlrpc.Serializer(appInstance)
    const methodBodyXml = serializer.serializeMethodCall(reqMethod, reqParams, "utf-8")

    logger.debug("doChromeFetch methodBodyXml=>", methodBodyXml)
    const fetchCORSParams = {
      method: "POST",
      headers: {
        "content-type": "text/xml",
      },
      body: methodBodyXml,
    }

    logger.debug("start sendChromeMessage...")
    let resText = (await sendChromeMessage({
      // 里面的值应该可以自定义，用于判断哪个请求之类的
      type: "fetchChromeXmlrpc",
      apiUrl, // 需要请求的url
      fetchCORSParams,
    })) as any
    logger.debug("fetchChromeXmlrpc received message，resText=>", resText)

    let data
    if (resText) {
      resText = appInstance.simpleXmlrpc.XmlrpcUtil.removeXmlHeader(resText)

      const deserializer = new appInstance.simpleXmlrpc.Deserializer("utf-8")
      data = await deserializer.deserializeMethodResponse(resText)
      logger.info("fetchChromeXmlrpc结束，data=>", data)
      return data
    }
  } catch (e: any) {
    throw new Error(e)
  }
}

/**
 * 兼容Chrome插件的xmlrpc API
 *
 * @param appInstance
 * @param apiUrl 端点
 * @param reqMethod 方法
 * @param reqParams 参数
 */
export async function fetchChrome(
  appInstance: any,
  apiUrl: string,
  reqMethod: string,
  reqParams: string[]
): Promise<any> {
  if (!appInstance.xmlbuilder2) {
    throw new Error("appInstance must have xmlbuilder2.create property")
  }
  if (!appInstance.simpleXmlrpc) {
    throw new Error("appInstance must have simpleXmlrpc property")
  }
  if (!appInstance.simpleXmlrpc.Serializer) {
    throw new Error("appInstance must have simpleXmlrpc.Serializer property")
  }
  if (!appInstance.simpleXmlrpc.Deserializer) {
    throw new Error("appInstance must have simpleXmlrpc.Deserializer property")
  }
  if (!appInstance.simpleXmlrpc.XmlrpcUtil) {
    throw new Error("appInstance must have simpleXmlrpc.XmlrpcUtil property")
  }

  logger.debug("fetchChrome apiUrl=>", apiUrl)

  const fetchCORSParams = {
    reqMethod,
    reqParams,
  }
  logger.debug("fetchChrome fetchCORSParams=>", fetchCORSParams)

  const result = await doChromeFetch(appInstance, apiUrl, reqMethod, reqParams)
  if (!result || result === "") {
    throw new Error("请求错误或者返回结果为空")
  }
  logger.debug("fetchCustom result=>", result)
  return result
}
