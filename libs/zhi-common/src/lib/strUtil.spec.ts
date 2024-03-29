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
import { describe, expect, it } from "vitest"

describe("StrUtil", () => {
  it("f", () => {
    const str = "test {0} str {1}"
    const arg1 = "hello"
    const arg2 = 123
    const expected = "test hello str 123"
    const result = StrUtil.f(str, arg1, arg2)
    expect(result).toEqual(expected)
  })

  it("f object", () => {
    const str = "test {0} str {1}"
    const arg1 = { name: "terwer", age: 18 }
    const arg2 = 123
    const expected = "test [object Object] str 123"
    const result = StrUtil.f(str, arg1, arg2)
    expect(result).toEqual(expected)
  })

  it("f boolean", () => {
    const str = "test {0} str {1}"
    const arg1 = true
    const arg2 = false
    const expected = "test true str false"
    const result = StrUtil.f(str, arg1, arg2)
    expect(result).toEqual(expected)
  })

  it("f number", () => {
    const str = "test {0} str {1}"
    const arg1 = 123
    const arg2 = 456
    const expected = "test 123 str 456"
    const result = StrUtil.f(str, arg1, arg2)
    expect(result).toEqual(expected)
  })

  it("f no placeholders", () => {
    const str = "test str"
    const expected = "test str"
    const result = StrUtil.f(str)
    expect(result).toEqual(expected)
  })

  it("test pathJoin", () => {
    const home = "http://localhost:8002/"
    const username = "terwer"
    const repo = "terwer-github-io"
    const url = StrUtil.pathJoin(StrUtil.pathJoin(home, username), repo)
    console.log(url)
  })

  it("test decodeUnicodeToChinese", () => {
    const str =
      '这是可能有unicode字符串的字符{"code":400,"msg":"\\\u8bf7\\\u8bbe\\\u7f6e\\\u6587\\\u7ae0\\\u6807\\\u7b7e"}'
    const result = StrUtil.decodeUnicodeToChinese(str)
    console.log(result)
  })
})
