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
import { zhiMd2Blocks } from "./md2n"
import { zhiBlocks2md } from "./n2md"

/**
 * 转换器类，用于将 Notion 格式转换为 Markdown 格式，或将 Markdown 格式转换为 Notion 格式
 */
class NotionMarkdownConverter {
  /**
   * 将 Notion 格式转换为 Markdown 格式。
   * @param notionBlocks - Notion 块对象数组
   * @returns Markdown 字符串
   */
  public static async notionToMarkdown(notionBlocks: any[]): Promise<string> {
    const mdBlocks = await zhiBlocks2md(notionBlocks)
    return mdBlocks.join("\n")
  }
  /**
   * 将 Notion 格式转换为 Markdown 格式。
   * @param notionBlocks - Notion 块对象数组
   * @returns Markdown 字符串
   */
  public static async notionToMarkdownBlocks(notionBlocks: any[]): Promise<string[]> {
    return await zhiBlocks2md(notionBlocks)
  }

  /**
   * 将 Markdown 格式转换为 Notion 格式
   *
   * @param markdownString - Markdown 字符串
   * @returns Notion 对象
   */
  public static markdownToNotion(markdownString: string): any {
    return zhiMd2Blocks(markdownString)
  }
}

export default NotionMarkdownConverter
