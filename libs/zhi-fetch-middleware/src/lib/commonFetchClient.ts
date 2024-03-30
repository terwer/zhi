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
import { JsonUtil, StrUtil } from "zhi-common"
import { fetchNode } from "./impl/nodeFetch"
import { fetchChrome } from "./impl/chromeFetch"
import { fetchMiddleware } from "./impl/middlewareFetch"
import { ICommonFetchClient } from "./types"

class CommonFetchClient implements ICommonFetchClient {
  private readonly appInstance: any

  private readonly logger: any
  private readonly requestUrl: string
  private readonly middlewareUrl: string

  constructor(appInstance: any, requestUrl?: string, middlewareUrl?: string, isDev?: boolean) {
    this.appInstance = appInstance
    this.logger = simpleLogger("common-fetch-client", "zhi-fetch-middleware", isDev)
    this.requestUrl = requestUrl
    this.middlewareUrl = middlewareUrl
  }

  /**
   * fetch的兼容处理，统一返回最终的JSON数据
   *
   * @param endpointUrl - 请求地址
   * @param fetchOptions - 请求参数
   * @param forceProxy - 是否强制使用代理
   */
  public async fetchCall(endpointUrl: string, fetchOptions: RequestInit, forceProxy?: boolean): Promise<any> {
    const apiUrl = this.requestUrl ? this.requestUrl + endpointUrl : endpointUrl
    return await this.fetchRequest(apiUrl, fetchOptions, this.middlewareUrl, forceProxy)
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
   * @param forceProxy - 可选，是否强制使用代理
   */
  private async fetchRequest(
    apiUrl: string,
    fetchOptions: RequestInit,
    middlewareUrl?: string,
    forceProxy?: boolean
  ): Promise<any> {
    return await this.doFetch(apiUrl, fetchOptions, middlewareUrl, forceProxy)
  }

  /**
   * fetch的兼容处理，统一返回最终的JSON数据
   * @param apiUrl 请求地址
   * @param fetchOptions 请求参数
   * @param middlewareUrl - 可选，当环境不支持时候，必传
   * @param forceProxy - 可选，是否强制使用代理
   */
  private async doFetch(
    apiUrl: string,
    fetchOptions: RequestInit,
    middlewareUrl?: string,
    forceProxy?: boolean
  ): Promise<any> {
    const response: any = await this.fetchEntry(apiUrl, fetchOptions, middlewareUrl, forceProxy)
    if (!response) {
      throw new Error("请求异常，response is undefined")
    }

    let resJson: any

    const isResponse = response?.status !== undefined && response?.headers !== undefined && response?.url !== undefined
    const isStream = !isResponse && response?.body instanceof ReadableStream
    this.logger.info(`check if response is valid, isResponse=>${isResponse}`)
    this.logger.info(`check response is stream =>${isStream}`)

    if (isStream) {
      this.logger.info("检测到response不是Response的实例", typeof response)
      resJson = response
    } else {
      // 解析响应体并返回响应结果
      const statusCode = response.status
      const httpSuccess = statusCode >= 200 && statusCode < 300
      if (!httpSuccess) {
        this.logger.error("fetch请求错误，response=>", response)
        let resBody = response?.body
        if (response?.body instanceof ReadableStream) {
          resBody = await response.text()
        }
        this.logger.error(`fetch请求错误，code ${statusCode}, body =>`, resBody)
        if (statusCode === 400) {
          throw new Error("错误请求，服务器不理解请求的语法")
        } else if (statusCode === 401) {
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
          throw new Error(`fetch请求错误，code is ${statusCode}, body => ${response?.body}`)
        }
      }

      this.logger.info("isNode=>", BrowserUtil.isNode)
      this.logger.info("isElectron=>", BrowserUtil.isElectron())
      this.logger.info("isInSiyuanWidget=>", SiyuanDevice.isInSiyuanWidget())
      if (BrowserUtil.isNode) {
        resJson = await this.safeParseBodyJson(response)
      } else if (BrowserUtil.isElectron()) {
        resJson = await this.safeParseBodyJson(response)
      } else if (SiyuanDevice.isInSiyuanWidget()) {
        resJson = await this.safeParseBodyJson(response)
      } else {
        this.logger.debug("开始解析CORSBody")
        const corsJson = await this.safeParseBodyJson(response)
        resJson = this.parseCORSBody(corsJson)
      }
    }

    this.logger.debug("全部处理完毕，resJson=>", resJson)
    return resJson
  }

  /**
   * 同时兼容浏览器和思源宿主环境的fetch API，支持浏览器跨域
   * @param apiUrl - 请求地址
   * @param fetchOptions - 请求参数
   * @param middlewareUrl - 可选，当环境不支持时候，必传
   * @param forceProxy - 可选，强制使用代理
   */
  private async fetchEntry(
    apiUrl: string,
    fetchOptions: RequestInit,
    middlewareUrl?: string,
    forceProxy?: boolean
  ): Promise<any> {
    let result: any

    const deviceType = forceProxy ? DeviceTypeEnum.DeviceType_ForceProxy : DeviceDetection.getDevice()
    this.logger.info("deviceType =>", deviceType)

    switch (deviceType) {
      case DeviceTypeEnum.DeviceType_ForceProxy: {
        this.logger.info("当前API需要强制使用代理，，已开启请求代理解决CORS跨域问题")
        result = await fetchMiddleware(this.appInstance, apiUrl, fetchOptions, middlewareUrl)
        break
      }
      case DeviceTypeEnum.DeviceType_Node: {
        this.logger.info("当前处于Node环境，使用node的fetch获取数据")
        result = await fetchNode(this.appInstance, apiUrl, fetchOptions)
        break
      }
      case DeviceTypeEnum.DeviceType_Siyuan_Widget:
      case DeviceTypeEnum.DeviceType_Siyuan_MainWin:
      case DeviceTypeEnum.DeviceType_Siyuan_RendererWin: {
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

  //================================================================
  // private function
  //================================================================
  private async safeParseBodyJson(response: any) {
    const resText = await response.text()
    const resJson = JsonUtil.safeParse<any>(resText, {} as any)
    return resJson
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
