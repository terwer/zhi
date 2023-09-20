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

import jsYaml from "js-yaml"
import StrUtil from "./strUtil"
import { simpleLogger } from "zhi-lib-base"

/**
 * YAML工具类
 *
 * @author terwer
 * @since 0.8.1
 */
class YamlUtil {
  private static logger = simpleLogger("yaml-util")
  private static YAML_REGEX = /^-{3}\n([\s\S]*?\n)-{3}/

  /**
   * yaml转对象
   *
   * @param content - 待处理的包含YAML的字符串
   */
  public static yaml2Obj(content: string): any {
    const frontMatter = this.extractFrontmatter(content)
    let ret = jsYaml.load(frontMatter, {})
    if (!ret) {
      ret = {}
    }
    return ret
  }

  /**
   * 将 YAML 文档的内容解析为对象
   *
   * @param content - YAML 文档的内容
   * @returns 解析后的对象
   * @throws 如果找不到 YAML 分隔符，则抛出错误
   */
  public static async yaml2ObjAsync(content: string): Promise<any> {
    // 提取 YAML
    const frontMatter = this.extractFrontmatter(content, true)
    // 去掉分隔符
    const match = frontMatter.match(this.YAML_REGEX)
    if (match) {
      const rawContent = match[1]
      try {
        // 转换YAML
        const parsedDocs = jsYaml.load(rawContent)
        return parsedDocs
      } catch (error) {
        throw new Error("无法解析 YAML 内容")
      }
    } else {
      throw new Error("找不到 YAML 分隔符！")
    }
  }

  /**
   * 对象转yaml字符串
   *
   * @param obj
   */
  public static obj2Yaml(obj: any): string {
    // https://www.npmjs.com/package/js-yaml
    let res = jsYaml.dump(obj, {})
    res = StrUtil.appendStr("---\n", res, "---")
    return res
  }

  /**
   * 提取正文前置数据的静态公共方法
   *
   * @param content - 包含正文和前置数据的字符串
   * @param addSign - 是否包含符号
   */
  public static extractFrontmatter(content: string, addSign?: boolean): any {
    const match = content.match(this.YAML_REGEX)
    if (match) {
      let frontMatter = match[1].trim()
      if (addSign) {
        frontMatter = `---\n${frontMatter}\n---`
      }
      return frontMatter
    } else {
      return ""
    }
  }

  /**
   * 提取正文
   *
   * @param content - 包含正文和前置数据的字符串
   */
  public static extractMarkdown(content: string): any {
    let markdown = content
    if (this.YAML_REGEX.test(content)) {
      markdown = content.replace(this.YAML_REGEX, "")
      this.logger.info("发现原有的YAML，已移除")
    }

    return markdown
  }

  /**
   * 将 YAML 头部添加到 Markdown 内容中
   *
   * @param yaml - 要添加的 YAML 头部
   * @param content - 原始的 Markdown 内容
   * @returns 更新后的 Markdown 内容
   */
  public static addYamlToMd(yaml: string, content: string): string {
    const markdown = this.extractMarkdown(content)
    const updatedMarkdown = `${yaml}\n${markdown}`
    return updatedMarkdown
  }
}

export default YamlUtil
