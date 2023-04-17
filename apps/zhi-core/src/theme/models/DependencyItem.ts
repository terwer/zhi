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

import { BasePathTypeEnum, DeviceTypeEnum } from "zhi-device-detection"

/**
 * 依赖项类型定义
 *
 * @public
 * @author terwer
 * @version 0.1.0
 * @since 0.1.0
 */
class DependencyItem {
  /**
   * 依赖库相对路径
   */
  libpath: string
  baseType: BasePathTypeEnum
  /**
   * 格式
   */
  format: "cjs" | "esm" | "js"
  /**
   * 引入方式
   */
  importType: "require" | "import"
  /**
   * 支持的设备列表
   */
  runAs: DeviceTypeEnum[]
  /**
   * 加载属性，数组越越靠前
   */
  order: number

  constructor() {
    this.libpath = ""
    this.baseType = BasePathTypeEnum.BasePathType_ZhiTheme
    this.format = "cjs"
    this.importType = "require"
    this.runAs = [DeviceTypeEnum.DeviceType_Siyuan_MainWin, DeviceTypeEnum.DeviceType_Node]
    this.order = 0
  }
}

export default DependencyItem
