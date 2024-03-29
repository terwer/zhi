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

import { slugify } from "transliteration"
import StrUtil from "./strUtil"
import shortHash from "shorthash2"
import { simpleLogger } from "zhi-lib-base"

/**
 * 别名翻译器类
 *
 * @author terwer
 * @since 1.12.1
 */
class AliasTranslator {
  private static logger = simpleLogger("slug-util")

  /**
   * 修复标题
   *
   * @param q - 输入的标题字符串
   * @param isFixTitle - 是否修复标题，默认为true
   * @returns 修复后的标题字符串
   */
  public static fixTitle(q: string, isFixTitle?: boolean): string {
    q = q ?? "无标题"
    if (isFixTitle) {
      q = StrUtil.removeTitleNumber(q).trim()
    }
    return q
  }

  /**
   * 将中文名翻译为英文别名
   *
   * @param q 中文名
   * @returns Promise<string> 英文别名
   */
  public static async wordSlugify(q: string): Promise<string> {
    const v = await fetch("https://api.terwer.space/api/translate?q=" + q)
    const json = await v.json()
    let res = json[0][0]
    res = res.replace(/-/g, "")
    res = res.replace(/_/g, "")
    res = res.replace(/#/g, "")
    res = res.replace(/\./g, "")
    res = res.replace(/~/g, "")

    res = slugify(res)

    res = res.replace(/@/g, "")

    return res
  }

  /**
   * 将拼音转换为别名
   *
   * @param q 拼音
   * @returns string 别名
   */
  public static pinyinSlugify(q: string): string {
    return slugify(q)
  }

  public static hashstr(title: string) {
    const newstr = title + new Date().toISOString()
    return ["-", shortHash(newstr).toLowerCase()].join("")
  }

  /**
   * 获取页面原始slug
   *
   * @param q - 输入的标题字符串
   * @param isFixTitle - 是否修复标题，默认为true
   * @returns 页面的原始slug
   */
  public static async getPageOriginSlug(q: string, isFixTitle?: boolean): Promise<string> {
    const title = this.fixTitle(q, isFixTitle)
    let slug = title
    try {
      slug = await this.wordSlugify(q)
      this.logger.debug(`Successfully generated slug for "${q}": ${slug}`)
    } catch (e) {
      this.logger.warn(`Failed to generate slug for "${q}". Using pinyin slug: ${slug}`)
      slug = this.pinyinSlugify(q)
    }
    return slug
  }

  /**
   * 获取页面slug
   *
   * @param q - 输入的标题字符串
   * @param isFixTitle - 是否修复标题，默认为true
   * @returns 页面的slug
   */
  public static async getPageSlug(q: string, isFixTitle?: boolean): Promise<string> {
    const title = this.fixTitle(q, isFixTitle)
    const slug = await this.getPageOriginSlug(q, isFixTitle)
    const hash = this.hashstr(title)

    this.logger.debug(`Generated slug for "${q}": ${slug}`)
    return [slug, hash].join("")
  }
}

export default AliasTranslator
