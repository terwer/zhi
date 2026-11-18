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

import { describe, expect, it } from "vitest"
import Post from "./models/post"
import PostUtil from "./PostUtil"

describe("test PostUtil", () => {
  it("test fromYaml", () => {})

  it("extracts the first markdown image", () => {
    const post = new Post()
    post.markdown = "正文\n\n![cover](assets/cover.png)\n\n![second](assets/second.png)"

    expect(PostUtil.extractFirstImage(post)).toBe("assets/cover.png")
  })

  it("falls back to the first html image", () => {
    const post = new Post()
    post.html = '<p><img src="https://img.example.com/cover.png" alt="cover" /></p>'

    expect(PostUtil.extractFirstImage(post)).toBe("https://img.example.com/cover.png")
  })

  it("returns an empty string when the post has no image", () => {
    expect(PostUtil.extractFirstImage(undefined)).toBe("")
    expect(PostUtil.extractFirstImage(new Post())).toBe("")
  })
})
