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

import { describe, it } from "vitest"
import NotionMarkdownConverter from "./notionMarkdownConverter"

describe("test NotionMarkdownConverter", () => {
  it("test notionToMarkdown", async () => {
    const markdownSource = `# test\n test content\n* test link \n## title2`
    const notionBlocks = NotionMarkdownConverter.markdownToNotion(markdownSource)
    console.log("Source notion blocks:", JSON.stringify(notionBlocks))

    // Notion 格式的块对象数组
    const mdBlocks = await NotionMarkdownConverter.notionToMarkdownBlocks(notionBlocks)
    console.log("Converted mdBlocks:", mdBlocks)

    const markdownString = await NotionMarkdownConverter.notionToMarkdown(notionBlocks)
    console.log("Converted markdown string:", markdownString)
  })

  it("test markdownToNotion", () => {
    const markdownString = `# 自动发布的测试标题236

呵呵哈哈哈4567

dfgfg

* dfg

地方

1. dfg
2. dfgd

## 地方个地

地方个地方
`
    const notionBlocks = NotionMarkdownConverter.markdownToNotion(markdownString)
    console.log("Converted notion blocks:", notionBlocks)
  })
})
