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

import { simpleLogger } from "zhi-lib-base"
import StrUtil from "./strUtil"

/**
 * Object 工具类
 *
 * @author terwer
 * @version 1.0.0
 * @since 1.0.0
 */
class ObjectUtil {
  private static logger = simpleLogger("object-util")

  /**
   * 检测是否是空对象
   *
   * @param obj - 对象
   */
  public static isEmptyObject(obj: any): boolean {
    if (!obj) {
      return true
    }
    return (
      Object.getPrototypeOf(obj) === Object.prototype &&
      Object.getOwnPropertyNames(obj).length === 0 &&
      Object.getOwnPropertySymbols(obj).length === 0
    )
  }

  /**
   * 获取对象的属性值
   *
   * @param {any} object - 目标对象
   * @param {string} key - 属性键值
   * @param {any} [defaultValue=""] - 默认值
   */
  public static getProperty(object: any, key: string, defaultValue: any = ""): any {
    if (typeof object !== "object") {
      throw new Error("Invalid arguments. object should be an object")
    }

    if (StrUtil.isEmptyString(key)) {
      return defaultValue
    }

    try {
      // eslint-disable-next-line no-prototype-builtins
      if (object.hasOwnProperty(key)) {
        return object[key]
      }
      return defaultValue
    } catch (error) {
      this.logger.warn(`getProperty ${key} Error:`, error)
      return defaultValue
    }
  }
}

export default ObjectUtil
