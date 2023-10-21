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

/**
 * 基本路径枚举
 *
 * @public
 * @author terwer
 * @version 0.1.0
 * @since 0.1.0
 */
enum BasePathTypeEnum {
  /**
   * Appearance
   */
  BasePathType_Appearance = "Appearance",
  /**
   * Data
   */
  BasePathType_Data = "Data",
  /**
   * Themes
   */
  BasePathType_Themes = "Themes",
  /**
   * Zhi 主题目录
   */
  BasePathType_ZhiTheme = "ZhiTheme",
  /**
   * 当前插件目录
   */
  BasePathType_ThisPlugin = "ThisPlugin",
  /**
   * 当前用户数据目录
   */
  BasePathType_AppData = "AppData",
  /**
   * 当前用户NPM包目录
   */
  BasePathType_AppNpm = "AppNpm",
  /**
   * 当前用户服务目录
   */
  BasePathType_AppService = "AppService",
  /**
   * 绝对路径，对于 require 的话是绝对路径，对于 import 则是 /
   */
  BasePathType_Absolute = "Absolute",
  /**
   * 未设置
   */
  BasePathType_None = "None",
}

export default BasePathTypeEnum
