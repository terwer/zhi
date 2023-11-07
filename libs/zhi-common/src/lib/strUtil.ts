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
 * 字符串工具类
 *
 * @public
 * @author terwer
 * @since 0.0.1
 */
class StrUtil {
  /**
   * 格式化字符串
   *
   * @param str - 字符串，可用占位符，例如：test \{0\} str
   * @param args - 按占位符顺序排列的参数
   * @author terwer
   * @since 0.0.1
   */
  public static f(str: string, ...args: (string | number | boolean | Record<string, unknown>)[]): string {
    let ret = str
    for (let i = 0; i < args.length; i++) {
      const arg = args[i]
      if (typeof arg === "string") {
        ret = ret.replace(`{${i}}`, arg)
      } else {
        ret = ret.replace(`{${i}}`, arg.toString())
      }
    }
    return ret
  }

  /**
   * 字符串拼接
   *
   * @param str - 字符串数组
   */
  public static appendStr(...str: string[]): string {
    return str.join("")
  }

  /**
   * 判断字符串中，是否包含数组中任何一个元素
   *
   * @param str - 字符串
   * @param arr - 字符串数组
   */
  public static includeInArray(str: string, arr: string[]): boolean {
    let flag = false
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      if (str.includes(item)) {
        flag = true
      }
    }

    return flag
  }

  /**
   * 截取指定长度的字符串
   *
   * @param str - str
   * @param length - 长度
   * @param ignoreSign - 不要结尾省略号
   */
  public static getByLength(str: string, length: number, ignoreSign?: boolean): string {
    const ellipsis = ignoreSign ? "" : "..."

    // 使用正则表达式匹配中文字符
    const chineseCharReg = /[\u4e00-\u9fa5]/
    let textLength = 0
    let result = ""

    for (let i = 0; i < str.length; i++) {
      const char = str[i]
      if (chineseCharReg.test(char)) {
        textLength += 2 // 中文字符长度为2
      } else {
        textLength += 1 // 英文字符长度为1
      }

      if (textLength > length) {
        result = str.slice(0, i) + ellipsis
        break
      }
    }

    return result || str
  }

  /**
   * 字符串空值检测
   *
   * @param str - 待检测的字符串
   */
  public static isEmptyString(str: any): boolean {
    if (str === null || typeof str === "undefined" || typeof str !== "string") {
      return true
    }

    return str.trim().length === 0
  }

  /**
   * 路径组合，解决多出来/的问题
   *
   * @param path1 - 路径1
   * @param path2 - 路径2
   */
  public static pathJoin(path1: string, path2: string): string {
    let path = path1
    const path1LastIdx = path1.lastIndexOf("/")

    if (path1LastIdx + 1 === path1.length) {
      path = path1.substring(0, path1LastIdx)
    }

    const path2Idx = path2.indexOf("/")

    if (path2Idx === 0) {
      path = path + path2
    } else {
      path = path + "/" + path2
    }

    return path
  }

  /**
   * 强转boolean
   *
   * @param val - val
   */
  public static parseBoolean(val: any) {
    if (!val) {
      val = "false"
    }
    return val.toString().toLowerCase() === "true"
  }

  /**
   * 首字母大写
   *
   * @param name
   */
  public static upperFirst(name: string): string {
    return name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase()
  }

  /**
   * 移除标题数字
   *
   * @param str
   */
  public static removeTitleNumber(str: string): string {
    let newstr = str

    // 移除序号
    const publisherRegex = /([0-9]*)\./
    newstr = newstr.replace(publisherRegex, "")

    return newstr
  }

  /**
   * 根据拼音获取首字母
   *
   * @param pinyin
   */
  public static getFirstLetters(pinyin: string) {
    let firstLetters = ""
    const pinyinArr = pinyin.split("-")
    pinyinArr.forEach((item) => {
      firstLetters += item[0]
    })
    return firstLetters
  }

  /**
   * 将包含Unicode编码的字符转换为中文
   *
   * @param {string} str - 要处理的字符串
   * @returns {string} - 转换后的字符串
   */
  public static decodeUnicodeToChinese(str: string): string {
    return str.replace(/\\[uU][\dA-Fa-f]{4}/g, (match) => {
      return String.fromCharCode(parseInt(match.substring(2), 16))
    })
  }
}

export default StrUtil
