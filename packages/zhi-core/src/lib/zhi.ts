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

import { DeviceTypeEnum } from "@siyuan-community/zhi-device"

class Zhi {
  private readonly runAs

  /**
   * 主题样式最低支持版本
   * @private
   */
  private readonly SUPPORTED_THEME_VERSION = "2.7.6"

  /**
   * 内核最低支持版本
   * @private
   */
  private readonly SUPPORTED_KERNEL_VERSION = "2.8.1"

  /**
   * 主题初始化
   *
   * @param runAs - 运行模式
   */
  constructor(runAs: DeviceTypeEnum) {
    this.runAs = runAs ?? DeviceTypeEnum.DeviceType_Node
  }

  /**
   * 主流程加载
   */
  public async init(): Promise<void> {
    try {
      console.info(`Zhi Theme runAs ${this.runAs}`)

      console.log("Zhi Theme inited")
    } catch (e) {
      console.error("Zhi Theme load error=>", e)
    }
  }
}

export default Zhi
