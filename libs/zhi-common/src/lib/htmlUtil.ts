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

/**
 * HTML 处理工具类
 */
class HtmlUtil {
  /**
   * 移除标题数字
   *
   * @param str - 字符串
   */
  public static removeTitleNumber(str: string): string {
    if (StrUtil.isEmptyString(str)) {
      return ""
    }

    const trimmedStr = str.trim()
    const re = /^\d+\.\s*(.*)$/
    const match = trimmedStr.match(re)

    if (!match) {
      return trimmedStr.trimStart()
    }

    const newStr = match[1]
    return newStr.trimStart()
  }

  /**
   * 删除挂件的HTML
   *
   * @param str - 原字符
   */
  public static removeWidgetTag(str: string): string {
    if (StrUtil.isEmptyString(str)) {
      return ""
    }

    let newStr = str

    const re = /<iframe.*?src="\/widgets\/.*?<\/iframe>/g
    newStr = newStr.replace(re, "")

    return newStr
  }

  /**
   * 删除Markdown文本的挂件的HTML
   *
   * @param str - 原字符
   */
  public static removeMdWidgetTag(str: string): string {
    if (StrUtil.isEmptyString(str)) {
      return ""
    }

    let newstr = str.toString()

    // 删除挂件的iframe
    newstr = this.removeWidgetTag(newstr)

    return newstr
  }

  /**
   * 去除html标签，残缺不全也可以
   *
   * @param str - 字符串
   */
  public static filterHtml(str: string): string {
    if (StrUtil.isEmptyString(str)) {
      return ""
    }

    /*
     * <.*?>为正则表达式，其中的.表示任意字符，*?表示出现0次或0次以上，此方法可以去掉双头标签(双头针对于残缺的标签)
     * "<.*?"表示<尖括号后的所有字符，此方法可以去掉残缺的标签，及后面的内容
     * " "，若有多种此种字符，可用同一方法去除
     */
    str = str.replace(/<style((.|\n|\r)*?)<\/style>/g, "")
    str = str.replace(/<script((.|\n|\r)*?)<\/script>/g, "")
    str = str.replace(/<[^>]*>/g, "")
    str = str.replace(/&.*;/g, "")
    str = str.replace(/(^\s*)|(\s*$)/g, "")
    str = str.replace(/</g, "").replace(/>/g, "")
    str = str.replace(/"/g, "").replace(/'/g, "")

    // 正则保留字符
    str = str.replace(/\*/g, "")
    str = str.replace(/\$/g, "")
    str = str.replace(/\./g, "")
    str = str.replace(/\+/g, "")

    // 下面是行内空格，不建议去除
    str = str.replace(/\s+/g, "")

    // 冒号分号等替换成下划线
    str = str.replace(/[:|：]/g, "_")
    str = str.replace(/[;|；]/g, "_")
    str = str.replace(/\^/g, "_")
    str = str.replace(/!/g, "_")
    str = str.replace(/@/g, "at_")

    // 去除HTML分隔符
    str = str.replace(/---/g, "")

    // 需要排除的字符
    const excludeWords = ["\\d*/\\d/\\d*", "[、|\\\\]", "[，|,]", "\\d", "/", "-"]
    for (let i = 0; i < excludeWords.length; i++) {
      const regex = new RegExp(excludeWords[i], "g")
      str = str.replace(regex, "")
    }

    str = str.toLowerCase()
    return str
  }

  /**
   * 截取指定长度html
   *
   * @param html - html
   * @param length - 长度
   * @param ignoreSign - 不要结尾省略号
   */
  public static parseHtml(html: string, length: number, ignoreSign?: boolean): string {
    if (StrUtil.isEmptyString(html)) {
      return ""
    }

    const allText = this.filterHtml(html)
    return StrUtil.getByLength(allText, length, ignoreSign)
  }

  /**
   * 移除H1标签
   *
   * @param html - html
   */
  public static removeH1(html: string): string {
    if (StrUtil.isEmptyString(html)) {
      return ""
    }

    let newstr = html

    // 在正则表达式中使用非贪婪模式
    const h1Regex = /<h1.*?\/h1>/
    // 查找第一个匹配的 <h1> 标签
    const match = newstr.match(h1Regex)

    // 替换第一个 <h1> 标签及其内容为空字符串
    if (match) {
      newstr = newstr.replace(match[0], "")
    }

    // 去除HTML分隔符
    newstr = newstr.replace(/---/g, "")

    return newstr
  }

  /**
   * 移除Markdown里面的H1标签
   *
   * JavaScript 正则表达式可以用来删除所有 Markdown 中的 h1 标签。下面是一个示例代码：
   *
   * const str = "# This is an H1\n## This is an H2\n### This is an H3";
   *
   * const regex = /^# .*$/gm;
   * const result = str.replace(regex, '');
   *
   * console.log(result);
   * 在这个例子中，我们使用正则表达式 /^# .*$/gm 来匹配所有的 h1 标签。
   * 在 JavaScript 中，^ 匹配行首，# 匹配 # 字符，.* 匹配任意字符，$ 匹配行尾，m 标记表示多行模式。
   */
  public static removeMdH1(md: string) {
    if (StrUtil.isEmptyString(md)) {
      return ""
    }

    let newstr = md
    const mdH1Regex = /^# .*$/m // 移除 'g' 标志以仅匹配第一个 H1 标题
    newstr = newstr.replace(mdH1Regex, "")
    return newstr
  }
}

export default HtmlUtil
