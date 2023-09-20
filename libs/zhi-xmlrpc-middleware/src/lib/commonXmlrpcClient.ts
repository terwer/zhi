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
import { DeviceDetection, DeviceTypeEnum } from "zhi-device"
import { fetchChrome } from "./impl/chromeXmlrpc"
import { fetchMiddleware } from "./impl/middlewareXmlrpc"
import { fetchNode } from "./impl/nodeXmlrpc"

/**
 * Xmlrpc客户端封装类
 *
 * @author terwer
 * @version 0.9.0
 * @since 0.0.1
 */
class CommonXmlrpcClient {
  private readonly appInstance: any

  private readonly logger
  private readonly apiUrl

  constructor(appInstance: any, apiUrl: string) {
    this.appInstance = appInstance
    this.logger = simpleLogger("common-xmlrpc-client", "zhi-xmlrpc-middleware")
    this.apiUrl = apiUrl
  }

  /**
   * xmlrpc统一调用入口
   *
   * @param reqMethod - 方法
   * @param reqParams - 参数
   * @param middlewareUrl - 可选，当环境不支持时候，必传
   */
  public async methodCall(reqMethod: string, reqParams: any[], middlewareUrl?: string): Promise<any> {
    const result = await this.fetchXmlrpc(this.apiUrl, reqMethod, reqParams, middlewareUrl)
    this.logger.info("请求结果，result=>", result)
    return result
  }

  // /**
  //  * 自定义xmlrpc统一调用入口
  //  *
  //  * @param reqMethod - 方法
  //  * @param reqParams - 参数
  //  * @param customHandler - 自定义处理器
  //  */
  // public async customMethodCall(reqMethod: string, reqParams: any[], customHandler: any): Promise<any> {
  //   let result
  //   if (customHandler) {
  //     result = await customHandler(this.apiUrl, reqMethod, reqParams)
  //   } else {
  //     result = await this.fetchXmlrpc(this.apiUrl, reqMethod, reqParams)
  //   }
  //   this.logger.info("请求结果，result=>", result)
  //   return result
  // }

  //================================================================
  // private function
  //================================================================

  /**
   * 同时兼容浏览器和思源宿主环境的xmlrpc API
   *
   * @param apiUrl - 端点
   * @param reqMethod - 方法
   * @param reqParams - 参数数组
   * @param middlewareUrl - 可选，当环境不支持时候，必传
   */
  private async fetchXmlrpc(
    apiUrl: string,
    reqMethod: string,
    reqParams: string[],
    middlewareUrl?: string
  ): Promise<any> {
    let result

    const deviceType = DeviceDetection.getDevice()
    this.logger.info("deviceType =>", deviceType)
    switch (deviceType) {
      case DeviceTypeEnum.DeviceType_Node: {
        this.logger.info("当前处于Node环境，使用node的fetch获取数据")
        result = await fetchNode(this.appInstance, apiUrl, reqMethod, reqParams)
        break
      }
      case DeviceTypeEnum.DeviceType_Siyuan_Widget:
      case DeviceTypeEnum.DeviceType_Siyuan_MainWin:
      case DeviceTypeEnum.DeviceType_Siyuan_NewWin: {
        this.logger.info("当前处于思源笔记环境，使用electron的fetch获取数据")
        result = await fetchNode(this.appInstance, apiUrl, reqMethod, reqParams)
        break
      }
      case DeviceTypeEnum.DeviceType_Chrome_Extension: {
        this.logger.info("当前处于Chrome插件中，需要模拟fetch解决CORS跨域问题")
        result = await fetchChrome(this.appInstance, apiUrl, reqMethod, reqParams)
        break
      }
      case DeviceTypeEnum.DeviceType_Siyuan_Browser:
      case DeviceTypeEnum.DeviceType_Chrome_Browser:
      case DeviceTypeEnum.DeviceType_Mobile_Device: {
        this.logger.info("当前处于浏览器或移动设备，已开启请求代理解决CORS跨域问题")
        result = await fetchMiddleware(this.appInstance, apiUrl, reqMethod, reqParams, middlewareUrl)
        break
      }
      default: {
        this.logger.info("未知设备类型，已开启请求代理解决CORS跨域问题")
        result = await fetchMiddleware(this.appInstance, apiUrl, reqMethod, reqParams, middlewareUrl)
        break
      }
    }

    if (result === "") {
      throw new Error("请求错误或者返回结果为空")
    }

    this.logger.debug("最终返回给前端的数据=>", result)

    return result
  }
}

export default CommonXmlrpcClient
