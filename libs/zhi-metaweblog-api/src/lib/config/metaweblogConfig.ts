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

import { PageTypeEnum } from "zhi-blog-api"
import MetaweblogPlaceholder from "./metaweblogPlaceholder"

/**
 * Metaweblog配置类
 */
class MetaweblogConfig {
  /**
   * 首页
   */
  home: string

  /**
   * API地址
   */
  apiUrl: string

  /**
   * 用户名
   */
  username: string

  /**
   * 密码
   */
  password: string

  /**
   * 是否发布
   */
  apiStatus: boolean

  /**
   * 博客名（API获取）
   */
  blogName: string

  /**
   * 文章别名key
   */
  posidKey: string

  /**
   * 文章预览链接
   */
  previewUrl: string

  /**
   * 文章类型
   */
  pageType: PageTypeEnum

  /**
   * 操作提示
   */
  placeholder: MetaweblogPlaceholder

  constructor(home: string, apiUrl: string, username: string, password: string) {
    this.home = home
    this.apiUrl = apiUrl
    this.username = username
    this.password = password
    this.apiStatus = false
    this.blogName = ""
    this.posidKey = ""
    this.previewUrl = ""
    this.pageType = PageTypeEnum.Markdown
    this.placeholder = new MetaweblogPlaceholder()
  }
}

export default MetaweblogConfig
