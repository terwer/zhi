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
import CategoryTypeEnum from "./enums/categoryTypeEnum"
import PreferenceConfig from "./PreferenceConfig"
import PicbedServiceTypeEnum from "./enums/picbedServiceTypeEnum"

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
   * 用户名标题
   */
  public usernameLabel?: string

  /**
   * 密码类型
   */
  public passwordType: PasswordType

  /**
   * 密码
   */
  public password: string

  /**
   * 密码标题
   */
  public passwordLabel?: string

  /**
   * 密码/token设置地址
   */
  public tokenSettingUrl?: string

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
   * 预览链接
   */
  public previewUrl?: string

  /**
   * 文章预览链接
   */
  public previewPostUrl?: string

  /**
   * 文章类型
   */
  public pageType?: PageTypeEnum

  /**
   * 操作提示
   */
  public placeholder?: BlogPlaceholder | undefined

  /**
   * 偏好设置
   */
  public preferenceConfig?: PreferenceConfig | undefined

  /**
   * 跨域代理地址
   */
  public middlewareUrl?: string

  /**
   * 新跨域代理地址
   */
  public corsAnywhereUrl?: string

  /**
   * cookie数组
   */
  public corsCookieArray: string[]

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
   * 是否开启知识空间，如果开启了，blogid就保存默认的知识空间ID
   */
  public knowledgeSpaceEnabled?: boolean

  /**
   * 知识空间名称，例如：语雀叫做知识库、Confluence叫做知识空间、Notion可以叫做根页面
   */
  public knowledgeSpaceTitle?: string

  /**
   * 知识空间类型
   */
  public knowledgeSpaceType: CategoryTypeEnum

  /**
   * 是否允许修改知识空间
   */
  public allowKnowledgeSpaceChange: boolean

  /**
   * 是否开启摘要
   */
  public descEnabled?: boolean

  /**
   * 是否开启摘要
   */
  public tagEnabled?: boolean

  /**
   * 是否开启分类
   */
  public cateEnabled?: boolean

  /**
   * 是否允许修改分类
   */
  public allowCateChange: boolean

  /**
   * 分类名称，默认：文章分类
   */
  public cateTitle?: string

  /**
   * 分类类型，默认无
   */
  public categoryType: CategoryTypeEnum

  /**
   * 是否生成YAML永久链接
   */
  public yamlLinkEnabled: boolean

  /**
   * 是否运行标签别名
   */
  public tagSlugEnabled: boolean

  /**
   * 是否使用标题作为MD 文件名
   */
  useMdFilename?: boolean

  /**
   * 是否使用路径作为分类
   */
  usePathCategory?: boolean

  /**
   * 是否允许分类搜索
   */
  public cateSearchEnabled?: boolean

  /**
   * 是否支持 PicGo 图片上传
   */
  public picgoPicbedSupported?: boolean

  /**
   * 是否支持平台图片上传
   */
  public bundledPicbedSupported?: boolean

  /**
   * 图片存储目录，部分平台会用到，相对于文章存储目录，默认为 images
   */
  public imageStorePath?: string

  /**
   * 图床服务类型
   */
  public picbedService?: PicbedServiceTypeEnum

  /**
   * 强制使用代理
   */
  public forceProxy?: boolean

  protected constructor() {
    this.home = ""
    this.apiUrl = ""
    this.username = ""
    this.passwordType = PasswordType.PasswordType_Password
    this.password = ""
    this.blogid = ""
    this.blogName = ""
    this.posidKey = ""
    this.previewUrl = ""
    this.previewPostUrl = this.previewUrl
    this.pageType = PageTypeEnum.Markdown
    this.placeholder = undefined
    this.preferenceConfig = new PreferenceConfig()
    this.middlewareUrl = ""
    this.corsAnywhereUrl = ""
    this.corsCookieArray = []
    this.usernameEnabled = false
    this.showTokenTip = false
    this.allowPreviewUrlChange = true
    this.knowledgeSpaceEnabled = false
    this.knowledgeSpaceTitle = "知识库"
    this.allowKnowledgeSpaceChange = false
    this.knowledgeSpaceType = CategoryTypeEnum.CategoryType_None
    this.descEnabled = false
    this.tagEnabled = false
    this.cateEnabled = false
    this.cateTitle = "文章分类"
    this.allowCateChange = false
    this.categoryType = CategoryTypeEnum.CategoryType_None
    this.yamlLinkEnabled = true
    this.tagSlugEnabled = false
    this.useMdFilename = false
    this.usePathCategory = false
    this.cateSearchEnabled = false
    this.picgoPicbedSupported = false
    this.bundledPicbedSupported = false
    this.picbedService = PicbedServiceTypeEnum.None
    this.imageStorePath = "images"
    this.forceProxy = false
  }
}

export default BlogConfig
