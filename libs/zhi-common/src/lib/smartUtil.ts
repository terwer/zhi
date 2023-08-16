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

import JsonUtil from "./jsonUtil"
import HtmlUtil from "./htmlUtil"
import { simpleLogger } from "zhi-lib-base"

/**
 * 这是一个智能实用工具类
 *
 * @author terwer
 * @since 1.19.0
 */
class SmartUtil {
  private static logger = simpleLogger("smart-util", "zhi-common", false)

  /**
   * 根据给定的查询参数自动生成摘要
   *
   * @param {string} q - 查询参数
   * @returns {Promise<string>} 生成的摘要
   */
  public static async autoSummary(q: string): Promise<any> {
    const url = "http://kms.terwergreen.com:8888/api/summary"
    const headers = {
      "Content-Type": "application/json",
    }
    const data = JSON.stringify({
      q: q,
    })

    const requestOptions: RequestInit = {
      method: "POST",
      headers,
      body: data,
    }

    try {
      const response = await fetch(url, requestOptions)
      if (response.ok) {
        const summary = await response.text()
        return JsonUtil.safeParse<any>(summary, {})
      } else {
        return {
          result: "",
          errMsg: "Request failed",
        }
      }
    } catch (e: any) {
      return {
        result: e.toString(),
        errMsg: e,
      }
    }
  }

  /**
   * 自动为给定的字符串生成标签
   *
   * @param q - 要生成标签的字符串
   * @param len - 需要生成的标签的数量（可选，默认为undefined）
   * @returns 标签数组
   */
  public static async autoTags(q: string, len?: number): Promise<any[]> {
    const genTags = await this.cutWords(q)
    this.logger.debug("genTags=>", genTags)

    const hotTags = this.jiebaToHotWords(genTags, len ?? 5)
    this.logger.debug("hotTags=>", hotTags)
    return hotTags
  }

  /**
   * 文本分词
   *
   * @param words 文本
   */
  private static async cutWords(words: string): Promise<any> {
    // https://github.com/yanyiwu/nodejieba
    words = HtmlUtil.filterHtml(words)
    this.logger.debug("准备开始分词，原文=>", words)
    // https://github.com/ddsol/speedtest.net/issues/112
    // 浏览器和webpack不支持，只有node能用
    // const result = nodejieba.cut(words);
    // https://api.terwer.space/api/jieba?q=test

    const v = await fetch("https://api.terwer.space/api/jieba?q=" + words)
    const json = await v.json()
    // const result = "浏览器和webpack不支持，只有node能用，
    // 作者仓库： https://github.com/yanyiwu/nodejieba
    // 在线版本：http://cppjieba-webdemo.herokuapp.com 。"
    this.logger.debug("分词完毕，结果=>", json.result)
    return json.result
  }

  /**
   * 统计分词并按照次数排序
   *
   * @param words 分词数组
   * @param len 长度
   * @returns {string[]}
   */
  private static countWords(words: any, len: number): string[] {
    const unUseWords = ["页面"]
    this.logger.debug("文本清洗，统计，排序，去除无意义的单词unUseWords=>", unUseWords)

    // 统计
    const wordobj = words.reduce(function (count: any, word: any) {
      // 排除无意义的词
      if (word.length === 1 || unUseWords.includes(word)) {
        count[word] = 0
        return count
      }

      // 统计
      // eslint-disable-next-line no-prototype-builtins
      count[word] = count.hasOwnProperty(word) ? parseInt(count[word]) + 1 : 1
      return count
    }, {})

    // 排序
    const wordarr = Object.keys(wordobj).sort(function (a, b) {
      return wordobj[b] - wordobj[a]
    })
    this.logger.debug("文本清洗结束wordarr=>", wordarr)

    if (!len || len === 0) {
      return wordarr
    }
    return wordarr.slice(0, len)
  }

  /**
   * 从分词中提取热门标签
   */
  private static jiebaToHotWords(words: string[], len?: number): string[] {
    let res
    const DEFAULT_JIEBA_WORD_LENGTH = 5
    const deflen = DEFAULT_JIEBA_WORD_LENGTH
    if (len) {
      res = this.countWords(words, len)
    } else {
      res = this.countWords(words, deflen)
    }

    this.logger.debug("jiebaToHotWords=>", res)
    return res
  }
}

export default SmartUtil
