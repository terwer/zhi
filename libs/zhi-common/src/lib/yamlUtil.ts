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

/**
 * YAML工具类
 *
 * @author terwer
 * @since 0.8.1
 */
class YamlUtil {
  /**
   * yaml转对象
   *
   * @param content - 待处理的包含YAML的字符串
   */
  public static yaml2Obj(content: string): any {
    const frontMatter = this.extractFrontmatter(content)
    return jsYaml.load(frontMatter, {})
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
   */
  public static extractFrontmatter(content: string): any {
    let frontMatter: string
    const match = content.match(/^---\n([\s\S]*?)---\n/)
    if (match) {
      frontMatter = match[0].trim()
    } else {
      frontMatter = `---\n---`
    }
    return frontMatter
  }
}

export default YamlUtil
