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
import YamlUtil from "./yamlUtil"
import DateUtil from "./dateUtil"

describe("test YamlUtil", () => {
  it("test yaml2Obj", () => {
    const yaml = "---\n---"
    const obj = YamlUtil.yaml2Obj(yaml)
    console.log(obj)
  })

  it("test yaml2Obj2", async () => {
    const yaml = `---
title: 测试文档1
date: '2023-07-22 21:22:37'
updated: '2023-08-16 18:26:44'
excerpt: 图片测试，远程图片4。图片测试，本地图片。这是一篇测试文章，等会会删除。
permalink: /post/test-document-1-z1fvylk.html
comments: true
toc: true
---地方
就还好哈哈哈哈这种怎么---`
    const obj = await YamlUtil.yaml2ObjAsync(yaml)
    console.log(obj)
  })

  it("test obj2Yaml", () => {
    // 调用函数进行转换
    const dateString = "2022-07-01 12:00:00"
    const shanghaiDate = DateUtil.convertStringToDate(dateString)

    const obj = {
      date: DateUtil.formatIsoToZh(shanghaiDate.toISOString(), true),
    }
    const yaml = YamlUtil.obj2Yaml(obj)
    console.log(yaml)
  })
})
