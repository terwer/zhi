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

import SmartUtil from "./smartUtil"
import AliasTranslator from "./slugUtil"
import { describe, it } from "vitest"

describe("test smartUtil", () => {
  it("test autoSummary", async () => {
    const q = "测试查询参数"
    const summary = await SmartUtil.autoSummary(q)

    console.log("summary result =>", { summary })
  })

  it("test autoTags", async () => {
    const q = "测试的一些可用文本，看看有没有可用的关键词啊"
    const tags = await SmartUtil.autoTags(q, 5)

    console.log("tags result =>", { tags })
  })

  it("test getPageSlug", async () => {
    const q = "OpenAI Responses API 的战略意图与技术架构：AI 智能体时代的技术范式变革"
    const slug = await AliasTranslator.getPageSlug(q)
    // const slug = await AliasTranslator.getPageSlug(q, true, {
    //   maxLength: 100,
    // })
    // 150
    // the-strategic-intent-and-technical-architecture-of-openai-responses-api-technological-paradigm-changes-in-the-era-of-ai-agents--1jg
    //
    // 100
    // the-strategic-intent-and-technical-architecture-of-openai-responses-api-technological-zv3dlg
    console.log("slug result =>", { slug })
  })
})
