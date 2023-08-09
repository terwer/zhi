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

import BlogPlaceholder from "./blogPlaceholder"
import PageTypeEnum from "./enums/pageTypeEnum"

/**
 * 页面类型
 */
export enum PageType {
  /**
   * Markdown正文
   */
  Markdown,

  /**
   * HTML
   */
  Html,

  /**
   * 属性
   */
  Formatter,

  /**
   * Markdown和属性
   */
  Markdown_And_Formatter,

  /**
   * MDX
   *
   * @see {@link https://mdxjs.com/ mdx}
   */
  MDX,
}

/**
 * 密码类型
 */
export enum PasswordType {
  /**
   * 密码
   */
  PasswordType_Password,

  /**
   * token
   */
  PasswordType_Token,

  /**
   * cookie
   */
  PasswordType_Cookie,
}

/**
 * 博客通用配置类
 */
abstract class BlogConfig {
  /**
   * 首页
   */
  public home?: string

  /**
   * API地址
   */
  public apiUrl: string

  /**
   * 用户名
   */
  public username?: string

  /**
   * 密码类型
   */
  public passwordType: PasswordType

  /**
   * 密码
   */
  public password: string

  /**
   * 密码/token设置地址
   */
  public tokenSettingUrl?: string

  /**
   * 请求 cookie
   */
  public cookie?: string

  /**
   * 标识
   */
  public blogid?: string

  /**
   * 博客名（API获取）
   */
  public blogName?: string

  /**
   * API 是否可用
   */
  public apiStatus: boolean

  /**
   * 文章别名key
   */
  public posidKey: string

  /**
   * 文章预览链接
   */
  public previewUrl?: string

  /**
   * 文章类型
   */
  public pageType?: PageTypeEnum

  /**
   * 操作提示
   */
  public placeholder?: BlogPlaceholder | undefined

  /**
   * 是否处理标题
   *
   * @protected
   */
  public fixTitle?: boolean

  /**
   * 跨域代理地址
   */
  public middlewareUrl?: string

  /**
   * 是否启用用户名
   */
  public usernameEnabled = false

  /**
   * 是否允许修改预览地址
   */
  public allowPreviewUrlChange = true

  /**
   * 是否展示Token设置地址
   */
  public showTokenTip = false

  /**
   * 知识空间名称，例如：语雀叫做知识库、Confluence叫做知识空间、Notion可以叫做根页面
   */
  public knowledgeSpaceTitle?: string

  /**
   * 是否开启知识空间，如果开启了，blogid就保存默认的知识空间ID
   */
  public enableKnowledgeSpace?: boolean

  protected constructor() {
    this.home = ""
    this.apiUrl = ""
    this.username = ""
    this.passwordType = PasswordType.PasswordType_Password
    this.password = ""
    this.cookie = undefined
    this.blogid = ""
    this.blogName = ""
    this.posidKey = ""
    this.previewUrl = ""
    this.pageType = PageTypeEnum.Markdown
    this.placeholder = undefined
    this.fixTitle = false
    this.middlewareUrl = ""
    this.usernameEnabled = false
    this.allowPreviewUrlChange = true
    this.showTokenTip = false
    this.knowledgeSpaceTitle = "知识库"
    this.enableKnowledgeSpace = false
  }
}

export default BlogConfig
