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

import { afterEach, beforeEach, describe, expect, it } from "vitest"
import SiYuanApiAdaptor from "./siYuanApiAdaptor"
import SiyuanConfig from "../config/siyuanConfig"
import path from "path"
import { MediaObject, Post } from "zhi-blog-api"
import fs from "fs"
import SiyuanKernelApi from "../kernel/siyuanKernelApi"

describe("SiYuanApiAdaptor", async () => {
  const projectBase = path.resolve(__dirname, "../../..")
  const moduleBase = path.resolve(__dirname, "../../../../..")
  // lute
  require(path.join(moduleBase, "libs/zhi-common-markdown/public/libs/lute/lute-1.7.5-20230410.min.cjs"))

  beforeEach(async () => {
    console.log("======test is starting...======")
  })

  afterEach(() => {
    console.log("======test is finished.========")
  })

  it("test apiAdaptor", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const apiAdaptor = new SiYuanApiAdaptor(siyuanConfig)

    expect(apiAdaptor).toBeTruthy()
  })

  it("test siyuan getUsersBlogs", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const apiAdaptor = new SiYuanApiAdaptor(siyuanConfig)

    const usersBlogs = await apiAdaptor.getUsersBlogs()
    console.log(usersBlogs)
  })

  it("test siyuan getRecentPostsCount", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const apiAdaptor = new SiYuanApiAdaptor(siyuanConfig)

    const recentPostsCount = await apiAdaptor.getRecentPostsCount()
    console.log(recentPostsCount)
  })

  it("test siyuan getRecentPosts", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const apiAdaptor = new SiYuanApiAdaptor(siyuanConfig)

    const recentPosts = await apiAdaptor.getRecentPosts(10)
    console.log(recentPosts)
  })

  it("test siyuan newPost", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    siyuanConfig.notebook = "20230506132031-qbtyjdk"
    const apiAdaptor = new SiYuanApiAdaptor(siyuanConfig)

    const post = new Post()
    post.title = "自动发布的测试标题"
    post.description = "自动发布的测试内容"
    post.mt_keywords = "标签1,标签2"
    post.categories = ["分类1", "分类2"]
    // post.dateCreated = new Date()
    const postid = await apiAdaptor.newPost(post)
    console.log(postid)
  })

  it("test siyuan getPost", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const apiAdaptor = new SiYuanApiAdaptor(siyuanConfig)

    const postid = "20230526221603-3mgotyw"
    const post = await apiAdaptor.getPost(postid)
    console.log(post)
  })

  it("test siyuan editPost", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const apiAdaptor = new SiYuanApiAdaptor(siyuanConfig)

    const postid = "20230526221603-3mgotyw"
    const post = new Post()
    post.title = "自动发布的测试标题2"
    post.description = "# 自动发布的测试内容2"
    post.mt_keywords = "标签1,标签2"
    post.categories = ["分类1", "分类2"]
    // post.dateCreated = new Date()
    const data = await apiAdaptor.editPost(postid, post)
    console.log(data)
  })

  it("test siyuan deletePost", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    siyuanConfig.notebook = "20230506132031-qbtyjdk"
    const apiAdaptor = new SiYuanApiAdaptor(siyuanConfig)

    const postid = "20230526224518-oea9ey7"
    const data = await apiAdaptor.deletePost(postid)
    console.log(data)
  })

  it("test siyuan getCategories", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const apiAdaptor = new SiYuanApiAdaptor(siyuanConfig)

    const data = await apiAdaptor.getCategories()
    console.log(data)
  })

  it("test siyuan getPreviewUrl", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    siyuanConfig.home = "http://127.0.0.1:6806"
    siyuanConfig.previewUrl = "siyuan://blocks/[postid]"
    const apiAdaptor = new SiYuanApiAdaptor(siyuanConfig)

    const postid = "20230526221603-3mgotyw"
    const data = await apiAdaptor.getPreviewUrl(postid)
    console.log(data)
  })

  it("test siyuan newMediaObject", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const apiAdaptor = new SiYuanApiAdaptor(siyuanConfig)
    const siyuanKernelApi = new SiyuanKernelApi(siyuanConfig)

    const url = path.join(projectBase, "./testdata/photo.jpg")
    const file = fs.readFileSync(url)
    const mediaObject = new MediaObject("20220616-132401-001.jpg", "image/jpeg", file)
    const data = await apiAdaptor.newMediaObject(mediaObject, async () => {
      const FormData = require("form-data")
      const formData = new FormData()
      formData.append("file[]", mediaObject.bits, mediaObject.name)
      formData.append("assetsDirPath", "/assets/")

      const data = await siyuanKernelApi.uploadAsset(formData)
      console.log("uploadAsset=>", data)
      return data
    })
    console.log("test newMediaObject finished=>", data)
  })
})
