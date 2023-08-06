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

/**
 * 别名翻译器类
 *
 * @author terwer
 * @since 1.12.1
 */
class AliasTranslator {
  /**
   * 将中文名翻译为英文别名
   *
   * @param q 中文名
   * @param fixTitle 是否去除标题数字
   * @returns Promise<string> 英文别名
   */
  public static async wordSlugify(q: string, fixTitle?: boolean): Promise<string> {
    q = q ?? "无标题"
    if (fixTitle) {
      q = StrUtil.removeTitleNumber(q).trim()
    }

    const v = await fetch("https://api.terwer.space/api/translate?q=" + q)
    const json = await v.json()
    let res = json[0][0]
    res = res.replace(/-/g, "")
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
}

export default AliasTranslator
