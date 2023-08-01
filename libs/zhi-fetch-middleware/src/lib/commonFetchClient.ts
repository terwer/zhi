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
import { BrowserUtil, DeviceDetection, DeviceTypeEnum, SiyuanDevice } from "zhi-device"
import { StrUtil } from "zhi-common"
import { fetchNode } from "./impl/nodeFetch"
import { fetchChrome } from "./impl/chromeFetch"
import { fetchMiddleware } from "./impl/middlewareFetch"

class CommonFetchClient {
  private readonly appInstance: any

  private readonly logger
  private readonly requestUrl
  private readonly middlewareUrl

  constructor(appInstance: any, requestUrl?: string, middlewareUrl?: string) {
    this.appInstance = appInstance
    this.logger = simpleLogger("common-fetch-client", "zhi-fetch-middleware")
    this.requestUrl = requestUrl
    this.middlewareUrl = middlewareUrl
  }

  /**
   * fetch的兼容处理，统一返回最终的JSON数据
   *
   * @param endpointUrl - 请求地址
   * @param fetchOptions - 请求参数
   * @param middlewareUrl - 可选，当环境不支持时候，必传
   */
  public async fetchCall(endpointUrl: string, fetchOptions: RequestInit, middlewareUrl?: string): Promise<any> {
    const apiUrl = this.requestUrl ? this.requestUrl + endpointUrl : endpointUrl
    return await this.fetchRequest(apiUrl, fetchOptions, middlewareUrl ?? this.middlewareUrl)
  }

  /**
   * 支持自定义处理的fetch的兼容处理，统一返回最终的JSON数据
   *
   * @param apiUrl - 请求地址
   * @param fetchOptions - 请求参数
   * @param customHandler - 自定义处理器
   */
  // protected async customFetchCall(apiUrl: string, fetchOptions: RequestInit, customHandler: any): Promise<any> {
  //   return await customHandler(apiUrl, fetchOptions)
  // }

  //================================================================
  // private function
  //================================================================
  /**
   * 同时兼容浏览器和思源宿主环境的fetch API
   *
   * @param apiUrl - 端点
   * @param fetchOptions - 请求参数
   * @param middlewareUrl - 可选，当环境不支持时候，必传
   */
  private async fetchRequest(apiUrl: string, fetchOptions: RequestInit, middlewareUrl?: string): Promise<any> {
    return await this.doFetch(apiUrl, fetchOptions, middlewareUrl)
  }

  /**
   * fetch的兼容处理，统一返回最终的JSON数据
   * @param apiUrl 请求地址
   * @param fetchOptions 请求参数
   * @param middlewareUrl - 可选，当环境不支持时候，必传
   */
  private async doFetch(apiUrl: string, fetchOptions: RequestInit, middlewareUrl?: string): Promise<any> {
    const response: any = await this.fetchEntry(apiUrl, fetchOptions, middlewareUrl)
    if (!response) {
      throw new Error("请求异常，response is undefined")
    }

    let resJson

    if (typeof response !== "undefined" && response instanceof Response) {
      // 解析响应体并返回响应结果
      const statusCode = response.status

      if (statusCode !== 200) {
        if (statusCode === 401) {
          throw new Error("因权限不足操作已被禁止")
        } else if (statusCode > 401) {
          if (statusCode === 413) {
            throw new Error("请求内容过多，请删减文章正文之后再试")
          }

          let msg = response.statusText
          if (StrUtil.isEmptyString(msg)) {
            msg = "网络超时或者服务器错误，请稍后再试。"
          } else {
            msg = "错误信息：" + msg
          }
          throw new Error(msg)
        } else {
          throw new Error("fetch请求错误")
        }
      }

      if (BrowserUtil.isNode) {
        resJson = await response.json()
      } else if (BrowserUtil.isElectron()) {
        resJson = await response.json()
      } else if (SiyuanDevice.isInSiyuanWidget()) {
        resJson = await response.json()
      } else {
        const corsJson = await response.json()
        resJson = this.parseCORSBody(corsJson)
      }
    } else {
      resJson = response
    }

    return resJson
  }

  /**
   * 同时兼容浏览器和思源宿主环境的fetch API，支持浏览器跨域
   * @param apiUrl - 请求地址
   * @param fetchOptions - 请求参数
   * @param middlewareUrl - 可选，当环境不支持时候，必传
   */
  private async fetchEntry(apiUrl: string, fetchOptions: RequestInit, middlewareUrl?: string): Promise<any> {
    let result

    const deviceType = DeviceDetection.getDevice()
    this.logger.info("deviceType =>", deviceType)

    switch (deviceType) {
      case DeviceTypeEnum.DeviceType_Node: {
        this.logger.info("当前处于Node环境，使用node的fetch获取数据")
        result = await fetchNode(this.appInstance, apiUrl, fetchOptions)
        break
      }
      case DeviceTypeEnum.DeviceType_Siyuan_Widget:
      case DeviceTypeEnum.DeviceType_Siyuan_MainWin:
      case DeviceTypeEnum.DeviceType_Siyuan_NewWin: {
        this.logger.info("当前处于思源笔记环境，使用electron的fetch获取数据")
        result = await fetchNode(this.appInstance, apiUrl, fetchOptions)
        break
      }
      case DeviceTypeEnum.DeviceType_Chrome_Extension: {
        this.logger.info("当前处于Chrome插件中，需要模拟fetch解决CORS跨域问题")
        result = await fetchChrome(this.appInstance, apiUrl, fetchOptions)
        break
      }
      case DeviceTypeEnum.DeviceType_Siyuan_Browser:
      case DeviceTypeEnum.DeviceType_Chrome_Browser:
      case DeviceTypeEnum.DeviceType_Mobile_Device: {
        this.logger.info("当前处于浏览器或移动设备，已开启请求代理解决CORS跨域问题")
        result = await fetchMiddleware(this.appInstance, apiUrl, fetchOptions, middlewareUrl)
        break
      }
      default: {
        this.logger.info("未知设备类型，已开启请求代理解决CORS跨域问题")
        result = await fetchMiddleware(this.appInstance, apiUrl, fetchOptions, middlewareUrl)
        break
      }
    }

    if (result === "") {
      throw new Error("请求错误或者返回结果为空")
    }

    this.logger.debug("最终返回给前端的数据=>", result)

    return result
  }

  /**
   * 解析CORS返回数据
   * @param corsjson cors数据
   * @protected
   */
  private parseCORSBody(corsjson: any): any {
    return corsjson.body ?? corsjson
  }
}

export default CommonFetchClient
