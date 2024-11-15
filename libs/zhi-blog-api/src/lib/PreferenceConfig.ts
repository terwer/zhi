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
 * 偏好设置
 */
class PreferenceConfig {
  /**
   * 是否处理标题，主要是去除数字
   */
  public fixTitle: boolean

  /**
   * 不修改标题
   */
  public keepTitle: boolean

  /**
   * 是否删除正文第一个H1
   */
  public removeFirstH1: boolean

  /**
   * 移除挂件的 HTML
   */
  public removeMdWidgetTag: boolean

  /**
   * 是否启用目录
   */
  public outlineEnable: boolean

  /**
   * 目录层级
   */
  public outlineLevel: number

  /**
   * 是否启用文档树
   */
  public docTreeEnable: boolean

  /**
   * 文档树层级
   */
  public docTreeLevel: number

  constructor() {
    this.fixTitle = false
    this.keepTitle = false
    this.removeFirstH1 = false
    this.removeMdWidgetTag = false
    this.outlineEnable = false
    this.outlineLevel = 3
    this.docTreeEnable = false
    this.docTreeLevel = 3
  }
}

export default PreferenceConfig
