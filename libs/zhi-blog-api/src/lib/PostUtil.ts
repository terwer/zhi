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

import Post from "./models/post"
import { DateUtil } from "zhi-common"

/**
 * 文章处理工具类
 *
 * @since 1.11.2
 */
class PostUtil {
  /**
   * 将当前对象的数据转换为适用于 YAML 的对象
   *
   * @returns {Object} 表示数据的适用于 YAML 的对象
   */
  public static toYamlObj(post: Post): Record<string, any> {
    const yamlObj: Record<string, any> = {}

    post.dateCreated && (yamlObj.created = DateUtil.formatIsoToZh(post.dateCreated.toISOString(), true))
    post.dateUpdated && (yamlObj.updated = DateUtil.formatIsoToZh(post.dateUpdated.toISOString(), true))
    post.title && (yamlObj.title = post.title)
    post.wp_slug && (yamlObj.slug = post.wp_slug)
    post.permalink && (yamlObj.permalink = post.permalink)
    post.shortDesc && (yamlObj.desc = post.shortDesc)
    post.mt_keywords && (yamlObj.tags = post.mt_keywords?.split(","))
    post.categories && (yamlObj.categories = post.categories)

    return yamlObj
  }

  /**
   * 使用来自适用于 YAML 的对象的数据填充当前对象的属性
   *
   * @param post - 文章对象
   * @param {Object} yamlObj - 包含要填充对象属性的数据的适用于 YAML 的对象
   */
  public static fromYaml(post: Post, yamlObj: Record<string, any>): void {
    post.dateCreated = yamlObj?.created ? DateUtil.convertStringToDate(yamlObj.created) : post.dateCreated
    post.dateUpdated = yamlObj?.updated ? DateUtil.convertStringToDate(yamlObj.updated) : post.dateUpdated
    post.title = yamlObj?.title ?? post.title
    post.wp_slug = yamlObj?.slug ?? post.wp_slug
    post.permalink = yamlObj?.permalink ?? post.permalink
    post.shortDesc = yamlObj?.desc ?? post.shortDesc
    // 修复历史遗留问题
    if (typeof yamlObj?.tags === "string" && yamlObj?.tags.indexOf(",") > -1) {
      post.mt_keywords = yamlObj?.tag
    } else {
      post.mt_keywords = yamlObj?.tags ? yamlObj?.tags.join(",") : post.mt_keywords
    }
    post.categories = yamlObj?.categories ?? post.categories
  }
}

export default PostUtil
