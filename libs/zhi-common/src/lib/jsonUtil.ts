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

import StrUtil from "./strUtil"
import { simpleLogger } from "zhi-lib-base"

/**
 * JSON 解析工具类
 *
 * @author terwer
 * @version 1.5.0
 * @since 1.5.0
 */
class JsonUtil {
  private static logger = simpleLogger("json-util")

  /**
   * 安全的解析json
   *
   * @param str json字符串
   * @param def 默认值
   */
  public static safeParse<T>(str: any, def: T): T {
    let ret

    if (typeof str !== "string") {
      this.logger.debug("not json string, ignore parse")
      return str
    }

    // 如果字符创为空或者undefined等，返回默认json
    if (StrUtil.isEmptyString(str)) {
      ret = def
    }

    // 尝试解析json
    try {
      str = this.extractContent(str)
      ret = JSON.parse(str) || def
    } catch (e) {
      ret = def
      this.logger.warn("json parse error", e)
    }

    // 如果json被二次转义，在尝试解析一次
    if (typeof ret === "string") {
      ret = JSON.parse(ret) || def
    }

    return ret
  }

  private static extractContent(input: string): string {
    const match = input.match(/```json\n([\s\S]*)\n```/)
    return match ? match[1] : input
  }
}

export default JsonUtil
