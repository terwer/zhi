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
 * 时间处理工具类
 *
 * @public
 * @author terwer
 * @since 1.0.0
 */
class DateUtil {
  private static readonly TIME_SPLIT = " "

  /**
   * 给日期添加小时
   *
   * @param date - Date
   * @param numOfHours - 数字
   * @author terwer
   * @since 1.0.0
   */
  private static addHoursToDate(date: Date, numOfHours: number): Date {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000)
    return date
  }

  /**
   * 转换ISO日期为中文日期的通用转换方法
   *
   * @param str - '2022-07-18T06:25:48.000Z
   * @param isAddTimeZone - 是否增加时区（默认不增加）
   * @param isShort - 是否只返回日期
   * @author terwer
   * @since 1.0.0
   */
  private static formatIsoToZhDateFormat(str: string, isAddTimeZone?: boolean, isShort?: boolean): string {
    if (!str) {
      return ""
    }
    let newstr = str

    // https://www.regextester.com/112232
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
    const isoDateRegex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(.\d{3})Z$/gm
    const matches = newstr.match(isoDateRegex)
    if (matches == null) {
      return str
    }
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i]

      let newmatch = match
      if (isAddTimeZone) {
        // ISO日期默认晚8小时
        // logUtil.logInfo(addHoursToDate(new Date(match), 8))
        newmatch = this.addHoursToDate(new Date(match), 8).toISOString()
      }

      const dts = newmatch.split("T")
      const d = dts[0]
      const t = dts[1].split(".")[0]

      let result = d + this.TIME_SPLIT + t
      if (isShort) {
        result = d
      }

      newstr = newstr.replace(match, result)
      // logUtil.logInfo("formatZhDate match=>", match)
      // logUtil.logInfo("formatZhDate result=>", result)
    }

    // logUtil.logInfo("formatZhDate=>", newstr)
    return newstr
  }

  /**
   * 转换ISO日期为中文完整时间
   *
   * @param str - '2022-07-18T06:25:48.000Z
   * @param isAddTimeZone - 是否增加时区，默认不增加
   * @param isShort - 是否短时间
   */
  public static formatIsoToZh(str: string, isAddTimeZone?: boolean, isShort?: boolean) {
    return this.formatIsoToZhDateFormat(str, isAddTimeZone, isShort)
  }

  /**
   * 转换ISO日期为中文日期
   *
   * @param str - '2022-07-18T06:25:48.000Z
   * @param isAddTimeZone - 是否增加时区，默认不增加
   */
  public static formatIsoToZhDate(str: string, isAddTimeZone?: boolean) {
    return this.formatIsoToZhDateFormat(str, isAddTimeZone, true)
  }

  /**
   * 转换ISO日期为中文时间
   *
   * @param str - '2022-07-18T06:25:48.000Z
   * @param isAddTimeZone - 是否增加时区，默认不增加
   */
  public static formatIsoToZhTime(str: string, isAddTimeZone?: boolean) {
    const dt = this.formatIsoToZhDateFormat(str, isAddTimeZone)
    return dt.split(this.TIME_SPLIT)[1]
  }

  /**
   * 当前日期时间完整格式，格式：2023-03-10 02:03:43
   */
  public static nowZh() {
    return this.formatIsoToZhDateFormat(new Date().toISOString(), true)
  }

  /**
   * 当前日期，格式：2023-03-10
   */
  public static nowDateZh() {
    return this.formatIsoToZhDateFormat(new Date().toISOString(), true, true)
  }

  /**
   * 当前时间，格式：02:03:43
   */
  public static nowTimeZh() {
    const now = this.formatIsoToZhDateFormat(new Date().toISOString(), true)
    return now.split(this.TIME_SPLIT)[1]
  }

  /**
   * 当前年份
   */
  public static nowYear(): number {
    return new Date().getFullYear()
  }

  /**
   * 时间戳转时间
   *
   * @param timestamp - 时间戳
   * @param isAddTimeZone
   */
  public static formatTimestampToZhDate(timestamp: any, isAddTimeZone?: boolean) {
    if (typeof timestamp == "string") {
      timestamp = parseInt(timestamp)
    }
    return this.formatIsoToZhDate(new Date(timestamp).toISOString(), isAddTimeZone)
  }

  /**
   * 时间戳转完整时间
   *
   * @param timestamp - 时间戳
   * @param isAddTimeZone
   */
  public static formatTimestampToZh(timestamp: any, isAddTimeZone?: boolean) {
    if (typeof timestamp == "string") {
      timestamp = parseInt(timestamp)
    }
    return this.formatIsoToZh(new Date(timestamp).toISOString(), isAddTimeZone)
  }

  /**
   * 转换数字日期为中文日期
   *
   * @param str '20220718142548'
   */
  public static formatNumToZhDate(str: string) {
    if (!str) {
      return ""
    }
    const newstr = str

    const onlyNumbers = newstr.replace(/\D/g, "")
    // logUtil.logInfo("onlyNumbers=>", onlyNumbers)
    const year = onlyNumbers.slice(0, 4)
    const month = onlyNumbers.slice(4, 6)
    const day = onlyNumbers.slice(6, 8)
    const hour = onlyNumbers.slice(8, 10)
    const min = onlyNumbers.slice(10, 12)
    const sec = onlyNumbers.slice(12, 14)

    let datestr = year
    if (!month) {
      datestr = year
    } else if (!day) {
      datestr = year + "-" + month
    } else if (!hour) {
      datestr = year + "-" + month + "-" + day
    } else if (!min) {
      datestr = year + "-" + month + "-" + day + " " + hour
    } else if (!sec) {
      datestr = year + "-" + month + "-" + day + " " + hour + ":" + min
    } else {
      datestr = year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec
    }
    return datestr
  }

  /**
   * 字符转Date
   *
   * @param dateString dateString
   *
   * ```
   * should be in ISO format: "yyyy-mm-dd hh:MM:ss" or
   * "yyyy-mm-dd", "yyyy-mm" or "yyyy" or yyyymmddsss
   * ```
   *
   * @returns {Date}
   */
  public static convertStringToDate(dateString: string): Date {
    const datestr = this.formatNumToZhDate(dateString)
    return new Date(datestr)
  }
}

export default DateUtil
