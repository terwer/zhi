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

import PostStatusEnum from "../enums/postStatusEnum"
import { DateUtil } from "zhi-common"

/**
 * 通用文章模型定义
 *
 * @public
 */
class Post {
  /**
   * 文章ID
   */
  postid: string

  /**
   * 标题
   */
  title: string

  /**
   * 逗号分隔的标签
   */
  mt_keywords: string

  /**
   * 链接
   */
  link?: string

  /**
   * 永久链接
   */
  permalink: string

  /**
   * 摘要
   */
  shortDesc?: string

  /**
   * 属性对应的yaml
   */
  yaml: string

  /**
   * HTML正文
   */
  html?: string

  /**
   * MD正文
   */
  markdown?: string

  /**
   * 编辑器DOM
   */
  editorDom?: string

  /**
   * 正文
   */
  description: string

  /**
   * 短评
   */
  mt_excerpt?: string

  /**
   * 别名
   */
  wp_slug: string

  /**
   * 创建时间
   */
  dateCreated: Date

  /**
   * 更新时间
   */
  dateUpdated: Date

  /**
   * 分类
   */
  categories: Array<string>

  /**
   * 分类别名，大部分平台不需要
   */
  cate_slugs?: string[]

  /**
   * 更多
   */
  mt_text_more?: string

  /**
   * 发布状态
   */
  post_status?: PostStatusEnum

  /**
   * 是否发布
   */
  isPublished: boolean

  /**
   * 发布密码
   */
  wp_password: string

  /**
   * 附加属性
   */
  attrs?: string

  constructor() {
    this.postid = ""
    this.title = ""
    this.mt_keywords = ""
    this.permalink = ""
    this.yaml = "---\n---"
    this.html = ""
    this.markdown = ""
    this.editorDom = ""
    this.description = ""
    this.wp_slug = ""
    this.dateCreated = new Date()
    this.categories = []
    this.cate_slugs = []
    this.isPublished = true
    this.post_status = PostStatusEnum.PostStatusEnum_Publish
    this.wp_password = ""
    this.attrs = "{}"
  }

  /**
   * 将当前对象的数据转换为适用于 YAML 的对象
   *
   * @returns {Object} 表示数据的适用于 YAML 的对象
   */
  public toYamlObj(): Record<string, any> {
    return {
      /**
       * 创建日期，已转换为中文格式
       */
      created: DateUtil.formatIsoToZh(this.dateCreated.toISOString(), true),

      /**
       * 更新日期，已转换为中文格式。
       */
      updated: DateUtil.formatIsoToZh(this.dateUpdated.toISOString(), true),

      /**
       * 标题。
       */
      title: this.title,

      /**
       * WordPress 别名
       */
      slug: this.wp_slug,

      /**
       * 永久链接
       */
      permalink: this.permalink,

      /**
       * 简短描述
       */
      desc: this.shortDesc,

      /**
       * 标签
       */
      tags: this.mt_keywords,

      /**
       * 分类列表
       */
      categories: this.categories,
    }
  }

  /**
   * 使用来自适用于 YAML 的对象的数据填充当前对象的属性
   *
   * @param {Object} yamlObj - 包含要填充对象属性的数据的适用于 YAML 的对象
   */
  public fromYaml(yamlObj: Record<string, any>): void {
    /**
     * 创建日期
     */
    this.dateCreated = yamlObj.created

    /**
     * 更新日期
     */
    this.dateUpdated = yamlObj.updated

    /**
     * 标题
     */
    this.title = yamlObj.title

    /**
     * WordPress 别名
     */
    this.wp_slug = yamlObj.slug

    /**
     * 永久链接
     */
    this.permalink = yamlObj.permalink

    /**
     * 简短描述
     */
    this.shortDesc = yamlObj.desc

    /**
     * 标签
     */
    this.mt_keywords = yamlObj.tags

    /**
     * 分类列表
     */
    this.categories = yamlObj.categories
  }
}

export default Post
